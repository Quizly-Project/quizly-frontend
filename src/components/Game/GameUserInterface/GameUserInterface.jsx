import CommonUI from '../CommonUI.jsx';
import TeacherUI from '../TeacherUI/TeacherUI.jsx';
import StudentUI from '../StudentUI.jsx';

import styles from './GameUserInterface.module.css';

const GameUserInterface = ({
  isTeacher,
  handleClickQuizStart,
  quiz,
  quizResult,
  timer,
  quizCnt,
  quizIndex,
  quizAnswerer,
  isJoined,
  nickName,
  code,
  participants,
  onSelectStudent,
  selectedStudent,
}) => {
  return (
    <>
      <div className={styles.gameUI}>
        <CommonUI
          quizResult={quizResult}
          quiz={quiz}
          timer={timer}
          quizCnt={quizCnt}
          quizIndex={quizIndex}
          quizAnswerer={quizAnswerer}
          nickName={nickName}
          isJoined={isJoined}
          code={code}
          participants={participants}
          onSelectStudent={onSelectStudent}
          selectedStudent={selectedStudent}
          isTeacher={isTeacher}
        />
        {isTeacher ? (
          <TeacherUI
            handleClickQuizStart={handleClickQuizStart}
            quizResult={quizResult}
            participants={participants}
            onSelectStudent={onSelectStudent}
            selectedStudent={selectedStudent}
            quiz={quiz}
            quizCnt={quizCnt}
          />
        ) : (
          <StudentUI />
        )}
      </div>
    </>
  );
};

export default GameUserInterface;
