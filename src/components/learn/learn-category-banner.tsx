import Image from "next/image";

import Typography from "@/components/ui/typography";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyBanner1 from "@/assets/images/astrology/astrology-banner-main.jpg";

const LearnCategoryBanner = () => {
  return (
    <section className="py-6 md:py-7 lg:py-9 2xl:py-12">
      <div className="container">
        <div className="flex flex-col border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200 overflow-hidden">
          <div className="bg-secondary img-shadow after:h-[300%] after:top-1/2 after:end-0 after:-translate-y-1/2 after:translate-x-1/2 relative overflow-hidden">
            <Image src={astrologyBanner1} alt="Janma Kundali" className="w-full aspect-[1752/400] object-contain" />
          </div>
          <div className="flex grow flex-col md:flex-row md:gap-3 lg:gap-3.5 xl:gap-4 2xl:gap-5 3xl:gap-6 px-3 md:px-3.5 lg:px-4 2xl:px-5 3xl:px-6 py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-7 4xl:py-8">
            <div className="-mb-12 sm:-mb-16 md:mb-0 w-24 sm:w-32 md:w-40 lg:w-40 xl:w-44 2xl:w-52 3xl:w-64 -mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5 2xl:-mt-6 3xl:-mt-7 4xl:-mt-8 shrink-0 self-start p-1 2xl:p-1.5 rounded-t-full bg-accent-white transition-all ease-out duration-200 relative -translate-y-1/2">
              <Image src={astrologyImg1} alt="Janma Kundali" className="w-full aspect-square object-contain" />
            </div>
            <div className="grow flex flex-col py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 md:pe-2 xl:pe-4 3xl:pe-6">
              <Typography variant="h1" size="p" isTitle className="font-medium mb-1 lg:mb-0">
                learn
              </Typography>
              <Typography variant="h2" size="h1" className="font-head mb-2.5 xl:mb-3 2xl:mb-4 3xl:mb-6">
                Explore Astrology Types
              </Typography>
              <Typography
                variant="div"
                size="h6"
                className="2xl:w-11/12 3xl:w-9/12 text-secondary/70 space-y-2 md:space-y-3 xl:space-y-4 2xl:space-y-5 4xl:space-y-6"
              >
                Dive into the different branches of astrology — Vedic, KP, Nadi, Western, and Numerology. Understand how
                they work, their roots, and how they guide real lives.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnCategoryBanner;
