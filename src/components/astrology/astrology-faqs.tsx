"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ReactNode } from "react";
import clsx from "clsx";

// Optional: Tailwind animation classes should be configured in tailwind.config.ts

type AccordionItem = {
  title: string;
  content: ReactNode;
};

export default function AccordionComponent() {
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
    <Accordion.Root type="single" collapsible className="w-full space-y-4">
      {items.map((item, index) => (
        <Accordion.Item key={index} value={item.title} className="bg-orange-50 rounded-xl overflow-hidden">
          <Accordion.Header>
            <Accordion.Trigger
              className={clsx(
                "w-full flex justify-between items-center p-4 font-semibold text-left text-gray-900",
                "hover:bg-orange-100 transition-colors"
              )}
            >
              {item.title}
              {/* <Accordion.Icon asChild>
                <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Icon> */}
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="px-4 pb-4 pt-0 text-sm text-gray-700 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
            {item.content}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
