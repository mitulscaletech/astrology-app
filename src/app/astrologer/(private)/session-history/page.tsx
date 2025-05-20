"use client";

import React, { useState } from "react";

import clsx from "clsx";
import Typography from "@/components/ui/typography";
import { IconPastSession, IconPaymentDetails } from "@/shared/icons/session-history";
import { IconNext } from "@/shared/icons/my-profile";
import PastSession from "@/components/astrologer/session-history/past-session";
import PayoutDetails from "@/components/astrologer/session-history/payout-details";

export default function SessionHistory() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      label: "Past Session",
      icon: <IconPastSession />,
      content: <PastSession />
    },
    {
      id: 2,
      label: "Payout Details",
      icon: <IconPaymentDetails />,
      content: <PayoutDetails />
    }
  ];
  const StepComponent = steps[activeStep - 1].content;
  return (
    <div className="container">
      <Typography size="h4" className="text-5xl font-semibold mt-15">
        Session History & Earning
      </Typography>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="md:w-80 space-y-2 shrink-0 border-r-[1.5px] border-secondary/10">
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
