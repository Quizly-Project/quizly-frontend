import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';

import Game from '../../../pages/Game';
import GameUserInterface from '../GameUserInterface/GameUserInterface';
import NickNameInput from '../NickNameInput/NickNameInput';
import MyCameraOtherVoice from '../MyCameraOtherVoice/MyCameraOtherVoice';

import { createSocketHandlers } from '../../../utils/socketHandlers';

import useSocketStore from '../../../store/socketStore';
import useQuizRoomStore from '../../../store/quizRoomStore';
import useInputFocusedStore from '../../../store/inputFocusedStore';
import LiveKit from '../LiveKit/LiveKit';
import { useVoiceChatStore } from '../../../store/liveKitStore';

import { useTimer } from '../../../hooks/useTimer';
import useBackgroundMusic from '../../../hooks/useBackgroundMusic';

import styles from './GameContainer.module.css';
import { set } from 'react-hook-form';

const GameContainer = () => {
  const { code, type } = useParams();
  const {
    setQuizRoom,
    updateQuizRoom,
    startQuiz,
    endQuiz,
    addParticipant,
    removeParticipant,
    updateParticipantWriteStatus,
    resetAllParticipantsWriteStatus,
  } = useQuizRoomStore();
  const { isInputChatFocused, isInputGoldenbellFocused } =
    useInputFocusedStore();
  const navigate = useNavigate();

  // useState로 관리해야 브라우저당 한 번만 접속한다.
  const [nickName, setNickName] = useState('');

  const { socket, initSocket, isConnected, isTeacher, disconnectSocket } =
    useSocketStore(); // 소켓 연결 시도를 useEffect 내에서 처리한다.

  /* client의 좌표 */
  const [clientCoords, setClientCoords] = useState({});

  /* 퀴즈 정보 */
  const [quiz, setQuiz] = useState(null);

  /* 퀴즈 결과 */
  const [quizResult, setQuizResult] = useState(null);

  /* 참가자 정보 */
  const [participants, setParticipants] = useState(0);

  /* 퀴즈 갯수 */
  const [quizCnt, setQuizCnt] = useState(0);

  /* 퀴즈 인덱스 */
  const [quizIndex, setQuizIndex] = useState(1);

  /* joinRoom */
  const [isJoined, setIsJoined] = useState(false);

  /* 퀴즈 정답 */
  const [answer, setAnswer] = useState('');

  /* 스포트라이트를 켤 영역(1~4) */
  const [spotlight, setSpotlight] = useState(0);

  /* 퀴즈 정답자 */
  const [quizAnswerer, setQuizAnswerer] = useState('');

  /* 정답을 맞혔는지 여부 */
  const [isCorrectAnswerer, setIsCorrectAnswerer] = useState(false);

  /* 현재 1, 2, 3등과 점수 */
  const [rank, setRank] = useState([
    { nickName: '', totalScore: 0 },
    { nickName: '', totalScore: 0 },
    { nickName: '', totalScore: 0 },
  ]);

  /* 모델 파일 */
  const [model, setModel] = useState('');
  const [texture, setTexture] = useState('');

  /* client들의 모델 정보 */
  const [clientModels, setClientModels] = useState({});

  const joinAttempted = useRef(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  // LiveKit 컴포넌트의 렌더링 상태를 관리
  const [showLiveKit, setShowLiveKit] = useState(false);

  const { localTrack, remoteTracks } = useVoiceChatStore();

  const { isBgMusicPlaying, toggleBackgroundMusic } =
    useBackgroundMusic(isTeacher);

  useEffect(() => {
    if (isTeacher) {
      setNickName('선생님');
      setQuizRoom({
        nickName: '선생님',
        roomCode: code,
        type: type * 1,
        isStarted: false,
        isFinished: false,
      });
    } else {
      setQuizRoom({
        nickName,
        roomCode: code,
        type: type * 1,
        isStarted: false,
        isFinished: false,
      });
    }
  }, [isTeacher, code, type, nickName, setQuizRoom]);

  const updateClientCoords = (nickname, newPos) => {
    setClientCoords(prev => ({
      ...prev,
      [nickname]: newPos,
    }));
  };

  const handleSelectStudent = studentNickname => {
    setSelectedStudent(studentNickname);
  };

  const { timer, startTimer, stopTimer } = useTimer();

  const {
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
    handleQuizEnd,
    handleSelectModel,
    handleUpdateWriteStatus,
  } = useMemo(
    () =>
      createSocketHandlers(
        setClientCoords,
        setQuiz,
        nickName,
        setQuizResult,
        startTimer,
        setParticipants,
        setQuizCnt,
        quizCnt,
        setQuizIndex,
        isTeacher,
        setAnswer,
        setQuizAnswerer,
        setModel,
        setTexture,
        setClientModels,
        setSpotlight,
        setRank,
        setIsCorrectAnswerer,
        updateQuizRoom,
        startQuiz,
        endQuiz,
        addParticipant,
        removeParticipant,
        updateParticipantWriteStatus,
        resetAllParticipantsWriteStatus
      ),
    [nickName, isTeacher, quizCnt, startTimer]
  );

  const handleNickNameBtn = input => {
    console.log('input:', input);
    setNickName(input);
    updateQuizRoom(prevRoom => ({ ...prevRoom, nickName: input }));
  };

  /* ------- Socket events ------- */
  const handleClickQuizStart = () => {
    console.log('퀴즈 시작');
    const roomCode = code;
    socket.emit('start', roomCode);
  };

  // 소켓 초기화 및 데이터 설정
  useEffect(() => {
    if (isTeacher) setNickName('teacher');
  }, []);

  /* ------- Socket listeners ------- */
  // 리스너를 마운트 될 때 한 번만 생성한다.
  useEffect(() => {
    if (!isConnected) return;

    // 기존 접속중인 클라이언트의 위치 저장
    socket.on('everyonePosition', handleEveryonePosition);

    // 다른 클라이언트 입장
    socket.on('newClientPosition', handleNewClientPosition);

    // 다른 클라이언트가 이동했을 때
    socket.on('theyMove', handleTheyMove);

    // 다른 클라이언트가 연결 해제
    socket.on('someoneExit', handleSomeoneExit);

    // 퀴즈를 받아옴
    socket.on('quiz', handleQuiz);

    // 타이머 시작
    socket.on('timerStart', handleTimerStart);

    // 타이머 종료
    socket.on('timeout', handleTimeOut);

    // 퀴즈 종료
    socket.on('quizEnd', handleQuizEnd);

    socket.on('selectModel', handleSelectModel);

    socket.on('error', error => {
      console.error('Socket error:', error);
      alert('서버와의 연결이 끊겼습니다.');
      disconnectSocket();
      navigate('/');
    });

    if (type === '2') socket.on('updateWriteStatus', handleUpdateWriteStatus);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      socket.off('everyonePosition', handleEveryonePosition);
      socket.off('newClientPosition', handleNewClientPosition);
      socket.off('theyMove', handleTheyMove);
      socket.off('someoneExit', handleSomeoneExit);
      socket.off('quiz', handleQuiz);
      socket.off('timerStart', handleTimerStart);
      socket.off('timeout', handleTimeOut);
      socket.off('selectModel', handleSelectModel);
      if (type === '2')
        socket.off('updateWriteStatus', handleUpdateWriteStatus);
      stopTimer();
    };
  }, [
    socket,
    isConnected,
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
    handleQuizEnd,
    handleSelectModel,
    stopTimer,
  ]);

  const joinRoom = useCallback(async () => {
    if (joinAttempted.current || !socket || !isConnected || !code || isJoined)
      return;

    joinAttempted.current = true;
    console.log('Attempting to join room', code, nickName);

    try {
      const response = await new Promise((resolve, reject) => {
        socket.emit('joinRoom', { roomCode: code, nickName }, response => {
          console.log('Received response from server:', response);
          if (response.success) {
            resolve(response);
          } else {
            reject(new Error(response.message));
          }
        });

        setTimeout(
          () => reject(new Error('Join room request timed out')),
          5000
        );
      });

      console.log('Successfully joined room', response);
      setIsJoined(true);

      if (response.message === 'User already connected, positions sent') {
        // 다른 사용자들의 위치 정보 처리
        setClientCoords(response.positions);
      }
    } catch (error) {
      console.error('Failed to join room', error);
      joinAttempted.current = false;
      alert('방에 입장할 수 없습니다.');
      navigate('/');
    }
  }, [socket, isConnected, code, nickName, isJoined, setClientCoords]);

  useEffect(() => {
    console.log('체크:', isConnected, code, nickName);
    if (isConnected && code && nickName) {
      joinRoom();
    }
  }, [isConnected, code, nickName, joinRoom]);

  useEffect(() => {
    if (!isConnected) {
      initSocket();
    }
  }, [initSocket, isConnected]);

  useEffect(() => {
    console.log('showLiveKit, localTrack:', showLiveKit, localTrack);
  }, [showLiveKit, localTrack]);

  useEffect(() => {
    if (!isJoined && nickName) {
      setShowLiveKit(true);
    }
  }, [isJoined, nickName]);

  return (
    <>
      {showLiveKit && <LiveKit />}
      {localTrack && nickName && showLiveKit && (
        <div className={styles.camera}>
          <MyCameraOtherVoice />
        </div>
      )}
      <div className={styles.container}>
        <KeyboardControls
          map={[
            { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
            { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
            { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
            { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
            { name: 'jump', keys: ['Space'] },
          ]}
          disabled={isInputChatFocused || isInputGoldenbellFocused}
        >
          <Canvas shadows className={styles.canvas}>
            <Game
              quiz={quiz}
              quizResult={quizResult}
              quizCnt={quizCnt}
              quizIndex={quizIndex}
              clientCoords={clientCoords}
              socket={socket}
              isConnected={isConnected}
              isTeacher={isTeacher}
              code={code}
              nickname={nickName}
              isJoined={isJoined}
              model={model}
              texture={texture}
              selectedStudent={selectedStudent}
              updateClientCoords={updateClientCoords}
              clientModels={clientModels}
              spotlight={spotlight}
              rank={rank}
              isCorrectAnswerer={isCorrectAnswerer}
              quizAnswerer={quizAnswerer}
            />
          </Canvas>
        </KeyboardControls>
        <div>
          {!isJoined && !isTeacher && (
            <NickNameInput
              className={styles.nickNameInput}
              onClick={handleNickNameBtn}
            />
          )}
          <GameUserInterface
            isTeacher={isTeacher}
            handleClickQuizStart={handleClickQuizStart}
            quiz={quiz}
            quizResult={quizResult}
            timer={timer}
            quizCnt={quizCnt}
            quizIndex={quizIndex}
            answer={answer}
            quizAnswerer={quizAnswerer}
            isJoined={isJoined}
            nickName={nickName}
            code={code}
            participants={Object.keys(clientCoords).map(nickName => {
              const { modelMapping, texture } = clientModels[nickName] || {};
              return {
                nickName,
                icon: `bg-${texture?.split('_')[1]}`,
              };
            })}
            onSelectStudent={handleSelectStudent}
            selectedStudent={selectedStudent}
          />
        </div>
      </div>
    </>
  );
};

export default GameContainer;
