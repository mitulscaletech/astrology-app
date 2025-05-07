import SubscribeBanner from "@/components/common/subscribe-banner";
import FAQAbout from "@/components/home/faq-about";
import LearnDetailsBanner from "@/components/learn/learn-details-banner";
import LearnDetailsContent from "@/components/learn/learn-details-content";
import PopularInsights from "@/components/learn/popular-insights";

const LearnDetailPage = () => {
  return (
    <>
      <LearnDetailsBanner />
      <LearnDetailsContent />
      <PopularInsights />
      <SubscribeBanner />
      <FAQAbout />
    </>
  );
};

export default LearnDetailPage;
