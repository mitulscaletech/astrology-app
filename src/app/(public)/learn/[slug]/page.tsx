import Astrologers from "@/components/astrology/astrologers";
import AstrologyAbout from "@/components/astrology/astrology-about";
import AstrologyDetailBanner from "@/components/astrology/astrology-detail-banner";
import CTABanner from "@/components/common/cta-banner";
import FAQAbout from "@/components/home/faq-about";

const AstrologyDetailPage = () => {
  return (
    <>
      <AstrologyDetailBanner />
      <AstrologyAbout />
      <Astrologers />
      <CTABanner />
      <FAQAbout />
    </>
  );
};

export default AstrologyDetailPage;
