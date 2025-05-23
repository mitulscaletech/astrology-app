"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/ui/custom-datepicker";
import { FormCustomRadioGroup } from "@/components/ui/custom-radio";
import CustomSelect from "@/components/ui/custom-select";
import FileUpload from "@/components/ui/file-upload";
import Grid from "@/components/ui/grid";
import { IconButton } from "@/components/ui/icon-button";
import { Modal, ModalContent, ModalDescription, ModalTitle } from "@/components/ui/modal";
import Typography from "@/components/ui/typography";
import IconCalender from "@/shared/icons/calender";
import IconCopy from "@/shared/icons/copy";
import IconEditCalendar from "@/shared/icons/edit-calendar";
import IconMapPin from "@/shared/icons/mapPin";
import Link from "next/link";
import { Controller, FieldError, useForm } from "react-hook-form";

export const NotificationOption = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" }
];

export const TimeOption = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hours", label: "Hours" }
];

interface RescheduleAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
}

const reasonOptions = [
  { value: "reason1", label: "Personal emergency" },
  { value: "reason2", label: "Health-related issue" },
  { value: "reason3", label: "Scheduling conflict" },
  { value: "reason4", label: "Technical difficulties" },
  { value: "reason5", label: "Client unresponsive" },
  { value: "reason6", label: "Energy or spiritual alignment not ideal for session" }
];

const RescheduleAppointment = ({ isOpen, onClose }: RescheduleAppointmentProps) => {
  const {
    control,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      startTime: null,
      endTime: null,
      report: "any",
      reasonType: "any"
    }
  });
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="xl">
        <ModalTitle>Reschedule Appointment</ModalTitle>
        <ModalDescription>
          <>
            <div className="flex mb-3 md:mb-4 xl:mb-5 2xl:mb-6 gap-2 md:gap-4 xl:gap-6 2xl:gap-8 3xl:gap-10">
              <div className="flex items-start gap-2 xl:gap-2.5">
                <span className="size-3 bg-primary rounded-full mt-1 shrink-0"></span>
                <div className="shrink-0">
                  <p className="text-sm lg:text-base">Muhurta</p>
                  <Typography variant="h3" size="h6" className="font-bold">
                    Time for Success
                  </Typography>
                </div>
              </div>
              <span className="w-px bg-secondary/10"></span>
              <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 3xl:gap-5">
                <Avatar
                  size="md"
                  src="/placeholder.svg"
                  alt="DL"
                  fallback="DL"
                  className="border-2 border-primary/10"
                />
                <div className="">
                  <p className="text-sm lg:text-base text-secondary/70 font-medium">To</p>
                  <Typography variant="h6" size="h6" className="font-semibold">
                    Derek Larson
                  </Typography>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:gap-5 3xl:gap-6 pb-4 lg:pb-5 3xl:pb-6 mb-4 lg:mb-5 3xl:mb-6 border-b border-secondary/10">
              <div className="flex gap-3 md:gap-4 xl:gap-5 3xl:gap-6 items-center">
                <span className="size-5 lg:size-6">
                  <IconCalender />
                </span>
                <div className="flex items-center gap-4 xl:gap-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-36">
                      <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                          <DatePickerField
                            placeholder="From Date"
                            selected={field.value}
                            onChange={field.onChange}
                            error={errors.startDate?.message}
                            isFloatingLabel={false}
                            variant="secondary-10"
                            inputSize="sm"
                            className="text-center"
                          />
                        )}
                      />
                    </div>
                    <div className="w-32">
                      <Controller
                        control={control}
                        name="startTime"
                        render={({ field }) => (
                          <DatePickerField
                            placeholder="From Time"
                            selected={field.value}
                            onChange={field.onChange}
                            error={errors.startDate?.message}
                            showTimeOnly
                            dateFormat="h:mm aa"
                            isFloatingLabel={false}
                            variant="secondary-10"
                            inputSize="sm"
                            className="text-center"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <p className="font-medium">To</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-36">
                      <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                          <DatePickerField
                            placeholder="To Date"
                            selected={field.value}
                            onChange={field.onChange}
                            error={errors.endDate?.message}
                            isFloatingLabel={false}
                            variant="secondary-10"
                            inputSize="sm"
                            className="text-center"
                          />
                        )}
                      />
                    </div>
                    <div className="w-32">
                      <Controller
                        control={control}
                        name="endTime"
                        render={({ field }) => (
                          <DatePickerField
                            placeholder="To Time"
                            selected={field.value}
                            onChange={field.onChange}
                            error={errors.endDate?.message}
                            showTimeOnly
                            dateFormat="h:mm aa"
                            isFloatingLabel={false}
                            variant="secondary-10"
                            inputSize="sm"
                            className="text-center"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Typography variant="h3" size="h6" className="font-bold mb-2">
                You&apos;re Requesting to Cancel or Reschedule a Session
              </Typography>
              <p className="mb-1">
                We’ll notify the customer of your request, they’ll be able to select a new time based on your{" "}
                <Link href="/astrologer/dashboard" className="font-bold underline">
                  calendar availability.
                </Link>
              </p>
              <p className="mb-1">
                Please share the reason for this request—your input will help our team review and approve the change
                accordingly.
              </p>
              <FormCustomRadioGroup
                control={control}
                name="reasonType"
                options={reasonOptions}
                className="grid-cols-2 mt-4 lg:mt-5 3xl:mt-6"
              />
              <div className="text-end mt-4 lg:mt-5 3xl:mt-6">
                <Button variant="highlight">Submit Request</Button>
              </div>
            </div>
          </>
        </ModalDescription>
      </ModalContent>
    </Modal>
  );
};

export default RescheduleAppointment;
