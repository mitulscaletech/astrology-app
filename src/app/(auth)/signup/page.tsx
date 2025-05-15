"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import CaptchaError from "@/components/common/captcha-error";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CommonTabs, CommonTabsContent, CommonTabsList, CommonTabsTrigger } from "@/components/ui/common-tabs";

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { IconFacebook, IconGoogle } from "@/shared/icons/intake-form";
import { DEFAULT_COUNTRY_CODE, LOGIN_ANIMATION_VARIANTS, ROLE } from "@/shared/constants";

import { handleUserStatusRedirect } from "@/lib/utils";
import { handleAstrologerRedirect } from "@/lib/utils-server";

import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebaseConfig";

export default function Login() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ASTROLOGER");

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    HttpService.post(API_CONFIG.verifyCaptcha, { captchaToken: token }, { isPublic: true }).then((response) => {
      if (!response.is_error) {
        setIsCaptchaVerified(true);
        toast.success(response.message);
      } else {
        setIsCaptchaVerified(false);
        recaptchaRef.current?.reset();
        // toast.error(response.message);
      }
    });
  };
  const handleChangeMobile = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";
    const number = value.replace(`${dialCode}`, "");
    setMobileNumber(number);
    setCountryCode(`+${dialCode}`);
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
    startTimer();
    handleSendOtp();
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
      HttpService.post(API_CONFIG.verifyOtp, {
        country_code: countryCode,
        mobile_number: mobileNumber,
        otp: +otp,
        role: ROLE.astrologer
      })
        .then(async (response) => {
          if (!response.is_error) {
            const mockUser = {
              mobile_number: mobileNumber,
              access_token: response.data,
              country_code: countryCode
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
      email: result.user.email,
      provider_name: provider,
      provider_user_id: result.user.providerData[0].uid,
      refresh_token: user?.stsTokenManager.refreshToken,
      expires_at: user?.stsTokenManager.expirationTime,
      social_photo: user.photoURL,
      role: activeTab
    };
    HttpService.post(API_CONFIG.socialLogin, params)
      .then(async (response) => {
        if (!response.is_error) {
          await signIn("credentials", {
            redirect: false,
            token: JSON.stringify(params)
          });
          const status = response.data.status;
          const path =
            activeTab === ROLE.astrologer ? handleAstrologerRedirect(status) : handleUserStatusRedirect(status);
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

  const handleChangeTab = (val: string) => {
    setActiveTab(val);
    // setCurrentView("phone");
    setMobileNumber("");
  };

  return (
    <div className="container min-h-screen flex items-center justify-center">
      <CommonTabs value={activeTab}>
        {/* onValueChange={(val) => handleChangeTab(val)} */}
        <div className="mx-auto mb-40">
          <CommonTabsList>
            <CommonTabsTrigger value="USER">USER</CommonTabsTrigger>
            <CommonTabsTrigger value="ASTROLOGER">ASTROLOGER</CommonTabsTrigger>
          </CommonTabsList>
        </div>

        <CommonTabsContent value="USER" className="space-y-6">
          {/* {renderAuth()} */}
        </CommonTabsContent>
        <CommonTabsContent value="ASTROLOGER" className="space-y-6">
          <div className="text-center mx-auto perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                // key={currentPage}
                variants={LOGIN_ANIMATION_VARIANTS}
                initial="initial"
                animate="animate"
                exit="exit"
                className="backface-hidden"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/4 shrink-0">
                    <span className="text-xl uppercase text-primary font-sans font-medium tracking-wider block mb-6 lg:mb-8">
                      Signup
                    </span>

                    <Typography variant="h2" size="h4" className="font-head font-semibold mb-6 lg:mb-8">
                      {!showOtp ? "To Begin Your Divine Journey" : "Enter Your OTP To Continue"}
                    </Typography>

                    <Typography variant="h2" size="p" className="mb-6 lg:mb-12">
                      {!showOtp ? (
                        `Choose your preferred method to access your WeWake ${activeTab?.toLowerCase()} dashboard.`
                      ) : (
                        <>
                          We’ve sent a 6-digit verification code to your mobile number.
                          <i> Please enter it below to securely access your account.</i>
                        </>
                      )}
                    </Typography>

                    <div className="text-center text-sm mb-15">
                      Already have an account?&nbsp;
                      <Link href="/login" className="text-primary hover:underline font-semibold">
                        Log in here
                      </Link>
                    </div>
                    {!isCaptchaVerified && <CaptchaError />}
                  </div>

                  <div className="md:w-2/4 shrink-0">
                    {showOtp ? (
                      <div className="flex flex-col justify-center items-center">
                        <InputOTP id="otp" maxLength={6} value={otp} onChange={setOtp} className="mb-15">
                          <InputOTPGroup>
                            {[...Array(6)].map((_, index) => (
                              <InputOTPSlot key={index} index={index} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>

                        <div className="text-center text-sm">
                          Didn’t receive the code?
                          <Button
                            className="text-primary hover:underline text-lg font-semibold"
                            variant="link"
                            size="sm"
                            disabled={timer > 0}
                            onClick={handleResendOtp}
                          >
                            Resend OTP {timer > 0 && `(${timer}s)`}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="mb-8">
                          <PhoneInput
                            country="in"
                            value={`${countryCode}${mobileNumber}`}
                            onlyCountries={["us", "in", "gb"]}
                            onChange={(value, country: any) => handleChangeMobile(value, country)}
                            inputProps={{ name: "phone-input" }}
                            inputStyle={{ width: "100%", height: "40px" }}
                          />
                        </div>
                        <div className="flex flex-row gap-3 justify-center mb-15">
                          <Button variant="icon" size="rounded" onClick={() => handleGoogleLogin()}>
                            <span className="size-6">
                              <IconGoogle />
                            </span>
                          </Button>
                          <Button variant="icon" size="rounded" onClick={() => handleFacebookLogin()}>
                            <span className="size-6">
                              <IconFacebook />
                            </span>
                          </Button>
                        </div>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""}
                          onChange={handleCaptchaChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Main Title */}
        </CommonTabsContent>

        <div className="flex justify-end mt-8">
          {!showOtp ? (
            <Button variant="highlight" className="cosmic-button" onClick={manageSendOtp} disabled={!isCaptchaVerified}>
              CONTINUE
            </Button>
          ) : (
            <Button className="cosmic-button" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          )}
        </div>
      </CommonTabs>
    </div>
  );
}
