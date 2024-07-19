import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizStartButton from '../QuizStartButton';
import StudentResults from '../StudentResult/StudentResult';

import useQuizRoomStore from '../../../store/quizRoomStore';

import styles from './TeacherUI.module.css';

const TeacherUI = ({
  handleClickQuizStart,
  quizResult,
  participants,
  quiz,
  quizCnt,
}) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const navigate = useNavigate();
  const { isQuestionActive, isFinished, roomCode } = useQuizRoomStore(
    state => state.quizRoom
  );

  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const handleClick = () => {
    // TOOD: 퀴즈 종료 시 퀴즈 결과 페이지로 이동하게 만들어라.
    // navigate('/dashboard');
    navigate(`/QuizResult/${roomCode}`);
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
      {!isQuestionActive &&
        (isFinished ? (
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
