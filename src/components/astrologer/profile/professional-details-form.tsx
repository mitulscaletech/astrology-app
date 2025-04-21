"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { getMediaFile } from "@/lib/utils";
import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";

const schema = yup.object().shape({
  years_of_experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(1, "Must be at least 1 year")
    .max(50, "Must be less than 50 years"),
  specialization: yup.string().required("Specialization is required"),
  highest_qualification: yup.string().required("Qualification is required"),
  certification: yup.mixed().notRequired(),
  institute_university_name: yup.string().notRequired(),
  resume: yup.mixed().notRequired()
});

interface ProfessionalDetailsFormProps {
  onComplete: () => void;
}

export function ProfessionalDetailsForm({ onComplete }: ProfessionalDetailsFormProps) {
  const { update, data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  });
  const currentValues = getValues();

  const onSubmit = async (data: any) => {
    try {
      const tempData = {
        years_of_experience: data.years_of_experience,
        specialization: data.specialization,
        highest_qualification: data.highest_qualification,
        institute_university_name: data.institute_university_name,
        completed_steps: 2
      };
      const response = await HttpService.post(`${API_CONFIG.intakeForm}/professional`, tempData);
      if (response.is_error) {
        toast.error(response.message);
        return;
      }
      // Helper to upload media
      const uploadMedia = async (file: File, type: string) => {
        const formData = new FormData();
        formData.append("media_file", file);
        formData.append("media_type", type);
        return await HttpService.post(API_CONFIG.uploadMedia, formData, {
          contentType: "multipart/form-data"
        });
      };
      const [certificateRes, resumeRes] = await Promise.all([
        typeof data.certification !== "string" && data.certification?.[0]
          ? uploadMedia(data.certification[0], "certification")
          : Promise.resolve(null),

        typeof data.resume !== "string" && data.resume?.[0]
          ? uploadMedia(data.resume[0], "resume")
          : Promise.resolve(null)
      ]);

      update({
        ...session?.user,
        intake_form: {
          ...tempData,
          certification: certificateRes?.data ?? data.certification,
          resume: resumeRes?.data ?? data.resume
        }
      });
      toast.success(response.message);
      onComplete();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      const { years_of_experience, highest_qualification, institute_university_name, specialization, completed_steps } =
        session.user.intake_form;

      reset({
        years_of_experience: years_of_experience,
        highest_qualification: highest_qualification || "",
        institute_university_name: institute_university_name || "",
        specialization: specialization || "",
        resume: getMediaFile(session.user.media_files, "resume"),
        certification: getMediaFile(session.user.media_files, "certification")
      });
    }
  }, [session, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Years of Experience *"
        id="years_of_experience"
        type="number"
        register={register}
        error={errors.years_of_experience?.message}
      />

      <div>
        <label className="block text-sm font-medium">Specialization Areas *</label>
        <Select onValueChange={(value: string) => setValue("specialization", value)} name="specialization">
          <SelectTrigger>
            <SelectValue placeholder="Select specialization" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vedic">Vedic Astrology</SelectItem>
            <SelectItem value="tarot">Tarot Reading</SelectItem>
            <SelectItem value="numerology">Numerology</SelectItem>
            <SelectItem value="palmistry">Palmistry</SelectItem>
            <SelectItem value="kundali">Kundali Matching</SelectItem>
          </SelectContent>
        </Select>
        {errors.specialization && <p className="text-danger text-sm mt-1">{errors.specialization.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Highest Qualification *</label>
        <Select onValueChange={(value: string) => setValue("highest_qualification", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="graduate">Graduate</SelectItem>
            <SelectItem value="post-graduate">Post Graduate</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
          </SelectContent>
        </Select>
        {errors.highest_qualification && (
          <p className="text-danger text-sm mt-1">{errors.highest_qualification.message}</p>
        )}
      </div>

      <FormInput
        label="Institute/University Name"
        id="institute_university_name"
        register={register}
        error={errors.institute_university_name?.message}
      />

      <div>
        {typeof currentValues.certification === "string" ? (
          <Image
            src={currentValues.certification}
            alt="Certification"
            width={100}
            height={100}
            className="rounded-md mb-2"
          />
        ) : (
          <>
            <label className="block text-sm font-medium">Astrology Certification</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              {...register("certification")}
              className="mt-1 block w-full"
            />
          </>
        )}
      </div>

      <div>
        {typeof currentValues.resume === "string" ? (
          <Image src={currentValues.resume} alt="Resume" width={100} height={100} className="rounded-md mb-2" />
        ) : (
          <>
            <label className="block text-sm font-medium">Resume (Optional)</label>
            <input type="file" accept=".pdf,.doc,.docx" {...register("resume")} className="mt-1 block w-full" />
          </>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save & Continue</Button>
      </div>
    </form>
  );
}
