"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

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
  profilePhoto: yup.mixed<FileList>().nullable().default(undefined)
});

export default function AstrologerOnboarding() {
  const { update, data: session } = useSession();

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: session?.user?.email || "",
      mobile: session?.user?.mobile_number || ""
    }
  });

  // Submit handler
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);

      // HttpService.post(API_CONFIG.register, { data })
      //   .then(async (response) => {
      //     if (response.status === 200) {
      //       toast.success("Profile created successfully!");
      //       update(data);
      //       router.push("/astrologer/profile");
      //     } else {
      //       toast.error("FInvalid OTP");
      //     }
      //   })
      //   .catch((error) => {
      //     toast.error("FInvalid OTP");
      //   });

      console.log("Form Data:", data);
      toast.success("Profile created successfully!");
      update(data);
      router.push("/astrologer/profile");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-primary-100 p-6'>
      <div className='max-w-2xl mx-auto'>
        <Card className='p-6'>
          <div className='text-center mb-6'>
            <h1 className='text-2xl font-bold text-primary'>Complete Your Profile</h1>
            <p className='text-gray-600'>Let&apos;s get to know you better</p>
          </div>

          <Button onClick={() => signOut({ redirect: true, callbackUrl: "/astrologer/signup" })}>Sign out</Button>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            {/* Full Name */}
            <div>
              <Label htmlFor='fullName'>Full Name *</Label>
              <Input id='fullName' {...register("fullName")} placeholder='Enter your full name' />
              {errors.fullName && <p className='text-red-500 text-sm mt-1'>{errors.fullName.message}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <Label htmlFor='mobile'>Mobile Number *</Label>
              <PhoneInput
                country={"us"}
                value={getValues("mobile")}
                onChange={(phone) => console.log(phone)}
                inputProps={{
                  name: "mobile",
                  required: true,
                  autoFocus: false
                }}
              />
              {errors.mobile && <p className='text-red-500 text-sm mt-1'>{errors.mobile.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor='email'>Email Address *</Label>
              <Input id='email' type='email' {...register("email")} placeholder='your@email.com' />
              {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <Label>Date of Birth *</Label>
              <DatePicker
                label='Date of Birth *'
                value={getValues("dateOfBirth")}
                onChange={(date) => {
                  setValue("dateOfBirth", date as Date);
                }}
              />
              {errors.dateOfBirth && <p className='text-red-500 text-sm mt-1'>{errors.dateOfBirth.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender *</Label>
              <Select onValueChange={(value: any) => setValue("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder='Select gender' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='male'>Male</SelectItem>
                  <SelectItem value='female'>Female</SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className='text-red-500 text-sm mt-1'>{errors.gender.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <Label htmlFor='profilePhoto'>Profile Photo</Label>
              <Input id='profilePhoto' type='file' accept='image/*' {...register("profilePhoto")} />
            </div>

            {/* Submit Button */}
            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
