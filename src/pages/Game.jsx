import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Sky, OrbitControls, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { createSocketHandlers } from '../utils/socketHandlers.js';
import useSocketStore from '../store/socketStore.js';

// components
import Lights from '../components/3d/Environment/Lights.jsx';
import OLevel from '../components/3d/Environment/OLevel.jsx';
import XLevel from '../components/3d/Environment/XLevel.jsx';
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';
import Question from './Game/Question.jsx';
import QuizStartButton from './Game/QuizStartButton.jsx';
import Beachside from '../components/3d/Environment/Beachside.jsx';

// style
import '../styles/game.css';

export default function Game() {
  const { code } = useParams();
  // useState로 관리해야 브라우저당 한 번만 접속한다.
  const [nickname] = useState(
    () =>
      sessionStorage.getItem('nickname') ||
      Math.floor(Math.random() * 10000).toString()
  );
  const {
    socket,
    initSocket,
    setSocketData,
    isConnected,
    isTeacher,
    setTeacher,
  } = useSocketStore(); // 소켓 연결 시도를 useEffect 내에서 처리한다.

  /* client의 좌표 */
  const [clientCoords, setClientCoords] = useState({});

  /* 퀴즈 정보 */
  const [quiz, setQuiz] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  /* Constants */
  /* 초기 위치 */
  const defaultPos = {
    x: 0,
    y: 0,
    z: 0,
  };

  /* 임시 원숭이 배열 */
  const colobusModels = [
    'Colobus_Animations2.glb',
    'Colobus_Animations3.glb',
    'Colobus_Animations4.glb',
    'Colobus_Animations5.glb',
    'Colobus_Animations6.glb',
    'Colobus_Animations7.glb',
  ];

  const ROOM_CODE = code;

  const {
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
  } = useMemo(
    () =>
      createSocketHandlers(setClientCoords, setQuiz, setIsStarted, nickname),
    [setClientCoords, setQuiz, setIsStarted, nickname]
  );

  /* ------- Socket events ------- */
  const handleClickQuizStart = () => {
    console.log('퀴즈 시작');
    socket.emit('start', { roomCode: ROOM_CODE });
  };

  // 소켓 초기화 및 데이터 설정
  useEffect(() => {
    initSocket();
    const storedData = JSON.parse(sessionStorage.getItem('socketData')) || {};
    if (!storedData.isTeacher) {
      setSocketData(ROOM_CODE, nickname, false);
      sessionStorage.setItem('nickname', nickname);
    }
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
    console.log('socket 소캣', socket);
    // 퀴즈를 받아옴
    socket.on('quiz', handleQuiz);

    // 타이머 시작
    socket.on('timerStart', handleTimerStart);

    // 타이머 종료
    socket.on('timeout', handleTimeOut);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      socket.off('everyonePosition', handleEveryonePosition);
      socket.off('newClientPosition', handleNewClientPosition);
      socket.off('theyMove', handleTheyMove);
      socket.off('someoneExit', handleSomeoneExit);
      socket.off('quiz', handleQuiz);
      socket.off('timerStart', handleTimerStart);
      socket.off('timeout', handleTimeOut);
    };
  }, [socket, isConnected]);

  // 방 입장
  useEffect(() => {
    if (socket && isConnected) {
      console.log('joinRoom', ROOM_CODE, nickname);
      /* 클라이언트 -> 서버 */
      socket.emit('joinRoom', { roomCode: ROOM_CODE, nickName: nickname });
    }
  }, [socket, isConnected, ROOM_CODE, nickname]);
  return (
    <>
      {/* debugging tools */}
      <Perf />

      {/* camera controls */}
      <OrbitControls />

      {/* environment */}
      <Sky />
      <Lights />

      <Physics debug>
        {/* fixed elements */}
        <Beachside position-y="-30" rotation-y={-Math.PI / 2} />
        {/* <OLevel /> */}
        {/* <XLevel /> */}

        {/* me */}
        {isConnected && !isTeacher && (
          <CharacterController
            path="Colobus_Animations.glb"
            matName="M_Colobus"
            nickname={nickname}
            socket={socket}
          />
        )}

        {/* others */}
        {isConnected &&
          Object.keys(clientCoords).map((key, modelIdx) => {
            if (key != nickname) {
              return (
                <OtherCharacterController
                  key={key}
                  path={colobusModels[modelIdx++]}
                  matName="M_Colobus"
                  nickname={key}
                  pos={clientCoords[key]}
                  scale={2}
                />
              );
            }
          })}
      </Physics>

      {isTeacher && <QuizStartButton toggleQuizStart={handleClickQuizStart} />}

      {isStarted ? <Question quizData={quiz} /> : <group></group>}
    </>
  );
}
