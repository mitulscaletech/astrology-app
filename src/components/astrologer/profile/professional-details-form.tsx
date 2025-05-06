"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { IOption, ISpecialization } from "next-auth";

import * as yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldError, useForm } from "react-hook-form";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/ui/file-upload";
import IconButton from "@/components/common/icon-button";
import CustomSelect from "@/components/ui/custom-select";
import { InputField } from "@/components/ui/custom-input";
import InputButton from "@/components/common/input-button";

import { getMediaFile } from "@/lib/utils";
import { API_CONFIG } from "@/shared/constants/api";
import { VedicIcon } from "@/shared/icons/intake-form";
import HttpService from "@/shared/services/http.service";
import { HIGHTEST_QUALIFICATION } from "@/shared/constants";
import Typography from "@/components/ui/typography";

const schema = yup.object().shape({
  years_of_experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(1, "Must be at least 1 year")
    .max(50, "Must be less than 50 years"),
  specialization: yup.array().min(1, "Specialization is required").required("Specialization is required"),
  certification: yup.mixed().notRequired(),
  institute_university_name: yup.string().notRequired(),
  resume: yup.mixed().notRequired(),
  highest_qualification: yup
    .object({
      value: yup.string().required("Qualification is required"),
      label: yup.string()
    })
    .required("Qualification is required")
});

interface ProfessionalDetailsFormProps {
  onComplete: () => void;
}

