import { useEffect, useState } from 'react';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import io from 'socket.io-client';
import Lights from '../components/3d/Environment/Lights.jsx';
import OLevel from '../components/3d/Environment/OLevel.jsx';
import XLevel from '../components/3d/Environment/XLevel.jsx';
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';
import '../styles/game.css';

export default function Game() {
  // useState로 관리해야 브라우저당 한 번만 접속한다.
  const [socket, setSocket] = useState(null); // 소켓 연결 시도를 useEffect 내에서 처리한다.
  const [nickname] = useState(() => Math.floor(Math.random() * 10000));

  /* client의 좌표 */
  const [clientCoords, setClientCoords] = useState({});
  const [isConnected, setIsConnected] = useState(false);

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

  const ROOM_CODE = 1;

  /* ------- Socket events ------- */
  // 연결 성공
  const handleConnect = () => {
    console.log({ nickname }, 'connected.');
    setIsConnected(true);
  };

  // 기존 접속중인 클라이언트의 위치 저장
  // data: [식별자: {nickName, {x, y, z}}, ...]
  const handleEveryonePosition = data => {
    console.log('everyone pos', data);
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords }; // clientCoords의 불변성을 지키기 위해 newCoords 사용
      Object.keys(data).forEach(key => {
        const [name, coord] = data[key];
        if (name !== nickname) {
          newCoords[name] = coord;
        }
      });

      return newCoords;
    });
  };

  // 다른 클라이언트 입장
  // data: {nickName, {0, 0, 0}}
  const handleNewClientPosition = data => {
    console.log('new client pos', data);
    setClientCoords(prevCoords => {
      return { ...prevCoords, [data[0]]: data[1] };
    });
  };

  // 다른 클라이언트가 이동
  // data: {nickName, {x, y, z}}
  const handleTheyMove = data => {
    console.log('they move', data);
    setClientCoords(prevCoords => {
      return { ...prevCoords, [data[0]]: data[1] };
    });
  };

  // 다른 클라이언트가 연결 해제
  // data: {nickName}
  const handleSomeoneExit = data => {
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords };
      delete newCoords[data];
      return newCoords;
    });
  };

  // 연결 해제
  const handleDisconnect = () => {
    console.log({ nickname }, 'disconnected.');
    setIsConnected(false);
    setSocket(null);
  };

  /* ------- Socket listeners ------- */
  // 리스너를 마운트 될 때 한 번만 생성한다.
  useEffect(() => {
    // 한 브라우저는 한 번만 소켓에 연결한다.
    if (isConnected) return;

    // 소켓에 연결
    const newSocket = io('http://localhost:81/quizly');
    console.log('Connected to socket.');
    setSocket(newSocket);

    /* 클라이언트 -> 서버 */
    newSocket.emit('joinRoom', { roomCode: ROOM_CODE, nickName: nickname });

    /* 서버 -> 클라이언트 */
    // 연결 성공
    newSocket.on('connect', handleConnect);

    // 기존 접속중인 클라이언트의 위치 저장
    newSocket.on('everyonePosition', handleEveryonePosition);

    // 다른 클라이언트 입장
    newSocket.on('newClientPosition', handleNewClientPosition);

    // 다른 클라이언트가 이동했을 때
    newSocket.on('theyMove', handleTheyMove);

    // 다른 클라이언트가 연결 해제
    newSocket.on('someoneExit', handleSomeoneExit);

    // 연결 해제
    newSocket.on('disconnect', handleDisconnect);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      newSocket.off('everyonePosition', handleEveryonePosition);
      newSocket.off('newClientPosition', handleNewClientPosition);
      newSocket.off('theyMove', handleTheyMove);
      newSocket.off('someoneExit', handleSomeoneExit);
      newSocket.off('disconnect', handleDisconnect);
      newSocket.off('connect', handleConnect);
    };
  }, []);

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
        <OLevel />
        <XLevel />

        {/* me */}
        {isConnected && (
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
    </>
  );
}
