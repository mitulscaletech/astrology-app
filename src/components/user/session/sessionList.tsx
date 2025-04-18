"use client";

import { useEffect, useState } from "react";
import { SessionCard } from "@/components/user/session/sessionCard";
import { CancelModal } from "@/components/user/session/cancelModal";
import Loader from "@/components/ui/loader";
import { Modal, ModalTrigger, ModalTitle, ModalDescription, ModalClose, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

async function fetchSessions() {
  // Simulated API call
  return [
    {
      id: "1",
      date: "2025-04-20",
      time: "3:00 PM",
      astrologer: "Sage Ananya",
      type: "Video",
      status: "Confirmed"
    },
    {
      id: "2",
      date: "2025-04-10",
      time: "11:00 AM",
      astrologer: "Guru Rahul",
      type: "Chat",
      status: "Canceled"
    }
  ];
}

type Session = {
  id: string;
  date: string;
  time: string;
  astrologer: string;
  type: "Video" | "Audio" | "Chat";
  status: "Confirmed" | "Pending" | "Canceled";
};

export default function SessionList() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchSessions(); // API call
      const formattedData = data.map((session) => ({
        ...session,
        type: session.type as "Video" | "Audio" | "Chat",
        status: session.status as "Confirmed" | "Pending" | "Canceled"
      }));
      setSessions(formattedData);
      setLoading(false);
    };
    load();
  }, []);

  const handleCancel = (id: string) => {
    setSelectedId(id);
  };

  const confirmCancel = () => {
    setSessions((prev) => prev.map((s) => (s.id === selectedId ? { ...s, status: "Canceled" } : s)));
    setSelectedId(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Sessions</h2>
      {sessions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No sessions found.</p>
      ) : (
        sessions.map((session) => <SessionCard key={session.id} session={session} onCancel={handleCancel} />)
      )}
      <Modal>
        <ModalTrigger asChild>
          <Button>Open Uncontrolled Modal</Button>
        </ModalTrigger>

        <ModalContent>
          <ModalTitle className="text-lg font-semibold">Uncontrolled Modal</ModalTitle>
          <ModalDescription className="text-sm text-muted-foreground mt-2">
            This is an internal-state modal.
          </ModalDescription>
          <ModalClose asChild>
            <button className="mt-4 text-sm text-red-500 hover:underline">Close</button>
          </ModalClose>
        </ModalContent>
      </Modal>

      <CancelModal open={!!selectedId} onCancel={() => setSelectedId(null)} onConfirm={confirmCancel} />
    </div>
  );
}
