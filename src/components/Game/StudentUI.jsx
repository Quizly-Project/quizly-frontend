import QuizResultText from './QuizResultText';

const StudentUI = ({ quizResult }) => {
  return (
    <div className="student-ui">
      {/* 학생 전용 UI 요소들 (예: 답변 제출 버튼, 점수 표시 등) */}
      {/* {quizResult && <QuizResultText quizResult={`정답: ${quizResult}`} />} */}
    </div>
  );
};

export default StudentUI;
