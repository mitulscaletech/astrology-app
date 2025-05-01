"use client";

import { useSession } from "next-auth/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { useEffect } from "react";

const schema = yup.object().shape({
  instagram: yup.string().url("Enter a valid Instagram URL").notRequired(),
  facebook: yup.string().url("Enter a valid Facebook URL").notRequired(),
  linkedin: yup.string().url("Enter a valid LinkedIn URL").notRequired(),
  twitter: yup.string().url("Enter a valid Twitter URL").notRequired(),
  tiktok: yup.string().url("Enter a valid TikTok URL").notRequired(),
  youtube: yup.string().url("Enter a valid YouTube URL").notRequired(),
  personal_website: yup.string().url("Enter a valid website URL").notRequired(),
  associated_companies: yup.string().notRequired()
});

interface SocialProfilesFormProps {
  onComplete: () => void;
}

export function SocialProfilesForm({ onComplete }: SocialProfilesFormProps) {
  const { update, data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      HttpService.post(`${API_CONFIG.intakeForm}/social`, { ...data, completed_steps: 3 })
        .then((response) => {
          if (!response.is_error) {
            toast.success(response.message);
            update({ ...session?.user, intake_form: { ...session?.user.intake_form, ...data, completed_steps: 3 } });
            onComplete();
          } else {
            toast.error(response.message);
          }
        })
        .catch((error) => {
          console.error("Error saving social profiles:", error);
        });
    } catch (error) {
      toast.error("Failed to save social profiles");
    }
  };

  useEffect(() => {
    if (session?.user && session?.user?.intake_form) {
      const {
        instagram = "",
        facebook = "",
        twitter = "",
        tiktok = "",
        youtube = "",
        personal_website = "",
        linkedin = "",
        associated_companies = ""
      } = session.user.intake_form;
      reset({
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        tiktok: tiktok,
        youtube: youtube,
        personal_website: personal_website,
        linkedin: linkedin,
        associated_companies: associated_companies
      });
    }
  }, [session, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput label="Instagram Profile" id="instagram" register={register} error={errors.instagram?.message} />
      <FormInput label="Facebook Profile" id="facebook" register={register} error={errors.facebook?.message} />
      <FormInput label="LinkedIn Profile" id="linkedin" register={register} error={errors.linkedin?.message} />
      <FormInput label="Twitter Profile" id="twitter" register={register} error={errors.twitter?.message} />
      <FormInput label="TikTok Profile" id="tiktok" register={register} error={errors.tiktok?.message} />
      <FormInput label="YouTube Channel" id="youtube" register={register} error={errors.youtube?.message} />
      <FormInput
        label="Personal Website"
        id="personal_website"
        type="url"
        register={register}
        error={errors.personal_website?.message}
      />

      <div>
        <label className="block text-sm font-medium">Other Astrology Companies Associated With</label>
        <Select onValueChange={(value: yup.Maybe<string | undefined>) => setValue("associated_companies", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select number of companies" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Company</SelectItem>
            <SelectItem value="2">2 Companies</SelectItem>
            <SelectItem value="3">3 Companies</SelectItem>
            <SelectItem value="4">4 or more Companies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
