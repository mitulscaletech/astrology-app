"use client";

import { useState } from "react";
import { format, addMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

type TimeSlot = {
  start_time: string;
  end_time: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  selectedAstro: string;
  selectedDuration: string;
};

const TIME_SLOTS: TimeSlot[] = [
  { start_time: "09:00", end_time: "10:00" },
  { start_time: "14:00", end_time: "15:00" }
];

export default function ScheduleTimeModal({ open, onClose, selectedAstro, selectedDuration }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const router = useRouter();

  const durationInMin = parseInt(selectedDuration);

  const generateTimeSlots = (): string[] => {
    const slots: string[] = [];

    TIME_SLOTS.forEach(({ start_time, end_time }) => {
      let current = new Date();
      const [startH, startM] = start_time.split(":").map(Number);
      const [endH, endM] = end_time.split(":").map(Number);

      current.setHours(startH, startM, 0, 0);
      const end = new Date();
      end.setHours(endH, endM, 0, 0);

      while (current < end) {
        slots.push(format(current, "HH:mm"));
        current = addMinutes(current, durationInMin);
      }
    });

    return slots;
  };

  const handleTimeToggle = (time: string) => {
    setSelectedTime((prev) => (prev === time ? null : time));
  };

  const handleCheckout = () => {
    if (!selectedDate || !selectedTime) return;

    // const dateStr = format(selectedDate, "yyyy-MM-dd");
    // const query = new URLSearchParams({
    //   astro: selectedAstro,
    //   duration: selectedDuration,
    //   date: dateStr,
    //   time: selectedTime
    // }).toString();

    // router.push(`/checkout?${query}`);
    toast.success("Booking completed with astrologer");
    router.push("/user/service-list");
  };

  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent>
        <ModalTitle>Schedule Your Time</ModalTitle>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary">{selectedAstro}</h3>
          <h3 className="text-base text-muted-foreground">{selectedDuration}</h3>
        </div>

        <Grid>
          {/* Calendar */}
          <Grid.Col className="md:w-7/12">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
            />
          </Grid.Col>

          {/* Time Slot Selection */}
          <Grid.Col className="md:w-5/12">
            {selectedDate && (
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium text-muted-foreground">Select Time Slot:</p>
                <div className="flex flex-col gap-2">
                  {generateTimeSlots().map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeToggle(time)}
                      className={`px-3 py-1 rounded-full border border-primary-200 text-sm transition ${
                        selectedTime === time
                          ? "bg-primary text-accent-white border-primary"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Grid.Col>
        </Grid>

        {/* Summary Section */}
        {selectedDate && selectedTime && (
          <div className="mt-3 border-t border-secondary-200 pt-3">
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>
                <strong>Astrologer:</strong> {selectedAstro}
              </li>
              <li>
                <strong>Duration:</strong> {selectedDuration}
              </li>
              <li>
                <strong>Date:</strong> {format(selectedDate, "yyyy-MM-dd")}
              </li>
              <li>
                <strong>Time:</strong> {selectedTime}
              </li>
            </ul>

            <Button className="mt-4" onClick={handleCheckout}>
              Book Now
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
