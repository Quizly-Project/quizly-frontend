import { useEffect, useState, useMemo } from 'react';
import { Sky, OrbitControls, PointerLockControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

// components
import Lights from '../components/3d/Environment/Lights.jsx';
import OLevel from '../components/3d/Environment/OLevel.jsx';
import XLevel from '../components/3d/Environment/XLevel.jsx';
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';
import Beachside from '../components/3d/Environment/Beachside.jsx';
import Crab from '../components/3d/Environment/Crab.jsx';
import OBubble from '../components/3d/Environment/OBubble.jsx';
import XBubble from '../components/3d/Environment/XBubble.jsx';

// style
import '../styles/game.css';

export default function Game({
  nickname,
  socket,
  isConnected,
  isTeacher,
  isStarted,
  quiz,
  quizResult,
  handleClickQuizStart,
  timer,
  isQuizEnded,
  participants,
  quizCnt,
  quizIndex,
  clientCoords,
  isJoined,
}) {
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
      <OBubble position-x={-25} position-y={-20} position-z={-100} scale={20} />
      <XBubble position-x={55} position-y={-20} position-z={-100} scale={20} />

      <Physics debug>
        {/* fixed elements */}
        <Beachside position-y="-20" rotation-y={-Math.PI / 2} />
        <Crab position-z="35" position-y="-7" />
        {/* <OLevel /> */}
        {/* <XLevel /> */}

        {/* me */}
        {isConnected && !isTeacher && isJoined && (
          <CharacterController
            path="Turtle_Animations.glb"
            matName="M_Turtle"
            nickname={nickname}
            socket={socket}
          />
        )}

        {/* others */}
        {isConnected &&
          isJoined &&
          Object.keys(clientCoords).map(key => {
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
