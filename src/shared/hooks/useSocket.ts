/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { getSocket } from "@/lib/socket";

export const useSocket = (onConnect?: () => void, onDisconnect?: () => void) => {
  const socket = useRef(getSocket());

  useEffect(() => {
    const s = socket.current;

    const handleConnect = () => {
      // console.log("✅ Socket connected");
      onConnect?.();
    };

    const handleDisconnect = () => {
      // console.log("❌ Socket disconnected");
      onDisconnect?.();
    };

    s.connect();
    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);

    return () => {
      s.off("connect", handleConnect);
      s.off("disconnect", handleDisconnect);
      s.disconnect();
    };
  }, []);

  return socket.current;
};
