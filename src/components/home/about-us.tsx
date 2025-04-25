import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "../ui/button";

import aboutImg from "@/assets/images/home/about-us.jpg";

const AboutUs = () => {
  return (
    <section className="common-section sm:pt-2 md:pt-4">
      <div className="container">
        <div className="rounded-3xl overflow-hidden border border-secondary/20 shadow-card">
          <Grid className="justify-between items-center">
            <Grid.Col className="md:w-5/12">
              <Image src={aboutImg} alt="About Us" className="w-full aspect-square object-contain" />
            </Grid.Col>
            <Grid.Col className="md:w-7/12">
              <div className="py-10 px-24">
                <Typography variant="h2" size="p" className="mb-3" isTitle>
                  AboutUs
                </Typography>
                <Typography variant="h3" size="h3" className="mb-8 font-head font-medium">
                  Trusted Guidance, <br /> Rooted in Ancient Wisdom
                </Typography>
                <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
                  At WeWake, we’re here to help you make sense of life’s twists and turns through the timeless wisdom of
                  Sanātana Dharma. Whether you're curious about your future or seeking a deeper spiritual connection,
                  our experienced Vedic scholars offer thoughtful, personalised guidance through Astrology and Puja
                  services.
                </Typography>
                <div className="flex gap-3 mt-4 md:mt-5 lg:mt-6 xl:mt-12"></div>
                <div className="flex gap-3 mt-4 md:mt-5 lg:mt-6 xl:mt-12">
                  <Button asChild variant="highlight">
                    <Link href="/">Learn with Us</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">Book a Session</Link>
                  </Button>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
