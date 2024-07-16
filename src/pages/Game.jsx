import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Sky, OrbitControls, CameraControls } from '@react-three/drei';
import { Physics, vec3 } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useThree, useFrame } from '@react-three/fiber';
import useQuizRoomStore from '../store/quizRoomStore.js';

// Environment
import Lights from '../components/3d/Environment/Lights.jsx';
import SpotLights from '../components/3d/Environment/SpotLights.jsx';
import Island from '../components/3d/Environment/Island.jsx';
import Blackboard from '../components/3d/Environment/Blackboard.jsx';
import ExplosionConfetti from '../components/3d/Environment/ExplosionConfetti.jsx';
import Stars from '../components/3d/Environment/Stars.jsx';
import IslandBaked from '../components/3d/Environment/IslandBaked.jsx';

// Character
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';
import Wall from '../components/3d/Environment/Wall.jsx';

// style
import '../styles/game.css';
import IslandMaterials from '../components/3d/Environment/IslandMaterial.jsx';

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
  quizResult,
  selectedStudent,
  updateClientCoords,
  clientModels,
  spotlight,
  rank,
  // 클라이언트(나)의 정답 여부
  isCorrectAnswerer,
  // 클라이언트(다른)들의 정답 여부
  quizAnswerer,
}) {
  const { camera } = useThree();
  const cameraControls = useRef();
  const orbitControls = useRef();
  // const starRef = useRef();
  const [initialTeacherViewSet, setInitialTeacherViewSet] = useState(false);

  const { isStarted } = useQuizRoomStore(state => state.quizRoom);

  const setTeacherView = useCallback(() => {
    if (orbitControls.current) {
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
  }, [selectedStudent, clientCoords, camera]);

  useEffect(() => {
    if (isTeacher && !initialTeacherViewSet) {
      setTeacherView();
      setInitialTeacherViewSet(true);
    }
  }, [isTeacher, initialTeacherViewSet, setTeacherView]);

  useEffect(() => {
    if (isTeacher) {
      setTeacherView();
    }
  }, [isTeacher, selectedStudent, setTeacherView]);

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

  return (
    <>
      {/* debugging tools */}
      {/* <Perf /> */}

      {/* camera controls */}
      {isTeacher ? (
        <OrbitControls
          ref={orbitControls}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
        />
      ) : (
        <CameraControls ref={cameraControls} />
      )}

      {/* environment */}
      <Sky />
      <Lights intensity={1.5} ambientIntensity={0.5} />

      {/* O spotlight */}
      {!isStarted && quizResult && spotlight === '1' && (
        <SpotLights position={[-60, 50, 0]} targetPosition={[-60, 8.7, 0]} />
      )}
      {/* X spotlight */}
      {!isStarted && quizResult && spotlight === '2' && (
        <SpotLights position={[60, 50, 0]} targetPosition={[60, 8.7, 0]} />
      )}
      {/* <ExplosionConfetti
        position-x={60}
        rate={2}
        fallingHeight={20}
        amount={50}
        isExploding
      /> */}
      {/* <Stars ref={starRef} scale={10} /> */}

      <Physics>
        {/* <Physics>gg */}
        {/* fixed elements */}
        {/* <Island /> */}
        {/* <IslandBaked rotation-y={Math.PI} /> */}
        <IslandMaterials rotation-y={Math.PI} />

        <Wall />
        {isConnected && quiz && (
          <Blackboard position-y={70} position-z={-200} text={quiz} />
        )}

        {/* me */}
        {isConnected && !isTeacher && isJoined && (
          <CharacterController
            path={model}
            matName={texture}
            nickname={nickname}
            socket={socket}
            updateClientCoords={updateClientCoords}
            rank={rank}
            isCorrectAnswerer={isCorrectAnswerer}
          />
        )}

        {/* others */}
        {isConnected &&
          isJoined &&
          Object.keys(clientCoords).map(key => {
            if (key !== nickname) {
              // 다른 클라이언트의 정답 여부
              let isCorrect = false;
              if (quizAnswerer.includes(key)) {
                isCorrect = true;
              }
              // console.log(key, isCorrect);
              const { modelMapping, texture } = clientModels[key] || {};
              return modelMapping && texture ? (
                <OtherCharacterController
                  key={key}
                  path={modelMapping}
                  matName={texture}
                  nickname={key}
                  pos={clientCoords[key]}
                  scale={2}
                  rank={rank}
                  isCorrectAnswerer={isCorrect}
                />
              ) : null;
            }
            return null;
          })}
      </Physics>
    </>
  );
}
