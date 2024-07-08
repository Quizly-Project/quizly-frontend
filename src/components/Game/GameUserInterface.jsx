import { Html } from '@react-three/drei';
import CommonUI from './CommonUI';
import TeacherUI from './TeacherUI/TeacherUI';
import StudentUI from './StudentUI';
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
    <Html fullscreen={isTeacher}>
      <div className="game-ui">
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
    </Html>
  );
};

export default GameUserInterface;
