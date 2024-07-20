import { create } from 'zustand';

// 초기 상태 정의
const initialAudioState = {
  bgMusic: null,
  // normalTick: null,
  // fastTick: null,
  tick: null,
  isBgMusicPlaying: false,
  isGameStarted: false,
  whistle: null,
  drumroll: null,
  firstPlace: null,
  writing: null,
};

const useAudioStore = create((set, get) => ({
  // 상태
  audio: initialAudioState,

  // 액션
  initializeAudios: () => {
    const bgMusic = new Audio('/src/assets/YoHo Beat-Duck.mp3');
    // const normalTick = new Audio('/Sounds/timer.mp3');
    // const fastTick = new Audio('/Sounds/fastTimer.mp3');
    const tick = new Audio('/src/assets/tick.mp3');

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
    }
  },

  stopAllSounds: () => {
    const { bgMusic, tick } = get().audio;
    bgMusic?.pause();
    tick?.pause();
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

  // 선택자
  getAudio: type => get().audio[type],

  isAudioPlaying: type => {
    const audio = get().audio[type];
    return audio ? !audio.paused : false;
  },

  // 정지 소리
  initializeWhistle: () => {
    const whistle = new Audio('/src/assets/whistle.wav');
    whistle.preload = 'auto';
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

  // 드럼롤, 1등
  initializeDrumroll: () => {
    const drumroll = new Audio('/Sounds/DrumRoll.mp3');
    drumroll.preload = 'auto';
    drumroll.loop = true;
    set(state => ({ audio: { ...state.audio, drumroll } }));
  },

  initializeFirstPlace: () => {
    const firstPlace = new Audio('/Sounds/FirstPlace.mp3');
    firstPlace.preload = 'auto';
    set(state => ({ audio: { ...state.audio, firstPlace } }));
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

  playFirstPlace: () => {
    const { firstPlace } = get().audio;
    if (firstPlace) {
      firstPlace.currentTime = 0;
      firstPlace
        .play()
        .catch(e => console.error('FirstPlace 오디오 재생 실패:', e));
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
}));

export default useAudioStore;
