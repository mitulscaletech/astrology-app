import Link from "next/link";
import Image from "next/image";

import Typography from "@/components/ui/typography";
import { Button } from "../ui/button";
import { FC } from "react";

interface AstrologyCardProps {
  image: string;
  tag?: string;
  title: string;
  description: string;
  btnText?: string;
  isSmallImg?: boolean;
}

const AstrologyCard: FC<AstrologyCardProps> = ({
  image,
  tag,
  title,
  description,
  btnText = "Book Now",
  isSmallImg = false
}) => {
  return (
    <div className="flex flex-col hover:bg-highlight/20 p-3.5 md:p-5 lg:p-6 xl:p-2.5 2xl:p-3 4xl:p-6 border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full transition-all ease-out duration-200">
      <div
        className={`mb-3 md:mb-3.5 xl:mb-4 3xl:mb-6 mx-auto ${isSmallImg ? "w-40 md:w-52" : " w-48 sm:w-56 xl:w-full"}`}
      >
        <Image src={image} alt={title} width={360} height={360} className="w-full aspect-square object-contain" />
      </div>
      <div className="px-1.5 3xl:px-3 4xl:px-4 pb-2 4xl:pb-4 grow flex flex-col">
        {tag && (
          <Typography variant="p" size="p" className="mb-2">
            {tag}
          </Typography>
        )}
        <Typography variant="h3" size="h5-head" className="font-head font-semibold mb-2.5 md:mb-3 xl:mb-4">
          {title}
        </Typography>
        <Typography variant="p" size="p" className="text-secondary/70">
          {description}
        </Typography>
        <div className="text-end mt-auto">
          <Button asChild variant="highlight" className="mt-3 md:mt-4 xl:mt-5 2xl:mt-6 3xl:mt-8">
            <Link href="/astrology/holistic-life-blueprint">{btnText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AstrologyCard;
