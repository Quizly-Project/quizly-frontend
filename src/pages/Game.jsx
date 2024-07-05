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

  /* ------- events ------- */
  useEffect(() => {
    console.log(clientCoords);
  }, [clientCoords]);

  // 리스너를 마운트 될 때 한 번만 생성한다.
  useEffect(() => {
    // 한 브라우저는 한 번만 소켓에 연결한다.
    if (isConnected) return;

    // 소켓에 연결
    const newSocket = io('http://localhost:81/quizly');
    console.log('Connected to socket.');
    setSocket(newSocket);

    newSocket.emit('room', nickname, 1); // 1번 방에 nickname으로 입장했다고 서버에 전달 // joinRoom 필요데이터: {roomCode, nickName}

    /* 연결 성공 */
    newSocket.on('connect', () => {
      console.log({ nickname }, 'connected.');
      setIsConnected(true);
    });

    newSocket.on('roomIn', data => {
      // everyonePosition: 모든 유저의 식별자: {닉네임, {x, y, z}}
      // state 변수가 아닌 다른 변수에 for문을 돌며 저장해준 후
      // for이 끝나면 그때 clientCoords를 setState 한다.
      console.log(data);
      setClientCoords(prevCoords => {
        const newCoords = { ...prevCoords };
        Object.keys(data).forEach(key => {
          const [name, coord] = data[key];
          if (name !== nickname) {
            newCoords[name] = coord;
          }
        });

        return newCoords;
      });
    });

    /* 다른 클라이언트 입장 
      서버가 보내주는 데이터: (새로운 클라이언트의 nickname) */
    newSocket.on('comeOn', data => {
      // -> newClientPosition: {닉네임, {0, 0, 0}}
      // 좌표 저장 (초기 위치는 (0,0,0))
      console.log(data, defaultPos);

      setClientCoords(prevCoords => {
        return { ...prevCoords, [data]: defaultPos };
      });
      console.log('new client!');
    });

    /* 다른 클라이언트가 이동했을 때
      서버가 보내주는 데이터: (이동한 클라이언트의 nickname, 이동한 위치 (x, y, z)) */
    newSocket.on(1, data => {
      // theyMove: {nickName, {x, y, z}}
      setClientCoords(prevCoords => {
        return { ...prevCoords, [data[0]]: data[1] };
      });
    });

    /* 다른 클라이언트가 연결 해제 */
    newSocket.on('roomOut', data => {
      // -> exitRoom: {닉네임}
      console.log('roomOut', data);
      setClientCoords(prevCoords => {
        const newCoords = { ...prevCoords };
        delete newCoords[data];
        return newCoords;
      });
    });

    /* 연결 해제 */
    newSocket.on('disconnect', data => {
      console.log({ nickname }, 'disconnected.');
      newSocket.disconnect();
    });

    return () => {
      setIsConnected(false);
      setSocket(null);
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
