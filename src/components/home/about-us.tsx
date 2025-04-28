import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "../ui/button";

import aboutImg from "@/assets/images/home/about-us.jpg";
import IconArrowForward from "@/shared/icons/arrow-forward";

const AboutUs = () => {
  return (
    <section className="common-section sm:pt-2 md:pt-4">
      <div className="container">
        <div className="rounded-lg xl:rounded-2xl 2xl:rounded-3xl overflow-hidden border border-secondary/20 shadow-card">
          <Grid className="justify-between items-center" size="zero">
            <Grid.Col className="xl:w-5/12">
              <Image
                src={aboutImg}
                alt="About Us"
                className="w-full object-top aspect-video xl:aspect-square object-cover"
              />
            </Grid.Col>
            <Grid.Col className="xl:w-7/12">
              <div className="py-6 px-4 lg:px-4 xl:px-6 2xl:px-10 3xl:px-20 4xl:px-24">
                <Typography variant="h2" size="p" className="mb-3" isTitle>
                  AboutUs
                </Typography>
                <Typography variant="h3" size="h3" className="mb-4 md:mb-5 2xl:mb-6 4xl:mb-8 font-head font-medium">
                  Trusted Guidance, <br /> Rooted in Ancient Wisdom
                </Typography>
                <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
                  At WeWake, we’re here to help you make sense of life’s twists and turns through the timeless wisdom of
                  Sanātana Dharma. Whether you&apos;re curious about your future or seeking a deeper spiritual
                  connection, our experienced Vedic scholars offer thoughtful, personalised guidance through Astrology
                  and Puja services.
                </Typography>
                <div className="flex gap-3 my-4 md:my-5 lg:my-6 xl:my-7 2xl:my-10 3xl:my-12 text-highlight justify-between">
                  <Typography
                    size="h6"
                    className="flex items-center gap-1.5 2xl:gap-2 before:content-[''] before:size-2 2xl:before:size-3 before:bg-highlight before:rounded-full"
                  >
                    Genuine Guidance
                  </Typography>
                  <Typography
                    size="h6"
                    className="flex items-center gap-1.5 2xl:gap-2 before:content-[''] before:size-2 2xl:before:size-3 before:bg-highlight before:rounded-full"
                  >
                    Trusted experts
                  </Typography>
                  <Typography
                    size="h6"
                    className="flex items-center gap-1.5 2xl:gap-2 before:content-[''] before:size-2 2xl:before:size-3 before:bg-highlight before:rounded-full"
                  >
                    Clarity made simple
                  </Typography>
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="highlight">
                    <Link href="/">Learn with Us</Link>
                  </Button>
                  <Button asChild className="gap-2.5">
                    <Link href="/">
                      Book a Session
                      <span className="size-6">
                        <IconArrowForward />
                      </span>
                    </Link>
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
