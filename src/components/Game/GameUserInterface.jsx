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
}) => {
  return (
    <Html fullscreen>
      <div className="game-ui">
        <CommonUI quizResult={quizResult} isStarted={isStarted} quiz={quiz} />
        {isTeacher ? (
          <TeacherUI
            handleClickQuizStart={handleClickQuizStart}
            isStarted={isStarted}
          />
        ) : (
          <StudentUI />
        )}
      </div>
    </Html>
  );
};

export default GameUserInterface;
