"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Apple, Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import ReCAPTCHA from "react-google-recaptcha";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  GoogleAuthProvider,
  linkWithCredential,
  signInWithPopup,
  User
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "@/firebaseConfig";
import toast from "react-hot-toast";

export default function AstrologerSignup() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  console.log(" user:", user);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };
  const handleSendOtp = () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    setShowOtp(true);
    startTimer();
    toast.success("OTP sent successfully!");
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
      // const result = await signIn("credentials", {
      //   phone,
      //   otp,
      //   redirect: false,
      // });
      router.push("/astrologer/onboarding");

      // if (result?.error) {
      //   toast.error("Signup failed");
      //   return;
      // }

      toast.success("Signup successful!");
      router.push("/astrologer/onboarding");
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(" provider:", provider);
    try {
      signIn(provider, {
        callbackUrl: "/astrologer/onboarding",
        redirect: false
      })
        .then((res) => {
          console.log(" res:", res);
          if (res?.error) {
            alert("Authentication failed. Please try again.");
            return;
          }

          if (res?.ok && res?.url) {
            // // Step 2: Call your API after successful login
            // const apiResponse = await fetch("/api/custom-auth-callback", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ provider }),
            // });
            // const data = await apiResponse.json();
            // if (apiResponse.ok) {
            //   // Step 3: Redirect only after API response
            //   router.push("/astrologer/onboarding");
            // } else {
            //   alert(data.message || "Something went wrong");
            // }
          }
        })
        .catch(() => {
          alert("Sign-in failed. Please try again.");
        });

      // if (result?.error) {
      //   toast.error("Signup failed");
      //   return;
      // }

      // router.push("/astrologer/onboarding");
    } catch (error) {
      alert("Signup failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFacebookLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, facebookProvider);
      // console.log(" result.user:", result.user)
      // setUser(result.user);
      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          // Logged in!
          console.log("User:", result.user);
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
                alert(`Please sign in using: ${methods.join(", ")}`);
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
  return (
    <div className='min-h-screen bg-primary-100 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md p-6 space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-primary'>Join as Astrologer</h1>
          <p className='text-gray-600'>Create your professional account</p>
        </div>

        <div className='space-y-4'>
          <div>
            <Label htmlFor='phone'>Phone Number</Label>
            <Input
              id='phone'
              type='tel'
              placeholder='Enter your phone number'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

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
        <button onClick={handleGoogleLogin}>Login with Google</button>
        <button onClick={handleFacebookLogin}>Login with Facebook</button>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-primary-100 text-gray-500'>Or sign up with</span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' onClick={() => handleSocialSignup("google")}>
            {/* <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            /> */}
            <Image src='https://www.google.com/favicon.ico' alt='Google' width={20} height={20} className='w-5 h-5' />
          </Button>
          <Button variant='outline' onClick={() => handleSocialSignup("facebook")}>
            <Facebook className='w-5 h-5' />
          </Button>
          {/* <Button variant='outline' onClick={() => handleSocialSignup("apple")}>
            <Apple className='w-5 h-5' />
          </Button> */}
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
