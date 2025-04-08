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

import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebaseConfig";
// import AuthService from "@/shared/services/auth.service";

export default function AstrologerSignup() {
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };
  const handleSendOtp = () => {
    if (!mobileNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    setShowOtp(true);
    startTimer();
    toast.success("OTP sent successfully!");
    // HttpService.post(API_CONFIG.sendOtp, { country_code: "+91", mobile_number: mobileNumber,captcha_token:captchaToken })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       setShowOtp(true);
    //       startTimer();
    //       toast.success("OTP sent successfully!");
    //     } else {
    //       toast.error("Failed to send OTP");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error sending OTP:", error);
    //     toast.error("Failed to send OTP");
    //   });
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
    try {
      const mockUser = {
        id: "otp_user_1",
        name: "OTP User",
        email: `otpuser${Date.now()}@example.com`,
        mobile_number: mobileNumber,
        isNewUser: true
      };
      const result = await signIn("credentials", {
        redirect: false,
        token: JSON.stringify(mockUser)
      });

      // HttpService.post(API_CONFIG.verifyOtp, { country_code: "+91", mobile_number: mobileNumber, otp: otp })
      //   .then(async (response) => {
      //     if (response.status === 200) {
      //       const result = await signIn("credentials", {
      //         redirect: false,
      //         token: JSON.stringify(response.data)
      //       });
      //       router.push("/astrologer/onboarding");
      //       toast.success("Signup successful!");
      //     } else {
      //       toast.error("Invalid OTP");
      //     }
      //   })
      //   .catch((error) => {
      //     toast.error("Invalid OTP");
      //   });

      if (result?.ok) {
        router.push("/astrologer/onboarding");
        toast.success("Signup successful!");
      } else {
        toast.error("OTP login failed");
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  };
  const handleSocialSignup = async (result: UserCredential, provider: string) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(" credential:", credential);
    const user: any = result.user;
    const params = {
      access_token: credential?.accessToken,
      name: result.user.displayName,
      provider_name: provider,
      provider_user_id: result.user.providerData[0].uid,
      refresh_token: user?.stsTokenManager.refreshToken,
      expires_at: user?.stsTokenManager.expirationTime,
      social_photo: user.photoURL
    };
    HttpService.post(API_CONFIG.socialLogin, { params })
      .then(async (response) => {
        if (response.status === 200) {
          await signIn("credentials", {
            redirect: false,
            token: JSON.stringify(params)
          });
          router.push("/astrologer/onboarding");
          toast.success("Signup successful!");
        } else {
          toast.error("Invalid OTP");
        }
      })
      .catch(() => {
        toast.error("Invalid OTP");
      });
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(" result:", result);
      handleSocialSignup(result, "google");
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          console.log("User:", result.user);
          handleSocialSignup(result, "facebook");
        })
        .catch(async (error) => {
          if (error.code === "auth/account-exists-with-different-credential") {
            const pendingCred = FacebookAuthProvider.credentialFromError(error);
            const email = error.customData?.email;

            if (email) {
              const methods = await fetchSignInMethodsForEmail(auth, email);
              console.log(" methods:", methods);

              if (methods.includes("google.com")) {
                // Prompt user to sign in with Google first
                const googleProvider = new GoogleAuthProvider();
                const googleResult = await signInWithPopup(auth, googleProvider);

                // After successful login, link Facebook to the same account
                await linkWithCredential(googleResult.user, pendingCred!);
                console.log("Facebook linked to Google account!");
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
    <div className='min-h-screen bg-primary-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-6 space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-primary'>Join as Astrologer</h1>
          <p className='text-gray-600'>Create your professional account</p>
        </div>

        <div className='space-y-4'>
          <Label htmlFor='mobileNumber'>Mobile Number</Label>
          <PhoneInput
            country='in'
            value={`${countryCode}${mobileNumber}`}
            onlyCountries={["us", "in", "gb"]}
            onChange={(value, country: any) => handleChangeMobile(value, country)}
            inputProps={{ name: "phone-input" }}
            inputStyle={{ width: "100%", height: "40px" }}
          />

          {!showOtp ? (
            <Button className='w-full' onClick={handleSendOtp}>
              Send OTP
            </Button>
          ) : (
            <>
              <div>
                <Label htmlFor='otp'>Enter OTP</Label>
                <InputOTP
                  id='otp'
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

              <div className='flex justify-between items-center text-sm'>
                <Button variant='ghost' disabled={timer > 0} onClick={handleResendOtp}>
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""}
                onChange={handleCaptchaChange}
              />
              <Button className='w-full' onClick={handleVerifyOtp}>
                Verify & Create Account
              </Button>
            </>
          )}
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-primary-100 text-gray-500'>Or sign up with</span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' onClick={() => handleGoogleLogin()}>
            <Image src='https://www.google.com/favicon.ico' alt='Google' width={20} height={20} className='w-5 h-5' />
          </Button>
          <Button variant='outline' onClick={() => handleFacebookLogin()}>
            <span className='w-5 h-5'>
              <IconFacebook />
            </span>
          </Button>
        </div>

        <div className='text-center text-sm'>
          Already have an account?{" "}
          <Link href='/astrologer/login' className='text-purple-600 hover:underline'>
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
