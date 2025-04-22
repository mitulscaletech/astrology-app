import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  session: {
    id: string;
    date: string;
    time: string;
    astrologer: string;
    type: "Video" | "Audio" | "Chat";
    status: "Confirmed" | "Pending" | "Canceled";
  };
  onCancel: (_id: string) => void;
};

export const SessionCard = ({ session, onCancel }: Props) => {
  const isCancelable = session.status === "Confirmed" || session.status === "Pending";

  return (
    <div className="p-4 border rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{session.astrologer}</p>
          <p className="text-sm text-muted-foreground">
            {session.date} at {session.time}
          </p>
        </div>
        <Badge
          variant={session.status === "Confirmed" ? "success" : session.status === "Pending" ? "warning" : "danger"}
        >
          {session.status}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm">Session Type: {session.type}</p>
        {isCancelable && (
          <Button size="sm" variant="danger" onClick={() => onCancel(session.id)}>
            Cancel Session
          </Button>
        )}
      </div>
    </div>
  );
};
