import Image from "next/image";
import Link from "next/link";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import banner from "@/assets/images/cta-banner.jpg";
import IconArrowForward from "@/shared/icons/arrow-forward";

const CTABanner = () => {
  return (
    <section className="small-section text-center !pb-0">
      <div className="container">
        <div className="px-3 flex items-center relative rounded-xl md:rounded-2xl lg:rounded-3xl min-h-80 lg:min-h-96 xl:min-h-128 2xl:min-h-144 3xl:min-h-[626px] overflow-hidden text-accent-white">
          <Image src={banner} alt="home-banner" className="absolute size-full inset-0 object-cover" />
          <div className="w-full">
            <Grid className="justify-center">
              <Grid.Col className="md:w-8/12 lg:w-7/12">
                <div className="relative z-2">
                  <Typography variant="h1" size="h1" className="font-head mb-4 2xl:mb-5">
                    Ready to Find Clarity?
                  </Typography>
                  <Typography variant="p" size="h6" className="opacity-80 lg:w-9/12 4xl:w-8/12 mx-auto">
                    Join hundreds finding purpose and peace through ancient wisdom, made simple and personal.
                  </Typography>
                  <Button asChild variant="highlight" className="mt-5 md:mt-7 lg:mt-8 xl:mt-10 2xl:mt-12 4xl:mt-14">
                    <Link href="/">
                      Book Your Astrology Session
                      <span className="size-5 md:size-6">
                        <IconArrowForward />
                      </span>
                    </Link>
                  </Button>
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
