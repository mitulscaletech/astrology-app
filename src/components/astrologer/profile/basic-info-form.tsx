/* eslint-disable indent */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import * as yup from "yup";
import moment from "moment";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import CustomSelect from "@/components/ui/custom-select";
import { InputField } from "@/components/ui/custom-input";
import { DatePickerField } from "@/components/ui/custom-datepicker";

import { getCurrentStep } from "@/lib/utils";
import { API_CONFIG } from "@/shared/constants/api";
import HttpService from "@/shared/services/http.service";
import { DEFAULT_ADULT_AGE, GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/shared/constants";

// Validation Schema using Yup
const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  mobile_number: yup.string().required("Mobile number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  date_of_birth: yup.date().nullable().typeError("Date of birth is required").required("Date of birth is required"),
  place_of_birth: yup.string(),
  time_of_birth: yup.date().nullable().typeError("Time of birth is required").required("Date of birth is required"),
  languages_spoken: yup.array().required("Language spoken is required"),
  current_address: yup.string().required("Current address is required"),
  sameAsCurrentAddress: yup.boolean(),
  permanent_address: yup.string().when("sameAsCurrentAddress", {
    is: false,
    then: (schema) => schema.required("Permanent address is required")
  }),
  country_code: yup.string().required("Country code is required"),
  gender: yup
    .object({
      value: yup.string().required("Gender is required"),
      label: yup.string()
    })
    .required("Gender is required")
});
interface IBasicInfoFormProps {
  onComplete: () => void;
  page?: string;
}
export function BasicInfoForm({ onComplete, page }: IBasicInfoFormProps) {
  const { update, data: session } = useSession();
  const [totalAge, setTotalAge] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      mobile_number: "",
      first_name: "",
      last_name: "",
      // date_of_birth: undefined,
      place_of_birth: "",
      // time_of_birth: "",
      languages_spoken: [],
      current_address: "",
      permanent_address: "",
      country_code: "+91"
      // gender: ""
    }
  });
  const onSubmit = (data: any) => {
    const currentStep = getCurrentStep(
      session?.user?.status as string,
      session?.user.intake_form?.completed_steps as number,
      1
    );
    const params = {
      ...data,
      languages_spoken: data.languages_spoken.map((lang: any) => lang.value),
      gender: data.gender.value,
      completed_steps: currentStep
    };
    HttpService.post(`${API_CONFIG.intakeForm}/basic`, params).then((response) => {
      if (!response.is_error) {
        toast.success(response.message);
        onComplete();
        update({
          ...session?.user,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender.value,
          date_of_birth: data.date_of_birth,
          country_code: data.country_code,
          mobile_number: data.mobile_number,
          intake_form: {
            ...session?.user?.intake_form,
            completed_steps: currentStep,
            current_address: data.current_address,
            permanent_address: data.permanent_address,
            place_of_birth: data.place_of_birth,
            time_of_birth: data.time_of_birth,
            languages_spoken: data.languages_spoken.map((lang: any) => lang.value)
          }
        });
      } else {
        toast.error(response.message);
      }
    });
  };

  const handleChangeMobile = (value: string, country: any) => {
    const dialCode = country?.dialCode || "";
    const number = value.replace(`${dialCode}`, "");
    setValue("country_code", `+${dialCode}`, { shouldValidate: true });
    setValue("mobile_number", number, { shouldValidate: true });
  };
  const handleGetLanguage = (languages: any): any[] => {
    if (!languages) return [];
    let parsedLanguages: string[] = [];
    if (typeof languages === "string") {
      parsedLanguages = languages
        .replace(/[{}"]/g, "")
        .split(",")
        .map((lang) => lang.trim().toLowerCase());
    } else if (Array.isArray(languages)) {
      parsedLanguages = languages.map((lang) => (typeof lang === "string" ? lang.trim().toLowerCase() : ""));
    } else {
      console.warn("Unexpected languages type:", typeof languages);
      return [];
    }

    return LANGUAGE_OPTIONS.filter((option) => parsedLanguages.includes(option.value.toLowerCase()));
  };
  const handleCalculateAge = (date: Date | null, field?: any) => {
    const providedDate = moment(date);
    const now = moment();
    const years = now.diff(providedDate, "years");
    setTotalAge(years);
    if (field) field.onChange(date);
  };

  useEffect(() => {
    if (session?.user) {
      reset({
        email: session.user.email || "",
        country_code: session.user.country_code,
        mobile_number: session.user.mobile_number || "",
        first_name: session.user.first_name || "",
        last_name: session.user.last_name || "",
        date_of_birth: session.user.date_of_birth || undefined,
        place_of_birth: session.user.intake_form?.place_of_birth || "",
        time_of_birth: session.user.intake_form?.time_of_birth
          ? new Date(session.user.intake_form.time_of_birth)
          : undefined,
        current_address: session.user.intake_form?.current_address || "",
        permanent_address: session.user.intake_form?.permanent_address || "",
        gender:
          typeof session.user.gender === "string"
            ? GENDER_OPTIONS.find((gen) => gen.value === session.user.gender)
            : session.user.gender,
        languages_spoken: handleGetLanguage(session.user?.intake_form?.languages_spoken) || []
      });
      handleCalculateAge(session.user.date_of_birth || null, "");
    }
  }, [session, reset]);

  function handleTimeTest(e: React.ChangeEvent<HTMLInputElement>) {
    const timeValue = e.target.value;
    if (timeValue) {
      // Create a new Date object with today's date and the selected time
      const [hours, minutes] = timeValue.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      setValue("time_of_birth", date, { shouldValidate: true });
    }
  }

  return (
    <>
      {page === "my-profile" ? (
        <>
          <h2 className="text-3.5xl font-bold mb-2">About Yourself</h2>
          <Typography size="p" className="text-secondary/70 text-lg mb-8">
            This section collects your basic details — all essential for setting up your identity on WeWake.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h3" size="base" className="text-lg font-normal text-secondary uppercase mb-3">
            Basic Information
          </Typography>
          <Typography variant="h2" size="h3" className="text-7xl font-semibold text-secondary mb-8">
            About Yourself
          </Typography>
          <Typography variant="h4" size="p" className="text-2xl font-normal text-secondary/70 mb-8">
            Start building your professional astrologer profile. This section collects your basic details — all
            essential for setting up your identity on WeWake. Your progress is saved as you go.
          </Typography>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
          <Grid.Col className="md:w-6/12">
            <InputField
              label="First Name"
              id="first_name"
              {...register("first_name")}
              error={errors.first_name?.message}
            />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <InputField label="Last Name" id="last_name" {...register("last_name")} error={errors.last_name?.message} />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <InputField
              label="Email Address *"
              id="email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <PhoneInput
              country="in"
              value={`${getValues("country_code")}${getValues("mobile_number")}`}
              onlyCountries={["us", "in", "gb"]}
              onChange={(value, country: any) => handleChangeMobile(value, country)}
              inputProps={{ name: "phone-input" }}
              inputStyle={{ width: "100%", height: "40px" }}
              disabled={Boolean(getValues("mobile_number"))}
            />
            {errors.mobile_number && <p className="text-danger text-sm mt-1">{errors.mobile_number.message}</p>}
            {!errors.mobile_number?.message && errors.country_code && (
              <p className="text-danger text-sm mt-1">{errors.country_code.message}</p>
            )}
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <Controller
              control={control}
              name="date_of_birth"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePickerField
                  label="Date of Birth"
                  placeholder="dd/mm/yyyy"
                  selected={field.value}
                  onChange={(date) => {
                    handleCalculateAge(date, field);
                  }}
                  dateFormat="dd/MM/yyyy"
                  error={errors.date_of_birth?.message}
                  id="date_of_birth"
                  maxDate={DEFAULT_ADULT_AGE}
                  openToDate={DEFAULT_ADULT_AGE}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <div className="flex gap-4">
              <div className="w-20">
                <InputField
                  label="Age"
                  id="email"
                  type="number"
                  value={totalAge}
                  disabled
                  className="disabled:bg-secondary/20 text-secondary/70"
                />
              </div>
              <div className="grow">
                <Controller
                  control={control}
                  name="time_of_birth"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      label="Time of Birth"
                      id="time_of_birth"
                      type="time"
                      value={
                        field.value
                          ? new Date(field.value).toLocaleTimeString("en-US", {
                              hour12: false,
                              hour: "2-digit",
                              minute: "2-digit"
                            })
                          : ""
                      }
                      onChange={handleTimeTest}
                      error={errors.time_of_birth?.message}
                    />
                  )}
                />
              </div>
            </div>
          </Grid.Col>

          <Grid.Col className="md:w-6/12">
            <InputField
              label="Place of Birth"
              {...register("place_of_birth")}
              error={errors.place_of_birth?.message}
              id="place_of_birth"
            />
          </Grid.Col>
          <Grid.Col className="md:w-6/12">
            <Controller
              control={control}
              name="gender"
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  label="Gender"
                  options={GENDER_OPTIONS}
                  placeholder="Select a your gender"
                  isMulti={false}
                  value={field.value ? { ...field.value, label: field.value.label || "" } : null}
                  onChange={(gender: any) => {
                    field.onChange(gender); // triggers validation
                  }}
                  error={errors.gender?.message}
                  id="gender"
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <Controller
              control={control}
              name="languages_spoken"
              rules={{ required: true }}
              render={({ field }) => (
                <CustomSelect
                  label="Languages"
                  options={LANGUAGE_OPTIONS}
                  isMulti={true}
                  value={field.value}
                  placeholder="Select your spoken language"
                  onChange={(language) => {
                    field.onChange(language); // triggers validation
                  }}
                  error={errors.languages_spoken?.message}
                  id="languages_spoken"
                />
              )}
            />
          </Grid.Col>
          <Grid.Col>
            <InputField
              label="Current Address *"
              {...register("current_address")}
              id="current_address"
              error={errors.current_address?.message}
            />
          </Grid.Col>
          <Grid.Col>
            <InputField
              label="Permanent Address *"
              {...register("permanent_address")}
              id="permanent_address"
              error={errors.permanent_address?.message}
            />
          </Grid.Col>
        </Grid>
        <div className="flex justify-end mt-4 lg:mt-5 xl:mt-6 3xl:mt-8">
          <Button type="submit">{page === "signup" ? "Continue" : "Save"}</Button>
        </div>
      </form>
      {/* </Grid.Col>
       </Grid>
     </div> */}
    </>
  );
}
