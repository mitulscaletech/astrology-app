import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";
import Link from "next/link";
import IconArrowForward from "@/shared/icons/arrow-forward";

const AstrologyBanner = () => {
  return (
    <section className="small-section">
      <div className="container">
        <Typography variant="h1" size="p" className="mb-3" isTitle>
          Astrology
        </Typography>
        <Grid className="justify-between gap-y-4 items-end">
          <Grid.Col className="md:w-6/12">
            <Typography variant="h2" size="h1" className="mb-0 font-semibold pe-12">
              Personalised Astrology, Rooted in Ancient Wisdom
            </Typography>
          </Grid.Col>
          <Grid.Col className="md:w-7/12 lg:w-6/12 3xl:w-5/12">
            <Typography variant="p" size="h6" className="mb-0 text-secondary/70">
              Get clarity on life’s challenges, relationships, career, and purpose—guided by trusted Vedic scholars.
              Every consultation is tailored to your unique birth chart and life path.
            </Typography>
            <Button asChild className="mt-4 md:mt-5 lg:mt-5 xl:mt-6 2xl:mt-8 4xl:mt-12" variant="highlight">
              <Link href="/">
                Book Your Session Now
                <span className="size-5 md:size-6">
                  <IconArrowForward />
                </span>
              </Link>
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </section>
  );
};

export default AstrologyBanner;
