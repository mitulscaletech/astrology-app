"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from "@/components/astrologer/profile/basic-info-form";
import { ProfessionalDetailsForm } from "@/components/astrologer/profile/professional-details-form";
import { SocialProfilesForm } from "@/components/astrologer/profile/social-profiles-form";
import { AdditionalInfoForm } from "@/components/astrologer/profile/additional-info-form";
import { astrologerActiveTab } from "@/lib/utils";

export default function AstrologerProfile() {
  const { data, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic-info");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/astrologer/login");
      return;
    }

    const completedSteps = data?.user?.intake_form?.completed_steps || 0;
    setActiveTab(astrologerActiveTab(completedSteps));
  }, [data, status, router]);

  console.log("session", data?.user);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Complete Your Profile</h1>
            <p className="text-gray-600">Fill in your details to start accepting consultations</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="additional">Additional</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info">
              <BasicInfoForm onComplete={() => setActiveTab("professional")} />
            </TabsContent>

            <TabsContent value="professional">
              <ProfessionalDetailsForm onComplete={() => setActiveTab("social")} />
            </TabsContent>

            <TabsContent value="social">
              <SocialProfilesForm onComplete={() => setActiveTab("additional")} />
            </TabsContent>

            <TabsContent value="additional">
              <AdditionalInfoForm />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
