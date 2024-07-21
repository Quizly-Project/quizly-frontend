import React, { useEffect, useState } from 'react';
import Text from '../Text/Text';
import SearchBar from '../SearchBar/SearchBar';
import QuizList from '../QuizList/QuizList';
import QuizDetailModal from '../QuizDetailModal/QuizDetailModal';
import { getMyQuiz } from '../../../api/axios';
import useAuthStore from '../../../store/authStore';

const MyQuiz = () => {
  const user = useAuthStore(state => state.user);
  const [selectQuiz, setSelectQuiz] = useState(null);
  const [myQuizzes, setMyQuizzes] = useState([]);

  // 내가 생성한 퀴즈 목록 불러오기
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getMyQuiz(`${user}`);
        console.log(response);
        setMyQuizzes(response || []);
      } catch (err) {
        console.error('Failed to fetch my quiz', err);
      }
    };

    fetchResults();
  }, [user]);

  const handleQuizClick = quiz => {
    setSelectQuiz(quiz);
  };

  const handleCloseModal = () => {
    setSelectQuiz(null);
  };

  const handleCreateRoom = () => {
    // 퀴즈 방 만들기 로직
    console.log('퀴즈 방 만들기');
  };

  return (
    <>
      <Text type="title" size="large" weight="bold">
        내 퀴즈
      </Text>
      <SearchBar />
      <QuizList quizzes={myQuizzes} onClick={handleQuizClick} />
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
