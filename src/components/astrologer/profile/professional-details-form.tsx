"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/forminput";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(1, "Must be at least 1 year")
    .max(50, "Must be less than 50 years"),
  specialization: yup.string().required("Specialization is required"),
  qualification: yup.string().required("Qualification is required"),
  certification: yup.mixed().notRequired(),
  institute: yup.string().notRequired(),
  resume: yup.mixed().notRequired()
});

interface ProfessionalDetailsFormProps {
  onComplete: () => void;
}

export function ProfessionalDetailsForm({ onComplete }: ProfessionalDetailsFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Professional details data:", data);
      toast.success("Professional details saved!");
      onComplete();
    } catch (error) {
      toast.error("Failed to save professional details");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <FormInput
        label='Years of Experience *'
        id='experience'
        type='number'
        register={register}
        error={errors.experience?.message}
      />

      <div>
        <label className='block text-sm font-medium'>Specialization Areas *</label>
        <Select onValueChange={(value: string) => setValue("specialization", value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select specialization' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='vedic'>Vedic Astrology</SelectItem>
            <SelectItem value='tarot'>Tarot Reading</SelectItem>
            <SelectItem value='numerology'>Numerology</SelectItem>
            <SelectItem value='palmistry'>Palmistry</SelectItem>
            <SelectItem value='kundali'>Kundali Matching</SelectItem>
          </SelectContent>
        </Select>
        {errors.specialization && <p className='text-red-500 text-sm mt-1'>{errors.specialization.message}</p>}
      </div>

      <div>
        <label className='block text-sm font-medium'>Highest Qualification *</label>
        <Select onValueChange={(value: string) => setValue("qualification", value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select qualification' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='graduate'>Graduate</SelectItem>
            <SelectItem value='post-graduate'>Post Graduate</SelectItem>
            <SelectItem value='diploma'>Diploma</SelectItem>
          </SelectContent>
        </Select>
        {errors.qualification && <p className='text-red-500 text-sm mt-1'>{errors.qualification.message}</p>}
      </div>

      <FormInput
        label='Institute/University Name'
        id='institute'
        register={register}
        error={errors.institute?.message}
      />

      <div>
        <label className='block text-sm font-medium'>Astrology Certification</label>
        <input type='file' accept='.pdf,.doc,.docx' {...register("certification")} className='mt-1 block w-full' />
      </div>

      <div>
        <label className='block text-sm font-medium'>Resume (Optional)</label>
        <input type='file' accept='.pdf,.doc,.docx' {...register("resume")} className='mt-1 block w-full' />
      </div>

      <div className='flex justify-end'>
        <Button type='submit'>Save & Continue</Button>
      </div>
    </form>
  );
}
