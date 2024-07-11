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
  participants,
  onSelectStudent,
  selectedStudent,
  isTeacher,
}) => {
  return (
    <div className="common-ui">
      {isJoined && (
        <ChatComponent
          nickName={nickName}
          setIsChatFocused={setIsChatFocused}
        />
      )}
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        참가자: {participants.clientCnt}{' '}
      </Text>
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        퀴즈: {quizIndex}/{quizCnt}{' '}
      </Text>
      {isStarted && <Question quizData={quiz} />}
      {timer > 0 ? <QuizResultText quizResult={timer} /> : null}
      {quizAnswerer && <QuizResultText quizResult={quizAnswerer} />}

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
