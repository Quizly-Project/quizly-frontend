import { create } from 'zustand';

// 초기 상태 정의
const initialQuizRoom = {
  type: '',
  roomCode: '',
  isFinish: false,
  nickName: '',
  isFinished: false,
  isStarted: false,
  participants: {},
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
      quizRoom: { ...state.quizRoom, isFinished: true, isStarted: false },
    })),

  addParticipant: nickName =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: {
          ...state.quizRoom.participants,
          [nickName]: { writeStatus: 'Waiting', score: 0 },
        },
      },
    })),

  removeParticipant: nickName =>
    set(state => {
      const { [nickName]: removed, ...remainingParticipants } =
        state.quizRoom.participants;
      return {
        quizRoom: {
          ...state.quizRoom,
          participants: remainingParticipants,
        },
      };
    }),

  updateParticipantScore: (nickName, score) =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: {
          ...state.quizRoom.participants,
          [nickName]: {
            ...state.quizRoom.participants[nickName],
            score,
          },
        },
      },
    })),
  /*{ nickName : { writeStatus: string(none | isWriting | done) } }*/
  updateParticipantWriteStatus: (nickName, writeStatus) =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: {
          ...state.quizRoom.participants,
          [nickName]: {
            ...state.quizRoom.participants[nickName],
            writeStatus,
          },
        },
      },
    })),

  resetAllParticipantsWriteStatus: (initialStatus = 'none') =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: Object.fromEntries(
          Object.entries(state.quizRoom.participants).map(
            ([nickName, participant]) => [
              nickName,
              { ...participant, writeStatus: initialStatus },
            ]
          )
        ),
      },
    })),
  updateParticipantWriteAnswer: (nickName, answer) =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: {
          ...state.quizRoom.participants,
          [nickName]: {
            ...state.quizRoom.participants[nickName],
            userAnswer: answer,
          },
        },
      },
    })),

  resetAllParticipantsWriteAnswer: () =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        participants: Object.fromEntries(
          Object.entries(state.quizRoom.participants).map(
            ([nickName, participant]) => [
              nickName,
              { ...participant, userAnswer: '' },
            ]
          )
        ),
      },
    })),
  // 선택자
  isQuizActive: () => {
    const { isStarted, isFinished } = get().quizRoom;
    return isStarted && !isFinished;
  },

  getParticipantsMap: () => {
    const { participants } = get().quizRoom;
    return participants || {};
  },
}));

export default useQuizRoomStore;
