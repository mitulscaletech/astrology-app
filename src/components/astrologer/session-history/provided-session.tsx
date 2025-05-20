import ProvidedSessionCard from "@/components/common/provided-session-card";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

export default function ProvidedSession() {
  const receipts = [
    {
      id: "1",
      service: "Janma Kundali",
      type: "Holistic Life Blueprint",
      description:
        "A comprehensive Vedic birth chart reading to uncover life patterns, strengths, and spiritual direction.",
      amount: 3999.0,
      avatarUrl: "/placeholder.svg?height=80&width=80"
    },
    {
      id: "2",
      service: "Kundali Matching",
      type: "Holistic Life Blueprint",
      description:
        "A detailed compatibility analysis for relationships, designed to guide life partners toward mutual growth and balance.",
      amount: 2499.0,
      avatarUrl: "/placeholder.svg?height=80&width=80"
    }
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col gap-1.5">
        <Typography size="h5" className="text-3.5xl text-secondary font-bold">
          Provided Session
        </Typography>
        <Typography size="p" className="text-lg text-secondary font-normal">
          Explore the services you currently offer on the WeWake platform.
        </Typography>
      </div>
      <div className="w-full flex flex-col gap-4 mt-8">
        {receipts.map((receipt) => (
          <ProvidedSessionCard key={receipt.id} receipt={receipt} />
        ))}
      </div>
      <div className="flex justify-between items-center border-[1.5px] border-secondary/10 rounded-3xl p-8 mt-15">
        <div>
          <Typography className="text-3.5xl font-bold">Request to Offer a New Service</Typography>
          <Typography className="text-lg">
            Have a unique service you&apos;d like to provide on WeWake? Submit your request and our team will review it
            shortly.
          </Typography>
        </div>
        <div>
          <Button variant="highlight">Request New Service</Button>
        </div>
      </div>
    </div>
  );
}
