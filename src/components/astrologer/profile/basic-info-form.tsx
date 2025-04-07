"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import { DatePicker } from "@/components/ui/datepicker";
import toast from "react-hot-toast";

// Validation Schema using Yup
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  mobile: yup.string().required("Mobile number is required"),
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
  })
});

interface BasicInfoFormProps {
  onComplete: () => void;
}

export function BasicInfoForm({ onComplete }: BasicInfoFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      sameAsCurrentAddress: false
    }
  });

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const sameAsCurrentAddress = watch("sameAsCurrentAddress");

  const onSubmit = async (data: any) => {
    try {
      console.log("Basic info data:", data);
      toast.success("Basic information saved!");
      onComplete();
    } catch (error) {
      toast.error("Failed to save basic information");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-2 gap-4'>
        <FormInput label='Full Name *' id='fullName' register={register} error={errors.fullName?.message} />
        <FormInput label='Mobile Number *' id='mobile' type='tel' register={register} error={errors.mobile?.message} />
        <FormInput label='Email Address *' id='email' type='email' register={register} error={errors.email?.message} />

        <DatePicker
          label='Date of Birth *'
          value={dateOfBirth}
          onChange={(date) => {
            setDateOfBirth(date || null);
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
