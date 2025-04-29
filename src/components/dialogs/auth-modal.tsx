"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "@/components/ui/modal";
import { CommonTabs, CommonTabsContent, CommonTabsList, CommonTabsTrigger } from "@/components/ui/common-tabs";

import Auth from "./component/auth-component";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "USER" | "ASTROLOGER";
}

const AuthModal = ({ isOpen, onClose, type }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(type);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="lg" showClose={true}>
        <CommonTabs value={activeTab} onValueChange={setActiveTab}>
          <div className="w-112 mx-auto">
            <CommonTabsList>
              <CommonTabsTrigger value="USER">USER</CommonTabsTrigger>
              <CommonTabsTrigger value="ASTROLOGER">ASTROLOGER</CommonTabsTrigger>
            </CommonTabsList>
          </div>
          <CommonTabsContent value="USER" className="space-y-6">
            <Auth phone={phoneNumber} code={countryCode} currentTab={activeTab} />
          </CommonTabsContent>
          <CommonTabsContent value="ASTROLOGER" className="space-y-6">
            <Auth phone={phoneNumber} code={countryCode} currentTab={activeTab} />
          </CommonTabsContent>
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={onClose}>
              CANCEL
            </Button>
            <Button variant="highlight" className="cosmic-button">
              CONTINUE
            </Button>
          </div>
        </CommonTabs>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
