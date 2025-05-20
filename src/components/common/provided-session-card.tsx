"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import Typography from "@/components/ui/typography";

interface IProvidedSessionCardProps {
  receipt: any;
}

export default function ProvidedSessionCard({ receipt }: IProvidedSessionCardProps) {
  return (
    <Card className="w-full overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-6 gap-2.5 rounded-3xl">
        <div className="flex items-center gap-4">
          <Avatar className="h-28 w-28" src={receipt.avatarUrl || "/placeholder.svg"} alt={receipt.name} />
          <div>
            <Typography className="text-primary text-2xl font-normal">{receipt.service}</Typography>
            <Typography className="text-primary text-base font-medium">{receipt.type}</Typography>
            <Typography className="text-base text-secondary/50 mt-1">{receipt.description}</Typography>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0 bg-primary/5 p-6 rounded-3xl">
          {/* <div className="text-right"> */}
          <span className="text-lg text-secondary/50 font-medium">Total Earnings</span>
          <span className="text-4xl font-semibold text-primary uppercase">
            &#8377;{(1600).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-lg font-semibold text-primary">40% Margin</span>
        </div>
      </div>
    </Card>
  );
}