export function ProfessionalDetailsForm({ onComplete }: ProfessionalDetailsFormProps) {
  const { update, data: session } = useSession();
  const [specializationList, setSpecializationList] = useState<ISpecialization[]>([]);
  const {
    control,
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
  const formValue = getValues();

  const onSubmit = async (data: any) => {
    try {
      const tempData = {
        years_of_experience: data.years_of_experience,
        specialization: data.specialization,
        highest_qualification: data.highest_qualification.value,
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
  const getSpecializationList = () => {
    HttpService.get(API_CONFIG.specialization).then((response) => {
      if (!response.is_error) {
        setSpecializationList(response.data);
      } else {
        setSpecializationList([]);
      }
    });
  };
  const manageSpecialization = (specialization: ISpecialization) => {
    const { specialization_id } = specialization;
    const currentSpecializations = formValue.specialization;

    const isExist = currentSpecializations.includes(specialization_id);
    const updatedSpecializations = isExist
      ? currentSpecializations.filter((id) => id !== specialization_id)
      : [...currentSpecializations, specialization_id];

    setValue("specialization", updatedSpecializations);
  };

  useEffect(() => {
    getSpecializationList();
    if (session?.user) {
      const {
        years_of_experience = 0,
        highest_qualification,
        institute_university_name,
        specialization
      } = session?.user?.intake_form || {};

      reset({
        years_of_experience: years_of_experience,
        highest_qualification: HIGHTEST_QUALIFICATION.find((que) => que.value === highest_qualification),
        institute_university_name: institute_university_name,
        specialization: specialization || [],
        resume: getMediaFile(session.user.media_files, "resume"),
        certification: getMediaFile(session.user.media_files, "certification")
      });
    }
  }, [session, reset]);

  return (
    <div className="container mb-15">
      <Grid className="justify-center">
        <Grid.Col className="md:w-10/12 lg:w-8/12 2xl:w-7/12">
          <Typography variant="h3" size="base" className="text-lg font-normal text-secondary uppercase mb-3">
            Professional Details
          </Typography>
          <Typography variant="h2" size="h3" className="text-7xl font-semibold text-secondary mb-8">
            Share Your Expertise
          </Typography>
          <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary/70 mb-8">
            Help seekers know what makes you special. This section is about your experience, specialization, and
            qualifications in astrology and related fields.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
              <Grid.Col>
                <InputField
                  label="Years of Experience *"
                  {...register("years_of_experience")}
                  error={errors.years_of_experience?.message}
                />
              </Grid.Col>
              <Grid.Col>
                <div className="border-2 rounded-lg border-secondary/20 p-4 md:p-6 lg:p-8 3xl:p-10">
                  <span className="mb-3">
                    Specialization Areas / <i> Select all areas you specialize in (add your own too). Areas</i>
                  </span>
                  <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
                    {specializationList.map((spec) => (
                      <Grid.Col className="md:w-6/12" key={spec.specialization_id}>
                        <IconButton
                          label={spec.specialization_name}
                          icon={<VedicIcon />}
                          isSelected={Boolean(getValues("specialization").length > 0)}
                          onClick={() => manageSpecialization(spec)}
                        />
                      </Grid.Col>
                    ))}
                    <Grid.Col>
                      <InputButton
                        //value={otherValue}
                        //onChange={(e) => setOtherValue(e.target.value)}
                        label="Other:"
                        placeholder="Future, Fortune..."
                      />
                    </Grid.Col>
                  </Grid>
                </div>
                {errors.specialization && (
                  <p className="mt-0.5 ml-1 text-sm text-primary">{errors.specialization?.message}</p>
                )}
              </Grid.Col>
              <Grid.Col>
                <Controller
                  control={control}
                  name="highest_qualification"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CustomSelect
                      label="Highest Qualification *"
                      options={HIGHTEST_QUALIFICATION}
                      isMulti={false}
                      value={field.value ? { ...field.value, label: field.value.label || "" } : null}
                      placeholder="Select your highest qualification"
                      onChange={(language) => {
                        field.onChange(language);
                      }}
                      error={errors.highest_qualification?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col>
                <FileUpload
                  name="certificate"
                  label="Relevant Astrology Certification"
                  title="Upload official certificates."
                  register={register("certification", { required: "Certificate is required" })}
                  error={errors.certification as FieldError | undefined}
                  accept=".pdf,.png,.jpg"
                />
              </Grid.Col>
              <Grid.Col>
                <InputField
                  label="Institute/University Name"
                  {...register("institute_university_name")}
                  error={errors.institute_university_name?.message}
                />
              </Grid.Col>

              {/* <div>
              <label className="block text-sm font-medium mb-2">Astrology Certification</label>
              {currentValues.certification && typeof currentValues.certification === "string" ? (
                <div className="w-48 relative">
                  <Image
                    src={currentValues.certification}
                    alt="Certification"
                    width={100}
                    height={100}
                    className="w-full rounded-md mb-2"
                  />
                  <div className="bg-secondary cursor-pointer z-2 text-accent-white p-1.5 size-8 absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 rounded-full">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      {...register("certification")}
                      className="size-full absolute opacity-0"
                    />
                    <IconEdit />
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    {...register("certification")}
                    className="mt-1 block w-full"
                  />
                </>
              )}
            </div> */}
              {/*
            <div>
              <label className="block text-sm font-medium mb-2">Resume (Optional)</label>
              {currentValues.resume && typeof currentValues.resume === "string" ? (
                <div className="flex p-3 justify-center gap-2 border border-secondary-200 rounded-md shadow-sm relative">
                  <span className="w-6">
                    <IconFile />
                  </span>
                  <p>{currentValues.resume.split("/").pop()}</p>
                  <div className="bg-secondary z-2 text-accent-white p-1.5 size-8 absolute top-0 end-0 translate-x-1/2 -translate-y-1/2 rounded-full">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      {...register("resume")}
                      className="mt-1 block w-full absolute size-full opacity-0"
                    />
                    <IconEdit />
                  </div>
                </div>
              ) : (
                <>
                  <input type="file" accept=".pdf,.doc,.docx" {...register("resume")} className="mt-1 block w-full" />
                </>
              )}
            </div> */}
              <Grid.Col>
                <FileUpload
                  name="resume"
                  label="Optional"
                  title="Resume"
                  register={register("resume")}
                  error={errors.resume as FieldError | undefined}
                  accept=".pdf,.doc,.docx"
                />
              </Grid.Col>
            </Grid>
            <div className="flex justify-end">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Grid.Col>
      </Grid>
    </div>
  );
}
