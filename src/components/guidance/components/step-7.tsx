"use client";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { InputField } from "@/components/ui/custom-input";
import { DatePickerField } from "@/components/ui/custom-datepicker";
import { Button } from "@/components/ui/button";
import { FormTitle } from "@/components/ui/form-title";
import Grid from "@/components/ui/grid";
import CustomSelect from "@/components/ui/custom-select";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pinCode: yup.string().required("PIN Code is required"),
  phone: yup.string().required("Phone Number is required"),
  address: yup.string().required("Address is required"),
  country: yup.array().required("Language spoken is required"),
  name: yup.string().required("Name is required"),
  cardNumber: yup.string().required("Card Number is required"),
  expiredDate: yup.string().required("Expired Date is required"),
  cvv: yup.string().required("CVV is required")
});

type FormValues = yup.InferType<typeof schema>;

const countryOptions: any[] = [
  { value: "india", label: "India" },
  { value: "US", label: "US" },
  { value: "UK", label: "UK" }
];

export default function BillingDetailsForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name fields */}
      <FormTitle title="Billing address" className="2xl:mb-4 4xl:mb-5" />
      <Grid size="md" className="gap-y-5">
        <Grid.Col className="md:w-6/12">
          <InputField label="First Name" {...register("firstName")} error={errors.firstName?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <InputField label="Last Name" {...register("lastName")} error={errors.lastName?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <Controller
            control={control}
            name="country"
            rules={{ required: true }}
            render={({ field }) => (
              <CustomSelect
                label="Country/Region"
                options={countryOptions}
                placeholder=""
                isMulti={false}
                value={field.value}
                onChange={(gender: any) => {
                  field.onChange(gender); // triggers validation
                }}
                error={errors.country?.message}
              />
            )}
          />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <InputField label="Address" {...register("address")} error={errors.address?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-4/12">
          <InputField label="City" type="text" {...register("city")} error={errors.city?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-4/12">
          <InputField label="State" type="text" {...register("state")} error={errors.state?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-4/12">
          <InputField label="PIN Code" type="text" {...register("pinCode")} error={errors.pinCode?.message} />
        </Grid.Col>
        <Grid.Col className="">
          <InputField label="Phone" type="tel" {...register("phone")} error={errors.phone?.message} />
        </Grid.Col>
      </Grid>
      <FormTitle title="Add a new card" className="2xl:mb-4 4xl:mb-5 mt-5 md:mt-6 lg:mt-8 2xl:mt-12" />
      <Grid size="md" className="gap-y-5">
        <Grid.Col className="md:w-6/12">
          <InputField label="Name" {...register("name")} error={errors.name?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <InputField label="Card Number" {...register("cardNumber")} error={errors.cardNumber?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <InputField label="Expired Date" {...register("expiredDate")} error={errors.expiredDate?.message} />
        </Grid.Col>
        <Grid.Col className="md:w-6/12">
          <InputField label="CVV" {...register("cvv")} error={errors.cvv?.message} />
        </Grid.Col>
      </Grid>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
