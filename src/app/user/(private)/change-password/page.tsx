"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/forminput";
import IconEyeOff from "@/shared/icons/eyeOff";
import IconEye from "@/shared/icons/eye";
import Grid from "@/components/ui/grid";

// Mock current password for validation (in real app, validate via API)
const CURRENT_PASSWORD = "Test@123";

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must include a special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm your new password")
});

type FormValues = yup.InferType<typeof schema>;

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const toggleVisibility = (key: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onSubmit = (data: FormValues) => {
    if (data.currentPassword !== CURRENT_PASSWORD) {
      setError("currentPassword", {
        type: "manual",
        message: "Current password is incorrect"
      });
      return;
    }

    // Simulate success
    toast.success("Password changed successfully!");
    reset();
  };

  return (
    <Grid>
      <Grid.Col className="md:w-6/12">
        <h1 className="text-2xl font-semibold mb-6">Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="relative">
            <FormInput
              id="currentPassword"
              label="Current Password"
              type={showPassword.current ? "text" : "password"}
              register={register}
              error={errors.currentPassword?.message}
            />
            <button
              type="button"
              className="absolute right-3 bottom-2 size-6 text-secondary"
              onClick={() => toggleVisibility("current")}
            >
              {showPassword.current ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>

          <div className="relative">
            <FormInput
              id="newPassword"
              label="New Password"
              type={showPassword.new ? "text" : "password"}
              register={register}
              error={errors.newPassword?.message}
            />
            <button
              type="button"
              className="absolute right-3 bottom-2 size-6 text-secondary"
              onClick={() => toggleVisibility("new")}
            >
              {showPassword.new ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>

          <div className="relative">
            <FormInput
              id="confirmPassword"
              label="Confirm New Password"
              type={showPassword.confirm ? "text" : "password"}
              register={register}
              error={errors.confirmPassword?.message}
            />
            <button
              type="button"
              className="absolute right-3 bottom-2 size-6 text-secondary"
              onClick={() => toggleVisibility("confirm")}
            >
              {showPassword.confirm ? <IconEyeOff /> : <IconEye />}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Grid.Col>
    </Grid>
  );
}
