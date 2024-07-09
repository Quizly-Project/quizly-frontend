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
import Beachside from '../components/3d/Environment/Beachside.jsx';
import GameUserInterface from '../components/Game/GameUserInterface.jsx';

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

  /* Constants */
  /* 초기 위치 */
  const defaultPos = {
    x: 0,
    y: 0,
    z: 0,
  };

  /* 임시 원숭이 배열 */
  const colobusModels = useMemo(
    () => [
      'Colobus_Animations2.glb',
      'Colobus_Animations3.glb',
      'Colobus_Animations4.glb',
      'Colobus_Animations5.glb',
      'Colobus_Animations6.glb',
      'Colobus_Animations7.glb',
    ],
    []
  );

  const ROOM_CODE = code;

  const {
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
    handleQuizEnd,
  } = useMemo(
    () =>
      createSocketHandlers(
        setClientCoords,
        setQuiz,
        setIsStarted,
        nickname,
        setQuizResult,
        setTimer,
        setIsQuizEnded,
        setParticipants,
        setQuizCnt,
        setQuizIndex
      ),
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

    // 퀴즈를 받아옴
    socket.on('quiz', handleQuiz);

    // 타이머 시작
    socket.on('timerStart', handleTimerStart);

    // 타이머 종료
    socket.on('timeout', handleTimeOut);

    // 퀴즈 종료
    socket.on('quizEnd', handleQuizEnd);
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

  const joinRoom = async () => {
    if (socket && isConnected) {
      console.log('Attempting to join room', ROOM_CODE, nickname);
      try {
        const response = await new Promise((resolve, reject) => {
          socket.emit(
            'joinRoom',
            { roomCode: ROOM_CODE, nickName: nickname },
            response => {
              console.log('Received response from server:', response);
              if (response.success) {
                resolve(response);
              } else {
                reject(new Error(response.message));
              }
            }
          );

          // 10초 후에도 응답이 없으면 타임아웃
          setTimeout(() => {
            reject(new Error('Join room request timed out'));
          }, 10000);
        });

        console.log('Successfully joined room', response);
        setIsJoined(true);

        // 서버 응답에 따른 추가 처리
        if (response.message === 'User already connected, positions sent') {
          // 다른 사용자들의 위치 정보 처리
          // 예: setClientCoords(response.positions);
        } else if (response.message === 'Joined room and broadcast position') {
          // 새 사용자 입장 처리
          // 예: handleNewUserJoined(response.newUser);
        }
      } catch (error) {
        console.error('Failed to join room', error);
      }
    }
  };

  useEffect(() => {
    joinRoom();
  }, [socket, isConnected, ROOM_CODE, nickname]);

  let modelIdx = 0;
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
        {isConnected && !isTeacher && isJoined && (
          <CharacterController
            path="Colobus_Animations.glb"
            matName="M_Colobus"
            nickname={nickname}
            socket={socket}
          />
        )}

        {/* others */}
        {isConnected &&
          isJoined &&
          Object.keys(clientCoords).map(key => {
            console.log(modelIdx);
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

      {/* game UI */}
      <GameUserInterface
        isTeacher={isTeacher}
        isConnected={isConnected}
        isStarted={isStarted}
        quiz={quiz}
        quizResult={quizResult}
        handleClickQuizStart={handleClickQuizStart}
        timer={timer}
        isQuizEnded={isQuizEnded}
        participants={participants}
        quizCnt={quizCnt}
        quizIndex={quizIndex}
      />
    </>
  );
}
