import QuizResultText from './QuizResultText';
import Question from './Question';

const CommonUI = ({ quizResult, isStarted, quiz }) => {
  return (
    <div className="common-ui">
      {quizResult && <QuizResultText quizResult={quizResult} />}
      {isStarted && <Question quizData={quiz} />}
      {/* 다른 공통 UI 요소들 */}
    </div>
  );
};

export default CommonUI;
