import DatePicker from "react-datepicker";
import { format } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import "@/assets/scss/datepicker.scss";

interface IDatePicker {
  selectedDate: Date | null;
  change: (date: Date | null) => void;
}
const CustomDatePicker = (props: IDatePicker) => {
  const { selectedDate, change } = props;

  return (
    <div className="custom-calender border-2 rounded-lg border-secondary/20 px-6 py-6 mb-8">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => change(date)}
        inline
        calendarClassName="custom-calendar"
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div className="flex items-center justify-evenly px-4 py-2">
            <button onClick={decreaseMonth} className="text-lg">
              &lt;
            </button>
            <span className="font-semibold text-lg text-secondary">{format(date, "MMMM yyyy").toUpperCase()}</span>
            <button onClick={increaseMonth} className="text-lg">
              &gt;
            </button>
          </div>
        )}
        dayClassName={(date) =>
          format(date, "yyyy-MM-dd") === format(selectedDate || new Date(), "yyyy-MM-dd")
            ? "bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto"
            : "text-secondary hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mx-auto"
        }
      />
    </div>
  );
};

export default CustomDatePicker;
