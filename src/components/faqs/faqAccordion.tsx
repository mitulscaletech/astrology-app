"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";
import IconChevronDown from "@/shared/icons/chevronDown";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="multiple" className="w-full">
      {items.length === 0 && <p className="text-muted-foreground text-sm">No results found.</p>}
      {items.map((item, index) => (
        <Accordion.Item key={index} value={`item-${index}`} className="border-b py-2">
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-between items-center w-full py-2 text-left font-medium">
              {item.question}
              <span className="h-4 w-4 transition-transform data-[state=open]:rotate-180">
                <IconChevronDown />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={cn("text-sm text-muted-foreground px-1 pb-2 pt-1")}>
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
