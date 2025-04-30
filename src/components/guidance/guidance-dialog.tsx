"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent } from "../ui/modal";
import Typography from "@/components/ui/typography";
import { ServiceCard } from "../common/service-card";
import ProfileCard from "../common/profile-card";
import { FullTimeIcon, HalfTimeIcon } from "@/shared/icons/time-icons";
import DatePicker from "react-datepicker";

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
const emotions: LifeArea[] = [
  {
    id: "fear",
    label: "Fear",
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
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: "love",
    label: "Love",
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
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  },
  {
    id: "joy",
    label: "Joy",
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
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: "sad",
    label: "Sad",
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
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: "surprise",
    label: "Surprise",
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
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="14" r="2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: "anxious",
    label: "Anxious",
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
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15h8" />
        <path d="M8.5 11S9 9 12 9s3.5 2 3.5 2" />
      </svg>
    )
  },
  {
    id: "prefer-not-to-say",
    label: "Prefer not to say",
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
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    )
  }
];
const services = [
  {
    id: 1,
    title: "Holistic Life Blueprint",
    description: "Unlock the secrets of your birth chart and take control of your life's journey with clarity!",
    image: "",
    isSelected: false
  },
  {
    id: 2,
    title: "Aligning Destinies for a Harmonious Future",
    description: "A valuable guidance to navigate life with your partner through thick & thin.",
    image: "",
    isSelected: true
  },
  {
    id: 3,
    title: "Practical Life Strategies",
    description: "Gain deeper insights into your life's pressing questions and find clarity.",
    image: "",
    isSelected: false
  },
  {
    id: 4,
    title: "The Best Time for Success",
    description: "Align with the most auspicious time to crease the probabilities of success.",
    image: "",
    isSelected: false
  }
];

const TIME_SLOTS = [
  {
    id: "30_min",
    time: 30,
    title: "minutes",
    icon: <HalfTimeIcon />
  },
  {
    id: "60_min",
    time: 60,
    title: "minutes",
    icon: <FullTimeIcon />
  }
];

type Step = {
  id: number;
  title: string;
  header: string;
  description: string;
};

const steps: Step[] = [
  {
    id: 1,
    header: "Step",
    title: "What Area Of Life Would You Like Guidance On Today?",
    description:
      "Choose the life areas where you're seeking clarity or support — whether it's love, finances, career, health, or something more personal. Select one or many to help us guide you better."
  },
  {
    id: 2,
    header: "Step",
    title: "How have you been feeling about this situation?",
    description:
      "Your emotions matter. Select the feelings that best describe your current state — this helps us offer guidance and rituals that truly support where you are right now."
  },
  {
    id: 3,
    header: "Choose Your Astrology Service",
    title: "Discover the Right Path Forward",
    description:
      "Based on your query, we recommend starting with one of these powerful astrology consultations. Each one is designed to guide you with clarity, confidence, and cosmic insight."
  },
  {
    id: 4,
    header: "Choose Your Astrologer & Session Time",
    title: "Connect with the Right Expert",
    description:
      "Review available astrologers, their experience, and user ratings. Pick a 30 or 60-minute session to dive deep into your questions."
  },
  {
    id: 5,
    header: "Save Your Date & Time",
    title: "Select the perfect date and time for your consultation",
    description:
      "Pick a time based on your astrologer’s availability. We recommend choosing a calm, quiet space for the best experience."
  },
  {
    id: 6,
    header: "Choose Your Astrologer & Session Time",
    title: "Fill Out Your Personal Details",
    description:
      "This info helps your astrologer prepare insights tailored specifically to your chart. Please double-check the accuracy."
  },
  {
    id: 7,
    header: "Save Your Date & Time",
    title: "Select the perfect date and time for your consultation",
    description:
      "Pick a time based on your astrologer’s availability. We recommend choosing a calm, quiet space for the best experience."
  }
];

