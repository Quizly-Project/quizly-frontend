import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/common/SearchBar/SearchBar.jsx';
import QuizCard from '../../components/common/QuizCard/QuizCard.jsx';
import Text from '../../components/common/Text/Text.jsx';
import QuizDetailModal from '../../components/common/QuizDetailModal/QuizDetailModal.jsx';
import RoomCodeModal from '../../components/common/RoomCodeModal/RoomCodeModal.jsx';
import styles from './Dashboard.module.css';
import QuizList from '../../components/common/QuizList/QuizList';
import api, { getQuizzes } from '../../api/axios.js';
import useSocketStore from '../../store/socketStore.js';

const Dashboard = () => {
  const [selectQuiz, setSelectQuiz] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [quizItems, setQuizItems] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const { socket, initSocket, setTeacher, isConnected, disconnectSocket } =
    useSocketStore();

  const navigate = useNavigate();
  useEffect(() => {
    getQuizzes().then(res => {
      console.log('res', res);
      setQuizItems(res);
    });
  }, []);

  const handleQuizClick = quiz => {
    console.log('퀴즈 클릭');
    setQuizId(quiz.quizGroup);
    setSelectQuiz(quiz);
  };

  const handleCloseModal = () => {
    setSelectQuiz(null);
  };

  const handleRoomCode = roomCode => {
    console.log('roomCode', roomCode);
    setRoomCode(roomCode);
    setSelectQuiz(null);
  };

  const handleCreateRoom = () => {
    // 퀴즈 방 만들기
    if (!isConnected) {
      initSocket();
      setTeacher(true);
    }
  };

  const handlerRoomClose = () => {
    setRoomCode(null);
    disconnectSocket();
  };

  const handlerMoveRoom = () => {
    navigate(`/game/${roomCode}`);
  };

  useEffect(() => {
    if (!isConnected) return;
    socket.emit('createRoom', { quizGroup: quizId });
    socket.on('roomCode', handleRoomCode);
  }, [isConnected, socket]);

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
      {roomCode && (
        <RoomCodeModal
          code={roomCode}
          onClose={handlerRoomClose}
          onMove={handlerMoveRoom}
        />
      )}
    </>
  );
};

export default Dashboard;
