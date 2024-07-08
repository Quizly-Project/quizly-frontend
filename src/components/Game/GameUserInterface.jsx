import { Html } from '@react-three/drei';
import CommonUI from './CommonUI';
import TeacherUI from './TeacherUI';
import StudentUI from './StudentUI';
const GameUserInterface = ({
  isTeacher,
  handleClickQuizStart,
  isStarted,
  quiz,
  quizResult,
  timer,
  isQuizEnded,
}) => {
  return (
    <Html fullscreen>
      <div className="game-ui">
        <CommonUI
          quizResult={quizResult}
          isStarted={isStarted}
          quiz={quiz}
          timer={timer}
          isQuizEnded={isQuizEnded}
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
