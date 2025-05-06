"use client";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components/ui/custom-input";
import { DatePickerField } from "@/components/ui/custom-datepicker";
import { Button } from "@/components/ui/button";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.date().nullable().typeError("Date of Birth is required").required("Date of Birth is required"),
  tob: yup.date().nullable().typeError("Time of Birth is required").required("Time of Birth is required"),
  placeOfBirth: yup.string().required("Place of birth is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subscribe: yup.boolean().default(false),
  question: yup.string().default("")
});

type FormValues = yup.InferType<typeof schema>;

export default function UserDetailsForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange"
    // defaultValues: {
    //   dob: new Date(),
    //   tob: new Date()
    // }
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        </div>
        <div>
          <InputField label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="dob"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePickerField
              label="Date of Birth"
              placeholder="dd/mm/yyyy"
              selected={field.value}
              onChange={field.onChange}
              dateFormat="dd/MM/yyyy"
              error={errors.dob?.message} // 👈 pass error here
            />
          )}
        />
        <Controller
          control={control}
          name="tob"
          rules={{ required: true }}
          render={({ field }) => (
            <DatePickerField
              label="Time of Birth"
              placeholder="HH:mm:ss"
              selected={field.value}
              // onChange={field.onChange}
              onChange={(date) => {
                field.onChange(date); // triggers validation
              }}
              showTimeOnly
              dateFormat="HH:mm:ss"
              error={errors.tob?.message} // 👈 pass error here
            />
          )}
        />
      </div>

      <InputField label="Place of Birth" {...register("placeOfBirth")} error={errors.placeOfBirth?.message} />
      <InputField label="Email Address" type="email" {...register("email")} error={errors.email?.message} />

      {/* Subscribe checkbox */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="subscribe" {...register("subscribe")} />
        <label htmlFor="subscribe" className="text-sm text-gray-700">
          Email me with news and offers
        </label>
      </div>
      <InputField label="Questions you want to ask" {...register("question")} error={errors.question?.message} />

      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
