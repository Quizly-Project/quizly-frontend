import QuizStartButton from '../QuizStartButton';
import styles from './TeacherUI.module.css';

const TeacherUI = ({ handleClickQuizStart, isStarted, isQuizEnded }) => {
  return (
    <div className={styles.teacherUI}>
      {!isStarted && !isQuizEnded && (
        <QuizStartButton toggleQuizStart={handleClickQuizStart} />
      )}
      {/* 교사 전용 UI 요소들 (예: 학생 관리 패널, 퀴즈 컨트롤 등) */}
    </div>
  );
};

export default TeacherUI;
