"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { FaqAccordion } from "./faqAccordion";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqTabsProps = {
  data: {
    payments: FaqItem[];
    booking: FaqItem[];
    technical: FaqItem[];
  };
  search: string;
};

export function FaqTabs({ data, search }: FaqTabsProps) {
  const filterFaqs = (items: FaqItem[]) =>
    items.filter((item) => item.question.toLowerCase().includes(search.toLowerCase()));

  return (
    <Tabs.Root defaultValue="payments" className="w-full">
      <Tabs.List className="flex gap-2 border-b pb-2 mb-4">
        <Tabs.Trigger
          value="payments"
          className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Payments & Refunds
        </Tabs.Trigger>
        <Tabs.Trigger
          value="booking"
          className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Booking Issues
        </Tabs.Trigger>
        <Tabs.Trigger
          value="technical"
          className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Technical Support
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="payments">
        <FaqAccordion items={filterFaqs(data.payments)} />
      </Tabs.Content>
      <Tabs.Content value="booking">
        <FaqAccordion items={filterFaqs(data.booking)} />
      </Tabs.Content>
      <Tabs.Content value="technical">
        <FaqAccordion items={filterFaqs(data.technical)} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
