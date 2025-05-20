"use client";

import * as yup from "yup";
import moment from "moment";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import { InputField } from "@/components/ui/custom-input";
import { FormCustomRadioGroup } from "@/components/ui/custom-radio";

import "@/assets/scss/phone-input.scss";

export default function PayoutDetails() {
  const paymentOptions = [
    { value: "bank_account", label: "Bank Account" },
    { value: "card", label: "Card" }
  ];

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    // resolver: yupResolver({}),
    mode: "onBlur",
    reValidateMode: "onChange"
  });

  return (
    <div className="p-8">
      <div className="flex flex-col gap-1.5  mb-8">
        <Typography size="h5" className="text-3.5xl text-secondary font-bold">
          Payout Details
        </Typography>
        <Typography size="p" className="text-lg text-secondary font-normal">
          Keep your payout information up to date to ensure smooth and timely payments. Review or edit your billing
          address and preferred payment method below.
        </Typography>
      </div>
      <Typography className="uppercase mb-5">Billing Address</Typography>
      <div>
        <form>
          <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
            <Grid.Col className="md:w-6/12">
              <InputField
                label="First Name"
                id="first_name"
                // {...register("first_name")}
                // error={errors.first_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-6/12">
              <InputField
                label="Last Name"
                id="last_name"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-6/12">
              <InputField
                label="Country/Region"
                id="last_name"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-6/12">
              <InputField
                label="Address"
                id="last_name"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-4/12">
              <InputField
                label="City"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-4/12">
              <InputField
                label="State"
                id="state"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-4/12">
              <InputField
                label="PIN Code"
                id="pin_code"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col>
              <PhoneInput
                country="in"
                //value={`${countryCode}${mobileNumber}`}
                onlyCountries={["us", "in", "gb"]}
                //onChange={(value, country: any) => handleChangeMobile(value, country)}
                inputProps={{ name: "phone-input" }}
                inputStyle={{ width: "100%", height: "40px" }}
                inputClass="mb-8"
              />
            </Grid.Col>
          </Grid>
          <Typography className="uppercase mb-5 mt-15">Payout Details</Typography>
          <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5 mb-15">
            <Grid.Col className="md:w-6/12">
              <FormCustomRadioGroup
                control={control}
                name="paymentMethod"
                options={paymentOptions}
                className="grid-cols-2 md:grid-cols-2"
              />
            </Grid.Col>
          </Grid>
          <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
            <Grid.Col className="md:w-6/12">
              <InputField
                label="Account holder Name"
                id="last_name"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col className="md:w-4/12">
              <InputField
                label="Bank Name"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col>
              <InputField
                label="Account Number/IBAN"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col>
              <InputField
                label="IFSC / SWIFT / Routing Number"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col>
              <InputField
                label="Payment Method"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
            <Grid.Col>
              <InputField
                label="Currency"
                id="city"
                // {...register("last_name")}
                // error={errors.last_name?.message}
              />
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </div>
  );
}
