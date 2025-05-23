import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";

import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import astrologerImg2 from "@/assets/images/dummy/astrologer-02.jpg";
import astrologerImg3 from "@/assets/images/dummy/astrologer-03.jpg";
import IconVoice from "@/shared/icons/voice";
import IconGroups from "@/shared/icons/groups";
import IconVideo from "@/shared/icons/video";
import IconStar from "@/shared/icons/star";
import IconFavorite from "@/shared/icons/favorite";

const ASTROLOGY_DATA = [
  {
    id: 1,
    name: "Dr Ganesh Prasad Mishra",
    languages: ["English", "Hindi"],
    activeSessions: 26,
    totalSessions: 354,
    rating: 5,
    reviews: "100+ Reviews",
    videoThumbnail: astrologerImg1,
    tags: ["Janma Kundali", "Muhurat", "Prashna Kundali"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 2,
    name: "Dr Vishwanath MV",
    languages: ["English", "Hindi"],
    activeSessions: 26,
    totalSessions: 354,
    rating: 5,
    reviews: "100+ Reviews",
    videoThumbnail: astrologerImg2,
    tags: ["Janma Kundali", "Muhurat", "Prashna Kundali"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  },
  {
    id: 3,
    name: "Mr Sudhir Pandey",
    languages: ["English", "Hindi"],
    activeSessions: 26,
    totalSessions: 354,
    rating: 5,
    reviews: "100+ Reviews",
    videoThumbnail: astrologerImg3,
    tags: ["Janma Kundali", "Muhurat", "Prashna Kundali"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
  }
];

const Astrologers = () => {
  return (
    <section className="common-section !pb-4 sm:!pb-6 md:!pb-8 xl:!pb-12">
      <div className="container">
        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          <div>
            <Typography variant="h2" size="p" className="mb-2 lg:mb-3" isTitle>
              all our Sessions
            </Typography>
            <Typography variant="h3" size="h4" className="font-bold">
              Meet our Astrologers
            </Typography>
          </div>
          {ASTROLOGY_DATA?.map((astrology) => {
            return (
              <div
                key={astrology.id}
                className="items-center border md:border-2 border-secondary/20 rounded-xl xl:rounded-3xl py-3 md:py-5 lg:py-6 xl:py-7 3xl:py-10 px-3.5 md:px-6 lg:px-7 xl:px-8 3xl:px-11 flex flex-col lg:flex-row gap-y-3 md:gap-y-6 shadow-card"
              >
                <div className="w-full lg:w-6/12 relative">
                  <div className="lg:pe-4 xl:pe-6 2xl:pe-8 3xl:pe-10 4xl:pe-11">
                    <Image
                      src={astrology.videoThumbnail}
                      width={770}
                      height={440}
                      alt={astrology.name}
                      className="w-full aspect-[770/440] rounded-xl xl:rounded-3xl object-cover"
                    />
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center">▶️</button>
                </div>
                <div className="w-full lg:w-6/12 flex flex-col justify-between">
                  <div className="flex flex-col-reverse md:flex-row justify-between">
                    <div className="md:w-9/12 md:pe-2 lg:pe-3 xl:pe-3 3xl:pe-2 4xl:pe-6">
                      <Typography variant="p" size="p" className="text-secondary/50">
                        {astrology.tags.join(" • ")}
                      </Typography>
                      <Typography variant="h3" size="h4-head" className="mt-1 lg:mt-0 font-head font-semibold">
                        {astrology.name}
                      </Typography>
                      <div className="text-secondary/50 font-medium flex flex-col gap-2 md:gap-2.5 lg:gap-3 2xl:gap-4 my-2 md:my-3 lg:my-4 2xl:my-5 4xl:my-6">
                        <p className="flex gap-3 items-center">
                          <span className="size-5 lg:size-6">
                            <IconVoice />
                          </span>
                          {astrology.languages.join(" / ")}
                        </p>
                        <p className="flex gap-3 items-center">
                          <span className="size-5 lg:size-6">
                            <IconVideo />
                          </span>
                          {astrology.activeSessions} Active Sessions{" "}
                        </p>
                        <p className="flex gap-3 items-center">
                          <span className="size-5 lg:size-6">
                            <IconGroups />
                          </span>
                          {astrology.totalSessions} Total Sessions
                        </p>
                      </div>
                      <Typography variant="p" size="p" className="text-secondary/50">
                        {astrology.description}
                      </Typography>
                    </div>
                    <div className="w-full mb-2 md:w-auto flex text-sm font-semibold text-center justify-between md:justify-center">
                      <div className="flex flex-row md:flex-col gap-2 md:gap-0 items-center">
                        <Typography
                          variant="p"
                          size="h5"
                          className="flex gap-0.5 md:gap-1 lg:gap-1.5 2xl:gap-2 justify-center items-center text-secondary md:mb-1 lg:mb-2"
                        >
                          {astrology.rating}
                          <span className="size-4 lg:size-6 2xl:size-8 4xl:size-10">
                            <IconStar />
                          </span>
                        </Typography>
                        <Typography variant="p" size="p" className="text-secondary/50">
                          {astrology.reviews}
                        </Typography>
                      </div>
                      <button className="size-5 lg:size-6 2xl:size-8 4xl:size-10 ms-2 md:ms-3 xl:md-3.5 2xl:ms-3 3xl:mx-4 4xl:md-6">
                        <IconFavorite />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3 md:mt-4 lg:mt-5 2xl:mt-6 4xl:mt-8">
                    <Button variant="highlight">Schedule your time</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Astrologers;
