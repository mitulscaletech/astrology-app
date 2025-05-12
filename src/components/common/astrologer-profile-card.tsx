import Typography from "@/components/ui/typography";
import IconGroups from "@/shared/icons/groups";
import IconVideo from "@/shared/icons/video";
import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import Image from "next/image";
import IconEdit from "@/shared/icons/edit";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import IconStar from "@/shared/icons/star";

const DATA = {
  id: 1,
  name: "Dr Ganesh Prasad Mishra",
  languages: ["English", "Hindi"],
  activeSessions: 26,
  totalSessions: 354,
  rating: 4.7,
  reviews: "Last 30 days",
  thumbnail: astrologerImg1,
  tags: ["Janma Kundali", "Muhurat", "Prashna Kundali"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
};

interface ProfileCardProps {
  isButtons?: boolean;
  isDesc?: boolean;
}

const ProfileCard: FC<ProfileCardProps> = ({ isButtons, isDesc = false }) => {
  return (
    <div className="flex items-start flex-col md:flex-row my-2 lg:my-4 2xl:my-6 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-12 4xl:gap-14 py-4 md:py-6 lg:py-8 xl:py-8 2xl:py-12 4xl:py-14 px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 4xl:px-16 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card">
      <div className="w-32 md:w-40 xl:w-48 2xl:w-64 4xl:w-72 relative shrink-0 shadow-card">
        <Image
          src={DATA.thumbnail}
          width={770}
          height={440}
          alt={DATA.name}
          className="w-full aspect-[278/288] rounded-xl xl:rounded-2xl object-cover"
        />
        <div className="flex justify-center items-center size-8 md:size-10 2xl:size-16 bg-accent-white absolute bottom-0 end-0 translate-y-1/4 translate-x-1/3 rounded-full shadow-card">
          <span className="w-7/12">
            <IconEdit />
          </span>
          <input type="file" className="absolute size-full bottom-0 end-0 opacity-0" />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between md:gap-2">
        <div className="lg:w-10/12 2xl:w-9/12 4xl:w-8/12">
          <Typography variant="p" size="p" className="text-secondary/50 mb-2">
            {DATA.tags.join(" • ")}
          </Typography>
          <Typography variant="h3" size="h4" className="font-semibold">
            {DATA.name}
          </Typography>
          <div className="text-secondary/50 font-medium flex flex-col gap-2 md:gap-2.5 lg:gap-3 2xl:gap-4 my-2 md:my-3 lg:my-4 2xl:my-5 4xl:my-6">
            <p className="flex gap-3 items-center">
              <span className="size-5 lg:size-6">
                <IconVideo />
              </span>
              {DATA.activeSessions} Active Sessions
            </p>
            <p className="flex gap-3 items-center">
              <span className="size-5 lg:size-6">
                <IconGroups />
              </span>
              {DATA.totalSessions} Total Sessions
            </p>
          </div>
          {isButtons && (
            <div className="flex gap-2 md:gap-4 xl:gap-5 2xl:gap-6 mt-2 lg:mt-4 xl:mt-6 2xl:mt-8">
              <Button variant="outline">
                <Link href="/">earnings</Link>
              </Button>
              <Button variant="highlight">
                <Link href="/">MANAGE BOOKINGS</Link>
              </Button>
            </div>
          )}
          {isDesc && (
            <Typography variant="p" size="p" className="text-secondary/50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          )}
        </div>
        <div className="w-full mb-2 md:w-auto flex text-center justify-between md:justify-center">
          <div className="flex flex-row md:flex-col gap-2 md:gap-0 items-center">
            <Typography
              variant="p"
              size="h3"
              className="font-bold flex gap-0.5 md:gap-1 lg:gap-1.5 2xl:gap-2 justify-center items-center text-secondary md:mb-1 lg:mb-2"
            >
              {DATA.rating}
              <span className="size-6 lg:size-8 xl:size-10 2xl:size-12 4xl:size-15">
                <IconStar />
              </span>
            </Typography>
            <Typography variant="p" size="p" className="text-secondary/50 font-medium">
              {DATA.reviews}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
