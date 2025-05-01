"use client";

import { useEffect, useState } from "react";
import { format, addMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Modal, ModalContent, ModalTitle } from "@/components/ui/modal";
import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";
import { DateTime } from "luxon";
import moment from "moment";

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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const TIME_SLOTS: TimeSlot[] = [
  { start_time: "09:00", end_time: "10:00" },
  { start_time: "14:00", end_time: "15:00" }
];

export default function ScheduleTimeModal({ open, onClose, selectedAstro, selectedDuration }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [astroTimeSlots, setAstroTimeSlots] = useState([]);
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

  const handleCheckout = async () => {
    if (!selectedDate || !selectedTime || !durationInMin) return;
    try {
      setLoading(true);
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 100 }) // Corrected: Pass object, not raw number
      });

      if (!response.ok) throw new Error("Failed to create order");

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "WeWake",
        description: "Payment for your order",
        order_id: data.orderId,
        handler: function (response: any) {
          setLoading(false);
          const [hour, minute] = selectedTime.split(":").map(Number);
          const durationInMinutes = parseInt(selectedDuration); // e.g. "30", "60"
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g., Asia/Calcutta
          // Combine date and time in user's local timezone
          const startDateTime = DateTime.fromJSDate(selectedDate, { zone: timeZone }).set({
            hour,
            minute,
            second: 0,
            millisecond: 0
          });

          const endDateTime = startDateTime.plus({ minutes: durationInMinutes });
          const payload = {
            booking_date: startDateTime.toUTC().toISO(), // Or startDateTime.toISO() if your backend handles timezone
            startAt: startDateTime.toUTC().toISO(),
            endAt: endDateTime.toUTC().toISO(),
            start_time: startDateTime.toFormat("HH:mm"), // 24-hr format
            end_time: endDateTime.toFormat("HH:mm"),
            timeZone,
            payment_id: response.razorpay_payment_id
          };
          toast.success(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          HttpService.post(API_CONFIG.booking, payload)
            .then((res) => {
              if (res.is_error) {
                toast.error("Booking failed");
              } else {
                toast.success("Booking successful");
                router.push("/user/service-list");
              }
            })
            .catch((err) => {
              toast.error("Booking failed");
              console.error("Booking Error", err);
            });
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            toast.error(" Payment cancelled by user.");
          }
        },
        theme: {
          color: "#B1142D"
        }
      };

      const paymentObject = new window.Razorpay(options);

      // 🔥 Listen to payment failure
      paymentObject.on("payment.failed", function (response: any) {
        setLoading(false);
        toast.error(`Payment Failed! Reason: ${response.error.description || "Unknown error"}`);
      });

      paymentObject.open();
    } catch (error) {
      setLoading(false);
      const message = error instanceof Error ? error.message : "Payment failed";
      toast.error(message);
      console.error("Razorpay Init Error", error);
    }
  };
  const getTimeSlots = async () => {
    const res = await HttpService.get(
      `${API_CONFIG.setAvailability}/${selectedAstro}?schedule_type=custom_date&schedule_date=${moment(selectedDate).format("YYYY-MM-DD")}`
    );
    setAstroTimeSlots(res.data[0].time_slots);
  };

  useEffect(() => {
    getTimeSlots();
  }, []);

  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent size="md" showClose={false}>
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
                  {astroTimeSlots?.map((time: any) => (
                    <button
                      key={time}
                      onClick={() => handleTimeToggle(time?.start_time)}
                      className={`px-3 py-1 rounded-full border border-primary-200 text-sm transition ${
                        selectedTime === time
                          ? "bg-primary text-accent-white border-primary"
                          : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {time.start_time}
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
              {loading && (
                <span className="mr-2 h-4 w-4 animate-spin border-2 border-t-transparent border-accent-white rounded-full" />
              )}
              Book Now
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
