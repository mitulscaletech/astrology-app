"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import IconInfo from "@/shared/icons/info";

const validationSchema = yup.object().shape({
  video: yup.mixed().required("Introduction video is required"),
  short_bio: yup.string().required("Short bio is required").max(500, "Bio must be 500 characters or less")
});

interface FormData {
  video: FileList;
  short_bio: string;
}

export function AdditionalInfoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      console.log("Additional info data:", data);
      toast.success("Profile submitted for review!. Please wait for approval");
      // toast.info("Your profile is under review. Please wait for approval.", {
      //   duration: 5000,
      // });
    } catch (error) {
      toast.error("Failed to submit profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <div className='flex items-center gap-2'>
          <Label htmlFor='video'>Introduction Video *</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className='h-4 w-4 text-gray-500'>
                  <IconInfo />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Record a short video introducing yourself and your expertise</p>
                <ul className='list-disc ml-4 mt-2'>
                  <li>Keep it under 2 minutes</li>
                  <li>Ensure good lighting and clear audio</li>
                  <li>Mention your specializations</li>
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input id='video' type='file' accept='video/*' {...register("video")} />
        {errors.video && <p className='text-red-500 text-sm mt-1'>{errors.video.message}</p>}
      </div>

      <div>
        <Label htmlFor='short_bio'>Short Bio *</Label>
        <Textarea
          id='short_bio'
          {...register("short_bio")}
          placeholder='Tell us about yourself and your expertise (max 500 characters)'
          maxLength={500}
        />
        {errors.short_bio && <p className='text-red-500 text-sm mt-1'>{errors.short_bio.message}</p>}
      </div>

      <div className='flex justify-end'>
        <Button type='submit'>Submit Profile for Review</Button>
      </div>
    </form>
  );
}
