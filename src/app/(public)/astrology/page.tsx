import FAQAbout from "@/components/home/faq-about";
import AstrologyBanner from "@/components/astrology/astrology-banner";
import AstrologyList from "@/components/astrology/astrology-list";
import HowItWork from "@/components/astrology/how-it-works";
import CTABanner from "@/components/cta-banner";

export default function Home() {
  return (
    <>
      <AstrologyBanner />
      <AstrologyList />
      <HowItWork />
      <CTABanner />
      <FAQAbout />
    </>
  );
}
