"use client";

import { useEffect } from "react";

import { useSession } from "next-auth/react";

import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { getMediaFile } from "@/lib/utils";
import IconInfo from "@/shared/icons/info";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { useRouter } from "next/navigation";

const validationSchema = yup.object().shape({
  video: yup.mixed().required("Introduction video is required"),
  short_bio: yup.string().required("Short bio is required").max(500, "Bio must be 500 characters or less")
});

export function AdditionalInfoForm() {
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
      HttpService.post(`${API_CONFIG.intakeForm}/final`, { short_bio: additionalData.short_bio, completed_steps: 4 })
        .then(async (response) => {
          if (!response.is_error) {
            if (typeof additionalData.video !== "string") {
              const formData = new FormData();
              formData.append("media_file", additionalData.video[0]);
              formData.append("media_type", "video");
              const data = await HttpService.post(API_CONFIG.uploadMedia, formData, {
                contentType: "multipart/form-data"
              });
              update({ ...session?.user, intake_form: { ...additionalData, video: data.data, completed_steps: 4 } });
            } else {
              update({
                ...session?.user,
                status: response.data.user?.status,
                intake_form: { ...additionalData, completed_steps: 4 }
              });
            }
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
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
      </div>

      <div className="flex justify-end">
        <Button type="submit">Submit Profile for Review</Button>
      </div>
    </form>
  );
}
