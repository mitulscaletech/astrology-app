import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "@/assets/scss/datepicker.scss";
import IconChevronLeft from "@/shared/icons/chevronLeft";
import IconChevronRight from "@/shared/icons/chevronRight";

interface IDatePicker {
  selectedDate: Date | null;
  className?: string;
  isFullWidth: boolean;
  change: (date: Date | null) => void;
}
const CustomDatePicker = (props: IDatePicker) => {
  const { selectedDate, change, className, isFullWidth } = props;

  return (
    <div className={`${className}`}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => change(date)}
        inline
        calendarClassName="custom-date-picker full-width"
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-evenly">
            <button onClick={decreaseMonth} className="size-6">
              <IconChevronLeft />
            </button>
            <span className="font-medium text-base text-secondary">{format(date, "MMMM yyyy").toUpperCase()}</span>
            <button onClick={increaseMonth} className="size-6">
              <IconChevronRight />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default CustomDatePicker;
