import { useState, useEffect, useCallback, useRef } from 'react';
import useQuizRoomStore from '../store/quizRoomStore';

export const useTimer = () => {
  const [timer, setTimer] = useState({ percent: 100, remainingTime: 0 });
  const percentRef = useRef(100);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const durationRef = useRef(0);

  const { updateIsTimerStarted } = useQuizRoomStore();

  const startTimer = useCallback(duration => {
    // console.log('Timer started with duration:', duration);
    percentRef.current = 100;
    durationRef.current = duration;
    startTimeRef.current = Date.now();
    setTimer({ percent: 100, remainingTime: duration });

    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000; // 경과 시간 (초)
      const newPercent = 100 - (elapsedTime / duration) * 100;
      const newRemainingTime = Math.max(0, duration - elapsedTime);
      percentRef.current = Math.max(0, newPercent);

      setTimer({
        percent: Math.round(percentRef.current * 100) / 100, // 소수점 두 자리까지 표시
        remainingTime: Math.round(newRemainingTime * 10) / 10, // 소수점 한 자리까지 표시
      });

      if (percentRef.current <= 0) {
        // console.log('Timer reached 0');
        clearInterval(intervalIdRef.current);
        setTimer({ percent: 0, remainingTime: 0 });
        updateIsTimerStarted(false);
      }
    }, 100); // 100ms마다 업데이트
  }, []);

  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const stopTimer = useCallback(() => {
    // console.log('Timer stopped');
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
    setTimer({ percent: 0, remainingTime: 0 });
    updateIsTimerStarted(false);
  }, []);

  return { timer, startTimer, stopTimer };
};
