"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { TextareaField } from "@/components/ui/custom-textarea";

import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { getCurrentStep, getMediaFile } from "@/lib/utils";
import { UploadIcon, UserThumbnail } from "@/shared/icons/intake-form";

interface IAdditionalInfoProps {
  onComplete: () => void;
  page: string;
}

const validationSchema = yup.object().shape({
  video: yup.mixed().required("Introduction video is required"),
  short_bio: yup.string().required("Short bio is required").max(500, "Bio must be 500 characters or less")
});

export function AdditionalInfoForm({ onComplete, page }: IAdditionalInfoProps) {
  const { update, data: session } = useSession();
  const router = useRouter();
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (additionalData: any) => {
    try {
      const currentStep = getCurrentStep(
        session?.user?.status as string,
        session?.user.intake_form?.completed_steps as number,
        4
      );
      HttpService.post(`${API_CONFIG.intakeForm}/final`, {
        short_bio: additionalData.short_bio,
        completed_steps: currentStep
      })
        .then(async (response) => {
          if (!response.is_error) {
            if (typeof additionalData.video !== "string") {
              const formData = new FormData();
              formData.append("media_file", additionalData.video);
              formData.append("media_type", "video");
              const data = await HttpService.post(API_CONFIG.uploadMedia, formData, {
                contentType: "multipart/form-data"
              });
              update({
                ...session?.user,
                intake_form: {
                  ...session?.user?.intake_form,
                  ...additionalData,
                  video: data.data,
                  completed_steps: currentStep
                }
              });
            } else {
              update({
                ...session?.user,
                status: response.data.user?.status,
                intake_form: {
                  ...session?.user?.intake_form,
                  ...additionalData,
                  completed_steps: currentStep
                }
              });
            }
            onComplete();
            toast.success(response.message);
            router.push("/astrologer/awaiting-review");
          }
        })
        .catch((error) => {
          console.error("Error submitting additional info:", error);
        });
    } catch (error) {
      toast.error("Failed to submit profile");
    }
  };

  useEffect(() => {
    if (session?.user) {
      const { short_bio } = session.user.intake_form;

      reset({
        short_bio: short_bio,
        video: getMediaFile(session.user.media_files, "video")
      });
    }
  }, [session, reset]);

  return (
    <>
      {page === "my-profile" ? (
        <>
          <h2 className="text-3.5xl font-bold mb-2">Presentation Style</h2>
          <Typography size="p" className="text-secondary/70 text-lg mb-8">
            This section helps us understand your personality and presentation style. A short video and bio go a long
            way in helping seekers connect with you.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" size="base" className="text-lg font-normal text-secondary uppercase mb-3">
            Additional Info & Terms
          </Typography>
          <Typography variant="h2" size="h3" className="text-7xl font-semibold text-secondary mb-8">
            Final Touches
          </Typography>
          <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary/70 mb-8">
            This section helps us understand your personality and presentation style. A short video and bio go a long
            way in helping seekers connect with you.
          </Typography>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
          <Grid.Col>
            <div className="border border-dashed border-secondary/30 rounded-md p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3">
                  {/* <div className="bg-gray-200 rounded-md aspect-square max-w-[200px] mx-auto flex items-center justify-center"> */}
                  <div className="min-[200px] h-28  rounded-full flex items-center justify-center">
                    <UserThumbnail />
                  </div>
                  {/* </div> */}
                </div>

                <div className="w-full md:w-2/3">
                  <Typography variant="h4" size="h4-head" className="text-3.5xl font-bold mb-3">
                    Video Record
                  </Typography>
                  <Typography variant="h2" size="p" className="text-base text-secondary/70 mb-4">
                    Help seekers connect with you through a short, personal video.
                  </Typography>

                  <div className="space-y-3">
                    <div className="flex">
                      <Typography size="p" className="font-bold">
                        How to record?&nbsp;
                      </Typography>
                      <Typography size="p" className="text-sm text-secondary/70">
                        Record in a quiet, well-lit space.
                      </Typography>
                    </div>

                    <div className="flex">
                      <Typography size="p" className="font-bold">
                        What to record?&nbsp;
                      </Typography>
                      <Typography size="p" className="text-secondary/70 text-sm">
                        Brief intro, your expertise, and how you guide people.
                      </Typography>
                    </div>
                    <label className="w-full bg-primary hover:bg-primary/80 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer">
                      <UploadIcon />
                      <span className="text-accent-white text-lg font-semibold">Upload Video File</span>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setValue("video", file ? file : "");
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Grid.Col>

          <Grid.Col>
            <TextareaField
              id="short_bio"
              label="Short Bio (500 characters)"
              {...register("short_bio")}
              error={errors.short_bio?.message}
              rows={5}
            />
          </Grid.Col>
          {page === "signup" && (
            <>
              <Grid.Col>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={(event) => setIsTermsChecked(event.target.checked)}
                    checked={isTermsChecked}
                  />
                  <span className="text-base">
                    I agree to the{" "}
                    <Link href="#" className="text-primary font-bold underline">
                      Terms & Conditions
                    </Link>
                  </span>
                </label>
              </Grid.Col>
              <Grid.Col>
                <label className="flex gap-2">
                  <input
                    type="checkbox"
                    onChange={(event) => setIsAgreementChecked(event.target.checked)}
                    checked={isAgreementChecked}
                  />
                  <span className="text-base">
                    I have read and agree to the{" "}
                    <Link href="#" className="text-primary font-bold underline">
                      Astrologer Working Agreement
                    </Link>
                  </span>
                </label>
              </Grid.Col>
            </>
          )}
        </Grid>
        <div className="flex justify-end mt-4 lg:mt-5 xl:mt-6 3xl:mt-8">
          <Button type="submit" disabled={page === "signup" ? !isAgreementChecked || !isTermsChecked : false}>
            {page === "signup" ? "Submit Profile for Review" : "Save"}
          </Button>
        </div>
      </form>
    </>
  );
}
