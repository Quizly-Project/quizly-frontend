import React, { useState, useEffect } from 'react';
import styles from './QuizQuestionCompletion.module.css';
import useAudioStore from '../../../store/audioStore';

const QuizQuestionCompletion = ({ message, onComplete, show }) => {
  const [visible, setVisible] = useState(false);
  const [animationState, setAnimationState] = useState('initial');
  const { initializeWhistle, playWhistle, stopWhistle } = useAudioStore();

  useEffect(() => {
    initializeWhistle();

    return () => {
      stopWhistle();
    };
  }, [initializeWhistle, stopWhistle]);

  useEffect(() => {
    if (show) {
      const playAndAnimate = async () => {
        setVisible(true);
        setAnimationState('slideIn');
        await playWhistle();
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
        stopWhistle();
      };
    }
  }, [show, onComplete, playWhistle, stopWhistle]);

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
