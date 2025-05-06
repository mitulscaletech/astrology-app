"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { BasicInfoForm } from "@/components/astrologer/profile/basic-info-form";
import { ProfessionalDetailsForm } from "@/components/astrologer/profile/professional-details-form";
import { SocialProfilesForm } from "@/components/astrologer/profile/social-profiles-form";
import { AdditionalInfoForm } from "@/components/astrologer/profile/additional-info-form";
// import { astrologerActiveTab } from "@/lib/utils";
import { Stepper } from "@/components/ui/stepper";

export default function AstrologerProfile() {
  const { data } = useSession();
  const [step, setStep] = useState("2");
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
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 3</h2>
          <p>This is the Social step</p>
        </div>
      )
    },
    {
      value: "4",
      label: "Additional Info & Terms",
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 4</h2>
          <p>This is the Additional step</p>
        </div>
      )
    },
    {
      value: "5",
      label: "Review Process",
      content: (
        <div>
          <h2 className="text-xl font-semibold mb-2">Step 4</h2>
          <p>This is the Additional step</p>
        </div>
      )
    }
  ];

  useEffect(() => {
    const completedSteps = data?.user?.intake_form?.completed_steps || 0;
    setStep(completedSteps.toString());
    // setActiveTab(astrologerActiveTab(completedSteps));
  }, [data]);

  return (
    <>
      <Stepper currentStep={step} onStepChange={setStep} steps={steps} />
      {/* Tab Contents would go here */}
    </>
  );
}
