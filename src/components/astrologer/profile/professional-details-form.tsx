"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { ISpecialization } from "next-auth";

import * as yup from "yup";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldError, useForm } from "react-hook-form";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import FileUpload from "@/components/ui/file-upload";
import FileCard from "@/components/common/file-card";
import IconButton from "@/components/common/icon-button";
import CustomSelect from "@/components/ui/custom-select";
import { InputField } from "@/components/ui/custom-input";
import InputButton from "@/components/common/input-button";

import { API_CONFIG } from "@/shared/constants/api";
import { VedicIcon } from "@/shared/icons/intake-form";
import HttpService from "@/shared/services/http.service";
import { HIGHTEST_QUALIFICATION } from "@/shared/constants";
import { getCurrentStep, getFileName, getMediaFile } from "@/lib/utils";

interface ProfessionalDetailsFormProps {
  onComplete: () => void;
  page: string;
}

interface FormValues {
  years_of_experience: number;
  specializations: ISpecialization[];
  certification?: any;
  resume?: any;
  institute_university_name: string;
  highest_qualification: {
    value: string;
    label: string;
  };
  custom_specialization: {
    specialization_name: string;
    specialization_desc: string;
  };
}

const schema = yup.object().shape({
  years_of_experience: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience is required")
    .min(1, "Must be at least 1 year")
    .max(50, "Must be less than 50 years"),
  specializations: yup
    .array()
    .of(
      yup.object().shape({
        specialization_id: yup.string().required()
      })
    )
    .min(1, "Specialization is required")
    .required("Specialization is required"),
  certification: yup.mixed().test("is-file-or-string", "Certificate is required", function (value) {
    return value !== null && value !== undefined;
  }),
  resume: yup.mixed().nullable(),
  institute_university_name: yup.string().required("Institute/University name is required"),
  highest_qualification: yup
    .object()
    .shape({
      value: yup.string().required("Qualification is required"),
      label: yup.string().required()
    })
    .required("Qualification is required"),
  custom_specialization: yup.object().shape({
    specialization_name: yup.string(),
    specialization_desc: yup.string()
  })
}) as yup.ObjectSchema<FormValues>;

export function ProfessionalDetailsForm({ onComplete, page }: ProfessionalDetailsFormProps) {
  const { update, data: session } = useSession();
  const [specializationList, setSpecializationList] = useState<ISpecialization[]>([]);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  });
  const currentCertificate = watch("certification");
  const currentResume = watch("resume");

  const onSubmit = async (data: FormValues) => {
    try {
      const params = {
        years_of_experience: data.years_of_experience,
        specializations: data.specializations,
        highest_qualification: data.highest_qualification.value,
        institute_university_name: data.institute_university_name,
        completed_steps: getCurrentStep(
          session?.user?.status as string,
          session?.user.intake_form?.completed_steps as number,
          2
        )
      };
      const response = await HttpService.post(`${API_CONFIG.intakeForm}/professional`, params);
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
        specializations: params.specializations,
        intake_form: {
          ...session?.user?.intake_form,
          years_of_experience: data.years_of_experience,
          completed_steps: params.completed_steps,
          highest_qualification: data.highest_qualification.value,
          institute_university_name: data.institute_university_name,
          certification: certificateRes?.data ?? data.certification,
          resume: resumeRes?.data ?? data.resume
        }
      });
      toast.success(response.message);
      onComplete();
    } catch (error) {
      console.error("Submission error:", error);
    }
    data;
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
    const currentSpecializations = getValues("specializations") as ISpecialization[];
    const isExist = currentSpecializations.some((spec) => spec.specialization_id === specialization_id);
    const updatedSpecializations = isExist
      ? currentSpecializations.filter((spec) => spec.specialization_id !== specialization_id)
      : [...currentSpecializations, specialization];

    setValue("specializations", updatedSpecializations, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });
    setValue("custom_specialization", {
      specialization_name: "",
      specialization_desc: ""
    });
  };

  const handleCustomSpecialization = (value: string) => {
    setValue("specializations", [], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });

    setValue(
      "custom_specialization",
      {
        specialization_name: "Other",
        specialization_desc: value
      },
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    );
  };

  useEffect(() => {
    getSpecializationList();
    if (session?.user) {
      const {
        years_of_experience = 0,
        highest_qualification,
        institute_university_name
      } = session?.user?.intake_form || {};

      reset({
        years_of_experience: years_of_experience,
        highest_qualification: HIGHTEST_QUALIFICATION.find((que) => que.value === highest_qualification),
        institute_university_name: institute_university_name,
        specializations: session?.user?.specializations,
        resume: getMediaFile(session.user.media_files, "resume"),
        certification: getMediaFile(session.user.media_files, "certification")
      });
    }
  }, [session, reset]);

  return (
    <>
      {page === "my-profile" ? (
        <>
          <h2 className="text-3.5xl font-bold mb-2">Your Expertise</h2>
          <Typography size="p" className="text-secondary/70 text-lg mb-8">
            This section is about your experience, specialization, and qualifications in astrology and related fields.
          </Typography>
        </>
      ) : (
        <>
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
        </>
      )}
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
                      isSelected={(getValues("specializations") as Array<{ specialization_id: string }>)?.some(
                        (s) => s.specialization_id === spec.specialization_id
                      )}
                      onClick={() => manageSpecialization(spec)}
                    />
                  </Grid.Col>
                ))}
                <Grid.Col>
                  <InputButton
                    label="Other:"
                    placeholder="Future, Fortune..."
                    value={getValues("custom_specialization")?.specialization_desc || ""}
                    onChange={(e) => handleCustomSpecialization(e.target.value)}
                  />
                </Grid.Col>
              </Grid>
            </div>
            {errors.specializations && (
              <p className="mt-0.5 ml-1 text-sm text-primary">{errors.specializations?.message}</p>
            )}
            {errors.custom_specialization && (
              <p className="mt-0.5 ml-1 text-sm text-primary">{errors.custom_specialization?.message}</p>
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
          {getValues("certification") && (
            <Grid.Col>
              <FileCard name={getFileName(currentCertificate)} />
            </Grid.Col>
          )}
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
          {getValues("resume") && (
            <Grid.Col>
              <FileCard name={getFileName(currentResume)} />
            </Grid.Col>
          )}
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
        <div className="flex justify-end mt-4 lg:mt-5 xl:mt-6 3xl:mt-8">
          <Button type="submit">{page === "signup" ? "Continue" : "Save"}</Button>
        </div>
      </form>
    </>
  );
}
