import React, { useState } from 'react';
import Text from '../Text/Text';
import SearchBar from '../SearchBar/SearchBar';
import QuizList from '../QuizList/QuizList';
import QuizDetailModal from '../QuizDetailModal/QuizDetailModal';

const MyQuiz = () => {
  const [selectQuiz, setSelectQuiz] = useState(null);

  const quizItems = [
    { quizTitle: '내 퀴즈 1', quizDescription: '퀴즈에 관한 상세 설명' },
    { quizTitle: '내 퀴즈 2', quizDescription: '퀴즈에 관한 상세 설명' },
    { quizTitle: '내 퀴즈 3', quizDescription: '퀴즈에 관한 상세 설명' },
    { quizTitle: '내 퀴즈 4', quizDescription: '퀴즈에 관한 상세 설명' },
    { quizTitle: '내 퀴즈 5', quizDescription: '퀴즈에 관한 상세 설명' },
  ];

  const handleQuizClick = quiz => {
    console.log('퀴즈 클릭');
    setSelectQuiz(quiz);
  };

  const handleCloseModal = () => {
    setSelectQuiz(null);
  };

  const handleCreateRoom = () => {
    // 퀴즈 방 만들기
    console.log('퀴즈 방 만들기');
  };

  return (
    <>
      <Text type="title" size="large" weight="bold">
        내 퀴즈
      </Text>
      <SearchBar />
      <QuizList quizzes={quizItems} onClick={handleQuizClick} />
      {selectQuiz && (
        <QuizDetailModal
          quiz={selectQuiz}
          onClose={handleCloseModal}
          onCreateRoom={handleCreateRoom}
        />
      )}
    </>
  );
};

export default MyQuiz;
