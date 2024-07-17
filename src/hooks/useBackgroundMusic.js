import { useState, useEffect, useRef, useCallback } from 'react';

const useBackgroundMusic = isTeacher => {
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);
  const bgMusicRef = useRef(new Audio('/src/assets/YoHo Beat-Duck.mp3'));

  useEffect(() => {
    if (!isTeacher) return;
    // ... 배경 음악 관련 로직
    const bgMusic = bgMusicRef.current;
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    const playMusic = () => {
      bgMusic.play().catch(error => {
        console.error('음악 재생 실패:', error);
        // 자동 재생 실패 시 사용자에게 알림
        // alert('배경 음악을 재생하려면 화면을 클릭해주세요.');
      });
      setIsBgMusicPlaying(true);
      // 이벤트 리스너 제거
      document.removeEventListener('click', playMusic);
    };

    // 컴포넌트 마운트 시 음악 재생 시도
    playMusic();

    // 자동 재생 실패를 대비해 클릭 이벤트 리스너 추가
    document.addEventListener('click', playMusic);

    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      document.removeEventListener('click', playMusic);
    };
  }, [isTeacher]);

  const toggleBackgroundMusic = useCallback(() => {
    const bgMusic = bgMusicRef.current;
    if (isBgMusicPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(console.error);
    }
    setIsBgMusicPlaying(!isBgMusicPlaying);
  }, [isBgMusicPlaying]);

  return { isBgMusicPlaying, toggleBackgroundMusic };
};

export default useBackgroundMusic;
