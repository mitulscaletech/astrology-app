"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { Facebook } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import toast from "react-hot-toast";

export default function AstrologerLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(60);
  const router = useRouter();

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
      // Show captcha
      toast.error("Please solve the captcha");
      return;
    }
    setResendCount((prev) => prev + 1);
    startTimer();
    toast.success("OTP resent successfully!");
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    // Verify OTP logic here
    toast.success("Login successful!");
    router.push("/astrologer/dashboard");
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: "/astrologer/dashboard"
      });
      if (result?.error) {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className='min-h-screen bg-primary-100 flex items-center justify-center p-4'>
      {/* <Loader /> */}
      <Card className='w-full max-w-md p-6 space-y-6'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-primary'>Astrologer Login</h1>
          <p className='text-gray-600'>Welcome back! Please login to continue.</p>
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
                <Input
                  id='otp'
                  type='text'
                  placeholder='Enter OTP'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>

              <div className='flex justify-between items-center text-sm'>
                <Button variant='ghost' disabled={timer > 0} onClick={handleResendOtp}>
                  Resend OTP {timer > 0 && `(${timer}s)`}
                </Button>
              </div>

              <Button className='w-full' onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
            </>
          )}
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-primary-100 text-gray-500'>Or continue with</span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' onClick={() => handleSocialLogin("google")}>
            <img src='https://www.google.com/favicon.ico' alt='Google' className='w-5 h-5' />
          </Button>
          <Button variant='outline' onClick={() => handleSocialLogin("facebook")}>
            <Facebook className='w-5 h-5' />
          </Button>
          {/* <Button variant='outline' onClick={() => handleSocialLogin("apple")}>
            <Apple className='w-5 h-5' />
          </Button> */}
        </div>

        <div className='text-center text-sm'>
          Don&apos;t have an account?{" "}
          <Link href='/astrologer/signup' className='text-purple-600 hover:underline'>
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
