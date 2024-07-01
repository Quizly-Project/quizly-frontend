// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import SearchBar from '../../components/common/SearchBar/SearchBar.jsx';
import QuizCard from '../../components/common/QuizCard/QuizCard.jsx';
import Text from '../../components/common/Text/Text.jsx';
import QuizDetailModal from '../../components/common/QuizDetailModal/QuizDetailModal.jsx';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [selectQuiz, setSelectQuiz] = useState(null);

  const quizItems = [
    { title: '퀴즈 제목', description: '퀴즈에 관한 상세 설명' },
    { title: '퀴즈 제목', description: '퀴즈에 관한 상세 설명' },
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
        둘러보기
      </Text>
      <SearchBar />
      <div className={styles.quizGrid}>
        {quizItems.map((quiz, index) => (
          <QuizCard
            key={index}
            title={quiz.title}
            description={quiz.description}
            onClick={() => handleQuizClick(quiz)}
          />
        ))}
        {selectQuiz && (
          <QuizDetailModal
            quiz={selectQuiz}
            onClose={handleCloseModal}
            onCreateRoom={handleCreateRoom}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
