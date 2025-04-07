"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "@/components/ui/forminput";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  instagram: yup.string().url("Enter a valid Instagram URL").notRequired(),
  facebook: yup.string().url("Enter a valid Facebook URL").notRequired(),
  linkedin: yup.string().url("Enter a valid LinkedIn URL").notRequired(),
  twitter: yup.string().url("Enter a valid Twitter URL").notRequired(),
  tiktok: yup.string().url("Enter a valid TikTok URL").notRequired(),
  youtube: yup.string().url("Enter a valid YouTube URL").notRequired(),
  website: yup.string().url("Enter a valid website URL").notRequired(),
  otherCompanies: yup.string().notRequired()
});

interface SocialProfilesFormProps {
  onComplete: () => void;
}

export function SocialProfilesForm({ onComplete }: SocialProfilesFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Social profiles data:", data);
      toast.success("Social profiles saved!");
      onComplete();
    } catch (error) {
      toast.error("Failed to save social profiles");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <FormInput label='Instagram Profile' id='instagram' register={register} error={errors.instagram?.message} />
      <FormInput label='Facebook Profile' id='facebook' register={register} error={errors.facebook?.message} />
      <FormInput label='LinkedIn Profile' id='linkedin' register={register} error={errors.linkedin?.message} />
      <FormInput label='Twitter Profile' id='twitter' register={register} error={errors.twitter?.message} />
      <FormInput label='TikTok Profile' id='tiktok' register={register} error={errors.tiktok?.message} />
      <FormInput label='YouTube Channel' id='youtube' register={register} error={errors.youtube?.message} />
      <FormInput label='Personal Website' id='website' type='url' register={register} error={errors.website?.message} />

      <div>
        <label className='block text-sm font-medium'>Other Astrology Companies Associated With</label>
        <Select onValueChange={(value: yup.Maybe<string | undefined>) => setValue("otherCompanies", value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select number of companies' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='1'>1 Company</SelectItem>
            <SelectItem value='2'>2 Companies</SelectItem>
            <SelectItem value='3'>3 Companies</SelectItem>
            <SelectItem value='4'>4 or more Companies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='flex justify-end'>
        <Button type='submit'>Save & Continue</Button>
      </div>
    </form>
  );
}
