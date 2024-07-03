// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/common/SearchBar/SearchBar.jsx';
import QuizCard from '../../components/common/QuizCard/QuizCard.jsx';
import Text from '../../components/common/Text/Text.jsx';
import QuizDetailModal from '../../components/common/QuizDetailModal/QuizDetailModal.jsx';
import styles from './Dashboard.module.css';
import QuizList from '../../components/common/QuizList/QuizList';
import api, { getQuizzes } from '../../api/axios.js';

const Dashboard = () => {
  const [selectQuiz, setSelectQuiz] = useState(null);

  const [quizItems, setQuizItems] = useState([]);

  useEffect(() => {
    getQuizzes().then(res => {
      console.log('res', res);
      setQuizItems(res);
    });
  }, []);

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

export default Dashboard;
