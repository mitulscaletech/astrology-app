"use client";

import React, { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import ProfileCard from "@/components/common/profile-card";
import { Modal, ModalContent } from "@/components/ui/modal";
import { ServiceCard } from "@/components/common/service-card";
import CustomDatePicker from "@/components/common/custom-datepicker";

import Step6 from "./components/step-6";
import { FullTimeIcon, HalfTimeIcon } from "@/shared/icons/time-icons";
import {
  AnxiousIcon,
  EducationIcon,
  FearIcon,
  FinanceIcon,
  HealthIcon,
  HeartIcon,
  JoyIcon,
  LegalIcon,
  PersonalGrowthIcon,
  RelationShipIcon,
  SadIcon,
  SurpriseIcon
} from "@/shared/icons/guidenceIcon";
import Grid from "../ui/grid";
import IconButton from "../common/icon-button";
import InputButton from "../common/input-button";
import BillingDetailsForm from "./components/step-7";

const timeSlots = ["08:30 AM", "09:30 AM", "10:30 AM", "11:30 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"];

const timezones = [
  { value: "Europe/London", label: "UK/London" },
  { value: "Europe/Paris", label: "Europe/Paris" },
  { value: "Asia/Kolkata", label: "Asia/Kolkata" }
];

type LifeArea = {
  id: string;
  label: string;
  icon: React.ReactNode;
  className?: any;
};

const lifeAreas: LifeArea[] = [
  {
    id: "relationships",
    label: "Relationships",
    icon: <RelationShipIcon />
  },
  {
    id: "finance",
    label: "Finance",
    icon: <FinanceIcon />
  },
  {
    id: "health",
    label: "Health",
    icon: <HealthIcon />
  },
  {
    id: "education",
    label: "Education",
    icon: <EducationIcon />
  },
  {
    id: "personal-growth",
    label: "Personal Growth",
    icon: <PersonalGrowthIcon />
  },
  {
    id: "legal",
    label: "Legal",
    icon: <LegalIcon />
  }
];
const emotions: LifeArea[] = [
  {
    id: "fear",
    label: "Fear",
    icon: <FearIcon />
  },
  {
    id: "love",
    label: "Love",
    icon: <HeartIcon />
  },
  {
    id: "joy",
    label: "Joy",
    icon: <JoyIcon />
  },
  {
    id: "sad",
    label: "Sad",
    icon: <SadIcon />
  },
  {
    id: "surprise",
    label: "Surprise",
    icon: <SurpriseIcon />
  },
  {
    id: "anxious",
    label: "Anxious",
    icon: <AnxiousIcon />
  },
  {
    id: "prefer-not-to-say",
    label: "Prefer not to say",
    icon: "",
    className: "items-center"
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
  // {
  //   id: 3,
  //   header: "Choose Your Astrology Service",
  //   title: "Discover the Right Path Forward",
  //   description:
  //     "Based on your query, we recommend starting with one of these powerful astrology consultations. Each one is designed to guide you with clarity, confidence, and cosmic insight."
  // },
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
    header: "Secure Payment",
    title: "Complete your booking securely",
    description:
      "All payments are secure and encrypted. By paying, you agree to our terms of service. You’ll receive a confirmation email and reminders."
  },
  {
    id: 8,
    header: "Secure Payment",
    title: "Your session is confirmed",
    description:
      "All payments are secure and encrypted. By paying, you agree to our terms of service. You’ll receive a confirmation email and reminders."
  }
];

export function GuidanceDialog() {
  const [dialogOpen, setDialogOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(6);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["relationships", "legal"]); // Pre-selected for demo
  const [otherValue, setOtherValue] = useState("Future, Fortune...");
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(0);
  const [selectedServices, setSelectedServices] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");

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

  const handleSelectService = (service: any) => {
    const selectedService = services.find((ser) => ser.id === service.id);
    setSelectedServices(selectedService?.id ?? 0);
  };

  return (
    <Modal open={dialogOpen} onOpenChange={setDialogOpen}>
      <ModalContent size="xl" showClose={true}>
        <div className="mb-4 md:mb-6 2xl:mb-8 flex items-center gap-4 w-full">
          {currentStep > 1 ? (
            <button
              onClick={handleBack}
              aria-label="back"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100"
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
            <div className="size-8 shrink-0"></div> // Empty div for spacing when back button is not shown
          )}

          <div className="flex items-center gap-1 md:gap-2 lg:gap-3 xl:gap-3.5 3xl:gap-4 w-full grow me-10 lg:me-14 3xl:me-16">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-1 items-center grow h-1 xl:h-1.5 rounded-full",
                  currentStep > index + 1 ? "bg-primary" : currentStep === index + 1 ? "bg-primary" : "bg-secondary/10"
                )}
              >
                {/* {index < steps.length - 1 && <div className="w-3" />} */}
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
            className="md:p-4 lg:p-6 xl:p-10 2x:p-12 2xl:p-18"
          >
            <Grid className="gap-y-4">
              {/* Left Column - Step info */}
              <Grid.Col className="md:w-5/12">
                <div className="lg:pe-4 xl:pe-5 2xl:pe-5 3xl:pe-6 4xl:pe-14">
                  <p className="font-medium text-primary">Step {currentStep}.</p>
                  <Typography
                    variant="h2"
                    size="h4-head"
                    className="my-2 md:my-2.5 lg:my-3 xl:my-4 3xl:my-5 font-head font-semibold"
                  >
                    {steps[currentStep - 1].title}
                  </Typography>
                  <p>{steps[currentStep - 1].description}</p>
                </div>
              </Grid.Col>
              {/* Right Column - Options */}
              <Grid.Col className="md:w-7/12">
                {currentStep === 1 && (
                  <div className="border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                    <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
                      {lifeAreas.map((area) => (
                        <Grid.Col className="md:w-6/12" key={area.id}>
                          <IconButton
                            label={area.label}
                            icon={area.icon}
                            isSelected={selectedAreas.includes(area.id)}
                            onClick={() => handleSelectArea(area.id)}
                          />
                        </Grid.Col>
                      ))}
                      <Grid.Col>
                        <InputButton
                          value={otherValue}
                          onChange={(e) => setOtherValue(e.target.value)}
                          label="Other:"
                          placeholder="Future, Fortune..."
                        />
                      </Grid.Col>
                    </Grid>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                    <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
                      {emotions.map((area) => (
                        <Grid.Col className="md:w-6/12 grow" key={area.id}>
                          <IconButton
                            label={area.label}
                            className={area.className}
                            icon={area.icon}
                            isSelected={selectedAreas.includes(area.id)}
                            onClick={() => handleSelectArea(area.id)}
                          />
                        </Grid.Col>
                      ))}
                    </Grid>
                  </div>
                )}

                {/* {currentStep === 3 && (
                  <div className="flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5 border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        highlight={Boolean(selectedServices === service.id)}
                        onClick={(data: any) => handleSelectService(data)}
                      />
                    ))}
                  </div>
                )} */}

                {currentStep === 3 && (
                  <section>
                    <Typography variant="h2" size="small" className="mb-3 uppercase text-secondary/70">
                      Choose Astrologer
                    </Typography>
                    <div className="mb-3 border-2 rounded-lg border-secondary/20 px-3 lg:px-4 2xl:px-5 py-9 md:py-5 lg:py-6 xl:py-7 2xl:py-8 4xl:py-9">
                      <Typography variant="h4" size="base" className="text-small lg:text-base text-start ">
                        Choose AI Astrologer
                      </Typography>
                    </div>
                    <div className="mb-6 md:mb-8 xl:mb-10 2xl:mb-12 4xl:mb-14 flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5 border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
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
                    <div className="border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot.id}
                            className={cn(
                              "flex flex-col gap-1.5 rounded-lg border-2 p-4 text-left transition-all hover:border-red-300",
                              selectedAreas.includes(slot.id) ? "border-primary bg-primary/10" : "border-secondary/30"
                            )}
                            onClick={() => handleSelectArea(slot.id)}
                          >
                            <span className="flex h-8 w-8 items-center justify-center">{slot.icon}</span>
                            <span>{`${slot.time} ${slot.title}`}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {currentStep === 4 && (
                  <div className="w-full flex flex-col justify-center">
                    <div className="mb-4 lg:mb-5 xl:mb-6">
                      <Typography
                        variant="label"
                        size="base"
                        className="block font-medium text-secondary/70 mb-2 xl:mb-3 uppercase"
                      >
                        Select Date
                      </Typography>
                      <CustomDatePicker selectedDate={selectedDate} change={setSelectedDate} isFullWidth />
                    </div>
                    <>
                      <Typography
                        variant="label"
                        size="base"
                        className="block font-medium text-secondary/70 mb-2 xl:mb-3 uppercase"
                      >
                        Select Preferred time slot
                      </Typography>
                      <div className="border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-6 3xl:gap-8 text-small 2xl:text-base font-medium">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`border-2 px-1 3xl:px-3 py-2 h-10 md:h-11 lg:h-12 2xl:h-14 3xl:h-15 rounded-lg ${
                                selectedTime === slot ? "border-primary bg-primary/10" : "border-secondary/30"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  </div>
                )}

                {currentStep === 5 && <Step6 />}
                {currentStep === 6 && <BillingDetailsForm />}
              </Grid.Col>
            </Grid>
            <div className="mt-4 lg:mt-6 2xl:mt-8 flex justify-between">
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
                variant="highlight"
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
