"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DatePickerField } from "@/components/ui/custom-datepicker";
import CustomSelect from "@/components/ui/custom-select";
import FileUpload from "@/components/ui/file-upload";
import Grid from "@/components/ui/grid";
import { IconButton } from "@/components/ui/icon-button";
import { Modal, ModalContent } from "@/components/ui/modal";
import Typography from "@/components/ui/typography";
import IconCalender from "@/shared/icons/calender";
import IconClose from "@/shared/icons/close";
import IconCopy from "@/shared/icons/copy";
import IconEditCalendar from "@/shared/icons/edit-calendar";
import IconMapPin from "@/shared/icons/mapPin";
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

interface ManageBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ManageBookingModal = ({ isOpen, onClose }: ManageBookingModalProps) => {
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
      report: "any"
    }
  });
  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="xl" showClose={false}>
        <div className="flex justify-between items-center border-b border-secondary/10 pb-2 md:pb-3 xl:pb-4 2xl:pb-5 mb-2 md:mb-3 xl:mb-4 2xl:mb-5">
          <Typography variant="h3" size="h5" className="font-bold">
            Manage Booking
          </Typography>
          <button
            aria-label="close"
            onClick={onClose}
            className="block size-6 lg:size-8 xl:size-10 rounded-full p-1.5 lg:p-2 xl:p-3 bg-secondary/10 text-secondary absolute top-4 end-4"
          >
            <IconClose />
          </button>
        </div>
        <div className="">
          <div className="flex items-start mb-3 md:mb-4 xl:mb-5 2xl:mb-6 gap-2 xl:gap-2.5">
            <span className="size-3 bg-primary rounded-full mt-1"></span>
            <div>
              <p>Muhurta</p>
              <Typography variant="h3" size="h5" className="font-bold">
                Time for Success
              </Typography>
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
              <Button size="sm" variant="secondary-10" rounded="full" className="ms-auto">
                <span className="size-5 lg:size-6">
                  <IconEditCalendar />
                </span>
                Reschedule
              </Button>
            </div>
            <div className="flex gap-3 md:gap-4 xl:gap-5 3xl:gap-6 items-center">
              <span className="size-5 lg:size-6">
                <IconMapPin />
              </span>
              <Button size="sm" variant="highlight">
                join with LINK
              </Button>
              <IconButton className="ms-auto">
                <IconCopy />
              </IconButton>
            </div>
            <div className="flex gap-3 md:gap-4 xl:gap-5 3xl:gap-6 items-center">
              <span className="size-5 lg:size-6">
                <IconCalender />
              </span>
              <div className="flex gap-6">
                <CustomSelect
                  options={NotificationOption}
                  isMulti={false}
                  parentClass="w-48"
                  placeholder="Notification"
                  isFloatingLabel={false}
                  size="sm"
                  variant="secondary-10"
                />
                <CustomSelect
                  options={TimeOption}
                  isMulti={false}
                  parentClass="w-48"
                  placeholder="Minutes"
                  isFloatingLabel={false}
                  size="sm"
                  variant="secondary-10"
                />
              </div>
            </div>
          </div>
          <div>
            <Typography variant="h3" size="h6" className="font-bold">
              You&apos;re Requesting to Cancel or Reschedule a Session
            </Typography>
            <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 3xl:gap-5 mt-2 lg:mt-3 w-full mb-4 lg:mb-5 3xl:mb-6">
              <Avatar src="/placeholder.svg" alt="DL" fallback="DL" size="lg" className="border-2 border-primary/10" />
              <div className="">
                <p className="text-secondary/70 text-xs font-medium">User Name</p>
                <Typography variant="h6" size="h6" className="font-semibold">
                  Derek Larson
                </Typography>
              </div>
            </div>
            <Grid className="mb-4 lg:mb-5 3xl:mb-6">
              <Grid.Col className="md:w-4/12">
                <label className="mb-1 inline-flex text-secondary/70 text-xs font-medium">Date of Birth</label>
                <p className="font-semibold">02/04/1990</p>
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                <label className="mb-1 inline-flex text-secondary/70 text-xs font-medium">Time of Birth</label>
                <p className="font-semibold">09:05:55 PM</p>
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                <label className="mb-1 inline-flex text-secondary/70 text-xs font-medium">Date of Birth</label>
                <p className="font-semibold">10 Downing Street, London, SW1A 2AA, United Kingdom</p>
              </Grid.Col>
              <Grid.Col>
                <label className="mb-1 inline-flex text-secondary/70 text-xs font-medium">Questions want to ask</label>
                <p className="p-1.5 lg:p-2 xl:p-3 3xl:p-4 font-medium border border-secondary/30 rounded-md">
                  Am I on the right track in my relationship? How can I align with my life purpose?
                </p>
              </Grid.Col>
            </Grid>
            <FileUpload
              name="certificate"
              label="Relevant Astrology report"
              title="Upload Report"
              register={register("report", { required: "Certificate is required" })}
              error={errors.report as FieldError | undefined}
              accept=".pdf,.png,.jpg"
            />
            <div className="text-end mt-4 lg:mt-5 3xl:mt-6">
              <Button variant="highlight">Save</Button>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ManageBookingModal;
