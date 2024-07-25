import React from 'react';
import styles from './QuizStartButton.module.css';

export default function QuizStartButton({ toggleQuizStart, children }) {
  return (
    <div className={styles.buttonWrapper}>
      <button
        type="button"
        className={styles.quizStartButton}
        onClick={toggleQuizStart}
      >
        {children}
      </button>
    </div>
  );
}
