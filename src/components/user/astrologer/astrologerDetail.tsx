"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AstrologerServices } from "@/components/user/astrologer/astrologer-services";
import { AstrologerReviews } from "@/components/user/astrologer/astrologer-reviews";
import { astrologersDetails } from "./astrologers-details";
import type { AstrologerDetail } from "@/shared/interface/index.ts";
import IconChevronLeft from "@/shared/icons/chevronLeft";
import IconStar from "@/shared/icons/star";
import IconCalender from "@/shared/icons/calender";
import IconClock from "@/shared/icons/clock";
import IconMail from "@/shared/icons/mail";
import IconPhone from "@/shared/icons/phone";
import IconMapPin from "@/shared/icons/mapPin";
import Loader from "@/components/loader";

export default function AstrologerDetails() {
  const { slug } = useParams() as { slug: string };
  const [astrologer, setAstrologer] = useState<AstrologerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const foundAstrologer = astrologersDetails.find((a) => a.slug === slug);
    const randomAstro = Math.ceil(Math.random() * 2);
    setAstrologer(foundAstrologer || astrologersDetails[randomAstro]);
    setLoading(false);
  }, [slug]);

  if (!loading && !astrologer) {
    notFound();
  }

  if (loading || !astrologer) {
    return <Loader />;
  }

  return (
    <div className="container">
      <Link href="/user/astrologers" className="inline-flex items-center text-primary-600 mb-6 hover:text-primary-800">
        <span className="h-4 w-4 me-2">
          <IconChevronLeft />
        </span>
        Back to Astrologers
      </Link>

      <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="aspect-square rounded-xl overflow-hidden bg-white shadow-md border border-primary-200">
              <Image
                src={astrologer.imageUrl || "/placeholder.svg"}
                alt={astrologer.name}
                className="w-full h-full object-cover"
                width={400}
                height={400}
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-primary-800">{astrologer.name}</h1>
              <div className="flex items-center bg-accent-white px-3 py-1 rounded-full shadow-sm">
                <span className="h-5 w-5 fill-warning text-warning mr-1">
                  <IconStar />
                </span>
                <span className="font-semibold">{astrologer.rating}</span>
                <span className="text-sm text-gray-500 ml-1">({astrologer.reviewCount} reviews)</span>
              </div>
            </div>

            <p className="text-lg font-medium text-primary-600 mb-4">{astrologer.specialization}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-6">
              <div className="flex items-center">
                <span className="h-5 w-5 text-primary-500 mr-2">
                  <IconCalender />
                </span>
                <span>{astrologer.experience} years experience</span>
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 text-primary-500 mr-2">
                  <IconClock />
                </span>
                <span>{astrologer.availability}</span>
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 text-primary-500 mr-2">
                  <IconMapPin />
                </span>
                <span>{astrologer.location}</span>
              </div>
              <div className="flex items-center">
                <span className="h-5 w-5 text-primary-500 mr-2">
                  <IconMail />
                </span>
                <span>{astrologer.email}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2">Languages</div>
              <div className="flex flex-wrap gap-2">
                {astrologer.languages.map((language) => (
                  <Badge key={language}>{language}</Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                <span className="h-4 w-4 mr-2">
                  <IconPhone />
                </span>
                Book Consultation
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <a href="tel:1234567890">
                  <span className="h-4 w-4 mr-2">
                    <IconMail />
                  </span>
                  Send Message
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="about" className="mb-8">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6">
          <div className="bg-white rounded-lg border border-secondary-100 p-6">
            <h2 className="text-xl font-semibold text-primary-800 mb-4">About {astrologer.name}</h2>
            <div className="space-y-4">
              <p>{astrologer.bio}</p>
              <p>{astrologer.detailedBio}</p>
            </div>

            <h3 className="text-lg font-semibold text-primary-700 mt-8 mb-4">Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {astrologer.expertise.map((item, index) => (
                <div key={index} className="bg-primary-50 border border-primary-100 rounded-lg p-3 flex items-center">
                  <div className="h-2 w-2 rounded-full bg-primary-400 mr-2"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-primary-700 mt-8 mb-4">Education & Certifications</h3>
            <div className="space-y-4">
              {astrologer.education.map((edu, index) => (
                <div key={index} className="border-l-2 border-primary-300 pl-4 py-1">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm text-gray-600">
                    {edu.institution}, {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <AstrologerServices services={astrologer.services} />
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <AstrologerReviews reviews={astrologer.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
