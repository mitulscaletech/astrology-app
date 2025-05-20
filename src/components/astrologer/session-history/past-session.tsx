import SessionCard from "@/components/common/session-card";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/custom-select";
import SearchBox from "@/components/ui/search-box";
import Typography from "@/components/ui/typography";
import { DAYS_FILTER_OPTION } from "@/shared/constants";
import { IconDownload } from "@/shared/icons/session-history";

export default function PastSession() {
  const receipts = [
    {
      id: "1",
      name: "Richard Walters",
      service: "Janma Kundali",
      type: "Holistic Life Blueprint",
      date: "April 24, 2023",
      time: "10:00 - 11:00 AM",
      amount: 3999.0,
      currency: "Rs.",
      avatarUrl: "/placeholder.svg?height=80&width=80"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      service: "Career Path ",
      type: "Holistic Life Blueprint",
      date: "May 15, 2023",
      time: "14:30 - 15:30 PM",
      amount: 2499.0,
      currency: "Rs.",
      avatarUrl: "/placeholder.svg?height=80&width=80"
    },
    {
      id: "3",
      name: "Michael Chen",
      service: "Relationship Compatibility Reading",
      type: "Holistic Life Blueprint",
      date: "June 7, 2023",
      time: "09:15 - 10:15 AM",
      amount: 4500.0,
      currency: "Rs.",
      avatarUrl: "/placeholder.svg?height=80&width=80"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col gap-1.5">
        <Typography size="h5" className="text-3.5xl text-secondary font-bold">
          Session History
        </Typography>
        <Typography size="p" className="text-lg text-secondary font-normal">
          Review your past sessions, track your earnings, and download invoices—all in one place. Stay organized and
          keep your practice running smoothly.
        </Typography>
      </div>
      <div className="flex justify-between items-center mt-8">
        <div className="w-40 md:w-48 xl:w-48 2xl:w-52">
          <CustomSelect
            isMulti={false}
            options={DAYS_FILTER_OPTION}
            //value={selected}
            //onChange={(option) => setSelected(option as { value: string; label: string } | null)}
            isFloatingLabel={false}
          />
        </div>
        <div className="flex justify-end gap-2 lg:gap-3">
          <div className="w-32 md:w-40 xl:w-48">
            <SearchBox />
          </div>
          <Button variant="outline-secondary">
            <span className="size-6">
              <IconDownload />
            </span>
            Download all invoices
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 mt-8">
        {receipts.map((receipt) => (
          <SessionCard key={receipt.id} receipt={receipt} />
        ))}
      </div>
    </div>
  );
}
