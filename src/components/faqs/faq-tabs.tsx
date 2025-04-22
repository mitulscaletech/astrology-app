"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaqAccordion } from "./faq-accordion";

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
    <Tabs defaultValue="payments">
      <TabsList>
        <TabsTrigger value="payments">Payments & Refunds</TabsTrigger>
        <TabsTrigger value="booking">Booking Issues</TabsTrigger>
        <TabsTrigger value="technical">Technical Support</TabsTrigger>
      </TabsList>

      <TabsContent value="payments">
        <FaqAccordion items={filterFaqs(data.payments)} />
      </TabsContent>
      <TabsContent value="booking">
        <FaqAccordion items={filterFaqs(data.booking)} />
      </TabsContent>
      <TabsContent value="technical">
        <FaqAccordion items={filterFaqs(data.technical)} />
      </TabsContent>
    </Tabs>
  );
}
