import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Sky,
  OrbitControls,
  CameraControls,
  Environment,
  Text3D,
} from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Perf } from 'r3f-perf';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Vector3 } from 'three';

// Environment
import Blackboard from '../components/3d/Environment/Blackboard.jsx';
import Wall from '../components/3d/Environment/Wall.jsx';
import BasicSpotLights from '../components/3d/Environment/BasicSpotLights.jsx';
import OEffects from '../components/3d/Environment/OEffects.jsx';
import XEffects from '../components/3d/Environment/XEffects.jsx';
import SpotLights from '../components/3d/Environment/SpotLights.jsx';
import QuizResultCameraAnimation from '../components/Game/QuizResultCameraAnimation.jsx';
import CoordinateHelpers from '../components/3d/CoordinateHelpers.jsx';
import ExplosionConfetti from '../components/3d/Environment/ExplosionConfetti.jsx';
import Bridge from '../components/3d/Environment/Bridge.jsx';
import Land from '../components/3d/Environment/Land.jsx';
import BrokenLand from '../components/3d/Environment/BrokenLand.jsx';
import StaticMaterials from '../components/3d/Environment/StaticMaterials.jsx';
import LineConfetti from '../components/3d/Environment/LineConfetti.jsx';
import BrokenBridge from '../components/3d/Environment/BrokenBridge.jsx';
import Beachside from '../components/3d/Environment/Beachside.jsx';
import useAudioStore from '../store/audioStore.js';
import OXText from '../components/3d/Environment/OXText.jsx';

// Effects
import QuizResultEffects from '../components/3d/Effects/QuizResultEffects.jsx';
import ShimmeringText from '../components/3d/Effects/ShimmeringText.jsx';

// Character
import CharacterController from '../components/3d/Mesh/CharacterController.jsx';
import OtherCharacterController from '../components/3d/Mesh/OtherCharacterController.jsx';

// store
import useQuizRoomStore from '../store/quizRoomStore.js';

// style
import '../styles/game.css';

import { useResultCameraMovement } from '../hooks/useResultCameraMovement.js';
import YesNo from '../components/3d/Environment/YesNo.jsx';
import Floor from '../components/3d/Environment/Floor.jsx';

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
  const [leftIslandBreak, setLeftIslandBreak] = useState(false);
  const [rightIslandBreak, setRightIslandBreak] = useState(false);
  const [bridgeBreak, setBridgeBreak] = useState(false);
  const { displayAnswer } = useQuizRoomStore();

  const {
    type,
    isFinished, // 퀴즈 세션 완전히 종료
    isStarted, // 퀴즈 세션 시작
    isQuestionActive, // 문제 출제 퀴즈 진행 중
    isAnswerDisplayed, // 정답 공개
    isResultDisplayed, // 결과 공개
    isBreak, // 섬 파괴
    isEndEventVisible, // 퀴즈 종료 이벤트 표시
    isCameraOn, // 카메라 활성화
  } = useQuizRoomStore(state => state.quizRoom);
  const {
    displayTopThree, // 상위 3명 표시
    startIsBreak, // 섬 파괴 시작
    stopIsBreak, // 섬 파괴 중지
    turnOffCamera, // 카메라 끄기
  } = useQuizRoomStore();

  const CAMERA_UP = 10;
  const CAMERA_TILT = 20;
  const DURATION = 1.5;

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
            y: studentPos.y + CAMERA_UP + 15,
            z: studentPos.z + 20,
          };
          cameraPosition = {
            x: studentPos.x,
            y: studentPos.y + CAMERA_UP + 20,
            z: studentPos.z + CAMERA_TILT + 30,
          };
        } else {
          // 선생님 기본 시점
          targetPosition = { x: 0, y: CAMERA_TILT + 15, z: -CAMERA_UP + 20 };
          cameraPosition = { x: 0, y: CAMERA_TILT + 20, z: CAMERA_TILT + 30 };
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

  // 정답자 효과음
  const { initializeTwinkleSound, playTwinkleSound } = useAudioStore();

  useEffect(() => {
    initializeTwinkleSound();
  }, []);

  // 카메라 무빙
  const { setResultView, setQuizStartView } = useResultCameraMovement(
    orbitControls,
    camera,
    type,
    spotlight,
    displayAnswer,
    setRightIslandBreak,
    setLeftIslandBreak,
    setBridgeBreak,
    startIsBreak,
    playTwinkleSound,
    displayTopThree,
    stopIsBreak,
    turnOffCamera
  );

  // 시작 시 칠판으로 카메라 무빙
  useEffect(() => {
    if (isQuestionActive) {
      setQuizStartView();
    }
  }, [isQuestionActive, setQuizStartView]);

  // 종료 시 결과 카메라 무빙
  useEffect(() => {
    if (isStarted && !isQuestionActive && isCameraOn) {
      // console.log('결과', isAnswerDisplayed);
      setResultView();
    }
  }, [isStarted, isQuestionActive, isCameraOn, setResultView]);

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
  }, [selectedStudent]);

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

  // console.log(leftIslandBreak, rightIslandBreak, bridgeBreak);

  return (
    <>
      {/* <Perf /> */}
      <Environment
        background
        files={'/Environment/puresky.hdr'}
        intensity={0.1}
      />

      {/* <CoordinateHelpers size={1000} divisions={10} /> */}
      {isTeacher ? (
        <OrbitControls
          ref={orbitControls}
          enableRotate={true}
          enableZoom={true}
          enablePan={true}
          minDistance={5}
          // maxDistance={100}
        />
      ) : isStarted && !isQuestionActive && isCameraOn ? (
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

      {/* {isQuestionActive ? (
        <>
          <Sky />
          <Lights intensity={1.5} ambientIntensity={0.5} />
        </>
      ) : (
        <>
          <Sky />
          <Lights intensity={0.5} ambientIntensity={0.5} />
        </>
      )} */}

      <BasicSpotLights />
      {isStarted && !isQuestionActive && type === 1 && spotlight === '1' && (
        <OEffects />
      )}
      {isStarted && !isQuestionActive && type === 1 && spotlight === '2' && (
        <XEffects />
      )}
      {/* {type === 1 && <YesNo rotation-y={Math.PI} />} */}

      <QuizResultEffects
        isStarted={isStarted}
        isQuestionActive={isQuestionActive}
        type={type}
        quizAnswerer={quizAnswerer}
        isCorrectAnswerer={isCorrectAnswerer}
        clientCoords={clientCoords}
        nickname={nickname}
      />
      <StaticMaterials scale={2} position-z={-20} rotation-y={Math.PI} />

      <Physics>
        {/* <Floor width={200} height={200} /> */}
        {type === 2 && (
          <Beachside
            rotation-y={-Math.PI / 2}
            position-y={-10}
            position-z={-60}
          />
        )}

        {type === 1 && (
          <>
            <OXText />

            {leftIslandBreak ? (
              <BrokenLand rotation-y={Math.PI} />
            ) : (
              <Land rotation-y={Math.PI} />
            )}
            {rightIslandBreak ? (
              <BrokenLand rotation-y={Math.PI} scale-x={-1} />
            ) : (
              <Land rotation-y={Math.PI} scale-x={-1} />
            )}
            {bridgeBreak ? <BrokenBridge /> : <Bridge position-y={0.5} />}
            <Wall />
          </>
        )}

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
            isStarted={isQuestionActive}
            clientCoords={clientCoords}
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
                  isStarted={isQuestionActive}
                  selectedStudent={selectedStudent}
                />
              ) : null;
            }
            return null;
          })}
      </Physics>
    </>
  );
}
