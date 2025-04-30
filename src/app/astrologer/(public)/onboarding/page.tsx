"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import moment from "moment";
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

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { DEFAULT_COUNTRY_CODE } from "@/shared/constants";

// Define TypeScript Type for the form data
type OnboardingFormData = {
  full_name: string;
  mobile_number: string;
  email: string;
  date_of_birth: Date;
  gender: string;
  country_code: string;
  profilePhoto?: File | null;
};
const schema: yup.ObjectSchema<OnboardingFormData> = yup.object({
  full_name: yup.string().required("Full name is required"),
  mobile_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Invalid mobile number (10 digits required)")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date_of_birth: yup.date().typeError("Date of birth is required").required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  profilePhoto: yup.mixed<File>().nullable(),
  country_code: yup.string().required("Country code is required")
});

export default function AstrologerOnboarding() {
  const router = useRouter();
  const { update, data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm<OnboardingFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      mobile_number: "",
      gender: "Male"
    }
  });

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("full_name", data.full_name);
      formData.append("mobile_number", data.mobile_number);
      formData.append("email", data.email);
      formData.append("country_code", data.country_code);
      formData.append("date_of_birth", moment(data.date_of_birth).format("YYYY-MM-DD") || "");
      formData.append("gender", data.gender);
      if (data.profilePhoto && typeof data.profilePhoto === "object" && data.profilePhoto instanceof File) {
        formData.append("avatar", data.profilePhoto);
      }
      HttpService.put(API_CONFIG.updateProfile, formData, { contentType: "multipart/form-data" })
        .then(async (response) => {
          if (!response.is_error) {
            update({ ...data, status: response.data.status, profilePhoto: response.data.profile_image });
            toast.success(response.message);
            router.push("/astrologer/profile");
          } else {
            toast.error(response.message);
          }
          setIsSubmitting(false);
        })
        .catch(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeMobile = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";
    const number = value.replace(`${dialCode}`, "");
    setValue("country_code", `+${dialCode}`, { shouldValidate: true });
    setValue("mobile_number", number, { shouldValidate: true });
  };

  useEffect(() => {
    if (session?.user) {
      reset({
        email: session.user.email || "",
        mobile_number: session.user.mobile_number || "",
        country_code: session.user.country_code || DEFAULT_COUNTRY_CODE,
        full_name: session.user.full_name || "",
        gender: session.user.gender || "",
        profilePhoto: session.user.profilePhoto || null
      });
    }
  }, [session, reset]);

  return (
    <div className="min-h-screen bg-primary-100 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
            <p className="text-gray-600">Let&apos;s get to know you better</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input id="full_name" {...register("full_name")} placeholder="Enter your full name" />
              {errors.full_name && <p className="text-danger text-sm mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number *</Label>
              <PhoneInput
                country="in"
                value={`${getValues("country_code")}${getValues("mobile_number")}`}
                onlyCountries={["us", "in", "gb"]}
                onChange={(value, country: any) => handleChangeMobile(value, country)}
                inputProps={{ name: "phone-input" }}
                inputStyle={{ width: "100%", height: "40px" }}
              />
              {errors.mobile_number && <p className="text-danger text-sm mt-1">{errors.mobile_number.message}</p>}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="your@email.com" />
              {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <DatePicker
                label="Date of Birth *"
                value={getValues("date_of_birth")}
                onChange={(date) => {
                  setValue("date_of_birth", date as Date, { shouldValidate: true });
                }}
              />
              {errors.date_of_birth && <p className="text-danger text-sm mt-1">{errors.date_of_birth.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <Label>Gender *</Label>
              <Select onValueChange={(value: any) => setValue("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-danger text-sm mt-1">{errors.gender.message}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <Input id="profilePhoto" type="file" accept=".jpg,.jpeg,.png" {...register("profilePhoto")} />
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
