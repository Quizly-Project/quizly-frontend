import { useState, useEffect } from 'react';
import QuizResultText from './QuizResultText';
import ChatComponent from '../common/ChatComponent/ChatComponent';
import ParticipantList from './ParticipantList/ParticipantList';
import Timer from './Timer/Timer';
import QuizProgress from './QuizProgress/QuizProgress';
import TopThreeParticipants from './TopThreeParticipants/TopThreeParticipants';
import QuizQuestionCompletion from './QuizQuestionCompletion/QuizQuestionCompletion';
import useQuizRoomStore from '../../store/quizRoomStore';
import RoundEndMessage from './RoundEndMessage/RoundEndMessage';
import FinalTopThreeParticipants from './FinalTopThreeParticipants/FinalTopThreeParticipants';

const CommonUI = ({
  quizResult,
  quiz,
  timer,
  quizCnt,
  quizIndex,
  quizAnswerer,
  nickName,
  isJoined,
  code,
  participants,
  onSelectStudent,
  selectedStudent,
  isTeacher,
}) => {
  const [showCompletion, setShowCompletion] = useState(false);
  const {
    isStarted,
    isQuestionActive,
    isFinished,
    showTopThree,
    hideTopThree,
    isEndEventVisible,
  } = useQuizRoomStore(state => state.quizRoom);

  const handleOnComplete = () => {
    setShowCompletion(false);
  };

  useEffect(() => {
    console.log('isStarted', isStarted);
    console.log('isQuestionActive', isQuestionActive);
    console.log('isFinished', isFinished);
    console.log('quizIndex', quizIndex);
    console.log('quizCnt', quizCnt);
    console.log('quizResult', quizResult);
    if ((isStarted || isFinished) && !isQuestionActive && isEndEventVisible)
      setShowCompletion(true);
  }, [isStarted, isFinished, isQuestionActive, isEndEventVisible]);

  return (
    <div className="common-ui">
      {isJoined && (
        <ChatComponent
          roomCode={code}
          nickName={nickName}
          isTeacher={isTeacher}
        />
      )}
      {
        // <QuizQuestionCompletion
        //   message={'정지!'}
        //   onComplete={handleOnComplete}
        //   show={showCompletion}
        // />
        <RoundEndMessage
          message={'정지!'}
          onComplete={handleOnComplete}
          show={showCompletion}
        />
      }

      <QuizProgress currentQuiz={quizIndex} totalQuizzes={quizCnt} />

      <ParticipantList
        participants={participants}
        isTeacher={isTeacher}
        onSelectStudent={onSelectStudent}
        selectedStudent={selectedStudent}
      />
      <Timer timer={timer} />

      {/* 마지막 문제 전까지의 리더보드 */}
      {!isFinished &&
        showTopThree &&
        quizResult &&
        quizIndex > 0 &&
        quizIndex <= quizCnt - 1 && (
          <TopThreeParticipants
            quizResult={quizResult}
            isStarted={isStarted}
            participants={participants}
            hideTopThree={hideTopThree}
          />
        )}

      {/* 퀴즈 종료되면 탑3 랭킹 */}
      {isFinished && showTopThree && (
        <>
          {/* <QuizResultText quizResult="퀴즈 종료" /> */}
          <FinalTopThreeParticipants
            quizResult={quizResult}
            isStarted={isStarted}
            participants={participants}
            hideTopThree={hideTopThree}
          />
        </>
      )}
    </div>
  );
};

export default CommonUI;
