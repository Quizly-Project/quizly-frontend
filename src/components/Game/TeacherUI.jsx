import QuizStartButton from './QuizStartButton';

const TeacherUI = ({ handleClickQuizStart, isStarted }) => {
  return (
    <div className="teacher-ui">
      {!isStarted && <QuizStartButton toggleQuizStart={handleClickQuizStart} />}
      {/* 교사 전용 UI 요소들 (예: 학생 관리 패널, 퀴즈 컨트롤 등) */}
    </div>
  );
};

export default TeacherUI;