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
import { LogLevel } from 'livekit-client';
import { set } from 'react-hook-form';

const Dashboard = () => {
  const [selectQuiz, setSelectQuiz] = useState(null);
  const [roomCode, setRoomCode] = useState(null);
  const [quizItems, setQuizItems] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [quizType, setQuizType] = useState('');

  const {
    socket,
    initSocket,
    isConnected,
    disconnectSocket,
    setSocketData,
    setTeacher,
  } = useSocketStore();

  const navigate = useNavigate();
  useEffect(() => {
    getQuizzes().then(res => {
      setQuizItems(res);
    });
  }, []);

  const handleQuizClick = quiz => {
    setQuizId(quiz.quizGroup);
    setSelectQuiz(quiz);
    setBtnDisabled(false); // 새로운 퀴즈 선택 시 생성 버튼 활성화
    setQuizType(quiz.quizs[0].type);
  };

  const handleCloseModal = () => {
    setSelectQuiz(null);
  };

  const handleRoomCode = roomCode => {
    setRoomCode(roomCode);
    setSelectQuiz(null);
  };

  const handleCreateRoom = () => {
    if (btnDisabled) return;
    // 퀴즈 방 만들기
    if (!isConnected) {
      initSocket();
    }
    setTeacher(true); // 방을 만드는 사람을 선생님으로 설정
    setBtnDisabled(true);
  };

  const handlerRoomClose = () => {
    setRoomCode(null);
    setBtnDisabled(false);
    disconnectSocket();
  };

  const handlerMoveRoom = () => {
    navigate(`/game/${roomCode}/${quizType}`);
  };

  useEffect(() => {
    if (isConnected) disconnectSocket();
  }, []);

  useEffect(() => {
    if (!isConnected || !quizId) return;
    socket.emit('createRoom', { quizGroup: quizId });
    socket.on('roomCode', handleRoomCode);
    return () => {
      socket.off('roomCode', handleRoomCode);
      setBtnDisabled(true);
    };
  }, [isConnected, socket]);

  useEffect(() => {
    if (!roomCode) return;
    setSocketData(roomCode, 'teacher', true);
  }, [roomCode]);

  return (
    <>
      <div className={styles.dashboard}>
        <Text type="title" color="black" size="large" weight="bold">
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
      </div>
    </>
  );
};

export default Dashboard;
