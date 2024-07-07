import { create } from 'zustand';
import io from 'socket.io-client';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  initSocket: () => {
    const socket = io('http://localhost:81/quizly');

    socket.on('connect', () => {
      console.log('Socket connected');
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ isConnected: false });
    });

    set({ socket });
  },
  getSocket: () => get().socket,
  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
    }
  },
}));

export default useSocketStore;
