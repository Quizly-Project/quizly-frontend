import { useMemo } from 'react';
import { Sky, OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';

// components
import Lights from '../components/3d/Environment/Lights.jsx';
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';
import Island from '../components/3d/Environment/Island.jsx';
import Blackboard from '../components/3d/Environment/Blackboard.jsx';

// style
import '../styles/game.css';

export default function Game({
  nickname,
  socket,
  isConnected,
  isTeacher,
  clientCoords,
  isJoined,
  model,
  texture,
  quiz,
  isChatFocused,
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

      <Physics debug>
        {/* <Physics> */}
        {/* fixed elements */}
        <Island />
        {/* <Beachside position-y="-20" rotation-y={-Math.PI / 2} /> */}
        {/* <Crab position-z="35" position-y="-7" /> */}
        {/* <OLevel /> */}
        {/* <XLevel /> */}
        <Blackboard position-y={70} position-z={-200} text={quiz} />

        {/* me */}
        {isConnected && !isTeacher && isJoined && (
          <CharacterController
            path={model}
            matName={texture}
            nickname={nickname}
            socket={socket}
            isChatFocused={isChatFocused}
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
