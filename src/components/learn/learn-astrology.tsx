"use client";

import Grid from "@/components/ui/grid";
import AstrologyCard from "@/components/common/astrology-card";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyImg2 from "@/assets/images/home/astrology-img-02.png";
import astrologyImg3 from "@/assets/images/home/astrology-img-03.png";
import astrologyImg4 from "@/assets/images/home/astrology-img-04.png";
import SearchBox from "../ui/search-box";
import CustomSelect from "../ui/custom-select";
import { useState } from "react";
import Typography from "../ui/typography";

const ASTROLOGY_DATA = [
  {
    image: astrologyImg1,
    title: "Explore Astrology Types",
    description:
      "Dive into the different branches of astrology — Vedic, KP, Nadi, Western, and Numerology. Understand how they work, their roots, and how they guide real lives.",
    slug: "READ MORE",
    btnText: "READ MORE"
  },
  {
    image: astrologyImg2,
    title: "Vedas & Ancient Knowledge",
    description:
      "Explore simplified insights into the Vedas, Upanishads, and Puranas—timeless scriptures that continue to inspire, guide, and illuminate our spiritual paths.",
    slug: "READ MORE",
    btnText: "READ MORE"
  },
  {
    image: astrologyImg3,
    title: "Puja Rituals",
    description:
      "Whether it’s a simple daily offering or a complex homa, our guides make every ritual easy to understand and perform — with spiritual depth, not dogma.",
    slug: "READ MORE",
    btnText: "READ MORE"
  },
  {
    image: astrologyImg4,
    title: "Festival Calendar",
    description:
      "Dive into the different branches of astrology — Vedic, KP, Nadi, Western, and Numerology. Understand how they work, their roots, and how they guide real lives.",
    slug: "VIEW CALENDAR",
    btnText: "VIEW CALENDAR"
  },
  {
    image: astrologyImg3,
    title: "Insights & Spiritual Trends",
    description:
      "From mindful living to astrology in the digital age, get grounded insights that bridge timeless wisdom with today’s questions.",
    slug: "EXPLORE ARTICLES",
    btnText: "EXPLORE ARTICLES"
  },
  {
    image: astrologyImg4,
    title: "Daily Aarti & Vrat Guides",
    description:
      "Find your daily rhythm with aarti timings, vrat (fasting) dates, and easy-to-follow devotional practices. Stay connected with your spiritual side, every day.",
    slug: "SEE TODAY’S GUIDE",
    btnText: "SEE TODAY’S GUIDE"
  },
  {
    image: astrologyImg2,
    title: "Case Studies & Transformations",
    description:
      "Read powerful stories from our members—how astrology helped them make life decisions, or how a guided puja brought real peace and clarity.",
    slug: "READ MORE",
    btnText: "READ MORE"
  },
  {
    image: astrologyImg1,
    title: "Astro Blog & Myth-Busting",
    description:
      "Stay updated with fresh insights on astrology, spirituality, and life. Plus, we bust the myths and superstitions—leaving you with clarity, not confusion.",
    slug: "READ MORE",
    btnText: "READ MORE"
  }
];

const poojaOptions = [
  { value: "ganesh", label: "Ganesh Pooja" },
  { value: "lakshmi", label: "Lakshmi Pooja" },
  { value: "saraswati", label: "Saraswati Pooja" },
  { value: "hanuman", label: "Hanuman Pooja" }
];

const category = [
  "All",
  "Astrology Types",
  "Vedas and Ancient",
  "Puja Rituals",
  "Festival Calendar",
  "Trends",
  "Aarti and Vrat Guides",
  "Case Studies",
  "Muharat Calendar"
];

const LearnAstrology = () => {
  const [selected, setSelected] = useState<{ value: string; label: string } | null>(null);
  const [selectedCat, setSelectedCat] = useState<number>(0);

  return (
    <section className="small-section">
      <div className="container">
        <div className="flex justify-end gap-2 lg:gap-3">
          <div className="lg:w-112">
            <SearchBox />
          </div>
          <div className="w-40 md:w-48 xl:w-48 2xl:w-52">
            <CustomSelect
              isMulti={false}
              options={poojaOptions}
              value={selected}
              onChange={(option) => setSelected(option as { value: string; label: string } | null)}
              label="Sort"
            />
          </div>
        </div>
        <Typography
          variant="div"
          size="h6"
          className="mt-4 md:mt-6 lg:mt-7 2xl:mt-8 flex whitespace-nowrap font-semibold gap-1 md:gap-2 lg:gap-3 2xl:gap-4 3xl:gap-6 overflow-auto"
        >
          {category?.map((cat, index) => {
            return (
              <button
                key={cat}
                className={`${selectedCat === index ? "bg-secondary/10 hover:bg-secondary/20" : ""} shrink-0 hover:bg-secondary/5 px-2 md:px-3 lg:px-4 2xl:px-5 3xl:px-6 py-1.5 md:py-2.5 lg:py-3 2xl:py-4 3xl:py-5 rounded-md lg:rounded-lg 2xl:rounded-xl min-w-14 md:min-w-16 xl:min-w-24 3xl:min-w-28`}
              >
                {cat}
              </button>
            );
          })}
        </Typography>
        <Grid className="mt-4 md:mt-6 lg:mt-7 2xl:mt-8 gap-y-4 md:gap-y-5 xl:gap-y-6 2xl:gap-y-8" size="md">
          {ASTROLOGY_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.title} className="md:w-6/12 lg:w-4/12 xl:w-3/12">
                <AstrologyCard
                  image={astrology?.image.src}
                  title={astrology?.title}
                  description={astrology?.description}
                  isSmallImg
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default LearnAstrology;
