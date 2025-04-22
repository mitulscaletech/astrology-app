"use client";

import { FaqSearch } from "@/components/faqs/faq-search";
import { FaqTabs } from "@/components/faqs/faq-tabs";
import { useState } from "react";

const faqData = {
  payments: [
    {
      question: "How do I request a refund?",
      answer: "Contact support with your booking details to request a refund."
    },
    { question: "When will I receive my refund?", answer: "Refunds are processed within 5-7 business days." }
  ],
  booking: [
    { question: "Why is my booking not confirmed?", answer: "Ensure payment was completed and check your email." },
    { question: "Can I modify my booking?", answer: "Yes, go to 'My Bookings' and select 'Modify'." }
  ],
  technical: [
    { question: "App not loading?", answer: "Try clearing cache or reinstalling the app." },
    { question: "Error during payment?", answer: "Check your internet or try another payment method." }
  ]
};

export default function FaqSection() {
  const [search, setSearch] = useState("");

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Support & FAQ</h1>
      <FaqSearch search={search} setSearch={setSearch} />
      <FaqTabs data={faqData} search={search} />
    </>
  );
}
