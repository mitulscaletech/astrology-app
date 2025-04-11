// src/context/SocketProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { initSocket, disconnectSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  disconnect: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  disconnect: () => {}
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const s = initSocket();
    s.connect();

    s.on("connect", () => {
      // console.log("✅ Connected to socket server");
    });

    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, []);

  const disconnect = () => {
    disconnectSocket();
    setSocket(null);
  };

  return <SocketContext.Provider value={{ socket, disconnect }}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => useContext(SocketContext);
