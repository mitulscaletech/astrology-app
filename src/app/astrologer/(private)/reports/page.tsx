"use client";

import { Fragment, useRef, useState } from "react";

import Image from "next/image";

import * as yup from "yup";
import { Download, Search } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { InputField } from "@/components/ui/custom-input";

import IconClose from "@/shared/icons/close";
import { IconDownload, IconPlus } from "@/shared/icons/booking";

const schema = yup.object().shape({
  name: yup.string().url("Enter a valid Instagram URL").notRequired(),
  astrologer: yup.string().url("Enter a valid Facebook URL").notRequired(),
  nature_of_consultation: yup.string().url("Enter a valid LinkedIn URL").notRequired(),
  date_of_consultation: yup.string().url("Enter a valid Twitter URL").notRequired(),
  lagna_chart: yup.string().url("Enter a valid TikTok URL").notRequired(),
  navamsa_chart: yup.string().url("Enter a valid YouTube URL").notRequired(),
  problems: yup.array().of(
    yup.object({
      problem: yup.string().required("Problem is required"),
      remedy: yup.string().required("Remedy is required")
    })
  )
});

export default function ReportsPage() {
  const lagnaInputRef = useRef<HTMLInputElement>(null);
  const navamsaInputRef = useRef<HTMLInputElement>(null);

  const [lagnaPreview, setLagnaPreview] = useState<string | null>(null);
  const [navamsaPreview, setNavamsaPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      problems: [{ problem: "", remedy: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "problems"
  });
  console.log(" errors:", errors);

  const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>,
    chartName: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(`${chartName} must be an image file.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: any) => {
    console.log(" data:", data);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 border-r border-t border-secondary/25 flex flex-col">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none"
            />
          </div>
          <Button className="w-full mt-4 py-2 px-4 rounded-xl flex items-center justify-center">
            <span className="mr-2">+</span> New Report
          </Button>
        </div>

        <div className="px-4 py-2">
          <Typography size="p" className="text-xs font-semibold text-primary">
            Drafts
          </Typography>
        </div>

        {/* Draft Reports List */}
        <div className="flex-1 overflow-auto px-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="py-3 border-b-[1.5px] border-secondary/10 hover:bg-gray-50">
                <Typography size="p" className="text-lg text-secondary font-semibold">
                  Report 1301
                </Typography>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Typography size="p" className="text-base text-secondary/50 font-medium">
                    To:
                  </Typography>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mx-1"></div>
                  <Typography size="p" className="text-base text-secondary/50 font-medium">
                    Melissa Bradley
                  </Typography>
                </div>
              </div>
            ))}

          <div className="mt-6">
            <Typography size="p" className="text-xs font-semibold text-primary">
              Sent Previous 30 Days
            </Typography>
          </div>

          {Array(7)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="py-3 border-b-[1.5px] border-secondary/10 hover:bg-gray-50">
                <Typography size="p" className="text-lg text-secondary font-semibold">
                  Report 1301
                </Typography>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Typography size="p" className="text-base text-secondary/50 font-medium">
                    To:
                  </Typography>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mx-1"></div>
                  <Typography size="p" className="text-base text-secondary/50 font-medium">
                    Melissa Bradley
                  </Typography>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 border-t border-secondary/25">
        <Typography size="h4" className="text-3.5xl font-bold text-secondary mb-6">
          New Report
        </Typography>

        <div className="grid grid-cols-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid className="gap-y-2 md:gap-y-3 lg:gap-y-4 xl:gap-y-5">
              <Grid.Col className="md:w-6/12">
                <InputField label="Customer Name" {...register("name")} error={errors.name?.message} />
              </Grid.Col>
              <Grid.Col className="md:w-6/12">
                <InputField label="Astrologer" {...register("astrologer")} error={errors.astrologer?.message} />
              </Grid.Col>
              <Grid.Col className="md:w-6/12">
                <InputField
                  label="Nature Of Consultation"
                  {...register("nature_of_consultation")}
                  error={errors.nature_of_consultation?.message}
                />
              </Grid.Col>
              <Grid.Col className="md:w-6/12">
                <InputField
                  label="Date Of Consultation"
                  {...register("date_of_consultation")}
                  error={errors.date_of_consultation?.message}
                />
              </Grid.Col>
              <Grid.Col className="md:w-6/12">
                <p className="text-lg font-medium mb-2">Lagna Chart</p>
                <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-4">
                  {lagnaPreview ? (
                    <Image
                      src={lagnaPreview}
                      alt="Lagna Chart Preview"
                      width={160}
                      height={120}
                      className="w-40 h-auto rounded-md shadow"
                    />
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleClick(lagnaInputRef)}
                      className="bg-primary py-2 px-4 rounded-md flex items-center"
                    >
                      <span className="size-6">
                        <IconDownload />
                      </span>
                      Upload Image
                    </Button>
                  )}
                  <input
                    ref={lagnaInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setLagnaPreview, "Lagna Chart")}
                  />
                </div>
              </Grid.Col>

              <Grid.Col className="md:w-6/12">
                <p className="text-lg font-medium mb-2">Navamsa Chart</p>
                <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-4">
                  {navamsaPreview ? (
                    <Image
                      src={navamsaPreview}
                      alt="Navamsa Chart Preview"
                      width={160}
                      height={120}
                      className="w-40 h-auto rounded-md shadow"
                    />
                  ) : (
                    <Button
                      type="button"
                      onClick={() => handleClick(navamsaInputRef)}
                      className="bg-primary py-2 px-4 rounded-md flex items-center"
                    >
                      <span className="size-6">
                        <IconDownload />
                      </span>
                      Upload Image
                    </Button>
                  )}
                  <input
                    ref={navamsaInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, setNavamsaPreview, "Navamsa Chart")}
                  />
                </div>
              </Grid.Col>
              <Grid.Col>
                <div className="w-full">
                  <Grid>
                    {fields.map((field, index) => (
                      <Fragment key={field.id}>
                        <Grid.Col className="md:w-6/12 mb-2">
                          <InputField
                            label="Problem"
                            {...register(`problems.${index}.problem`)}
                            placeholder="Company Name"
                            error={errors?.problems?.[index]?.problem?.message}
                          />
                        </Grid.Col>
                        <Grid.Col className="md:w-6/12 mb-2">
                          <div className="flex items-center gap-2">
                            <InputField
                              label="Remedy"
                              {...register(`problems.${index}.remedy`)}
                              placeholder="Company Name"
                              error={errors?.problems?.[index]?.remedy?.message}
                            />
                            <Button
                              type="button"
                              size="rounded"
                              className="flex items-center"
                              onClick={() => append({ problem: "", remedy: "" }, { shouldFocus: false })}
                            >
                              <span className="size-6">
                                <IconPlus />
                              </span>
                            </Button>
                            <Button type="button" size="rounded" onClick={() => remove(index)}>
                              <span className="size-6">
                                <IconClose />
                              </span>
                            </Button>
                          </div>
                        </Grid.Col>
                      </Fragment>
                    ))}
                  </Grid>
                </div>
              </Grid.Col>
            </Grid>
            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <Button type="submit" variant="outline">
                SAVE
              </Button>

              <div className="flex space-x-4">
                <Button type="button">
                  <Download className="h-5 w-5 mr-2" /> DOWNLOAD
                </Button>
                <Button type="submit">SENT TO</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
