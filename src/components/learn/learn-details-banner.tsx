import Image from "next/image";
import Grid from "@/components/ui/grid";
import Typography from "@/components/ui/typography";
import banner from "@/assets/images/dummy/learn-details-banner.jpg";
import Link from "next/link";
import IconFacebook from "@/shared/icons/facebook";
import IconInstagram from "@/shared/icons/instagram";
import IconTwitter from "@/shared/icons/twitter";
import IconNetworkNode from "@/shared/icons/network-node";

const LearnDetailsBanner = () => {
  return (
    <section className="font-medium">
      <div className="container">
        <div
          className="img-shadow bg-secondary img-shadow flex relative py-3 md:py-4 lg:py-8 xl:py-12 3xl:py-18 px-3 md:px-4 lg:px-8 xl:px-12 3xl:px-20 rounded-xl md:rounded-2xl lg:rounded-3xl min-h-72 md:min-h-80 lg:min-h-96 xl:min-h-128 2xl:min-h-144 3xl:min-h-[626px] overflow-hidden text-accent-white
         after:z-2 after:top-1/2 after:-translate-y-1/2 after:start-0 after:-translate-x-1/4 after:opacity-80 after:h-[150%] after:blur-[150px] lg:after:blur-[300px] lg:after:h-[200%]
         "
        >
          <Image src={banner} priority alt="home-banner" className="absolute size-full inset-0 object-cover z-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/35 to-80% to-secondary/0 opacity-50 z-2"></div>
          <div className="flex w-full min-h-full flex-col relative z-3">
            <div className="flex justify-between mb-4 md:mb-6 xl:mb-8 2xl:mb-8">
              <div className="flex items-center gap-2 lg:gap-3">
                <Link href="/" className="opacity-60 hover:opacity-100">
                  Home
                </Link>
                <span className="h-4 w-px bg-accent-white opacity-60"></span>
                <Link href="/learn" className="opacity-60 hover:opacity-100">
                  Learn
                </Link>
                <span className="h-4 w-px bg-accent-white opacity-60"></span>
                <span className="opacity-60">Article</span>
              </div>
              <div>08 February 2025</div>
            </div>
            <Grid className="">
              <Grid.Col className="md:w-8/12 lg:w-7/12">
                <div className="relative z-2">
                  <Typography variant="h1" size="h2" className="mb-3 font-bold">
                    Finding Your Philanthropic Purpose Through Vedic Astrology
                  </Typography>
                  <Typography variant="p" size="h5" className="font-normal">
                    Aligning Giving with Your Cosmic Blueprint
                  </Typography>
                </div>
              </Grid.Col>
            </Grid>
            <div className="flex justify-between items-center mt-auto">
              <div>Updated on Apr 15, 2025</div>
              <div className="flex gap-x-2 md:gap-x-3">
                <Link
                  aria-label="Network Node"
                  href="https://facebook.com"
                  className="size-5 lg:size-6 hover:text-highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconNetworkNode />
                </Link>
                <Link
                  aria-label="facebook"
                  href="https://facebook.com"
                  className="size-5 lg:size-6 hover:text-highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconFacebook />
                </Link>
                <Link
                  aria-label="instagram"
                  href="https://instagram.com"
                  className="size-5 lg:size-6 hover:text-highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconInstagram />
                </Link>
                <Link
                  aria-label="Twitter"
                  href="https://youtube.com"
                  className="size-5 lg:size-6 hover:text-highlight"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnDetailsBanner;
