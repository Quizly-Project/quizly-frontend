import { useState, useEffect, useRef, useCallback } from 'react';
import useQuizRoomStore from '../store/quizRoomStore';
import useAudioStore from '../store/audioStore';

const useBackgroundMusic = isTeacher => {
  const {
    initializeBgMusic,
    playBgMusic,
    pauseBgMusic,
    toggleBgMusic,
    updateBgMusicVolume,
  } = useAudioStore();
  const isBgMusicPlaying = useAudioStore(state => state.audio.isBgMusicPlaying);

  const { isStarted } = useQuizRoomStore(state => state.quizRoom);

  useEffect(() => {
    if (!isTeacher) return;

    initializeBgMusic();

    const playMusic = () => {
      playBgMusic();
      document.removeEventListener('click', playMusic);
    };

    // 컴포넌트 마운트 시 음악 재생 시도
    playMusic();

    // 자동 재생 실패를 대비해 클릭 이벤트 리스너 추가
    document.addEventListener('click', playMusic);

    return () => {
      pauseBgMusic();
      document.removeEventListener('click', playMusic);
    };
  }, [isTeacher, initializeBgMusic, playBgMusic, pauseBgMusic]);

  useEffect(() => {
    if (isTeacher) {
      updateBgMusicVolume(isStarted ? 0.05 : 0.3);
    }
  }, [isStarted, isTeacher, updateBgMusicVolume]);

  const toggleBackgroundMusic = useCallback(() => {
    toggleBgMusic();
  }, [toggleBgMusic]);

  return { isBgMusicPlaying, toggleBackgroundMusic };
};

export default useBackgroundMusic;
