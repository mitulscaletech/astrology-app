"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { InputField } from "@/components/ui/custom-input";

import { getCurrentStep } from "@/lib/utils";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";

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
    reset,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: any) => {
    try {
      const params = {
        ...data,
        completed_steps: getCurrentStep(
          session?.user?.status as string,
          session?.user.intake_form?.completed_steps as number,
          3
        )
      };
      HttpService.post(`${API_CONFIG.intakeForm}/social`, params)
        .then((response) => {
          if (!response.is_error) {
            toast.success(response.message);
            update({
              ...session?.user,
              intake_form: {
                ...session?.user.intake_form,
                ...params
              }
            });
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
    <div className="container mb-15">
      <Grid className="justify-center">
        <Grid.Col className="md:w-10/12 lg:w-8/12 2xl:w-7/12">
          <Typography variant="h3" size="base" className="text-lg font-normal text-secondary uppercase mb-3">
            Social Profiles
          </Typography>
          <Typography variant="h2" size="h3" className="text-7xl font-semibold text-secondary mb-8">
            Expand Your Reach
          </Typography>
          <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary/70 mb-8">
            Link your social and professional presence. This helps seekers explore your credibility and connect with you
            across platforms.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
              <Grid.Col>
                <InputField label="Instagram (Optional)" {...register("instagram")} error={errors.instagram?.message} />
              </Grid.Col>
              <Grid.Col>
                <InputField label="Linkedin (Optional)" {...register("linkedin")} error={errors.linkedin?.message} />
              </Grid.Col>
              <Grid.Col>
                <InputField label="Twitter (Optional)" {...register("twitter")} error={errors.twitter?.message} />
              </Grid.Col>
              <Grid.Col>
                <InputField label="Tiktok (Optional)" {...register("tiktok")} error={errors.tiktok?.message} />
              </Grid.Col>
              <Grid.Col>
                <InputField label="Youtube (Optional)" {...register("youtube")} error={errors.youtube?.message} />
              </Grid.Col>
              <Grid.Col>
                <InputField
                  label="Personal Website (Optional)"
                  {...register("personal_website")}
                  error={errors.personal_website?.message}
                />
              </Grid.Col>
              <Grid.Col>
                <InputField
                  label="Associated Companies (Optional)"
                  {...register("associated_companies")}
                  error={errors.associated_companies?.message}
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
