import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "../ui/button";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyImg2 from "@/assets/images/home/astrology-img-02.png";
import astrologyImg3 from "@/assets/images/home/astrology-img-03.png";
import astrologyImg4 from "@/assets/images/home/astrology-img-04.png";

const ASTROLOGY_DATA = [
  {
    image: astrologyImg1,
    tag: "Janma Kundali",
    title: "Holistic Life Blueprint",
    description: "Unlock the secrets of your birth chart and take control of your life's journey with awareness.",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg2,
    tag: "Kundali Matching",
    title: "Aligning Destinies For A Harmonious Future",
    description: "A valuable guidance to navigate life with your partner through thick & thin.",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg3,
    tag: "Prashna Kundali",
    title: "Practical Life Strategies",
    description: "Gain deeper insights into your life's pressing questions and find clarity.",
    slug: "BOOK NOW"
  },
  {
    image: astrologyImg4,
    tag: "Muhurta",
    title: "The Best Time For Success",
    description: "Align with the most auspicious time to crease the probabilities of success.",
    slug: "BOOK NOW"
  }
];

const Astrology = () => {
  return (
    <section className="common-section">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-3" isTitle>
          Astrology
        </Typography>
        <Grid className="justify-between gap-y-4">
          <Grid.Col className="md:w-5/12">
            <Typography variant="h3" className="mb-0 font-semibold">
              Bring the Cosmos Into Your Daily Rituals
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-7/12 lg:w-6/12 xl:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              Explore astrology-inspired products designed to deepen your self-awareness, align with the universe, and
              elevate your everyday rituals.
            </Typography>
          </Grid.Col>
        </Grid>
        <Grid className="mt-6 md:mt-8 lg:mt-10 2xl:mt-12 gap-y-4" size="md">
          {ASTROLOGY_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.tag} className="md:w-6/12 xl:w-3/12">
                <div className="flex flex-col hover:bg-highlight/20 p-3.5 md:p-5 lg:p-6 xl:p-2.5 2xl:p-3 4xl:p-6 border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200">
                  <div className="mb-3 md:mb-3.5 xl:mb-4 3xl:mb-6 w-48 sm:w-56 xl:w-full mx-auto">
                    <Image
                      src={astrology?.image}
                      alt={astrology?.tag}
                      className="w-full aspect-square object-contain"
                    />
                  </div>
                  <div className="px-1.5 3xl:px-3 4xl:px-4 pb-2 4xl:pb-4 grow flex flex-col">
                    <Typography variant="p" size="p" className="mb-2">
                      {astrology?.tag}
                    </Typography>
                    <Typography variant="h4" size="h5-head" className="font-head mb-2.5 md:mb-3 xl:mb-4">
                      {astrology?.title}
                    </Typography>
                    <Typography variant="p" size="p" className="text-secondary/70">
                      {astrology?.description}
                    </Typography>
                    <div className="text-end mt-auto">
                      <Button asChild variant="highlight" className="mt-4 md:mt-5 xl:mt-5 2xl:mt-6 3xl:mt-8">
                        <Link href="/">BOOK NOW</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
      </div>
    </section>
  );
};

export default Astrology;
