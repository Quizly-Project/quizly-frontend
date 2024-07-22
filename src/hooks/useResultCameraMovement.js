import { useCallback } from 'react';
import { gsap } from 'gsap';
import { Vector3 } from 'three';

const CAMERA_TILT = 20;
const CAMERA_UP = 10;
const DURATION = 2;

export const useResultCameraMovement = (
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
) => {
  const setResultView = useCallback(() => {
    if (!orbitControls.current) return;

    if (type === 2) {
      const centerPosition = new Vector3(0, CAMERA_TILT * 3, CAMERA_TILT * 2);
      const centerLookAt = new Vector3(0, -CAMERA_TILT, 0);
      const delayBetweenMoves = 1;
      gsap
        .timeline()
        .to({}, { duration: 1 }) // 2초 대기
        .to(
          orbitControls.current.target,
          {
            duration: 2,
            x: 0,
            y: CAMERA_TILT,
            z: -CAMERA_UP,
            onUpdate: () => orbitControls.current.update(),
          },
          `+=${delayBetweenMoves}`
        )
        .call(displayAnswer)
        .to(
          camera.position,
          {
            duration: 2,
            x: 0,
            y: CAMERA_TILT,
            z: CAMERA_TILT,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(displayTopThree);
    } else {
      const delayBetweenMoves = 1;
      const answerPosition = new Vector3(0, 50, -30);
      const incorrectLeftIsland = new Vector3(-130, 40, 0);
      const incorrectRightIsland = new Vector3(130, 40, 0);
      const incorrectLeftIslandLookAt = new Vector3(-60, 20, 0);
      const incorrectRightIslandLooAt = new Vector3(60, 20, 0);
      const correctLeftIsland = new Vector3(-60, CAMERA_TILT, 50);
      const correctRightIsland = new Vector3(60, CAMERA_TILT, 50);
      const correctLeftIslandLookAt = new Vector3(-60, CAMERA_TILT, CAMERA_UP);
      const correctRightIslandLooAt = new Vector3(60, CAMERA_TILT, CAMERA_UP);

      let incorrectAnswerPosition,
        correctAnswerPosition,
        incorrectAnswerLookAt,
        correctAnswerLookAt;

      if (spotlight === '1') {
        incorrectAnswerPosition = incorrectRightIsland;
        correctAnswerPosition = correctLeftIsland;
        incorrectAnswerLookAt = incorrectRightIslandLooAt;
        correctAnswerLookAt = correctLeftIslandLookAt;
      } else {
        incorrectAnswerPosition = incorrectLeftIsland;
        correctAnswerPosition = correctRightIsland;
        incorrectAnswerLookAt = incorrectLeftIslandLookAt;
        correctAnswerLookAt = correctRightIslandLooAt;
      }

      const onAnswerPositionReached = () => {
        console.log('정답 위치에 도달했습니다.');
        displayAnswer();
      };

      const onIncorrectPositionReached = () => {
        console.log('오답 위치에 도달했습니다.');

        // 섬 파괴 효과 시작
        if (spotlight === '1') {
          setRightIslandBreak(true);
        } else {
          setLeftIslandBreak(true);
        }

        // 브릿지 파괴 효과 시작 (1초 후)
        const bridgeBreakTimer = setTimeout(() => {
          setBridgeBreak(true);
        }, 100);

        // isBreak 상태 시작
        startIsBreak();

        // 1초 후 모든 파괴 효과 리셋
        const resetTimer = setTimeout(() => {
          if (spotlight === '1') {
            setRightIslandBreak(false);
          } else {
            setLeftIslandBreak(false);
          }
          setBridgeBreak(false);
          stopIsBreak();
        }, 1000); // 브릿지가 1초 후에 파괴되므로, 총 2초 후에 리셋

        // 컴포넌트 언마운트 시 타이머 클리어 (옵션)
        return () => {
          clearTimeout(bridgeBreakTimer);
          clearTimeout(resetTimer);
        };
      };

      const onCorrectPositionReached = () => {
        console.log('정답자 위치에 도달했습니다.');
        playTwinkleSound();
      };

      const onOriginalPositionReached = () => {
        console.log('원래 위치로 돌아왔습니다.');
        displayTopThree();
        setBridgeBreak(false);
        setLeftIslandBreak(false);
        setRightIslandBreak(false);
        stopIsBreak();
        turnOffCamera();
      };

      gsap
        .timeline()
        .to(orbitControls.current.target, {
          duration: 2,
          x: answerPosition.x,
          y: answerPosition.y,
          z: answerPosition.z - 90,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(
          camera.position,
          {
            duration: 2,
            x: answerPosition.x,
            y: answerPosition.y,
            z: answerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onAnswerPositionReached)
        .to({}, { duration: 0.1 }) // 대기
        .to(
          orbitControls.current.target,
          {
            duration: 2,
            x: incorrectAnswerLookAt.x,
            y: incorrectAnswerLookAt.y,
            z: incorrectAnswerLookAt.z,
            onUpdate: () => orbitControls.current.update(),
          },
          `+=${delayBetweenMoves}`
        )
        .to(
          camera.position,
          {
            duration: 2,
            x: incorrectAnswerPosition.x,
            y: incorrectAnswerPosition.y,
            z: incorrectAnswerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onIncorrectPositionReached)
        .to(
          orbitControls.current.target,
          {
            duration: 2,
            x: correctAnswerLookAt.x,
            y: correctAnswerLookAt.y,
            z: correctAnswerLookAt.z,
            onUpdate: () => orbitControls.current.update(),
          },
          `+=${delayBetweenMoves}`
        )
        .to(
          camera.position,
          {
            duration: 2,
            x: correctAnswerPosition.x,
            y: correctAnswerPosition.y,
            z: correctAnswerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onCorrectPositionReached)
        .to(
          orbitControls.current.target,
          {
            duration: 2,
            x: 0,
            y: CAMERA_TILT,
            z: -CAMERA_UP,
            onUpdate: () => orbitControls.current.update(),
          },
          `+=${delayBetweenMoves}`
        )
        .to(
          camera.position,
          {
            duration: 2,
            x: 0,
            y: CAMERA_TILT,
            z: CAMERA_TILT,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onOriginalPositionReached);
    }
  }, [
    camera,
    spotlight,
    type,
    orbitControls,
    displayAnswer,
    setRightIslandBreak,
    setLeftIslandBreak,
    setBridgeBreak,
    startIsBreak,
    playTwinkleSound,
    displayTopThree,
    stopIsBreak,
    turnOffCamera,
  ]);

  const setQuizStartView = useCallback(() => {
    if (!orbitControls.current) return;

    const blackboardPosition = new Vector3(0, 50, -30);
    const delayBetweenMoves = 0.3; // 칠판에서 줌아웃 딜레이 시간

    gsap
      .timeline()
      // 칠판 줌인
      .to(orbitControls.current.target, {
        duration: DURATION,
        x: blackboardPosition.x,
        y: blackboardPosition.y,
        z: blackboardPosition.z - 90,
        onUpdate: () => orbitControls.current.update(),
      })
      .to(
        camera.position,
        {
          duration: DURATION,
          x: blackboardPosition.x,
          y: blackboardPosition.y,
          z: blackboardPosition.z,
          onUpdate: () => orbitControls.current.update(),
        },
        '<' // 앞 애니메이션과 동시에 실행
      )
      // 칠판 줌아웃
      .to(
        orbitControls.current.target,
        {
          duration: DURATION * 1.3,
          x: 0,
          y: CAMERA_TILT,
          z: -CAMERA_UP,
          onUpdate: () => orbitControls.current.update(),
        },
        `+=${delayBetweenMoves}`
      )
      .to(
        camera.position,
        {
          duration: DURATION * 1.3,
          x: 0,
          y: CAMERA_TILT,
          z: CAMERA_TILT,
          onUpdate: () => orbitControls.current.update(),
        },
        '<'
      );
  }, [camera, orbitControls]);

  return { setResultView, setQuizStartView };
};
