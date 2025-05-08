import IconArrowForward from "@/shared/icons/arrow-forward";
import { Button } from "../ui/button";
import Typography from "../ui/typography";

const BookSessionWidget = () => {
  return (
    <div className="bg-secondary text-accent-white rounded-xl px-4 md:px-4 xl:px-5 2xl:px-6 3xl:px-8 py-5 md:py-6 xl:py-8 2xl:py-10 3xl:py-12 text-center">
      <Typography variant="h3" size="h5" className="mb-2 lg:mb-3 font-semibold">
        Ready for Clarity?
      </Typography>
      <Typography variant="h3" size="h6" className="opacity-70 3xl:px-4 4xl:px-6 mx-auto">
        A single session can shift your perspective, clear confusion, and guide you toward your next step.
      </Typography>
      <Button variant="highlight" className="w-full mt-5 md:mt-6 xl:mt-8 3xl:mt-10 4xl:mt-12">
        BOOK you session NOW
        <span className="size-5 md:size-6 shrink-0">
          <IconArrowForward />
        </span>
      </Button>
    </div>
  );
};

export default BookSessionWidget;
