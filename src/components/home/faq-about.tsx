import Typography from "@/components/ui/typography";

import { FaqAccordion } from "@/components/faqs/faq-accordion";

const FAQS_DATA = [
  {
    question: "What is WeWake?",
    answer:
      "WeWake is an online platform offering astrology consultations, puja services, webinars, and courses focused on Sanatana Dharma and ancient wisdom. Our goal is to help individuals connect with their roots, unlock inner brilliance, and navigate life’s challenges."
  },
  {
    question: "What astrology services does WeWake offer?",
    answer:
      "WeWake offers personalized astrology consultations that cover a range of topics, including career growth, marriage, health, financial concerns, education, legal disputes and more."
  },
  {
    question: "How can I book an astrology consultation on WeWake?",
    answer:
      "Booking an astrology consultation is easy! Simply visit our website, choose your preferred astrologer or service, select a time slot that works for you, and complete the payment process."
  }
];

const FAQAbout = () => {
  return (
    <section className="common-section">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-3" isTitle>
          about us
        </Typography>
        <Typography variant="h3" size="h3" className="font-semibold">
          Frequently Asked Questions
        </Typography>
        <div className="mt-6 lg:mt-8 xl:mt-12">
          <FaqAccordion items={FAQS_DATA} />
        </div>
      </div>
    </section>
  );
};

export default FAQAbout;
