"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import SearchBox from "@/components/ui/search-box";
import CustomSelect from "@/components/ui/custom-select";

import poojaImg1 from "@/assets/images/pooja/pooja-img-01.jpg";
import poojaImg2 from "@/assets/images/pooja/pooja-img-02.jpg";
import poojaImg3 from "@/assets/images/pooja/pooja-img-03.jpg";
import poojaImg4 from "@/assets/images/pooja/pooja-img-04.jpg";
import poojaImg5 from "@/assets/images/pooja/pooja-img-05.jpg";
import poojaImg6 from "@/assets/images/pooja/pooja-img-06.jpg";
import IconArrowForward from "@/shared/icons/arrow-forward";

const poojaOptions = [
  { value: "ganesh", label: "Ganesh Pooja" },
  { value: "lakshmi", label: "Lakshmi Pooja" },
  { value: "saraswati", label: "Saraswati Pooja" },
  { value: "hanuman", label: "Hanuman Pooja" }
];

const POOJA_DATA = [
  {
    title: "Ganesh Pooja",
    subtitle: "For new beginnings, success & removing obstacles",
    description:
      "Invoke Lord Ganesha’s blessings to start fresh, overcome challenges, and bring prosperity into your life.",
    image: poojaImg6
  },
  {
    title: "Lakshmi Pooja",
    subtitle: "For wealth, abundance & financial stability",
    description:
      "Dedicated to Goddess Lakshmi, attracts prosperity, helps manage financial stress, and invites growth in business or personal wealth.",
    image: poojaImg5
  },
  {
    title: "Maha Mrityunjaya Pooja",
    subtitle: "For health, healing & protection from negativity",
    description:
      "This powerful ritual to Lord Shiva helps in overcoming illness, mental stress, and fear—bringing peace and long life.",
    image: poojaImg1
  },
  {
    title: "Saraswati Pooja",
    subtitle: "For wisdom, focus & academic success",
    description:
      "Seek the blessings of Goddess Saraswati for clarity in thought, better learning, and creative energy in studies or the arts.",
    image: poojaImg2
  },
  {
    title: "Navgraha Pooja",
    subtitle: "For planetary balance & astrological harmony",
    description:
      "This Pooja is ideal when your horoscope shows planetary doshas (imbalances). It helps calm malefic influences and realign your path.",
    image: poojaImg3
  },
  {
    title: "Hanuman Pooja",
    subtitle: "For strength, courage & protection from evil",
    description:
      "Chant and pray to Lord Hanuman to overcome fear, remove negative energies, and gain inner power in tough times.",
    image: poojaImg4
  }
];

const PoojaList = () => {
  const [selected, setSelected] = useState<{ value: string; label: string } | null>(null);

  return (
    <section className="small-section">
      <div className="container">
        <div className="flex justify-end mb-4 md:mb-6 lg:mb-8 xl:mb-10 2xl:mb-12 gap-2 lg:gap-3">
          <div className="w-112">
            <SearchBox />
          </div>
          <div className="w-52">
            <CustomSelect
              options={poojaOptions}
              value={selected}
              onChange={(option) => setSelected(option)}
              placeholder="Sort"
            />
          </div>
        </div>
        <Grid className="gap-y-4" size="md">
          {POOJA_DATA?.map((pooja) => {
            return (
              <Grid.Col key={pooja?.title} className="lg:w-6/12">
                <div className="group  flex flex-col hover:bg-highlight-100 border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200 overflow-hidden">
                  <div className="img-shadow bg-secondary relative overflow-hidden after:end-0 after:translate-x-1/4 after:top-1/4">
                    <Image src={pooja?.image} alt={pooja?.title} className="w-full aspect-[866/300] object-contain" />
                  </div>
                  <div className="flex flex-col grow py-3 md:py-3.5 lg:py-4 2xl:py-5 3xl:py-6 px-3 md:px-4 lg:px-6 xl:px-7 2xl:px-8 3xl:px-10 4xl:px-12">
                    <Typography variant="p" size="h6" className="font-semibold text-highlight">
                      {pooja?.subtitle}
                    </Typography>
                    <Typography variant="h4" size="h4-head" className="font-head mb-2.5 md:mb-2.5 xl:mb-3">
                      {pooja?.title}
                    </Typography>
                    <Typography variant="p" size="h6" className="text-secondary/70">
                      {pooja?.description}
                    </Typography>
                    <div className="text-end mt-auto">
                      <Button
                        asChild
                        variant="highlight"
                        className="mt-4 md:mt-5 xl:mt-5 2xl:mt-6 3xl:mt-8 mb-2 md:mb-0"
                      >
                        <Link href="/">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
        <div className="text-center">
          <Button asChild className="mt-4 md:mt-5 lg:mt-5 xl:mt-6 2xl:mt-8 4xl:mt-12" variant="highlight">
            <Link href="/">
              View MORE
              <span className="size-5 md:size-6">
                <IconArrowForward />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PoojaList;
