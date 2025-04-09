// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
      autoConnect: false // We'll manually connect
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) throw new Error("Socket not initialized. Call initSocket() first.");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
