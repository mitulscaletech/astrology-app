import Link from "next/link";

import Typography from "@/components/ui/typography";
import Grid from "@/components/ui/grid";
import LearnCard from "@/components/learn/learn-card";
import { Button } from "@/components/ui/button";

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
        <Grid className="justify-between">
          <Grid.Col className="md:w-5/12">
            <Typography variant="h3" size="h3" className="mb-0 font-semibold">
              Wisdom for Your Journey
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-7/12 lg:w-6/12 xl:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              Discover insights, stories, and guidance to help you live with clarity, balance, and purpose.
            </Typography>
          </Grid.Col>
        </Grid>
        <Grid className="py-6 md:py-9 lg:py-10 xl:py-12 gap-y-4 justify-center" size="md">
          {LEARN_DATA?.map((astrology) => {
            return (
              <Grid.Col key={astrology?.date} className="md:w-6/12 lg:w-4/12">
                <LearnCard
                  image={astrology?.image.src}
                  date={astrology?.date}
                  title={astrology?.title}
                  description={astrology?.description}
                  readTime={astrology?.readTime}
                />
              </Grid.Col>
            );
          })}
        </Grid>
        <div className="text-center">
          <Button asChild variant="highlight" className="gap-2.5">
            <Link href="/">
              Start Learning with Us
              <span className="size-5 md:size-6">
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
