import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import { Button } from "../ui/button";

import learnImg1 from "@/assets/images/home/learn-01.jpg";
import learnImg2 from "@/assets/images/home/learn-02.jpg";
import learnImg3 from "@/assets/images/home/learn-03.jpg";
import IconArrowForward from "@/shared/icons/arrow-forward";

const LEARN_DATA = [
  {
    image: learnImg1,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Finding Your Philanthropic Purpose Through Vedic Astrology",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose...",
    slug: "BOOK NOW"
  },
  {
    image: learnImg2,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Aligning Destinies For A Harmonious Future beyond writing a check",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose...",
    slug: "BOOK NOW"
  },
  {
    image: learnImg3,
    date: "08 February 2025",
    readTime: "3 min Read",
    title: "Practical Life Strategies, Philanthropy and expression of values, purpose",
    description:
      "Introduction Philanthropy goes beyond writing a check; it’s a profound expression of values, purpose...",
    slug: "BOOK NOW"
  }
];

const Learn = () => {
  return (
    <section className="common-section">
      <div className="container">
        <Typography variant="h2" size="p" className="mb-3" isTitle>
          Learn
        </Typography>
        <Grid className="justify-between items-center">
          <Grid.Col className="md:w-6/12">
            <Typography variant="h3" size="h3" className="mb-0 font-semibold">
              Wisdom for Your Journey
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              Discover insights, stories, and guidance to help you live with clarity, balance, and purpose.
            </Typography>
          </Grid.Col>
        </Grid>
        <Grid className="py-8 md:py-10 xl:py-12">
          {LEARN_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.date} className="md:w-4/12">
                <div className="flex flex-col border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full overflow-hidden">
                  <div>
                    <Image
                      src={astrology?.image}
                      width={572}
                      height={382}
                      alt={astrology?.date}
                      className="w-full aspect-[572/382] object-cover"
                    />
                  </div>
                  <div className="p-4 lg:p-6 xl:p-8">
                    <div className="text-highlight flex justify-between font-medium">
                      <Typography variant="p" size="p" className="mb-2 lg:mb-3">
                        {astrology?.date}
                      </Typography>
                      <Typography variant="p" size="p" className="mb-2">
                        {astrology?.date}
                      </Typography>
                    </div>
                    <Typography variant="h4" size="h5" className="mb-4 font-bold capitalize">
                      {astrology?.title}
                    </Typography>
                    <Typography variant="p" size="p" className="text-secondary/70">
                      {astrology?.description}
                    </Typography>
                  </div>
                </div>
              </Grid.Col>
            );
          })}
        </Grid>
        <div className="text-center">
          <Button asChild variant="highlight" className="gap-2.5">
            <Link href="/">
              Start Learning with Us
              <span className="size-6">
                <IconArrowForward />
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Learn;
