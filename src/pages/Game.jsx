import { useState, useEffect, useRef, useCallback } from 'react';
import { Sky, OrbitControls, CameraControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';

// Environment
import IslandMaterials from '../components/3d/Environment/IslandMaterial.jsx';
import Lights from '../components/3d/Environment/Lights.jsx';
import Blackboard from '../components/3d/Environment/Blackboard.jsx';
import Wall from '../components/3d/Environment/Wall.jsx';
import BasicSpotLights from '../components/3d/Environment/BasicSpotLights.jsx';
import OEffects from '../components/3d/Environment/OEffects.jsx';
import XEffects from '../components/3d/Environment/XEffects.jsx';
import SpotLights from '../components/3d/Environment/SpotLights.jsx';
import ExplosionConfetti from '../components/3d/Environment/ExplosionConfetti.jsx';
import Bridge from '../components/3d/Environment/Bridge.jsx';
import Land from '../components/3d/Environment/Land.jsx';

// Character
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';

// store
import useQuizRoomStore from '../store/quizRoomStore.js';

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

  const { type, isStarted } = useQuizRoomStore(state => state.quizRoom);

  const CAMERA_UP = 10;
  const CAMERA_TILT = 20;
  const DURATION = 5;

  const setTeacherView = useCallback(
    (currentSelectedStudent, currentClientCoords) => {
      if (orbitControls.current) {
        let targetPosition, cameraPosition;

        if (
          currentSelectedStudent &&
          currentClientCoords[currentSelectedStudent]
        ) {
          const studentPos = currentClientCoords[currentSelectedStudent];
          targetPosition = {
            x: studentPos.x,
            y: studentPos.y + CAMERA_UP,
            z: studentPos.z,
          };
          cameraPosition = {
            x: studentPos.x,
            y: studentPos.y + CAMERA_UP,
            z: studentPos.z + CAMERA_TILT,
          };
        } else {
          // 선생님 기본 시점
          targetPosition = { x: 0, y: CAMERA_TILT, z: -CAMERA_UP };
          cameraPosition = { x: 0, y: CAMERA_TILT, z: CAMERA_TILT };
        }

        // GSAP를 사용하여 부드럽게 애니메이션
        gsap.to(orbitControls.current.target, {
          duration: DURATION,
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          onUpdate: () => orbitControls.current.update(),
        });

        gsap.to(camera.position, {
          duration: DURATION,
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z,
          onUpdate: () => orbitControls.current.update(),
        });
      }
    },
    [camera]
  );

  const updateStudentCamera = useCallback(() => {
    if (!isTeacher && cameraControls.current && clientCoords[nickname]) {
      const playerPos = clientCoords[nickname];
      const cameraOffset = { x: 0, y: 25, z: 50 };

      // 카메라 위치와 타겟
      cameraControls.current.setLookAt(
        playerPos.x + cameraOffset.x,
        playerPos.y + cameraOffset.y,
        playerPos.z + cameraOffset.z,
        playerPos.x,
        playerPos.y + cameraOffset.y,
        playerPos.z,
        true
      );

      // 카메라 고개 들기
      const rotationAngle = Math.PI / 60;
      cameraControls.current.rotate(0, rotationAngle, 0, true);
    }
  }, [isTeacher, nickname, clientCoords]);

  // 선생님 시점 + 초기
  useEffect(() => {
    if (isTeacher) {
      setTeacherView(selectedStudent, clientCoords);
    }
  }, [isTeacher, setTeacherView]);

  // 선생님 시점 + 이동 후
  useEffect(() => {
    if (isTeacher && !initialTeacherViewSet) {
      setTeacherView(selectedStudent, clientCoords);
      setInitialTeacherViewSet(true);
    }
  }, [
    isTeacher,
    initialTeacherViewSet,
    setTeacherView,
    selectedStudent,
    clientCoords,
  ]);

  // 학생 시점 이동
  useEffect(() => {
    if (!isTeacher) {
      updateStudentCamera();
    }
  }, [isTeacher, updateStudentCamera]);

  // 실시간 카메라 업데이트를 위한 useFrame
  useFrame(() => {
    if (isTeacher && selectedStudent && clientCoords[selectedStudent]) {
      setTeacherView(selectedStudent, clientCoords);
    } else {
      updateStudentCamera();
    }
  });

  return (
    <>
      <Perf />

      {isTeacher ? (
        <OrbitControls
          ref={orbitControls}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          // maxDistance={80}
        />
      ) : (
        <CameraControls ref={cameraControls} />
      )}
      {isStarted ? (
        <>
          <Sky />
          <Lights intensity={1.5} ambientIntensity={0.5} />
        </>
      ) : (
        <>
          <Sky
            distance={4000}
            sunPosition={[0, -50, -500]}
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
      <BasicSpotLights />

      {!isStarted && type === 1 && spotlight === '1' && <OEffects />}
      {!isStarted && type === 1 && spotlight === '2' && <XEffects />}

      {!isStarted && type === 2 && quizAnswerer && (
        <>
          {isCorrectAnswerer && clientCoords[nickname] && (
            <>
              <ExplosionConfetti
                position-x={0}
                rate={2}
                fallingHeight={30}
                amount={200}
                areaWidth={100}
                isExploding
              />
              <SpotLights
                position={[
                  clientCoords[nickname].x,
                  clientCoords[nickname].y + 10,
                  clientCoords[nickname].z,
                ]}
                targetPosition={[
                  clientCoords[nickname].x,
                  clientCoords[nickname].y,
                  clientCoords[nickname].z,
                ]}
                intensity={300}
              />
            </>
          )}
          {quizAnswerer.map(answerer => {
            if (answerer !== nickname && clientCoords[answerer]) {
              return (
                <>
                  <ExplosionConfetti
                    position-x={0}
                    rate={2}
                    fallingHeight={30}
                    amount={200}
                    areaWidth={100}
                    isExploding
                  />
                  <SpotLights
                    key={answerer}
                    position={[
                      clientCoords[answerer].x,
                      clientCoords[answerer].y + 10,
                      clientCoords[answerer].z,
                    ]}
                    targetPosition={[
                      clientCoords[answerer].x,
                      clientCoords[answerer].y,
                      clientCoords[answerer].z,
                    ]}
                    intensity={1000}
                  />
                </>
              );
            }
            return null;
          })}
        </>
      )}

      <Physics debug>
        {/* <IslandMaterials rotation-y={Math.PI} /> */}

        <Land rotation-y={Math.PI} />
        <Land rotation-y={Math.PI} scale-x={-1} />
        <Bridge />

        <Wall />
        {isConnected && quiz && (
          <Blackboard position-y={70} position-z={-200} text={quiz} />
        )}
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
        {isConnected &&
          isJoined &&
          Object.keys(clientCoords).map(key => {
            if (key !== nickname) {
              const isCorrect = quizAnswerer.includes(key);
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
