import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import IconCalender from "@/shared/icons/calender";

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | undefined) => void;
}

export const DatePicker = ({ label, value, onChange }: DatePickerProps) => (
  <div>
    <Label>{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !value && "text-secondary-300")}
        >
          <span className="mr-2 h-4 w-4">
            <IconCalender />
          </span>
          {value ? format(value, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value || undefined}
          onSelect={onChange}
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  </div>
);
