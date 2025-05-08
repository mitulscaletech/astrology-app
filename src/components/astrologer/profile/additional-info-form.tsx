"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { InputField } from "@/components/ui/custom-input";

import { getCurrentStep, getMediaFile } from "@/lib/utils";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { UploadIcon, UserThumbnail } from "@/shared/icons/intake-form";

interface IAdditionalInfoProps {
  onComplete: () => void;
}

const validationSchema = yup.object().shape({
  video: yup.mixed().required("Introduction video is required"),
  short_bio: yup.string().required("Short bio is required").max(500, "Bio must be 500 characters or less")
});

export function AdditionalInfoForm({ onComplete }: IAdditionalInfoProps) {
  const { update, data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
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
              formData.append("media_file", additionalData.video[0]);
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
    <div className="container mb-15">
      <Grid className="justify-center">
        <Grid.Col className="md:w-10/12 lg:w-8/12 2xl:w-7/12">
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
                        {/* <Button>
                          <UploadIcon />
                          Upload Video File
                        </Button> */}
                        <label className="w-full bg-primary hover:bg-primary/80 py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer">
                          <UploadIcon />
                          <span className="text-accent-white text-lg font-semibold">Upload Video File</span>
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                console.log("Selected file:", file);
                                // Handle the file upload logic here
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid.Col>

              <Grid.Col>
                <InputField
                  label="Short Bio (500 characters)"
                  {...register("short_bio")}
                  error={errors.short_bio?.message}
                  multiple={true}
                />
              </Grid.Col>
            </Grid>

            {/* <div>
        <div className="flex items-center gap-2">
          <Label htmlFor="video">Introduction Video *</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="h-4 w-4 text-gray-500">
                  <IconInfo />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Record a short video introducing yourself and your expertise</p>
                <ul className="list-disc ml-4 mt-2">
                  <li>Keep it under 2 minutes</li>
                  <li>Ensure good lighting and clear audio</li>
                  <li>Mention your specializations</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input id="video" type="file" accept="video/*" {...register("video")} />
        {errors.video && <p className="text-danger text-sm mt-1">{errors.video.message}</p>}
      </div>

      <div>
        <Label htmlFor="short_bio">Short Bio *</Label>
        <Textarea
          id="short_bio"
          {...register("short_bio")}
          placeholder="Tell us about yourself and your expertise (max 500 characters)"
          maxLength={500}
        />
        {errors.short_bio && <p className="text-danger text-sm mt-1">{errors.short_bio.message}</p>}
      </div>*/}
            <div className="flex justify-end">
              <Button type="submit">Submit Profile for Review</Button>
            </div>
          </form>
        </Grid.Col>
      </Grid>
    </div>
  );
}
