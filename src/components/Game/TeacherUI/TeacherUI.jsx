import QuizStartButton from '../QuizStartButton';
import styles from './TeacherUI.module.css';

const option = ['무응답', 'O', 'X', '3', '4'];

const StudentResults = ({ quizResult }) => {
  const { answers, correctAnswer, correctAnswerList } = quizResult;

  return (
    <div>
      <h2>퀴즈 결과</h2>
      <p>정답: {option[correctAnswer]}</p>
      <p>정답자: {correctAnswerList.join(', ') || '없음'}</p>

      <h3>학생별 결과</h3>
      {Object.entries(answers).map(([studentName, data]) => (
        <div key={studentName}>
          <h4>{studentName}</h4>
          <p>총점: {data.totalScore}</p>
          <ul>
            {data.result.map((result, index) => (
              <li key={index}>
                문제 {index + 1}:{result === '0' ? '정답' : '오답'}
                (선택한 답: {option[data.selectOption[index]]})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const TeacherUI = ({
  handleClickQuizStart,
  isStarted,
  isQuizEnded,
  quizResult,
}) => {
  return (
    <div className={styles.teacherUI}>
      {quizResult && !isStarted && !isQuizEnded && (
        <StudentResults quizResult={quizResult} />
      )}
      {!isStarted && !isQuizEnded && (
        <QuizStartButton toggleQuizStart={handleClickQuizStart} />
      )}
      {/* 교사 전용 UI 요소들 (예: 학생 관리 패널, 퀴즈 컨트롤 등) */}
    </div>
  );
};

export default TeacherUI;
