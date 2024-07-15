import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStartButton from '../QuizStartButton';
import StudentResults from '../StudentResult/StudentResult';
import styles from './TeacherUI.module.css';

const TeacherUI = ({
  handleClickQuizStart,
  isStarted,
  isQuizEnded,
  quizResult,
  participants,
  quiz,
  quizCnt,
}) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <div className={styles.uiOverlay}>
      <div
        className={`${styles.teacherDashboard} ${isDashboardOpen ? styles.open : ''}`}
      >
        <h2 className={styles.dashboardHeader}>대시보드</h2>
        {quizResult && (
          <StudentResults
            quizResult={quizResult}
            quiz={quiz}
            quizCnt={quizCnt}
          />
        )}
      </div>
      <button
        className={`${styles.toggleButton} ${isDashboardOpen ? styles.open : ''}`}
        onClick={toggleDashboard}
      >
        {isDashboardOpen ? '►' : '◄'}
      </button>
      {!isStarted &&
        (isQuizEnded ? (
          <div className={styles.startButtonContainer}>
            <QuizStartButton
              toggleQuizStart={handleClick}
              className={styles.quizStartButton}
            >
              종료
            </QuizStartButton>
          </div>
        ) : (
          <div className={styles.startButtonContainer}>
            <QuizStartButton
              toggleQuizStart={handleClickQuizStart}
              className={styles.quizStartButton}
            >
              퀴즈 시작
            </QuizStartButton>
          </div>
        ))}
    </div>
  );
};

export default TeacherUI;
