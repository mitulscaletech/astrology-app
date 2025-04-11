"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";

import { Label } from "@radix-ui/react-label";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import { DatePicker } from "@/components/ui/datepicker";

import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

// Validation Schema using Yup
const schema = yup.object().shape({
  // first_name: yup.string().required("First name is required"),
  // last_name: yup.string().required("Last name is required"),
  full_name: yup.string().required("Full name is required"),
  mobile_number: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date_of_birth: yup.date().required("Date of birth is required"),
  place_of_birth: yup.string(),
  time_of_birth: yup.string(),
  languages_spoken: yup.string(),
  current_address: yup.string().required("Current address is required"),
  sameAsCurrentAddress: yup.boolean(),
  permanent_address: yup.string().when("sameAsCurrentAddress", {
    is: false,
    then: (schema) => schema.required("Permanent address is required")
  }),
  country_code: yup.string().required("Country code is required")
});

interface BasicInfoFormProps {
  onComplete: () => void;
}

export function BasicInfoForm({ onComplete }: BasicInfoFormProps) {
  const { update, data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      mobile_number: "",
      // first_name: "",
      // last_name: "",
      full_name: "",
      date_of_birth: undefined,
      place_of_birth: "",
      time_of_birth: "",
      languages_spoken: "",
      current_address: "",
      permanent_address: "",
      country_code: "+91"
    }
  });

  const onSubmit = async (data: any) => {
    try {
      HttpService.post(`${API_CONFIG.intakeForm}/basic`, {
        ...data,
        languages_spoken: [data.languages_spoken],
        completed_steps: 1
      }).then((response) => {
        if (!response.is_error) {
          toast.success(response.message);
          onComplete();
          update({ ...session?.user, ...data });
        } else {
          toast.error(response.message);
        }
      });
    } catch (error) {
      toast.error("Failed to save basic information");
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
        // first_name: session.user.name || "",
        // last_name: session.user.name || "",
        full_name: session.user.full_name || "",
        date_of_birth: session.user.date_of_birth || undefined,
        place_of_birth: session.user.place_of_birth || "",
        time_of_birth: session.user.time_of_birth || "",
        languages_spoken: session.user.languages_spoken || "",
        current_address: session.user.current_address || "",
        permanent_address: session.user.permanent_address || "",
        country_code: session.user.country_code
      });
    }
  }, [session, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Full Name *"
          id="full_name"
          name="full_name"
          register={register}
          error={errors.full_name?.message}
        />
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
          {errors.mobile_number && <p className="text-red-500 text-sm mt-1">{errors.mobile_number.message}</p>}
        </div>

        <FormInput
          label="Email Address *"
          id="email"
          type="email"
          name="email"
          register={register}
          error={errors.email?.message}
        />
        <DatePicker
          label="Date of Birth *"
          value={getValues("date_of_birth")}
          onChange={(date) => {
            setValue("date_of_birth", date as Date);
          }}
        />

        <FormInput label="Place of Birth" id="place_of_birth" register={register} />
        <FormInput label="Time of Birth" id="time_of_birth" type="time" register={register} />
        <FormInput label="Languages Spoken" id="languages_spoken" register={register} />
      </div>

      <FormInput
        label="Current Address *"
        id="current_address"
        register={register}
        error={errors.current_address?.message}
      />
      <FormInput
        label="Permanent Address *"
        id="permanent_address"
        register={register}
        error={errors.permanent_address?.message}
      />
      <div className="flex justify-end">
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
