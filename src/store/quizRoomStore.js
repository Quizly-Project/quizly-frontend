import { create } from 'zustand';

// 초기 상태 정의
const initialQuizRoom = {
  type: '', // 퀴즈 타입
  roomCode: '', // 퀴즈방 코드
  nickName: '', // 퀴즈 참여한 내 닉네임
  isFinished: false, // 퀴즈 세션 종료 여부
  isStarted: false, // 퀴즈 세션 시작 여부
  isQuestionActive: false, // 문제 출제 여부
  isEndEventVisible: false, // 퀴즈 종료 이벤트 표시 여부
  isCameraOn: false, // 카메라 활성화 여부
  isAnswerDisplayed: false, // 정답 공개 여부
  isResultDisplayed: false, // 결과 공개 여부
  showTopThree: false, // 상위 3명 표시 여부
  isTimerStarted: false, // 타이머 시작 여부
  isBreak: false, // 아일랜드 브레이크 여부
  duration: 0, // 퀴즈 시간
  participants: {}, // 참가자
};

const useQuizRoomStore = create((set, get) => ({
  // 상태
  quizRoom: initialQuizRoom,

  // 기존 액션
  setQuizRoom: quizRoom => set({ quizRoom }),

  updateQuizRoom: partial =>
    set(state => ({
      quizRoom: { ...state.quizRoom, ...partial },
    })),

  resetQuizRoom: () => set({ quizRoom: initialQuizRoom }),

  startQuiz: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isStarted: true, isFinished: false },
    })),

  endQuiz: () =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        isFinished: true,
      },
    })),

  /* 현재 문제를 활성화합니다. */
  activateQuestion: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isQuestionActive: true },
    })),

  /* 현재 문제를 비활성화합니다. */
  deactivateQuestion: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isQuestionActive: false },
    })),

  /* 정답을 표시합니다. */
  displayAnswer: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isAnswerDisplayed: true },
    })),

  /* 정답 표시를 숨깁니다. */
  hideAnswer: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isAnswerDisplayed: false },
    })),

  /* 결과를 표시합니다. */
  displayResult: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isResultDisplayed: true },
    })),

  /* 결과 표시를 숨깁니다. */
  hideResult: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isResultDisplayed: false },
    })),

  // 기존 참가자 관련 액션들
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

  resetAllParticipantsWriteStatus: () => {
    set(state => {
      const updatedParticipants = state.participants
        ? { ...state.participants }
        : {};
      if (Object.keys(updatedParticipants).length > 0) {
        Object.entries(updatedParticipants).forEach(([key, value]) => {
          updatedParticipants[key] = { ...value, hasWritten: false };
        });
      }
      return { participants: updatedParticipants };
    });
  },

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
    set(state => {
      const participants = state.quizRoom?.participants || {};
      return {
        quizRoom: {
          ...state.quizRoom,
          participants: Object.fromEntries(
            Object.entries(participants).map(([nickName, participant]) => [
              nickName,
              { ...participant, userAnswer: '' },
            ])
          ),
        },
      };
    }),

  displayTopThree: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, showTopThree: true },
    })),

  hideTopThree: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, showTopThree: false },
    })),

  setQuizDuration: duration =>
    set(state => ({
      quizRoom: { ...state.quizRoom, duration },
    })),

  startTimer: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isTimerStarted: true },
    })),

  stopTimer: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isTimerStarted: false },
    })),

  updateIsTimerStarted: isTimerStarted =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isTimerStarted },
    })),

  startIsBreak: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isBreak: true },
    })),

  stopIsBreak: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isBreak: false },
    })),

  displayEndEventVisible: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isEndEventVisible: true },
    })),

  hideEndEventVisible: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isEndEventVisible: false },
    })),

  //카메라 활성화
  turnOnCamera: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isCameraOn: true },
    })),

  //카메라 비활성화
  turnOffCamera: () =>
    set(state => ({
      quizRoom: { ...state.quizRoom, isCameraOn: false },
    })),

  // 활성화 초기화
  resetActivation: () =>
    set(state => ({
      quizRoom: {
        ...state.quizRoom,
        isQuestionActive: false,
        isEndEventVisible: false,
        isCameraOn: false,
        isAnswerDisplayed: false,
        isResultDisplayed: false,
        showTopThree: false,
        isTimerStarted: false,
        isBreak: false,
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
