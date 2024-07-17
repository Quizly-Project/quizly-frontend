import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Sky, OrbitControls, CameraControls } from '@react-three/drei';
import { Physics, vec3 } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useThree, useFrame } from '@react-three/fiber';
import useQuizRoomStore from '../store/quizRoomStore.js';

// Environment
import IslandMaterials from '../components/3d/Environment/IslandMaterial.jsx';
import Lights from '../components/3d/Environment/Lights.jsx';
import Blackboard from '../components/3d/Environment/Blackboard.jsx';
import Wall from '../components/3d/Environment/Wall.jsx';
import BasicSpotLights from '../components/3d/Environment/BasicSpotLights.jsx';
import OEffects from '../components/3d/Environment/OEffects.jsx';
import XEffects from '../components/3d/Environment/XEffects.jsx';

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
  const [initialTeacherViewSet, setInitialTeacherViewSet] = useState(false);

  const { isStarted } = useQuizRoomStore(state => state.quizRoom);

  const CAMERA_TILT = 20;

  const setTeacherView = useCallback(() => {
    if (orbitControls.current) {
      if (selectedStudent && clientCoords[selectedStudent]) {
        const studentPos = clientCoords[selectedStudent];
        orbitControls.current.target.set(
          studentPos.x,
          studentPos.y + 15,
          studentPos.z
        );
        camera.position.set(
          studentPos.x,
          studentPos.y + CAMERA_TILT,
          studentPos.z + CAMERA_TILT
        );
      } else {
        // 선생님 기본 시점
        orbitControls.current.target.set(0, CAMERA_TILT, -10);
        camera.position.set(0, CAMERA_TILT, CAMERA_TILT);
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
      <Perf />

      {/* camera controls */}
      {isTeacher ? (
        <OrbitControls
          ref={orbitControls}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          minDistance={5} // 최소 거리 (줌 인 제한)
          maxDistance={80} // 최대 거리 (줌 아웃 제한)
        />
      ) : (
        <CameraControls ref={cameraControls} />
      )}

      {/* environment */}
      {/* 문제 나올 때는 밝게, spotlight 켜질 때는 어둡게 */}
      {isStarted ? (
        <>
          <Sky /> <Lights intensity={1.5} ambientIntensity={0.5} />
        </>
      ) : (
        <>
          <Sky
            distance={4000}
            sunPosition={[0, -50, -500]} // 석양
            turbidity={10}
            rayleigh={2}
            mieCoefficient={0.005}
            mieDirectionalG={0.7}
            inclination={0.6}
            azimuth={0.25}
          />
          <Lights intensity={0.5} ambientIntensity={0.5} />
        </>
      )}

      {/* 칠판, Yes/No 표지판의 spotlight */}
      <BasicSpotLights />

      {/* O spotlight & confetti */}
      {!isStarted && quizResult && spotlight === '1' && <OEffects />}
      {/* X spotlight & confetti */}
      {!isStarted && quizResult && spotlight === '2' && <XEffects />}

      {/* <Physics debug> */}
      <Physics>
        {/* fixed elements */}
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
            isStarted={isStarted}
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
                  isStarted={isStarted}
                />
              ) : null;
            }
            return null;
          })}
      </Physics>
    </>
  );
}
