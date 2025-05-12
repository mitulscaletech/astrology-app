"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import Grid from "./grid";

interface Step {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface StepperProps {
  currentStep: string;
  steps: Step[];
  onStepChange?: (step: string) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepChange, steps }) => {
  return (
    <Tabs.Root value={currentStep} onValueChange={onStepChange}>
      <Tabs.List className="flex items-center justify-center overflow-x-auto bg-white px-4 py-3 space-x-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.value;
          const isCompleted = Number(step.value) < Number(currentStep);
          return (
            <div key={step.value} className="flex items-center gap-1">
              <Tabs.Trigger
                value={step.value}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap transition-colors",
                  isActive ? "text-black font-semibold" : "text-muted-foreground"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center text-accent-white justify-center transition-all duration-300 text-1.5xl font-semibold",
                    isActive ? "bg-primary" : isCompleted ? "bg-primary" : "bg-accent-white text-secondary/70"
                  )}
                >
                  {step.value}
                </div>
                <span className="text-base font-medium  text-secondary pr-6">{step.label}</span>
              </Tabs.Trigger>

              {index < steps.length - 1 && <span className="mx-2 text-secondary-300 text-lg pr-6">›</span>}
            </div>
          );
        })}
      </Tabs.List>
      <div className="mt-6 md:mt-24">
        <div className="container mb-15">
          <Grid className="justify-center">
            <Grid.Col className="md:w-10/12 lg:w-9/12 2xl:w-8/12">
              {steps.map((step) => (
                <Tabs.Content key={step.value} value={step.value}>
                  {step.content}
                </Tabs.Content>
              ))}
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </Tabs.Root>
  );
};
