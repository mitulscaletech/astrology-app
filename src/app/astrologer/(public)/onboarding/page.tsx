"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

// Define TypeScript Type for the form data
type OnboardingFormData = {
  fullName: string;
  mobile: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  profilePhoto?: FileList | null | undefined;
};
const schema: yup.ObjectSchema<OnboardingFormData> = yup.object({
  fullName: yup.string().required("Full name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number (10 digits required)")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: yup.date().typeError("Date of birth is required").required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  profilePhoto: yup
    .mixed<FileList>()
    .nullable()
    .default(undefined),
});

export default function AstrologerOnboarding() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: session?.user?.email || "",
    },
  });

  const dateOfBirth = watch("dateOfBirth");

  // Submit handler
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form Data:", data);
      toast.success("Profile created successfully!");
      router.push("/astrologer/profile");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
            <p className="text-gray-600">Let&apos;s get to know you better</p>
          </div>

          <Button
            onClick={() => signOut({ redirect: true, callbackUrl: "/astrologer/signup" })}
          >
            Sign out
          </Button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" {...register("fullName")} placeholder="Enter your full name" />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input id="mobile" type="tel" {...register("mobile")} placeholder="+91 XXXXXXXXXX" />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="your@email.com" />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-secondary-300"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={(date) => setValue("dateOfBirth", date as Date)}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender *</Label>
              <Select onValueChange={(value) => setValue("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input id="profilePhoto" type="file" accept="image/*" {...register("profilePhoto")} />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
