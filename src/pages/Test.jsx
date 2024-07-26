import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSocketStore from '../store/socketStore';

const Test = () => {
  const [roomCode, setRoomCode] = useState('');
  const [createdRoomCode, setCreatedRoomCode] = useState(null);
  const { socket, initSocket, isConnected, setTeacher } = useSocketStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.emit('createRoom', { quizGroup: 2 });
      socket.on('roomCode', code => {
        // console.log('Room code received:', code);
        setCreatedRoomCode(code);
      });
    }
  }, [socket]);

  const handleCreateRoom = () => {
    if (!socket) {
      initSocket();
    } else {
      console.error('Unable to create room');
    }
  };

  const handleJoinRoom = () => {
    navigate(`/game/${roomCode}`);
  };

  return (
    <div>
      <h1>Quizly Test</h1>

      <h2>교사 (선생님)</h2>
      <button onClick={handleCreateRoom}>방 만들기</button>
      {createdRoomCode && <p>생성된 방 코드: {createdRoomCode}</p>}

      <h2>학생</h2>
      <input
        type="text"
        placeholder="방 코드"
        value={roomCode}
        onChange={e => setRoomCode(e.target.value)}
      />
      <button onClick={handleJoinRoom}>방 참여하기</button>
    </div>
  );
};

export default Test;
