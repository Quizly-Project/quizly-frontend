import { create } from 'zustand';

// 초기 상태 정의
const initialQuizRoom = {
  type: '',
  roomCode: '',
  nickName: '',
  isFinish: false,
  isStarted: false,
};

const useQuizRoomStore = create((set, get) => ({
  // 상태
  quizRoom: initialQuizRoom,

  // 액션
  setQuizRoom: quizRoom => set({ quizRoom }),

  updateQuizRoom: partial =>
    set(state => ({
      quizRoom: { ...state.quizRoom, ...partial },
    })),

  resetQuizRoom: () => set({ quizRoom: initialQuizRoom }),

  startQuiz: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isStarted: true },
    })),

  endQuiz: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isStarted: false },
    })),

  // 선택자
  isQuizActive: () => {
    const { isStarted, isFinish } = get().quizRoom;
    return isStarted && !isFinish;
  },
}));

export default useQuizRoomStore;
