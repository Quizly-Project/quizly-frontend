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

      gsap
        .timeline()
        .call(displayAnswer)
        .to({}, { duration: 2 }) // 1초 대기
        .to(orbitControls.current.target, {
          duration: DURATION,
          x: centerLookAt.x,
          y: centerLookAt.y,
          z: centerLookAt.z,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(
          camera.position,
          {
            duration: DURATION,
            x: centerPosition.x,
            y: centerPosition.y,
            z: centerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        );
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
        }, 1000);

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
        .to({}, { duration: 2 }) // 3초 대기
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

  const setQuizStartView = useCallback(
    onComplete => {
      if (!orbitControls.current) {
        if (onComplete) onComplete();
        return;
      }

      const blackboardPosition = new Vector3(0, 70, -200);
      const cameraPosition = new Vector3(0, 70, 30);

      gsap
        .timeline()
        .to(orbitControls.current.target, {
          duration: DURATION,
          x: blackboardPosition.x,
          y: blackboardPosition.y,
          z: blackboardPosition.z,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(camera.position, {
          duration: DURATION,
          x: cameraPosition.x,
          y: cameraPosition.y,
          z: cameraPosition.z,
          onUpdate: () => orbitControls.current.update(),
          onComplete: () => {
            if (onComplete) {
              setTimeout(onComplete, 2000); // 2초 딜레이 추가
            }
          },
        });
    },
    [camera, orbitControls]
  );

  const setCenterView = useCallback(
    onComplete => {
      if (!orbitControls.current) {
        if (onComplete) onComplete();
        return;
      }

      const centerPosition = new Vector3(0, CAMERA_TILT, CAMERA_TILT * 2.5);
      const centerLookAt = new Vector3(0, CAMERA_TILT * 1.2, 0);

      gsap
        .timeline()
        .to(orbitControls.current.target, {
          duration: DURATION,
          x: centerLookAt.x,
          y: centerLookAt.y,
          z: centerLookAt.z,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(
          camera.position,
          {
            duration: DURATION,
            x: centerPosition.x,
            y: centerPosition.y,
            z: centerPosition.z,
            onUpdate: () => orbitControls.current.update(),
            onComplete: onComplete,
          },
          '<'
        );
    },
    [camera, orbitControls]
  );

  return { setResultView, setQuizStartView, setCenterView };
};
