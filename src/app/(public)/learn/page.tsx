import LearnBanner from "@/components/learn/learn-banner";
import LearnAstrology from "@/components/learn/learn-astrology";
import PopularInsights from "@/components/learn/popular-insights";
import SubscribeBanner from "@/components/common/subscribe-banner";
import FAQAbout from "@/components/home/faq-about";

export default function LearnPage() {
  return (
    <>
      <LearnBanner />
      <LearnAstrology />
      <PopularInsights />
      <SubscribeBanner />
      <FAQAbout />
    </>
  );
}
