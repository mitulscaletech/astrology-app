"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import { DatePicker } from "@/components/ui/datepicker";

import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

// Validation Schema using Yup
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  mobile_number: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfBirth: yup.date().required("Date of birth is required"),
  placeOfBirth: yup.string(),
  timeOfBirth: yup.string(),
  languages: yup.string(),
  currentAddress: yup.string().required("Current address is required"),
  sameAsCurrentAddress: yup.boolean(),
  permanentAddress: yup.string().when("sameAsCurrentAddress", {
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
    watch,
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
      first_name: "",
      last_name: "",
      dateOfBirth: undefined,
      placeOfBirth: "",
      timeOfBirth: "",
      languages: "",
      currentAddress: "",
      permanentAddress: "",
      country_code: "+91",
      sameAsCurrentAddress: false
    }
  });

  const sameAsCurrentAddress = watch("sameAsCurrentAddress");

  const onSubmit = async (data: any) => {
    try {
      console.log("Basic info data:", data);
      // HttpService.post(API_CONFIG.basicForm, { ...data, completed_steps: 1 }).then((response) => {
      //   if (response.status === 200) {
      //     toast.success("Basic information saved!");
      //     onComplete();
      //   }else{
      //     toast.error("Failed to save basic information");
      //   }
      // });
      toast.success("Basic information saved!");
      update(data);
      onComplete();
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
        first_name: session.user.name || "",
        last_name: session.user.name || "",
        dateOfBirth: session.user.dateOfBirth || undefined,
        placeOfBirth: session.user.placeOfBirth || "",
        timeOfBirth: session.user.timeOfBirth || "",
        languages: session.user.languages || "",
        currentAddress: session.user.currentAddress || "",
        permanentAddress: session.user.permanentAddress || "",
        sameAsCurrentAddress: session.user.sameAsCurrentAddress || false,
        country_code: session.user.country_code || "+91"
      });
    }
  }, [session, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-2 gap-4'>
        <FormInput
          label='First Name *'
          id='first_name'
          name='first_name'
          register={register}
          error={errors.first_name?.message}
        />
        <FormInput
          label='Last Name *'
          id='last_name'
          name='last_name'
          register={register}
          error={errors.last_name?.message}
        />
        <PhoneInput
          country='in'
          value={`${getValues("country_code")}${getValues("mobile_number")}`}
          onlyCountries={["us", "in", "gb"]}
          onChange={(value, country: any) => handleChangeMobile(value, country)}
          inputProps={{ name: "phone-input" }}
        />
        <input type='hidden' {...register("mobile_number", { required: "Phone is required" })} />
        {errors.mobile_number && <p style={{ color: "red" }}>{errors.mobile_number.message}</p>}

        <FormInput
          label='Email Address *'
          id='email'
          type='email'
          name='email'
          register={register}
          error={errors.email?.message}
        />
        <DatePicker
          label='Date of Birth *'
          value={getValues("dateOfBirth")}
          onChange={(date) => {
            setValue("dateOfBirth", date as Date);
          }}
        />

        <FormInput label='Place of Birth' id='placeOfBirth' register={register} />
        <FormInput label='Time of Birth' id='timeOfBirth' type='time' register={register} />
        <FormInput label='Languages Spoken' id='languages' register={register} />
      </div>

      <FormInput
        label='Current Address *'
        id='currentAddress'
        register={register}
        error={errors.currentAddress?.message}
      />

      <div className='flex items-center space-x-2'>
        <input type='checkbox' id='sameAsCurrentAddress' {...register("sameAsCurrentAddress")} className='w-4 h-4' />
        <label htmlFor='sameAsCurrentAddress' className='text-sm'>
          Same as current address
        </label>
      </div>

      {!sameAsCurrentAddress && (
        <FormInput
          label='Permanent Address *'
          id='permanentAddress'
          register={register}
          error={errors.permanentAddress?.message}
        />
      )}

      <div className='flex justify-end'>
        <Button type='submit'>Save & Continue</Button>
      </div>
    </form>
  );
}
