// socketStore.js
import { create } from 'zustand';
import io from 'socket.io-client';

const socketURL = import.meta.env.VITE_NEST_API_URL || 'http://localhost:3004';

const useSocketStore = create((set, get) => ({
  socket: null,
  isConnected: false,
  isTeacher: false,
  roomCode: null,
  nickname: null,

  initSocket: () => {
    const storedData = JSON.parse(sessionStorage.getItem('socketData'));
    if (!get().socket) {
      const socket = io(`${socketURL}/quizly`, {
        secure: true,
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        console.log('Socket connected');
        set({ isConnected: true });

        if (storedData) {
          if (!storedData.isTeacher) {
            socket.emit('joinRoom', {
              roomCode: storedData.roomCode,
              nickName: storedData.nickname,
            });
          } else {
            // 선생님용 방 입장 로직 (필요한 경우)
            socket.emit('joinTeacherRoom', { roomCode: storedData.roomCode });
          }
        }
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
        set({
          socket: null,
          isConnected: false,
          isTeacher: false,
          roomCode: null,
          nickname: null,
        });
      });

      set({
        socket,
        isTeacher: storedData?.isTeacher || false,
        roomCode: storedData?.roomCode || null,
        nickname: storedData?.nickname || null,
      });
    }
  },

  setSocketData: (roomCode, nickname, isTeacher) => {
    sessionStorage.setItem(
      'socketData',
      JSON.stringify({ roomCode, nickname, isTeacher })
    );
    set({ roomCode, nickname, isTeacher });
  },

  setTeacher: isTeacher => {
    const currentData = JSON.parse(sessionStorage.getItem('socketData')) || {};
    const updatedData = { ...currentData, isTeacher };
    sessionStorage.setItem('socketData', JSON.stringify(updatedData));
    set({ isTeacher });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      sessionStorage.removeItem('socketData');
      set({
        socket: null,
        isConnected: false,
        isTeacher: false,
        roomCode: null,
        nickname: null,
      });
    }
  },
}));

export default useSocketStore;
