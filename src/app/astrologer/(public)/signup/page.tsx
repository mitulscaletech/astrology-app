"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";

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

export default function AstrologerSignup() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
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
    if (!mobileNumber) {
      toast.error("Please enter your phone number");
      return;
    }
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
    if (resendCount >= 2) {
      toast.error("Please solve the captcha");
      return;
    }
    setResendCount((prev) => prev + 1);
    startTimer();
    toast.success("OTP resent successfully!");
  };
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    if (!captchaToken) {
      toast.error("Please solve the captcha");
      return;
    }
    try {
      HttpService.post(API_CONFIG.verifyOtp, { country_code: countryCode, mobile_number: mobileNumber, otp: +otp })
        .then(async (response) => {
          if (!response.is_error) {
            const mockUser = {
              mobile_number: mobileNumber,
              access_token: response.data,
              country_code: countryCode,
              role: "astrologer"
            };
            await signIn("credentials", {
              redirect: false,
              token: JSON.stringify(mockUser)
            });
            const status = response.data.status;
            const path = handleUserStatusRedirect(status);
            if (path) router.push(path);
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
        });
    } catch (error) {
      console.error("Error", error);
    }
  };
  const handleSocialSignup = async (result: UserCredential, provider: string) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user: any = result.user;
    const params = {
      access_token: credential?.accessToken,
      name: result.user.displayName,
      provider_name: provider,
      provider_user_id: result.user.providerData[0].uid,
      refresh_token: user?.stsTokenManager.refreshToken,
      expires_at: user?.stsTokenManager.expirationTime,
      social_photo: user.photoURL,
      contry_code: DEFAULT_COUNTRY_CODE,
      role: "astrologer"
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
        .catch(async (error: any) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            const pendingCred = FacebookAuthProvider.credentialFromError(error);
            const email = error.customData?.email;

            if (email) {
              const methods = await fetchSignInMethodsForEmail(auth, email);
              if (methods.includes("google.com")) {
                const googleProvider = new GoogleAuthProvider();
                const googleResult = await signInWithPopup(auth, googleProvider);
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
          <h1 className="text-2xl font-bold text-primary">Join as Astrologer</h1>
          <p className="text-gray-600">Create your professional account</p>
        </div>

        <div className="space-y-4">
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <PhoneInput
            country="in"
            value={`${countryCode}${mobileNumber}`}
            onlyCountries={["us", "in", "gb"]}
            onChange={(value, country: any) => handleChangeMobile(value, country)}
            inputProps={{ name: "phone-input" }}
            inputStyle={{ width: "100%", height: "40px" }}
          />

          {!showOtp ? (
            <Button className="w-full" onClick={handleSendOtp}>
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

              <div className="flex justify-between items-center text-sm">
                <Button variant="outline" disabled={timer > 0} onClick={handleResendOtp}>
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
              />
              <Button className="w-full" onClick={handleVerifyOtp} disabled={!isCaptchaVerified}>
                Verify & Create Account
              </Button>
            </>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-accent-white text-gray-500">Or sign up with</span>
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
          Already have an account?{" "}
          <Link href="/astrologer/login" className="text-purple-600 hover:underline">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
