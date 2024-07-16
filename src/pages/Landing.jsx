import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from '../components/common/InputField/InputField';
import Button from '../components/common/Button/Button';
import Text from '../components/common/Text/Text';
import useSocketStore from '../store/socketStore';

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
      console.log(response);
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
    console.log('랜딩페이지', isConnected, roomCode);
    if (isConnected && roomCode) {
      console.log(roomCode);
      socket.emit('checkRoom', roomCode, handleCheckRoom);
    }
  }, [isConnected, roomCode, socket, handleCheckRoom]);

  const onSubmit = data => {
    setRoomCode(data.code);
    console.log('커넥트', isConnected);
    if (!isConnected) {
      initSocket();
    }
  };

  return (
    <div>
      <Text type="title" weight="bold" size="large" align="center">
        방 코드 입력
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="code"
          type="text"
          {...register('code', {
            required: '방 코드를 입력해주세요.',
          })}
          errors={errors}
          placeholder="방 코드를 입력하세요"
          round={true}
        />
        <Button type="submit" size="large" wide={true} round={true}>
          입장하기
        </Button>
      </form>
    </div>
  );
};

export default Landing;
