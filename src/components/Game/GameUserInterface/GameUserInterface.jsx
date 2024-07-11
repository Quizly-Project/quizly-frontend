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
  quizCnt,
  quizIndex,
  quizAnswerer,
  isJoined,
  nickName,
  setIsChatFocused,
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
          isStarted={isStarted}
          quiz={quiz}
          timer={timer}
          isQuizEnded={isQuizEnded}
          quizCnt={quizCnt}
          quizIndex={quizIndex}
          quizAnswerer={quizAnswerer}
          nickName={nickName}
          isJoined={isJoined}
          setIsChatFocused={setIsChatFocused}
          code={code}
          participants={participants}
          onSelectStudent={onSelectStudent}
          selectedStudent={selectedStudent}
          isTeacher={isTeacher}
        />
        {isTeacher ? (
          <TeacherUI
            handleClickQuizStart={handleClickQuizStart}
            isStarted={isStarted}
            isQuizEnded={isQuizEnded}
            quizResult={quizResult}
            participants={participants}
            onSelectStudent={onSelectStudent}
            selectedStudent={selectedStudent}
          />
        ) : (
          <StudentUI quizResult={quizResult} />
        )}
      </div>
    </>
  );
};

export default GameUserInterface;
