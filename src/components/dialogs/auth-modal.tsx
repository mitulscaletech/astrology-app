"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { CommonTabs, CommonTabsContent, CommonTabsList, CommonTabsTrigger } from "@/components/ui/common-tabs";

import Auth from "./component/auth-component";
import { DEFAULT_COUNTRY_CODE } from "@/shared/constants";
import toast from "react-hot-toast";
import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "USER" | "ASTROLOGER";
}

const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(type);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendCount, setResendCount] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [currentView, setCurrentView] = useState<"phone" | "otp" | "captcha">("phone");
  const [currentPage, setCurrentPage] = useState<"login" | "signup">("login");

  const handleMobileNumber = (number: string, dialCode: string) => {
    setMobileNumber(number);
    setCountryCode(`+${dialCode}`);
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

  const handleSendOtp = async () => {
    if (!mobileNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      const response = await HttpService.post(API_CONFIG.sendOtp, {
        country_code: countryCode,
        mobile_number: mobileNumber
      });

      if (!response.is_error) {
        setCurrentView("otp");
        startTimer();
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("OTP send error:", err);
    }
  };

  const handleResendOtp = () => {
    if (mobileNumber) {
      setResendCount((prev) => prev + 1);
      handleSendOtp();
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (resendCount >= 3) {
      toast.error("Please solve the captcha");
      return;
    }

    try {
      const response = await HttpService.post(API_CONFIG.verifyOtp, {
        country_code: countryCode,
        mobile_number: mobileNumber,
        otp: +otp
      });

      if (!response.is_error) {
        const { status, token } = response.data;
        // Sign in logic here
        toast.success("OTP Verified");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  const handleCaptchaChange = async (token: string | null) => {
    try {
      const response = await HttpService.post(API_CONFIG.verifyCaptcha, { captchaToken: token }, { isPublic: true });

      if (!response.is_error) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Captcha verification error:", err);
    }
  };
  const handleResetState = () => {
    setCurrentView("phone");
    setCountryCode(DEFAULT_COUNTRY_CODE);
    setMobileNumber("");
    setResendCount(0);
    setTimer(0);
    setOtp("");
  };
  const handleChangePage = () => {
    setCurrentPage((prev) => (prev === "login" ? "signup" : "login"));
    handleResetState();
  };
  const renderAuth = () => (
    <Auth
      phone={mobileNumber}
      code={countryCode}
      currentTab={activeTab}
      change={handleMobileNumber}
      view={currentView}
      OTP={otp}
      changeOtp={setOtp}
      resend={handleResendOtp}
      timer={timer}
      changeToken={handleCaptchaChange}
      currentPage={currentPage}
      changePage={handleChangePage}
    />
  );

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="lg" showClose>
        <CommonTabs
          value={activeTab}
          onValueChange={(val) => {
            setActiveTab(val);
            setCurrentView("phone");
          }}
          className="min-h-screen"
        >
          <div className="w-112 mx-auto">
            <CommonTabsList>
              <CommonTabsTrigger value="USER">USER</CommonTabsTrigger>
              <CommonTabsTrigger value="ASTROLOGER">ASTROLOGER</CommonTabsTrigger>
            </CommonTabsList>
          </div>

          <CommonTabsContent value="USER" className="space-y-6">
            {renderAuth()}
          </CommonTabsContent>
          <CommonTabsContent value="ASTROLOGER" className="space-y-6">
            {renderAuth()}
          </CommonTabsContent>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onClose}>
              CANCEL
            </Button>
            <Button
              variant="highlight"
              className="cosmic-button"
              onClick={currentView === "otp" ? handleVerifyOtp : handleSendOtp}
            >
              CONTINUE
            </Button>
          </div>
        </CommonTabs>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
