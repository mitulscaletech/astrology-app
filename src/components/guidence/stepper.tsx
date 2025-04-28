"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "../ui/modal";
import Typography from "@/components/ui/typography";

type LifeArea = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const lifeAreas: LifeArea[] = [
  {
    id: "relationships",
    label: "Relationships",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    id: "finance",
    label: "Finance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="8" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    )
  },
  {
    id: "health",
    label: "Health",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  },
  {
    id: "education",
    label: "Education",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    id: "personal-growth",
    label: "Personal Growth",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        <path d="M12 2v2" />
        <path d="M12 22v-2" />
        <path d="m17 20.66-1-1.73" />
        <path d="M11 10.27 7 3.34" />
        <path d="m20.66 17-1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <path d="M22 12h-2" />
        <path d="M2 12h2" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m17 3.34-1 1.73" />
        <path d="m7 20.66 1-1.73" />
      </svg>
    )
  },
  {
    id: "legal",
    label: "Legal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
      </svg>
    )
  }
];

type Step = {
  id: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "What Area Of Life Would You Like Guidance On Today?",
    description:
      "Choose the life areas where you're seeking clarity or support — whether it's love, finances, career, health, or something more personal. Select one or many to help us guide you better."
  },
  {
    id: 2,
    title: "Tell Us More About Your Situation",
    description: "Provide some details about what you're experiencing so we can better assist you."
  },
  {
    id: 3,
    title: "Review Your Request",
    description: "Check your information before submitting your guidance request."
  },
  {
    id: 4,
    title: "Review Your Request",
    description: "Check your information before submitting your guidance request."
  }
];

export function GuidanceDialogFixed() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["relationships", "legal"]); // Pre-selected for demo
  const [otherValue, setOtherValue] = useState("Future, Fortune...");

  const handleSelectArea = (id: string) => {
    setSelectedAreas((prev) => (prev.includes(id) ? prev.filter((areaId) => areaId !== id) : [...prev, id]));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetDialog = () => {
    setCurrentStep(1);
    setSelectedAreas(["relationships", "legal"]); // Reset to pre-selected for demo
    setOtherValue("Future, Fortune...");
  };

  return (
    <div>
      <button
        onClick={() => setDialogOpen(true)}
        className="inline-flex items-center justify-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
      >
        <span className="mr-2">Pop Up</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
          <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
          <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
          <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
        </svg>
      </button>

      <Modal open={dialogOpen} onOpenChange={setDialogOpen}>
        <ModalContent size="lg">
          <div className="mb-8 flex items-center gap-4 w-full">
            {currentStep > 1 ? (
              <button
                onClick={handleBack}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            ) : (
              <div className="h-8 w-8"></div> // Empty div for spacing when back button is not shown
            )}

            <div className="flex items-center gap-3 w-full max-w-xs">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "h-2 w-40 rounded-full",
                      currentStep > index + 1
                        ? "bg-primary"
                        : currentStep === index + 1
                          ? "bg-primary"
                          : "bg-warning-100"
                    )}
                  />
                  {index < steps.length - 1 && <div className="w-3" />}
                </div>
              ))}
            </div>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-full p-1 hover:bg-gray-100 focus:outline-none">
            <X className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2"
            >
              {/* Left Column - Step info */}
              <div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-primary mb-2">Step {currentStep}.</p>
                  <Typography variant="h2" size="h4" className="font-head font-semibold">
                    {steps[currentStep - 1].title}
                  </Typography>
                  <p className="mt-2 text-gray-600">{steps[currentStep - 1].description}</p>
                </div>
              </div>

              {/* Right Column - Options */}
              <div>
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {lifeAreas.map((area) => (
                      <button
                        key={area.id}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border-[2px] p-4 text-left transition-all hover:border-red-300",
                          selectedAreas.includes(area.id) ? "border-primary bg-primary/10" : "border-secondary/30"
                        )}
                        onClick={() => handleSelectArea(area.id)}
                      >
                        <span className="flex h-8 w-8 items-center justify-center">{area.icon}</span>
                        <span>{area.label}</span>
                      </button>
                    ))}
                    <div className="flex flex-col rounded-md border border-gray-200 p-4">
                      <label className="mb-1 text-sm text-gray-500">Other:</label>
                      <input
                        type="text"
                        value={otherValue}
                        onChange={(e) => setOtherValue(e.target.value)}
                        placeholder="Future, Fortune..."
                        className="border-none p-0 text-base outline-none"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="rounded-md border border-gray-200 p-6">
                    <h3 className="mb-4 text-lg font-medium">Tell us more</h3>
                    <textarea
                      className="h-32 w-full rounded-md border border-gray-200 p-3"
                      placeholder="Describe your situation..."
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="rounded-md border border-gray-200 p-6">
                    <h3 className="mb-4 text-lg font-medium">Review your request</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Selected areas:</p>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {selectedAreas.map((areaId) => (
                            <span key={areaId} className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">
                              {lifeAreas.find((area) => area.id === areaId)?.label}
                            </span>
                          ))}
                          {otherValue && (
                            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-800">{otherValue}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex justify-between lg:col-span-2">
                {currentStep === 1 ? (
                  <Button onClick={() => setDialogOpen(false)} variant="outline">
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={handleBack} variant="outline">
                    Back
                  </Button>
                )}
                <Button
                  onClick={currentStep === steps.length ? () => setDialogOpen(false) : handleNext}
                  disabled={currentStep === 1 && selectedAreas.length === 0 && !otherValue}
                >
                  {currentStep === steps.length ? "Submit" : "Continue"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </ModalContent>
      </Modal>
    </div>
  );
}
