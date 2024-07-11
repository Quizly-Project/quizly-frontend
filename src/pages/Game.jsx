import { useEffect, useMemo, useRef } from 'react';
import { Sky, OrbitControls, CameraControls } from '@react-three/drei';
import { Physics, vec3 } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useThree, useFrame } from '@react-three/fiber';

// Environment
import Lights from '../components/3d/Environment/Lights.jsx';
import SpotLights from '../components/3d/Environment/SpotLights.jsx';
import Island from '../components/3d/Environment/Island.jsx';
import Blackboard from '../components/3d/Environment/Blackboard.jsx';

// Character
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';

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
  selectedStudent,
  updateClientCoords,
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

  const { camera } = useThree();
  const cameraControls = useRef();
  const orbitControls = useRef();

  useFrame(() => {
    if (cameraControls.current && !isTeacher) {
      const cameraDistanceY = 12;
      const cameraDistanceZ = 30;
      let playerWorldPos;

      if (clientCoords[nickname]) {
        // 학생 시점
        playerWorldPos = vec3(clientCoords[nickname]);
        cameraControls.current.setLookAt(
          playerWorldPos.x,
          playerWorldPos.y + cameraDistanceY,
          playerWorldPos.z + cameraDistanceZ,
          playerWorldPos.x,
          playerWorldPos.y + 15,
          playerWorldPos.z,
          true
        );
      }
    }
  });

  useEffect(() => {
    if (isTeacher && orbitControls.current) {
      if (selectedStudent && clientCoords[selectedStudent]) {
        const studentPos = clientCoords[selectedStudent];
        orbitControls.current.target.set(
          studentPos.x,
          studentPos.y + 15,
          studentPos.z
        );
        camera.position.set(studentPos.x, studentPos.y + 30, studentPos.z + 30);
      } else {
        // 선생님 기본 시점
        orbitControls.current.target.set(0, 15, 0);
        camera.position.set(0, 30, 30);
      }
      orbitControls.current.update();
    }
  }, [isTeacher, selectedStudent, clientCoords, camera]);

  let modelIdx = 0;
  return (
    <>
      {/* debugging tools */}
      <Perf />

      {/* camera controls */}
      {isTeacher ? (
        <OrbitControls ref={orbitControls} />
      ) : (
        <CameraControls ref={cameraControls} />
      )}
      {/* environment */}
      <Sky />
      <Lights />

      {/* O spotlight */}
      <SpotLights position={[60, 50, 0]} targetPosition={[60, 8.7, 0]} />
      {/* X spotlight */}
      <SpotLights position={[-60, 50, 0]} targetPosition={[-60, 8.7, 0]} />

      <Physics debug>
        {/* <Physics> */}
        {/* fixed elements */}
        <Island />
        <Blackboard position-y={70} position-z={-200} text={quiz} />

        {/* me */}
        {isConnected && !isTeacher && isJoined && (
          <CharacterController
            path={model}
            matName={texture}
            nickname={nickname}
            socket={socket}
            isChatFocused={isChatFocused}
            updateClientCoords={updateClientCoords}
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
