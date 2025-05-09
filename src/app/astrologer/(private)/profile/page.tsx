"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Loader from "@/components/ui/loader";
import { Stepper } from "@/components/ui/stepper";
import { ReviewProcess } from "@/components/astrologer/profile/review-process";
import { BasicInfoForm } from "@/components/astrologer/profile/basic-info-form";
import { SocialProfilesForm } from "@/components/astrologer/profile/social-profiles-form";
import { AdditionalInfoForm } from "@/components/astrologer/profile/additional-info-form";
import { ProfessionalDetailsForm } from "@/components/astrologer/profile/professional-details-form";

import { USER_PROFILE_STATUS } from "@/shared/constants";

export default function AstrologerProfile() {
  const [step, setStep] = useState("1");
  const [loader, setLoader] = useState(true);
  const { data: session } = useSession();

  const steps = [
    {
      value: "1",
      label: "Basic Information",
      content: <BasicInfoForm onComplete={() => setStep("2")} />
    },
    {
      value: "2",
      label: "Professional Details",
      content: <ProfessionalDetailsForm onComplete={() => setStep("3")} />
    },
    {
      value: "3",
      label: "Social Profile",
      content: <SocialProfilesForm onComplete={() => setStep("4")} />
    },
    {
      value: "4",
      label: "Additional Info & Terms",
      content: <AdditionalInfoForm onComplete={() => setStep("5")} />
    },
    {
      value: "5",
      label: "Review Process",
      content: <ReviewProcess />
    }
  ];

  const handleTabChange = (newStep: string) => {
    // if (session?.user?.status === USER_PROFILE_STATUS.AWAITING_FINAL_REVIEW) {
    //   setStep("5");
    // } else {
    //   if (Number(newStep) < (session?.user?.intake_form?.completed_steps ?? 1)) {
    //     setStep(newStep);
    //   }
    // }
    setStep(newStep);
  };

  useEffect(() => {
    setLoader(true);
    const completedSteps = (session?.user?.intake_form?.completed_steps ?? 0) + 1;
    setStep(completedSteps.toString());
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [session]);

  return loader ? <Loader /> : <Stepper currentStep={step} onStepChange={handleTabChange} steps={steps} />;
}
