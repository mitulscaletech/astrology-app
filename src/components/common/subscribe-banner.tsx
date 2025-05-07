import Image from "next/image";
import Link from "next/link";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import banner from "@/assets/images/subscribe-banner.jpg";
import IconArrowForward from "@/shared/icons/arrow-forward";

const SubscribeBanner = () => {
  return (
    <section className="small-section text-center !pb-0">
      <div className="container">
        <div className="img-shadow after:start-1/2 after:-translate-x-1/2 px-3 flex items-center relative bg-secondary rounded-xl md:rounded-2xl lg:rounded-3xl min-h-80 lg:min-h-96 xl:min-h-128 2xl:min-h-144 3xl:min-h-[626px] overflow-hidden text-accent-white">
          <Image src={banner} alt="home-banner" className="absolute size-full inset-0 object-cover opacity-80" />
          <div className="w-full relative z-3">
            <Grid className="justify-center">
              <Grid.Col className="md:w-8/12 lg:w-7/12">
                <div className="relative z-2">
                  <Typography variant="h2" size="h1" className="font-head font-medium mb-3 lg:mb-4 2xl:mb-5">
                    Never Miss a New Insight
                  </Typography>
                  <Typography variant="p" size="h6" className="opacity-80">
                    Get fresh content, upcoming festival alerts, and spiritual tips straight to your inbox.
                  </Typography>
                  <div className="flex lg:mx-2 2xl:mx-4 3xl:mx-6 mt-5 md:mt-7 lg:mt-8 xl:mt-10 2xl:mt-12 4xl:mt-14 rounded-md overflow-hidden">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 md:px-5 xl:px-6 2xl:px-6 text-secondary placeholder:text-secondary bg-accent-white border-none outline-none grow text-base lg:text-lg font-semibold ring-0 shadow-none"
                    />
                    <Button variant="highlight" className="rounded-s-none shrink-0 w-24 sm:w-auto">
                      Subscribe
                      <span className="size-5 md:size-6">
                        <IconArrowForward />
                      </span>
                    </Button>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeBanner;
