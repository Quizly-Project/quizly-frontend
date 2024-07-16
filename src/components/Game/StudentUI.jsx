import GoldenbellUI from './GoldenbellUI/GoldenbellUI';
import useQuizRoomStore from '../../store/quizRoomStore';

const StudentUI = () => {
  const { type, isStarted } = useQuizRoomStore(state => state.quizRoom);
  return (
    <div className="student-ui">
      {/* 학생 전용 UI 요소들 (예: 답변 제출 버튼, 점수 표시 등) */}
      {type === 2 && isStarted && <GoldenbellUI />}
    </div>
  );
};

export default StudentUI;
