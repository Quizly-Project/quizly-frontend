import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from '../../components/common/InputField/InputField';
import Button from '../../components/common/Button/Button';
import Text from '../../components/common/Text/Text';
import useSocketStore from '../../store/socketStore';
import styles from './Landing.module.css';

const Landing = () => {
  const { socket, initSocket, isConnected, disconnectSocket } =
    useSocketStore();
  const [roomCode, setRoomCode] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleCheckRoom = useCallback(
    response => {
      // console.log(response);
      if (response.success) {
        // 방이 존재하면 해당 방으로 이동
        navigate(`/game/${roomCode}/${response.quizType}`);
      } else {
        disconnectSocket();
        // 방이 존재하지 않으면 에러 메시지 표시
        alert('존재하지 않는 방입니다.');
      }
    },
    [navigate, roomCode]
  );

  useEffect(() => {
    // console.log('랜딩페이지', isConnected, roomCode);
    if (isConnected && roomCode) {
      // console.log(roomCode);
      socket.emit('checkRoom', roomCode, handleCheckRoom);
    }
  }, [isConnected, roomCode, socket, handleCheckRoom]);

  const onSubmit = data => {
    setRoomCode(data.code);
    // console.log('커넥트', isConnected);
    if (!isConnected) {
      initSocket();
    }
  };

  return (
    <div className={styles.landingContainer}>
      <h1 className={styles.quizlyTitle}>Quizly</h1>
      <div className={styles.quizTypeCard}>
        <h3 className={styles.quizTypeTitle}>방 코드 입력</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input
            type="text"
            {...register('code', {
              required: '방 코드를 입력해주세요.',
            })}
            placeholder="방 코드를 입력하세요"
            className={styles.input}
          />
          {errors.code && <p className={styles.error}>{errors.code.message}</p>}
          <button type="submit" className={styles.button}>
            입장하기
          </button>
        </form>
        <div className={styles.cardDecoration}></div>
        <div className={styles.floatingElement}></div>
        <div className={styles.floatingElement}></div>
      </div>
    </div>
  );
};

export default Landing;
