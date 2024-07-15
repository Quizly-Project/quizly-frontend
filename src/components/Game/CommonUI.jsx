import React, { useState, useEffect } from 'react';
import QuizResultText from './QuizResultText';
import Question from './Question';
import Text from '../common/Text/Text';
import ChatComponent from '../common/ChatComponent/ChatComponent';
import ParticipantList from './ParticipantList/ParticipantList';
import Timer from './Timer/Timer';
import QuizProgress from './QuizProgress/QuizProgress';
import TopThreeParticipants from './TopThreeParticipants/TopThreeParticipants';
import QuizQuestionCompletion from './QuizQuestionCompletion/QuizQuestionCompletion';
import { set } from 'react-hook-form';

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
  const [showCompletion, setShowCompletion] = useState(false);
  const [showTopThree, setShowTopThree] = useState(false);

  const handleOnComplete = () => {
    setShowCompletion(false);
    setShowTopThree(true);
  };

  useEffect(() => {
    if (!isStarted && quizResult) setShowCompletion(true);
  }, [isStarted, quizResult]);

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
      {
        <QuizQuestionCompletion
          message={'정지!'}
          onComplete={handleOnComplete}
          show={showCompletion}
        />
      }
      {showTopThree && (
        <TopThreeParticipants
          quizResult={quizResult}
          isStarted={isStarted}
          participants={participants}
          setShowTopThree={setShowTopThree}
        />
      )}
      <QuizProgress currentQuiz={quizIndex} totalQuizzes={quizCnt} />
      {isQuizEnded && <QuizResultText quizResult="퀴즈 종료" />}
      <ParticipantList
        participants={participants}
        isTeacher={isTeacher}
        onSelectStudent={onSelectStudent}
        selectedStudent={selectedStudent}
      />
      <Timer timer={timer} />
    </div>
  );
};

export default CommonUI;
