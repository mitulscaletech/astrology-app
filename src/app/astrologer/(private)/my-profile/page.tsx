"use client";

import { useState } from "react";
import clsx from "clsx";

import ProfileCard from "@/components/common/astrologer-profile-card";
import { BasicInfoForm } from "@/components/astrologer/profile/basic-info-form";
import { SocialProfilesForm } from "@/components/astrologer/profile/social-profiles-form";
import { ProfessionalDetailsForm } from "@/components/astrologer/profile/professional-details-form";
import { IconBasicInfo, IconNext, IconPresentation, IconProfDetails, IconSocial } from "@/shared/icons/my-profile";
import { AdditionalInfoForm } from "@/components/astrologer/profile/additional-info-form";

export default function AstrologerProfile() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: "Basic Information",
      icon: <IconBasicInfo />,
      content: <BasicInfoForm onComplete={() => {}} page="my-profile" />
    },
    {
      id: 2,
      label: "Professional Details",
      icon: <IconProfDetails />,
      content: <ProfessionalDetailsForm onComplete={() => {}} page="my-profile" />
    },
    {
      id: 3,
      label: "Social Profile",
      icon: <IconSocial />,
      content: <SocialProfilesForm onComplete={() => {}} page="my-profile" />
    },
    {
      id: 4,
      label: "Presentation Style",
      icon: <IconPresentation />,
      content: <AdditionalInfoForm onComplete={() => {}} page="my-profile" />
    }
  ];
  const StepComponent = steps[activeStep - 1].content;
  return (
    <div className="container">
      <ProfileCard />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-88 space-y-2 shrink-0">
          {steps.map((step) => (
            <button
              key={step.id}
              className={clsx(
                "flex gap-2 text-left items-center text-lg py-4 px-4 w-full rounded-md transition",
                activeStep === step.id
                  ? "text-primary font-semibold"
                  : "font-normal  hover:text-primary-400 text-secondary"
              )}
              onClick={() => setActiveStep(+step.id)}
            >
              <span className="size-5">{step.icon}</span>
              {step.label}
              <span className="size-5 ms-auto">
                <IconNext />
              </span>
            </button>
          ))}
        </div>

        <div className="grow">
          <div className="pb-4 2xl:pb-6">{StepComponent ? StepComponent : <p>Invalid step</p>}</div>
        </div>
      </div>
    </div>
  );
}
