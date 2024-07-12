import QuizResultText from './QuizResultText';
import Question from './Question';
import Text from '../common/Text/Text';
import ChatComponent from '../common/ChatComponent/ChatComponent';
import ParticipantList from './ParticipantList/ParticipantList';
import Timer from './Timer/Timer';
import QuizProgress from './QuizProgress/QuizProgress';

const CommonUI = ({
  quizResult,
  isStarted,
  quiz,
  timer,
  isQuizEnded,
  quizCnt,
  quizIndex,
  quizAnswerer,
  nickName,
  isJoined,
  setIsChatFocused,
  code,
  participants,
  onSelectStudent,
  selectedStudent,
  isTeacher,
}) => {
  return (
    <div className="common-ui">
      {isJoined && (
        <ChatComponent
          roomCode={code}
          nickName={nickName}
          setIsChatFocused={setIsChatFocused}
          isTeacher={isTeacher}
        />
      )}
      <QuizProgress currentQuiz={quizIndex} totalQuizzes={quizCnt} />
      {isQuizEnded && <QuizResultText quizResult="퀴즈 종료" />}
      <ParticipantList
        participants={participants}
        isTeacher={isTeacher}
        onSelectStudent={onSelectStudent}
        selectedStudent={selectedStudent}
      />
      <Timer timer={timer} />
    </div>
  );
};

export default CommonUI;
