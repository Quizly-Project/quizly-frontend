import React, { useState, useEffect, useRef } from 'react';
import styles from './QuizQuestionCompletion.module.css';

const QuizQuestionCompletion = ({ message, onComplete, show }) => {
  const [visible, setVisible] = useState(false);
  const [animationState, setAnimationState] = useState('initial');
  const whistleRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 오디오 객체 생성
    whistleRef.current = new Audio('/src/assets/whistle.wav');
    whistleRef.current.preload = 'auto'; // 오디오 미리 로드

    // 컴포넌트 언마운트 시 오디오 객체 정리
    return () => {
      if (whistleRef.current) {
        whistleRef.current.pause();
        whistleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      // 오디오 재생 및 상태 업데이트를 동시에 시작
      const playAndAnimate = async () => {
        try {
          setVisible(true);
          setAnimationState('slideIn');
          await whistleRef.current.play();
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      };

      playAndAnimate();

      const timer = setTimeout(() => {
        setAnimationState('slideOut');
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 500); // Wait for slide out animation
      }, 2000);

      return () => {
        clearTimeout(timer);
        if (whistleRef.current) {
          whistleRef.current.pause();
          whistleRef.current.currentTime = 0;
        }
      };
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.quizQuestionCompletion} ${styles[animationState]}`}
    >
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  );
};

export default QuizQuestionCompletion;
