import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import Game from '../../../pages/Game';
import GameUserInterface from '../GameUserInterface/GameUserInterface';
import NickNameInput from '../NickNameInput/NickNameInput';
import useSocketStore from '../../../store/socketStore';
import { createSocketHandlers } from '../../../utils/socketHandlers';

import styles from './GameContainer.module.css';

const GameContainer = () => {
  const { code } = useParams();
  // useState로 관리해야 브라우저당 한 번만 접속한다.
  const [nickName, setNickName] = useState('');

  const { socket, initSocket, setSocketData, isConnected, isTeacher } =
    useSocketStore(); // 소켓 연결 시도를 useEffect 내에서 처리한다.

  /* client의 좌표 */
  const [clientCoords, setClientCoords] = useState({});

  /* 퀴즈 정보 */
  const [quiz, setQuiz] = useState(null);

  /* 퀴즈 한문제 시작 여부 */
  const [isStarted, setIsStarted] = useState(false);

  /* 퀴즈 결과 */
  const [quizResult, setQuizResult] = useState(null);

  /* 퀴즈 타이머 */
  const [timer, setTimer] = useState(0);

  /* 퀴즈 종료 여부 */
  const [isQuizEnded, setIsQuizEnded] = useState(false);

  /* 참가자수 */
  const [participants, setParticipants] = useState(0);

  /* 퀴즈 갯수 */
  const [quizCnt, setQuizCnt] = useState(0);

  /* 퀴즈 인덱스 */
  const [quizIndex, setQuizIndex] = useState(1);

  /* joinRoom */
  const [isJoined, setIsJoined] = useState(false);

  /* 퀴즈 정답 */
  const [answer, setAnswer] = useState('');

  /* 퀴즈 정답자 */
  const [quizAnswerer, setQuizAnswerer] = useState('');

  /* 모델 파일 */
  const [model, setModel] = useState('');
  const [texture, setTexture] = useState('');

  /* 채팅창 포커스 여부 */
  const [isChatFocused, setIsChatFocused] = useState(false);

  const joinAttempted = useRef(false);

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
  } = useMemo(
    () =>
      createSocketHandlers(
        setClientCoords,
        setQuiz,
        setIsStarted,
        nickName,
        setQuizResult,
        setTimer,
        setIsQuizEnded,
        setParticipants,
        setQuizCnt,
        setQuizIndex,
        isTeacher,
        setAnswer,
        setQuizAnswerer,
        setModel,
        setTexture
      ),
    [nickName]
  );

  useEffect(() => {
    if (nickName) {
      console.log('nickname:', nickName);
      joinRoom();
    }
  }, [nickName]);

  const handleNickNameBtn = input => {
    console.log('input:', input);
    setNickName(input);
  };

  /* ------- Socket events ------- */
  const handleClickQuizStart = () => {
    console.log('퀴즈 시작');
    socket.emit('start', { roomCode: code });
  };

  // 소켓 초기화 및 데이터 설정
  useEffect(() => {
    initSocket();
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
          10000
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
    }
  }, [socket, isConnected, code, nickName, isJoined, setClientCoords]);

  useEffect(() => {
    if (isConnected && isTeacher) {
      joinRoom();
    }
  }, []);

  return (
    <div className={styles.container}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
          { name: 'jump', keys: ['Space'] },
        ]}
        disabled={isChatFocused}
      >
        <Canvas shadows className={styles.canvas}>
          <Game
            isStarted={isStarted}
            quiz={quiz}
            quizResult={quizResult}
            timer={timer}
            isQuizEnded={isQuizEnded}
            participants={participants}
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
            isChatFocused={isChatFocused}
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
          isStarted={isStarted}
          quiz={quiz}
          quizResult={quizResult}
          timer={timer}
          isQuizEnded={isQuizEnded}
          participants={participants}
          quizCnt={quizCnt}
          quizIndex={quizIndex}
          answer={answer}
          quizAnswerer={quizAnswerer}
          isJoined={isJoined}
          nickName={nickName}
          setIsChatFocused={setIsChatFocused}
        />
      </div>
    </div>
  );
};

export default GameContainer;
