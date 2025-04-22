"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from "react-hot-toast";

type EmailEntry = {
  email: string;
  status: "pending" | "sent" | "accepted";
};

type FormValues = {
  emails: EmailEntry[];
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const FamilyInvitations = () => {
  const [inviting, setInviting] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      emails: [{ email: "", status: "pending" }]
    }
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "emails"
  });

  const onSubmit = (data: FormValues) => {
    clearErrors();

    // Check for duplicates
    const emails = data.emails.map((e) => e.email.trim().toLowerCase());
    const duplicates = emails.filter((email, i) => emails.indexOf(email) !== i);

    let hasError = false;

    emails.forEach((email, i) => {
      if (!validateEmail(email)) {
        setError(`emails.${i}.email`, {
          type: "manual",
          message: "Invalid email address"
        });
        hasError = true;
      }
    });

    if (duplicates.length > 0) {
      duplicates.forEach((dup) => {
        const index = emails.indexOf(dup);
        setError(`emails.${index}.email`, {
          type: "manual",
          message: "Duplicate email address"
        });
      });
      hasError = true;
    }

    if (hasError) return;

    // Simulate API call
    setInviting(true);
    setTimeout(() => {
      data.emails.forEach((_, index) => {
        update(index, {
          email: data.emails[index].email,
          status: "sent"
        });
      });
      setInviting(false);
      toast.success("Invite Sent!");
    }, 1000);
  };

  return (
    <div className="shadow-md rounded-lg p-6">
      <h3 className="text-2xl font-semibold mb-6">Invite Family Members</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <Controller
                name={`emails.${index}.email`}
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter email address"
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                      errors.emails?.[index]?.email ? "border-danger" : "border-gray-300"
                    }`}
                  />
                )}
              />
              <Badge
                variant={field.status === "accepted" ? "success" : field.status === "sent" ? "default" : "warning"}
              >
                {field.status}
              </Badge>
              {(fields.length > 1 || field.status !== "pending") && (
                <Button
                  type="button"
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    remove(index);
                    toast.success("Email entry removed");
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
            {errors.emails?.[index]?.email && (
              <p className="text-sm text-red-500">{errors.emails[index]?.email?.message}</p>
            )}
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button type="button" onClick={() => append({ email: "", status: "pending" })}>
            Add More
          </Button>
          <Button type="submit" disabled={inviting}>
            {inviting ? "Sending..." : "Send Invitations"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FamilyInvitations;
