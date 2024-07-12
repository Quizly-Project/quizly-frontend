import QuizResultText from './QuizResultText';
import Question from './Question';
import Text from '../common/Text/Text';
import ChatComponent from '../common/ChatComponent/ChatComponent';
import ParticipantList from './ParticipantList/ParticipantList';

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
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        퀴즈: {quizIndex}/{quizCnt}{' '}
      </Text>
      {timer > 0 ? <QuizResultText quizResult={timer} /> : null}

      {isQuizEnded && <QuizResultText quizResult="퀴즈 종료" />}
      <ParticipantList
        participants={participants}
        isTeacher={isTeacher}
        onSelectStudent={onSelectStudent}
        selectedStudent={selectedStudent}
      />
    </div>
  );
};

export default CommonUI;
