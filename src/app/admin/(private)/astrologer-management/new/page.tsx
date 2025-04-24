"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type FormData = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  // pricing: string;
  specializations: string[];
};

const schema: yup.ObjectSchema<FormData> = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters."),
  email: yup.string().required("Email is required").email("Please enter a valid email address."),
  phone: yup.string().required("Phone is required").min(10, "Please enter a valid phone number."),
  bio: yup.string().required("Bio is required").min(50, "Bio must be at least 50 characters."),
  // pricing: yup.string().required("Please enter pricing information."),
  specializations: yup.array().of(yup.string().required()).required().min(1, "Select at least one specialization.")
});

// Specialization options
const specializationOptions = [
  { id: "vedic", label: "Vedic Astrology", active: false },
  { id: "western", label: "Western Astrology", active: false },
  { id: "chinese", label: "Chinese Astrology", active: false },
  { id: "tarot", label: "Tarot Reading", active: false },
  { id: "numerology", label: "Numerology", active: false },
  { id: "palmistry", label: "Palmistry", active: false },
  { id: "gemology", label: "Gemology", active: false },
  { id: "feng-shui", label: "Feng Shui", active: false }
];

export default function NewAstrologerPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploadedDocuments, setUploadedDocuments] = useState<string[]>([]);
  const [specializationStatus, setSpecializationStatus] = useState(
    specializationOptions.map((spec) => ({ id: spec.id, active: false }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      bio: "",
      specializations: [],
      email: ""
    }
  });

  function onSubmit(values: FormData) {
    console.log(values);
    alert("Astrologer profile created successfully!");
  }

  // Mock function to handle document upload
  function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const newDocuments = Array.from(e.target.files).map((file) => file.name);
      setUploadedDocuments([...uploadedDocuments, ...newDocuments]);
    }
  }

  // Toggle specialization active status
  function toggleSpecializationStatus(id: string) {
    setSpecializationStatus((prev) => prev.map((spec) => (spec.id === id ? { ...spec, active: !spec.active } : spec)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/astrologer-management">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Astrologer</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Astrologer Onboarding</CardTitle>
          <CardDescription>Complete the form to add a new astrologer to your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="specializations">Specializations</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Info Tab */}
              <TabsContent value="personal" className="pt-4 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row items-center">
                  <div className="relative">
                    <Avatar src="/placeholder.svg" alt="Avatar" fallback="AB" size="lg" />
                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block mb-1 font-medium">Full Name</label>
                      <Input {...register("name")} placeholder="Full name" />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <Input {...register("email")} placeholder="Email" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <Input {...register("phone")} placeholder="Phone" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Bio</label>
                  <Textarea {...register("bio")} placeholder="Tell us about this astrologer..." />
                  <p className="text-sm text-muted-foreground">Minimum 50 characters</p>
                  {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
                </div>

                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("specializations")}>
                    Next: Specializations
                  </Button>
                </div>
              </TabsContent>

              {/* Specializations Tab */}
              <TabsContent value="specializations" className="pt-4 space-y-4">
                <div>
                  <label className="text-base font-medium">Specializations</label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select all that apply and activate verified ones.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {specializationOptions.map((option) => (
                    <div key={option.id} className="flex items-center justify-between p-3 border rounded-md">
                      {/* <div className="flex items-center gap-2">
                        <Checkbox
                          id={option.id}
                          checked={selectedSpecializations.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const current = selectedSpecializations || [];
                            setValue(
                              "specializations",
                              checked ? [...current, option.id] : current.filter((id) => id !== option.id)
                            );
                          }}
                        />
                        <label htmlFor={option.id} className="text-sm font-medium">
                          {option.label}
                        </label>
                      </div> */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Activate</span>
                        <Switch
                          checked={specializationStatus.find((s) => s.id === option.id)?.active || false}
                          onCheckedChange={() => toggleSpecializationStatus(option.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {errors.specializations && <p className="text-sm text-red-500">{errors.specializations.message}</p>}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveTab("personal")}>
                    Back: Personal Info
                  </Button>
                  <Button type="button" onClick={() => setActiveTab("documents")}>
                    Next: Documents
                  </Button>
                </div>
              </TabsContent>

              {/* You can add the rest of your tabs like "documents" and "pricing" similarly */}
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
