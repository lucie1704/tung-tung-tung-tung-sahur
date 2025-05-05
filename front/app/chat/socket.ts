import { io } from "socket.io-client";
import { create } from 'zustand';

interface SocketStore {
  isConnected: boolean;
  setIsConnected: (state: boolean) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  isConnected: false,
  setIsConnected: (state) => set({ isConnected: state }),
}));

export const socket = io("http://localhost:3001", {
  autoConnect: false,
});

// Gérer l'état de connexion
socket.on('connect', () => {
  useSocketStore.getState().setIsConnected(true);
});

socket.on('disconnect', () => {
  useSocketStore.getState().setIsConnected(false);
});
