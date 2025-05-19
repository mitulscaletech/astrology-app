import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "../ui/button";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyImg2 from "@/assets/images/home/astrology-img-02.png";
import astrologyImg3 from "@/assets/images/home/astrology-img-03.png";
import astrologyImg4 from "@/assets/images/home/astrology-img-04.png";
import astrologyBanner1 from "@/assets/images/astrology/astrology-banner-01.jpg";
import astrologyBanner2 from "@/assets/images/astrology/astrology-banner-02.jpg";
import astrologyBanner3 from "@/assets/images/astrology/astrology-banner-03.jpg";
import astrologyBanner4 from "@/assets/images/astrology/astrology-banner-04.jpg";

const ASTROLOGY_DATA = [
  {
    banner: astrologyBanner1,
    image: astrologyImg1,
    tag: "Janma Kundali",
    title: "Holistic Life Blueprint",
    description: "Unlock the secrets of your birth chart and take control of your life's journey with awareness.",
    slug: "janma-kundali"
  },
  {
    banner: astrologyBanner2,
    image: astrologyImg2,
    tag: "Kundali Matching",
    title: "Aligning Destinies For A Harmonious Future",
    description: "A valuable guidance to navigate life with your partner through thick & thin.",
    slug: "kundali-matching"
  },
  {
    banner: astrologyBanner3,
    image: astrologyImg3,
    tag: "Prashna Kundali",
    title: "Practical Life Strategies",
    description: "Gain deeper insights into your life's pressing questions and find clarity.",
    slug: "prashna-kundali"
  },
  {
    banner: astrologyBanner4,
    image: astrologyImg4,
    tag: "Muhurta",
    title: "Best Time For Success",
    description: "Align with the most auspicious time to crease the probabilities of success.",
    slug: "muhurta"
  }
];

const AstrologyList = () => {
  return (
    <section className="small-section">
      <div className="container">
        <Grid className="gap-y-4" size="md">
          {ASTROLOGY_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.tag} className="lg:w-6/12">
                <div className="group flex flex-col hover:bg-highlight-100 border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200 overflow-hidden">
                  <div className="">
                    <Image
                      src={astrology?.banner}
                      alt={astrology?.tag}
                      className="w-full aspect-[866/300] object-contain"
                    />
                  </div>
                  <div className="flex grow gap-3 lg:gap-3.5 xl:gap-4 2xl:gap-5 3xl:gap-6 px-3 md:px-3.5 lg:px-4 2xl:px-5 3xl:px-6 py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-7 4xl:py-8">
                    <div className="w-24 sm:w-32 md:w-40 lg:w-40 xl:w-44 2xl:w-52 3xl:60 -mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5 2xl:-mt-6 3xl:-mt-7 4xl:-mt-8 shrink-0 self-start p-1 2xl:p-1.5 rounded-t-full bg-accent-white group-hover:bg-highlight-100 transition-all ease-out duration-200 relative -translate-y-1/2">
                      <Image
                        src={astrology?.image}
                        alt={astrology?.tag}
                        className="w-full aspect-square object-contain"
                      />
                    </div>
                    <div className="grow flex flex-col">
                      <Typography variant="p" size="h6" className="font-semibold text-highlight">
                        {astrology?.tag}
                      </Typography>
                      <Typography variant="h4" size="h4-head" className="font-head mb-2.5 md:mb-2.5 xl:mb-3">
                        {astrology?.title}
                      </Typography>
                      <Typography variant="p" size="h6" className="text-secondary/70">
                        {astrology?.description}
                      </Typography>
                      <div className="text-end mt-auto">
                        <Button
                          asChild
                          variant="highlight"
                          className="mt-4 md:mt-5 xl:mt-5 2xl:mt-6 3xl:mt-8 mb-2 md:mb-0"
                        >
                          <Link href="/astrology/holistic-life-blueprint">Learn More</Link>
                        </Button>
                      </div>
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

export default AstrologyList;
