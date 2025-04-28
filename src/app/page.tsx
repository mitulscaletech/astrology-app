import PublicLayout from "@/components/layouts/public-layout";
import HomeBanner from "@/components/home/home-banner";
import Astrology from "@/components/home/astrology";
import AboutUs from "@/components/home/about-us";
import Testimonials from "@/components/home/testimonials";
import Learn from "@/components/home/learn";
import FAQAbout from "@/components/home/faq-about";

export default function Home() {
  return (
    <PublicLayout>
      <HomeBanner />
      <Astrology />
      <AboutUs />
      <Testimonials />
      <Learn />
      <FAQAbout />
    </PublicLayout>
  );
}
