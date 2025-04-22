"use client";
import Image from "next/image";
import { useState } from "react";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";

import service1 from "@/assets/images/astrology-service-1.webp";
import service2 from "@/assets/images/astrology-service-2.webp";
import service3 from "@/assets/images/astrology-service-3.webp";
import ScheduleTimeModal from "@/components/user/service/schedule-time-modal";

const service = {
  title: "Janma Kundali: Holistic Life Blueprint",
  price: 3999,
  description: `Your life’s blueprint based on birth details. Understand your life with an in-depth analysis of your astrological chart.

Created using your birth date, time, and place, Janma Kundali offers a complete overview of your life’s path, highlighting potential opportunities and challenges. Whether you have general questions about career, relationships, or family, a learned astrologer can guide you through various aspects of life.`,
  images: [service1, service2, service3],
  durations: ["30 Minutes", "60 Minutes"],
  astrologers: [
    {
      name: "Dr Vishwanath MV",
      language: "English",
      image: "/images/astro1.jpg"
    },
    {
      name: "Dr Ganesh Prasad Mishra",
      language: "Hindi",
      image: "/images/astro2.jpg"
    },
    {
      name: "Mr Sudhir Pandey",
      language: "",
      image: "/images/astro3.jpg"
    }
  ]
};

export default function ServiceDetail() {
  const [selectedDuration, setSelectedDuration] = useState("30 Minutes");
  const [selectedAstrologer, setSelectedAstrologer] = useState(service.astrologers[0].name);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Grid>
      {/* Left: Image carousel */}
      <Grid.Col className="md:w-5/12">
        <div className="rounded-xl overflow-hidden">
          <Image src={service.images[0]} alt="Main" width={600} height={400} className="w-full h-auto object-cover" />
        </div>
        <div className="flex gap-4 mt-4">
          {service.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              width={80}
              height={80}
              className="rounded-lg object-cover cursor-pointer border border-gray-200"
            />
          ))}
        </div>
      </Grid.Col>

      {/* Right: Details */}
      <Grid.Col className="md:w-7/12">
        <h1 className="text-3xl text-primary font-bold mb-2">{service.title}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-1">Rs. {service.price.toLocaleString("en-IN")}.00</p>
        <p className="text-sm text-gray-400 mb-4">TAXES CALCULATED AT CHECKOUT</p>

        <div className="space-y-4 text-gray-700 whitespace-pre-line">{service.description}</div>

        <hr className="my-6" />

        {/* Duration */}
        <div>
          <p className="font-semibold mb-2">SESSION DURATION:</p>
          <div className="flex gap-2">
            {service.durations.map((duration) => (
              <label
                key={duration}
                className={`px-3 py-1.5 text-sm border rounded-md cursor-pointer ${
                  selectedDuration === duration
                    ? "bg-secondary text-accent-white border-secondary"
                    : "bg-white text-secondary-400 border-secondary-300 border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={duration}
                  checked={selectedDuration === duration}
                  onChange={() => setSelectedDuration(duration)}
                  className="hidden"
                />
                {duration}
              </label>
            ))}
          </div>
        </div>

        {/* Astrologers */}
        <div className="mt-6">
          <p className="font-semibold mb-2">CHOOSE ASTROLOGER:</p>
          <div className="flex flex-wrap gap-3">
            {service.astrologers.map((astro) => {
              const isChecked = selectedAstrologer === astro.name;
              return (
                <label
                  key={astro.name}
                  className={`px-3 py-1.5 border rounded-md cursor-pointer text-sm ${
                    isChecked
                      ? "bg-secondary text-accent-white border-secondary"
                      : "bg-white text-secondary-400 border-secondary-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="astrologer"
                    value={astro.name}
                    checked={isChecked}
                    onChange={() => setSelectedAstrologer(astro.name)}
                    className="hidden"
                  />
                  {astro.name}
                  {astro.language && <span className="text-xs text-gray-300 ml-1">| {astro.language}</span>}
                </label>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Button className="mt-8" onClick={() => setModalOpen(true)}>
          Schedule your time
        </Button>

        <ScheduleTimeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          selectedAstro={selectedAstrologer}
          selectedDuration={selectedDuration}
        />
      </Grid.Col>
    </Grid>
  );
}
