import React from 'react';
import styles from './QuizProgress.module.css';

const QuizProgress = ({ currentQuiz, totalQuizzes }) => {
  return (
    <div className={styles.quizProgressContainer}>
      <div className={styles.quizInfo}>
        <span className={styles.progressLabel}>Question</span>
        <div className={styles.progressNumbers}>
          <span className={styles.currentQuiz}>{currentQuiz}</span>
          <span className={styles.separator}>/</span>
          <span className={styles.totalQuizzes}>{totalQuizzes}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
