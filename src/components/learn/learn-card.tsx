import { FC } from "react";
import Image from "next/image";

import Typography from "@/components/ui/typography";

interface LearnCardProps {
  image: string;
  date: string;
  title: string;
  description: string;
  readTime?: string;
  isSmallImg?: boolean;
}

const LearnCard: FC<LearnCardProps> = ({ image, date, title, description, readTime }) => {
  return (
    <div className="flex flex-col border border-secondary/20 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card min-h-full overflow-hidden">
      <div>
        <Image src={image} width={572} height={382} alt={date} className="w-full aspect-[572/382] object-cover" />
      </div>
      <div className="p-4 lg:p-5 xl:p-7 2xl:p-8">
        <div className="text-highlight flex justify-between font-medium">
          <Typography variant="p" size="p" className="mb-2 xl:mb-3">
            {date}
          </Typography>
          <Typography variant="p" size="p" className="mb-2">
            {readTime}
          </Typography>
        </div>
        <Typography variant="h4" size="h5" className="mb-2 md:mb-3 xl:mb-4 font-bold capitalize">
          {title}
        </Typography>
        <Typography variant="p" size="p" className="text-secondary/70">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default LearnCard;
