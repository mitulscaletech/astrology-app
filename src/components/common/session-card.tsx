"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { IconDownload } from "@/shared/icons/session-history";

interface ISessionCardProps {
  receipt: any;
}

export default function SessionCard({ receipt }: ISessionCardProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download an invoice
    alert(`Downloading invoice for ${receipt.service}`);
  };

  return (
    <Card className="w-full overflow-hidden">
      <div className="flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16" src={receipt.avatarUrl || "/placeholder.svg"} alt={receipt.name} />
          <div>
            <Typography className="font-semibold text-lg text-secondary">{receipt.name}</Typography>
            <Typography className="text-primary text-2xl font-normal">{receipt.service}</Typography>
            <Typography className="text-primary text-2xl font-bold">{receipt.service}</Typography>
            <Typography className="text-base text-secondary/50 mt-1">
              {receipt.date} · {receipt.time}
            </Typography>
          </div>
        </div>
        <div className="flex items-end gap-6">
          <div className="text-right">
            <Typography size="h5" className="text-3.5xl text-secondary font-bold">
              {receipt.currency} {receipt.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </Typography>
            <span className="text-xs font-semibold text-secondary uppercase">Taxes Calculated At Checkout</span>
          </div>
          <Button variant="outline-secondary" onClick={handleDownload}>
            <span className="size-6">
              <IconDownload />
            </span>
            Download Invoice
          </Button>
        </div>
      </div>
    </Card>
  );
}
