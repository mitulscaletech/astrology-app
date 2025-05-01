import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";

import astrologyImg1 from "@/assets/images/home/astrology-img-01.png";
import astrologyBanner1 from "@/assets/images/astrology/astrology-banner-main.jpg";

const AstrologyDetailBanner = () => {
  return (
    <section className="py-6 md:py-7 lg:py-9 2xl:py-12">
      <div className="container">
        <div className="flex flex-col border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200 overflow-hidden">
          <div className="bg-secondary img-shadow after:h-[300%] after:top-1/2 after:end-0 after:-translate-y-1/2 after:translate-x-1/2 relative overflow-hidden">
            <Image src={astrologyBanner1} alt="Janma Kundali" className="w-full aspect-[1752/400] object-contain" />
          </div>
          <div className="flex grow gap-3 lg:gap-3.5 xl:gap-4 2xl:gap-5 3xl:gap-6 px-3 md:px-3.5 lg:px-4 2xl:px-5 3xl:px-6 py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-7 4xl:py-8">
            <div className="w-24 sm:w-32 md:w-40 lg:w-40 xl:w-44 2xl:w-52 3xl:w-64 -mt-2 md:-mt-3 lg:-mt-4 xl:-mt-5 2xl:-mt-6 3xl:-mt-7 4xl:-mt-8 shrink-0 self-start p-1 2xl:p-1.5 rounded-t-full bg-accent-white transition-all ease-out duration-200 relative -translate-y-1/2">
              <Image src={astrologyImg1} alt="Janma Kundali" className="w-full aspect-square object-contain" />
            </div>
            <div className="grow flex flex-col py-2 md:py-3 lg:py-4 xl:py-5 2xl:py-6 md:pe-2 xl:pe-4 3xl:pe-6">
              <Typography variant="h1" size="h6" className="font-semibold text-highlight">
                Janma Kundali
              </Typography>
              <Typography variant="h2" size="h1" className="font-head mb-2.5 xl:mb-3">
                Holistic Life Blueprint
              </Typography>
              <Typography
                variant="div"
                size="h6"
                className="lg:w-10/12 2xl:w-10/12 text-secondary/70 space-y-2 md:space-y-3 xl:space-y-4 2xl:space-y-5 4xl:space-y-6"
              >
                <p>
                  Your life&apos;s blueprint based on birth details Understand your life with an in-depth analysis of
                  your astrological chart.
                </p>
                <p>
                  Created using your birth date, time, and place, Janma Kundali offers a complete overview of your
                  life&apos;s path, highlighting potential opportunities and challenges. Whether you have general
                  questions about career, relationships, or family, a learned astrologer can guide you through various
                  aspects of life.
                </p>
              </Typography>
              <div className="flex justify-between items-center gap-2 mt-3 md:mt-4 lg:mt-8 2xl:mt-10 3xl:mt-12">
                <div className="font-semibold">
                  <Typography
                    variant="p"
                    size="h6"
                    className="inline-flex rounded-full bg-primary text-accent-white py-2.5 px-2 md:px-3 lg:px-4 xl:px-5 3xl:px-6"
                  >
                    Rs. 3,999.00
                  </Typography>
                  <p className="text-xs uppercase mt-2 lg:mt-2.5">TAXES CALCULATED AT CHECKOUT</p>
                </div>
                <Button asChild variant="highlight">
                  <Link href="/">Schedule your time</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AstrologyDetailBanner;
