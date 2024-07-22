import { create } from 'zustand';

// 초기 상태 정의
const initialAudioState = {
  bgMusic: null,
  isBgMusicPlaying: false,
  isGameStarted: false,
  tick: null, // 타이머 소리
  whistle: null, // 정지 소리
  drumroll: null, // 두구두구 소리
  firstPlace: null, // 1등 공개 소리
  writing: null, // 칠판에 글씨 쓰는 소리
  fall: null, // 땅 무너지는 소리
  twinkle: null,
  right: null,
  wrong: null,
};

const useAudioStore = create((set, get) => ({
  // 상태
  audio: initialAudioState,

  // 액션
  initializeAudios: () => {
    const bgMusic = new Audio('/src/assets/YoHo Beat-Duck.mp3');

    // const normalTick = new Audio('/Sounds/timer.mp3');
    // const fastTick = new Audio('/Sounds/fastTimer.mp3');
    const tick = new Audio('/Sounds/tick.mp3');

    bgMusic.loop = true;
    // normalTick.loop = true;
    // fastTick.loop = true;
    tick.loop = true;
    set({ audio: { ...get().audio, bgMusic, tick } });
  },

  // 브금 관련
  initializeBgMusic: () => {
    const bgMusic = new Audio('/src/assets/YoHo Beat-Duck.mp3');
    bgMusic.loop = true;
    bgMusic.playbackRate = 1.5;
    set(state => ({ audio: { ...state.audio, bgMusic } }));
  },

  playBgMusic: () => {
    const { bgMusic } = get().audio;
    if (bgMusic) {
      bgMusic.play().catch(console.error);
      set(state => ({ audio: { ...state.audio, isBgMusicPlaying: true } }));
    }
  },

  pauseBgMusic: () => {
    const { bgMusic } = get().audio;
    if (bgMusic) {
      bgMusic.pause();
      set(state => ({ audio: { ...state.audio, isBgMusicPlaying: false } }));
    }
  },

  toggleBgMusic: () => {
    const { bgMusic, isBgMusicPlaying } = get().audio;
    if (bgMusic) {
      if (isBgMusicPlaying) {
        bgMusic.pause();
      } else {
        bgMusic.play().catch(console.error);
      }
      set(state => ({
        audio: { ...state.audio, isBgMusicPlaying: !isBgMusicPlaying },
      }));
    }
  },

  updateBgMusicVolume: volume => {
    const { bgMusic } = get().audio;
    if (bgMusic) {
      bgMusic.volume = volume;
    }
  },

  setGameStarted: isStarted => {
    const { bgMusic } = get().audio;
    if (bgMusic) {
      bgMusic.volume = isStarted ? 0.05 : 0.3;
    }
    set({ audio: { ...get().audio, isGameStarted: isStarted } });
  },

  // 타이머 관련
  playTimerSound: remainingTime => {
    const { tick } = get().audio;

    if (remainingTime > 5) {
      tick.play();
    } else if (remainingTime <= 5 && remainingTime > 3) {
      tick.playbackRate = 1.5;
    } else if (remainingTime <= 3 && remainingTime > 0) {
      tick.playbackRate = 2;
    } else {
      tick.pause();
      tick.playbackRate = 1;
    }
  },

  stopAllSounds: () => {
    const { bgMusic, tick } = get().audio;
    bgMusic?.pause();
    tick?.pause();
    tick.currentTime = 0;
    tick.playbackRate = 1;
    set({ audio: { ...get().audio, isBgMusicPlaying: false } });
  },

  resetAudioState: () => set({ audio: initialAudioState }),

  updateAudioVolume: (type, volume) => {
    const audio = get().audio[type];
    if (audio) {
      audio.volume = volume;
      set({ audio: { ...get().audio, [type]: audio } });
    }
  },

  // 정지 소리
  initializeWhistle: () => {
    const whistle = new Audio('/Sounds/whistle.mp3');
    // whistle.preload = 'auto';
    whistle.currentTime = 0;
    set(state => ({ audio: { ...state.audio, whistle } }));
  },

  playWhistle: async () => {
    const { whistle } = get().audio;
    if (whistle) {
      try {
        await whistle.play();
      } catch (error) {
        console.error('Failed to play whistle:', error);
      }
    }
  },

  stopWhistle: () => {
    const { whistle } = get().audio;
    if (whistle) {
      whistle.pause();
      whistle.currentTime = 0;
    }
  },

  // 두구두구 소리
  initializeDrumroll: () => {
    const drumroll = new Audio('/Sounds/drumroll.mp3');
    drumroll.preload = 'auto';
    drumroll.loop = true;
    set(state => ({ audio: { ...state.audio, drumroll } }));
  },

  playDrumroll: () => {
    const { drumroll } = get().audio;
    if (drumroll) {
      drumroll.play().catch(e => console.error('드럼롤 오디오 재생 실패:', e));
    }
  },

  stopDrumroll: () => {
    const { drumroll } = get().audio;
    if (drumroll) {
      drumroll.pause();
      drumroll.currentTime = 0;
    }
  },

  // 1등 공개 소리
  initializeFirstPlace: () => {
    const firstPlace = new Audio('/Sounds/applause.mp3');
    firstPlace.preload = 'auto';
    firstPlace.volume = 0.3;
    set(state => ({ audio: { ...state.audio, firstPlace } }));
  },

  playFirstPlace: () => {
    const { firstPlace } = get().audio;
    if (firstPlace) {
      firstPlace.currentTime = 0;
      firstPlace
        .play()
        .catch(e => console.error('applause 오디오 재생 실패:', e));
    }
  },

  stopFirstPlace: () => {
    const { firstPlace } = get().audio;
    if (firstPlace) {
      firstPlace.pause();
      firstPlace.currentTime = 0;
    }
  },

  // 칠판에 글씨 쓰기
  initializeWritingSound: () => {
    const writing = new Audio('/Sounds/write.mp3');
    writing.playbackRate = 1;
    writing.loop = true;
    set(state => ({ audio: { ...state.audio, writing } }));
  },

  playWritingSound: () => {
    const { writing } = get().audio;
    if (writing) {
      writing.play().catch(e => console.error('Writing 오디오 재생 실패:', e));
    }
  },

  stopWritingSound: () => {
    const { writing } = get().audio;
    if (writing) {
      writing.pause();
      writing.currentTime = 0;
    }
  },

  // 땅 무너지는 소리
  initializeFallSound: () => {
    const fall = new Audio('/Sounds/fall.mp3');
    fall.preload = 'auto';
    set(state => ({ audio: { ...state.audio, fall } }));
  },

  playFallSound: () => {
    const { fall } = get().audio;
    if (fall) {
      fall.currentTime = 0; // 항상 처음부터 재생
      fall.play().catch(e => console.error('Fall 오디오 재생 실패:', e));
    }
  },

  stopFallSound: () => {
    const { fall } = get().audio;
    if (fall) {
      fall.pause();
      fall.currentTime = 0;
    }
  },

  // 정답자 소리
  initializeTwinkleSound: () => {
    const twinkle = new Audio('/Sounds/twinkle.mp3');
    twinkle.preload = 'auto';
    set(state => ({ audio: { ...state.audio, twinkle } }));
  },

  playTwinkleSound: () => {
    const { twinkle } = get().audio;
    if (twinkle) {
      twinkle.currentTime = 0;
      twinkle.volume = 0.2;
      twinkle.play().catch(e => console.error('twinkle 오디오 재생 실패:', e));
    }
  },

  stopTwinkleSound: () => {
    const { twinkle } = get().audio;
    if (twinkle) {
      twinkle.pause();
      twinkle.currentTime = 0;
    }
  },

  // 정답 소리 초기화
  initializeRightSound: () => {
    const right = new Audio('/Sounds/right.mp3');
    right.preload = 'auto';
    set(state => ({ audio: { ...state.audio, right } }));
  },

  // 오답 소리 초기화
  initializeWrongSound: () => {
    const wrong = new Audio('/Sounds/wrong.mp3');
    wrong.preload = 'auto';
    set(state => ({ audio: { ...state.audio, wrong } }));
  },

  // 정답 소리 재생
  playRightSound: () => {
    const { right } = get().audio;
    if (right) {
      right.currentTime = 0; // 항상 처음부터 재생
      right
        .play()
        .catch(e => console.error('Right sound 오디오 재생 실패:', e));
    }
  },

  // 오답 소리 재생
  playWrongSound: () => {
    const { wrong } = get().audio;
    if (wrong) {
      wrong.currentTime = 0; // 항상 처음부터 재생
      wrong
        .play()
        .catch(e => console.error('Wrong sound 오디오 재생 실패:', e));
    }
  },

  // 정답 소리 중지
  stopRightSound: () => {
    const { right } = get().audio;
    if (right) {
      right.pause();
      right.currentTime = 0;
    }
  },

  // 오답 소리 중지
  stopWrongSound: () => {
    const { wrong } = get().audio;
    if (wrong) {
      wrong.pause();
      wrong.currentTime = 0;
    }
  },

  // 선택자
  getAudio: type => get().audio[type],

  isAudioPlaying: type => {
    const audio = get().audio[type];
    return audio ? !audio.paused : false;
  },
}));

export default useAudioStore;
