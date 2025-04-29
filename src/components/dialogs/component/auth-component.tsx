"use client";

import Link from "next/link";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import ReCAPTCHA from "react-google-recaptcha";

import { Button } from "@/components/ui/button";
import IconFacebook from "@/shared/icons/facebook";
import Typography from "@/components/ui/typography";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import "react-phone-input-2/lib/style.css";
import { motion, AnimatePresence } from "framer-motion";

interface IAuth {
  phone: string;
  code: string;
  currentTab?: string;
  view: "phone" | "otp" | "captcha";
  OTP: string;
  timer: number;
  currentPage: string;
  resend: () => void;
  change: (number: string, code: string) => void;
  changeOtp: (OTP: string) => void;
  changeToken: (token: string | null) => void;
  changePage: () => void;
}

const Auth = ({
  phone,
  code,
  currentTab,
  change,
  view,
  changeOtp,
  OTP,
  timer,
  resend,
  changeToken,
  currentPage,
  changePage
}: IAuth) => {
  const handleChangeMobile = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";
    const number = value.replace(`${dialCode}`, "");
    change(number, dialCode);
  };

  const renderTitle = () => {
    switch (view) {
      case "phone":
        return currentPage === "login" ? "Welcome Back" : "Sign Up To Begin Your Divine Journey";
      case "otp":
        return "Enter Your OTP To Continue";
      case "captcha":
        return "Verify You're Human";
      default:
        return "";
    }
  };

  const renderSubTitle = () => {
    switch (view) {
      case "phone":
        return `Choose your preferred method to access your WeWake ${currentTab?.toLowerCase()} dashboard.`;
      case "otp":
        return (
          <>
            We’ve sent a 6-digit verification code to your mobile number.
            <i> Please enter it below to securely access your account.</i>
          </>
        );
      case "captcha":
        return "To keep your account safe, please complete the visual check below.";
      default:
        return null;
    }
  };

  const renderInputSection = () => {
    if (view === "phone") {
      return (
        <PhoneInput
          country="in"
          value={`${code}${phone}`}
          onlyCountries={["us", "in", "gb"]}
          onChange={(value, country: any) => handleChangeMobile(value, country)}
          inputProps={{ name: "phone-input" }}
          inputStyle={{ width: "100%", height: "40px" }}
        />
      );
    }

    if (view === "otp") {
      return (
        <InputOTP id="otp" maxLength={6} value={OTP} onChange={changeOtp}>
          <InputOTPGroup>
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      );
    }

    if (view === "captcha") {
      return <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || ""} onChange={changeToken} />;
    }

    return null;
  };

  const renderFooterActions = () => {
    if (view === "phone") {
      return (
        <div className="text-center text-sm">
          {currentPage === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link href="" onClick={changePage} className="text-primary hover:underline font-semibold">
            {currentPage === "login" ? "Sign up here" : "Log in here"}
          </Link>
        </div>
      );
    }

    if (view === "otp") {
      return (
        <div className="text-center text-sm">
          Didn’t receive the code?{" "}
          <Button
            className="text-primary hover:underline font-semibold"
            variant="link"
            size="sm"
            disabled={timer > 0}
            onClick={resend}
          >
            Resend OTP {timer > 0 && `(${timer}s)`}
          </Button>
        </div>
      );
    }

    return null;
  };
  const flipVariants = {
    initial: {
      rotateY: 90,
      opacity: 0
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="text-center w-96 mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={flipVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="backface-hidden"
        >
          {/* Tab Header */}
          <span className="text-xl uppercase text-primary font-sans font-medium tracking-wider block mb-2">
            {currentTab}
          </span>

          {/* Main Title */}
          <Typography variant="h2" size="h4" className="font-head font-semibold mb-4 lg:mb-6">
            {renderTitle()}
          </Typography>

          {/* Subtitle / Instruction */}
          <Typography variant="h2" size="p" className="mb-6 lg:mb-12">
            {renderSubTitle()}
          </Typography>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-8">{renderInputSection()}</div>

            {/* Social Buttons */}
            <div className="flex flex-row gap-2 justify-center">
              <Button variant="outline" size="rounded" className="h-10 px-0">
                <Image
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </Button>
              <Button variant="outline" size="rounded" className="h-10 px-0">
                <span className="w-5 h-5">
                  <IconFacebook />
                </span>
              </Button>
            </div>

            {/* Additional Footer Links */}
            {renderFooterActions()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Auth;
