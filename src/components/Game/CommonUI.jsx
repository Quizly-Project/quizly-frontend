import QuizResultText from './QuizResultText';
import Question from './Question';

const CommonUI = ({ quizResult, isStarted, quiz, timer, isQuizEnded }) => {
  return (
    <div className="common-ui">
      {isStarted && <Question quizData={quiz} />}
      {quizResult && <QuizResultText quizResult={`정답: ${quizResult}`} />}
      {timer > 0 ? <QuizResultText quizResult={timer} /> : null}
      {isQuizEnded && <QuizResultText quizResult="퀴즈 종료" />}
    </div>
  );
};

export default CommonUI;
