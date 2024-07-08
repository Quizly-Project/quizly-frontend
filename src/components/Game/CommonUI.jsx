import QuizResultText from './QuizResultText';
import Question from './Question';
import Text from '../common/Text/Text';
const CommonUI = ({
  quizResult,
  isStarted,
  quiz,
  timer,
  isQuizEnded,
  participants,
  quizCnt,
  quizIndex,
}) => {
  return (
    <div className="common-ui">
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        참가자: {participants}{' '}
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
      {quizResult && <QuizResultText quizResult={`정답: ${quizResult}`} />}
      {timer > 0 ? <QuizResultText quizResult={timer} /> : null}
      {isQuizEnded && <QuizResultText quizResult="퀴즈 종료" />}
    </div>
  );
};

export default CommonUI;
