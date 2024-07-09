import CommonUI from '../CommonUI.jsx';
import TeacherUI from '../TeacherUI/TeacherUI.jsx';
import StudentUI from '../StudentUI.jsx';

import styles from './GameUserInterface.module.css';

const GameUserInterface = ({
  isTeacher,
  handleClickQuizStart,
  isStarted,
  quiz,
  quizResult,
  timer,
  isQuizEnded,
  participants,
  quizCnt,
  quizIndex,
}) => {
  return (
    <>
      <div className={styles.gameUI}>
        <CommonUI
          quizResult={quizResult}
          isStarted={isStarted}
          quiz={quiz}
          timer={timer}
          isQuizEnded={isQuizEnded}
          participants={participants}
          quizCnt={quizCnt}
          quizIndex={quizIndex}
        />
        {isTeacher ? (
          <TeacherUI
            handleClickQuizStart={handleClickQuizStart}
            isStarted={isStarted}
            isQuizEnded={isQuizEnded}
          />
        ) : (
          <StudentUI />
        )}
      </div>
    </>
  );
};

export default GameUserInterface;
