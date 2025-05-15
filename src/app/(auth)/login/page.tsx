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

import "@/assets/scss/phone-input.scss";

import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebaseConfig";
import Grid from "@/components/ui/grid";

export default function Login() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ASTROLOGER");

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
                token: JSON.stringify({ ...userResponse.data, access_token: response.data.token })
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
      //   role: activeTab
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
    <div className="container flex flex-col grow">
      <CommonTabs value={activeTab} asChild>
        <div className="grow flex flex-col">
          <div className="mx-auto w-full md:w-8/12 lg:w-7/12 2xl:w-6/12 4xl:w-5/12">
            <CommonTabsList>
              <CommonTabsTrigger value="USER">USER</CommonTabsTrigger>
              <CommonTabsTrigger value="ASTROLOGER">ASTROLOGER</CommonTabsTrigger>
            </CommonTabsList>
          </div>
          <div className="w-full lg:w-9/12 xl:w-8/12 3xl:w-7/12 m-auto">
            <CommonTabsContent value="USER" className="space-y-6"></CommonTabsContent>
            <CommonTabsContent value="ASTROLOGER" className="space-y-6">
              <div className="mx-auto perspective-1000">
                <AnimatePresence mode="wait">
                  <motion.div
                    variants={LOGIN_ANIMATION_VARIANTS}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="backface-hidden"
                  >
                    <Grid className="gap-y-4 items-center" size="lg">
                      <Grid.Col className="md:w-6/12">
                        <div className="lg:pe-6">
                          <Typography
                            variant="h2"
                            className="uppercase text-primary font-medium mb-4 lg:mb-4 xl:mb-5 3xl:mb-6"
                          >
                            Login
                          </Typography>
                          <Typography
                            variant="h3"
                            size="h4-head"
                            className="font-head font-semibold mb-4 lg:mb-4 xl:mb-5 3xl:mb-6"
                          >
                            {!showOtp ? "Welcome to Your Divine Journey" : "Enter Your OTP To Continue"}
                          </Typography>
                          <Typography variant="p" size="p">
                            {!showOtp ? (
                              `Choose your preferred method to access your WeWake ${activeTab?.toLowerCase()} dashboard.`
                            ) : (
                              <>
                                We’ve sent a 6-digit verification code to your mobile number.
                                <i className="text-secondary/50">
                                  {" "}
                                  Please enter it below to securely access your account.
                                </i>
                              </>
                            )}
                          </Typography>

                          <div className="mt-6 md:mt-8 xl:mt-10 3xl:mt-12">
                            Don&apos;t have an account? &nbsp;
                            <Link href="/signup" className="text-primary hover:underline font-bold">
                              Sign up here
                            </Link>
                          </div>
                          {!isCaptchaVerified && <CaptchaError />}
                        </div>
                      </Grid.Col>
                      <Grid.Col className="md:w-6/12">
                        <div className="">
                          {showOtp ? (
                            <div>
                              <InputOTP id="otp" maxLength={6} value={otp} onChange={setOtp} className="mb-15">
                                <InputOTPGroup>
                                  {[...Array(6)].map((_, index) => (
                                    <InputOTPSlot key={index} index={index} />
                                  ))}
                                </InputOTPGroup>
                              </InputOTP>

                              <div className="mt-6 md:mt-8 xl:mt-10 3xl:mt-12 text-center">
                                Didn’t receive the code?{" "}
                                <button
                                  className="text-primary hover:underline font-bold disabled:cursor-not-allowed"
                                  disabled={timer > 0}
                                  onClick={handleResendOtp}
                                >
                                  Resend OTP {timer > 0 && `(${timer}s)`}
                                </button>
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
                                  inputClass="mb-8"
                                />
                              </div>
                              {resendCount >= 3 && (
                                <ReCAPTCHA
                                  ref={recaptchaRef}
                                  sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""}
                                  onChange={handleCaptchaChange}
                                />
                              )}
                              <div className="flex flex-row gap-3 justify-center">
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
                            </>
                          )}
                        </div>
                      </Grid.Col>
                    </Grid>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Main Title */}
            </CommonTabsContent>
          </div>
          <div className="w-full lg:w-9/12 xl:w-8/12 3xl:w-7/12 mx-auto flex justify-end mt-6 lg:mt-8">
            {!showOtp ? (
              <Button variant="highlight" className="cosmic-button" onClick={manageSendOtp}>
                CONTINUE
              </Button>
            ) : (
              <Button className="cosmic-button" onClick={handleVerifyOtp} disabled={!isCaptchaVerified}>
                Verify OTP
              </Button>
            )}
          </div>
        </div>
      </CommonTabs>
    </div>
  );
}