export function GuidanceDialog() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["relationships", "legal"]); // Pre-selected for demo
  const [otherValue, setOtherValue] = useState("Future, Fortune...");
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(0);
  const [selectedServices, setSelectedServices] = useState(0);

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
  const handleSelectService = (service: any) => {
    const selectedService = services.find((ser) => ser.id === service.id);
    setSelectedServices(selectedService?.id ?? 0);
  };

  return (
    <Modal open={dialogOpen} onOpenChange={setDialogOpen}>
      <ModalContent size="xl" showClose={true}>
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
                    currentStep > index + 1 ? "bg-primary" : currentStep === index + 1 ? "bg-primary" : "bg-warning-100"
                  )}
                />
                {index < steps.length - 1 && <div className="w-3" />}
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-9 p-18 lg:grid-cols-[40%_60%] justify-center"
          >
            {/* Left Column - Step info */}
            <div className="mb-4">
              <p className="text-sm font-medium text-primary mb-2">Step {currentStep}.</p>
              <Typography variant="h2" size="h4" className="font-head font-semibold">
                {steps[currentStep - 1].title}
              </Typography>
              <p className="mt-2 text-gray-600">{steps[currentStep - 1].description}</p>
            </div>

            {/* Right Column - Options */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-2 rounded-lg border-secondary/20 p-10">
                {lifeAreas.map((area) => (
                  <button
                    key={area.id}
                    className={cn(
                      "flex flex-col gap-1.5 rounded-lg border-2 px-4 py-2.5 text-left transition-all hover:border-red-300",
                      selectedAreas.includes(area.id) ? "border-primary bg-primary/10" : "border-secondary/30"
                    )}
                    onClick={() => handleSelectArea(area.id)}
                  >
                    <span className="flex h-6 w-6 items-center justify-center">{area.icon}</span>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 border-2 rounded-lg border-secondary/20 p-10">
                {emotions.map((area) => (
                  <button
                    key={area.id}
                    className={cn(
                      "flex flex-col gap-1.5 rounded-lg border-2 px-4 py-2.5  text-left transition-all hover:border-red-300",
                      selectedAreas.includes(area.id) ? "border-primary bg-primary/10" : "border-secondary/30"
                    )}
                    onClick={() => handleSelectArea(area.id)}
                  >
                    <span className="flex h-6 w-6 items-center justify-center">{area.icon}</span>
                    <span>{area.label}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border-2 rounded-lg border-secondary/20 p-10">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    highlight={Boolean(selectedServices === service.id)}
                    onClick={(data: any) => handleSelectService(data)}
                  />
                ))}
              </div>
            )}
            {currentStep === 4 && (
              <section>
                <Typography variant="h2" size="small" className="mb-3 uppercase text-secondary/70">
                  Choose Astrologer
                </Typography>
                <div className="mb-3 border-2 rounded-lg border-secondary/20 px-5 py-9">
                  <Typography variant="h4" size="base" className="text-base text-start ">
                    Choose AI Astrologer
                  </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border-2 rounded-lg border-secondary/20 p-10 mb-15">
                  {["Dr Vishwanath MV", "Dr Ganesh Prasad Mishra", "Mr Sudhir Pandey"].map((name, index) => (
                    <ProfileCard
                      key={index}
                      name={name}
                      imageUrl={`https://i.pravatar.cc/150?img=${index + 10}`}
                      languages={index === 0 ? ["English", "Hindi"] : ["Hindi"]}
                      rating={5}
                      reviews={100}
                      isSelected={selectedProfileId === index}
                      onSelect={() => setSelectedProfileId(index)}
                    />
                  ))}
                </div>
                <Typography variant="h2" size="small" className="mb-3 uppercase text-secondary/70">
                  Choose Astrologer
                </Typography>
                {/* <div className="mb-3 border-2 rounded-lg border-secondary/20 px-5 py-9"> */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 border-2 rounded-lg border-secondary/20 p-10">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.id}
                      className={cn(
                        "flex flex-col gap-1.5 rounded-lg border-[2px] p-4 text-left transition-all hover:border-red-300",
                        selectedAreas.includes(slot.id) ? "border-primary bg-primary/10" : "border-secondary/30"
                      )}
                      onClick={() => handleSelectArea(slot.id)}
                    >
                      <span className="flex h-8 w-8 items-center justify-center">{slot.icon}</span>
                      <span>{`${slot.time} ${slot.title}`}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
            {currentStep === 5 && (
              <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <DatePicker onChange={(date) => console.log(date)} inline />
              </main>
            )}
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
  );
}
