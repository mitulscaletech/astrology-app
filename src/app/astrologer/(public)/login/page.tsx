"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from "react-phone-input-2";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import IconFacebook from "@/shared/icons/facebook";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { DEFAULT_COUNTRY_CODE } from "@/shared/constants";

import { handleUserStatusRedirect } from "@/lib/utils";

import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebaseConfig";

export default function AstrologerLogin() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    setIsCaptchaVerified(false);
    HttpService.post(API_CONFIG.verifyCaptcha, { captchaToken: token }, { isPublic: true }).then((response) => {
      if (!response.is_error) {
        setIsCaptchaVerified(true);
        toast.success(response.message);
      } else {
        setIsCaptchaVerified(false);
        toast.error(response.message);
      }
    });
  };
  const handleSendOtp = () => {
    HttpService.post(API_CONFIG.sendOtp, {
      country_code: countryCode,
      mobile_number: mobileNumber,
      captcha_token: captchaToken
    })
      .then((response) => {
        if (!response.is_error) {
          setShowOtp(true);
          startTimer();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });
  };
  const manageSendOtp = () => {
    if (!mobileNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    handleSendOtp();
  };
  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const handleResendOtp = () => {
    if (resendCount >= 3) {
      // Show captcha
      if (captchaToken && mobileNumber) {
        handleSendOtp();
      }
      toast.error("Please solve the captcha");
      return;
    }
    // handleSendOtp();
    setResendCount((prev) => prev + 1);
    startTimer();
    toast.success("OTP resent successfully!");
  };
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (resendCount >= 3 && !captchaToken) {
      toast.error("Please solve the captcha");
      return;
    }
    HttpService.post(API_CONFIG.verifyOtp, { country_code: countryCode, mobile_number: mobileNumber, otp: +otp })
      .then(async (response) => {
        if (!response.is_error) {
          const { status, token } = response.data;
          await signIn("credentials", {
            redirect: false,
            token: JSON.stringify({ status, access_token: token })
          });
          HttpService.get(API_CONFIG.me).then(async (userResponse) => {
            if (!userResponse.is_error) {
              await signIn("credentials", {
                redirect: false,
                token: JSON.stringify({ ...userResponse.data, role: "astrologer", access_token: response.data.token })
              });
              const status = userResponse.data.status;
              const path = handleUserStatusRedirect(status);
              if (path) router.push(path);
            } else {
              toast.error(response.message);
            }
          });
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
      });

    // Verify OTP logic here
  };
  const handleSocialSignup = async (result: UserCredential, provider: string) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user: any = result.user;
    const params = {
      access_token: credential?.accessToken,
      name: result.user.displayName,
      email: result.user.email,
      provider_name: provider,
      provider_user_id: result.user.providerData[0].uid,
      refresh_token: user?.stsTokenManager.refreshToken,
      expires_at: user?.stsTokenManager.expirationTime,
      social_photo: user.photoURL
    };
    HttpService.post(API_CONFIG.socialLogin, params)
      .then(async (response) => {
        if (!response.is_error) {
          await signIn("credentials", {
            redirect: false,
            token: JSON.stringify(params)
          });
          const status = response.data.status;
          const path = handleUserStatusRedirect(status);
          if (path) router.push(path);
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      handleSocialSignup(result, "google");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          handleSocialSignup(result, "facebook");
        })
        .catch(async (error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            const pendingCred = FacebookAuthProvider.credentialFromError(error);
            const email = error.customData?.email;
            if (email) {
              const methods = await fetchSignInMethodsForEmail(auth, email);
              if (methods.includes("google.com")) {
                // Prompt user to sign in with Google first
                const googleProvider = new GoogleAuthProvider();
                const googleResult = await signInWithPopup(auth, googleProvider);

                // After successful login, link Facebook to the same account
                await linkWithCredential(googleResult.user, pendingCred!);
              } else {
                toast.error("Account already exists with a different provider");
              }
            }
          } else {
            console.error(error);
          }
        });
    } catch (error) {
      console.error("Facebook Login Error:", error);
    }
  };
  const handleChangeMobile = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";
    const number = value.replace(`${dialCode}`, "");
    setMobileNumber(number);
    setCountryCode(`+${dialCode}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Astrologer Login</h1>
          <p className="text-gray-600">Welcome back! Please login to continue.</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="mobileNumber">Phone Number</Label>
          <PhoneInput
            country="in"
            value={`${countryCode}${mobileNumber}`}
            onlyCountries={["us", "in", "gb"]}
            onChange={(value, country: any) => handleChangeMobile(value, country)}
            inputProps={{ name: "phone-input" }}
            inputStyle={{ width: "100%", height: "40px" }}
          />

          {!showOtp ? (
            <Button className="w-full" onClick={manageSendOtp}>
              Send OTP
            </Button>
          ) : (
            <>
              <div>
                <Label htmlFor="otp">Enter OTP</Label>
                <InputOTP
                  id="otp"
                  maxLength={6}
                  value={otp}
                  onChange={setOtp}
                  // onComplete={(e: any) => setOtp(e.target.value)}
                >
                  <InputOTPGroup>
                    {[...Array(6)].map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              {resendCount >= 3 && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""}
                  onChange={handleCaptchaChange}
                />
              )}
              <div className="flex justify-between items-center text-sm">
                <Button variant="outline" size="sm" disabled={timer > 0} onClick={handleResendOtp}>
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>
              </div>

              <Button className="w-full" onClick={handleVerifyOtp} disabled={!isCaptchaVerified}>
                Verify OTP
              </Button>
            </>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-accent-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={() => handleGoogleLogin()}>
            <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={() => handleFacebookLogin()}>
            <span className="w-5 h-5">
              <IconFacebook />
            </span>
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/astrologer/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
