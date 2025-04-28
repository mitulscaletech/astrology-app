import Image from "next/image";
import Link from "next/link";

import Grid from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import banner from "@/assets/images/home/home-banner.jpg";

const HomeBanner = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center relative px-4 md:px-20 lg:px-12 3xl:px-20 rounded-3xl min-h-112 xl:min-h-128 2xl:min-h-144 3xl:min-h-[626px] overflow-hidden text-accent-white">
          <Image src={banner} alt="home-banner" className="absolute size-full inset-0 object-cover" />
          <Grid>
            <Grid.Col className="md:w-7/12">
              <div className="relative z-2">
                <Typography variant="h1" size="h1" className="font-head mb-4">
                  Awaken with Purpose Start Your Day Aligned
                </Typography>
                <p className="text-2xl">
                  Start each day with a live, soulful wake-up call—guided by your birth chart and delivered by a real
                  human.
                </p>
                <Button asChild size="lg" variant="white" className="mt-6 md:mt-8 lg:mt-10 xl:mt-12">
                  <Link href="/">Choose consultation</Link>
                </Button>
              </div>
            </Grid.Col>
          </Grid>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
