"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ReactNode } from "react";
import clsx from "clsx";
import IconArrowDownward from "@/shared/icons/arrow-downward";
import Typography from "../ui/typography";

// Optional: Tailwind animation classes should be configured in tailwind.config.ts

type AccordionItem = {
  title: string;
  content: ReactNode;
};

export default function AstrologyFaqs() {
  const items: AccordionItem[] = [
    {
      title: "Purpose",
      content: (
        <p>
          Janma Kundali, also known as the natal chart, is a comprehensive astrological chart that maps out the
          positions of the planets at the exact moment of your birth. It serves as a blueprint of your life, providing
          insights into various aspects like personality, strengths, weaknesses, career, relationships and life’s
          potential challenges & opportunities.
        </p>
      )
    },
    {
      title: "Method Of Creation",
      content: (
        <p>
          Kundali is created based on the exact date, time, and location of birth. It uses Vedic astrology principles to
          calculate planetary positions.
        </p>
      )
    },
    {
      title: "Insights Provided",
      content: (
        <p>
          Personality traits, life challenges, career potential, health tendencies, and relationship compatibility are
          some of the key insights.
        </p>
      )
    },
    {
      title: "Consultation Process",
      content: (
        <p>
          During the consultation, an astrologer interprets your chart and answers specific life questions based on
          planetary influences.
        </p>
      )
    }
  ];

  return (
    <Accordion.Root type="single" collapsible className="w-full space-y-2 lg:space-y-3 3xl:space-y-4">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={item.title}
          className="group bg-highlight/20 py-3 md:py-3.5 lg:py-4 2xl:py-5 3xl:py-7 4xl:py-8 px-3.5 md:px-5 lg:px-6 2xl:px-7 3xl:px-8 4xl:px-10 rounded-lg xl:rounded-2xl 3xl:rounded-3xl overflow-hidden"
        >
          <Accordion.Header>
            <Accordion.Trigger
              className={clsx("w-full flex justify-between items-center font-semibold text-left text-gray-900")}
            >
              <Typography variant="span" size="h5">
                {item.title}
              </Typography>
              <span className="size-6 md:size-7 lg:size-8 2xl:size-9 3xl:size-10 4xl:size-12 p-1 md:p-1 lg:p-1.5 2xl:p-2 3xl:p-2.5 4xl:p-3 bg-highlight/20 transition-transform duration-200 group-data-[state=open]:rotate-180 rounded-full">
                <IconArrowDownward />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="pt-2.5 text-sm text-secondary/70 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            <Typography variant="p" size="h6">
              {item.content}
            </Typography>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
