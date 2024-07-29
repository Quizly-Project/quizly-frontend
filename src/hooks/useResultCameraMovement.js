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
    // console.log(orbitControls.current);
    if (!orbitControls.current) {
      return;
    }

    const answerPosition = new Vector3(0, 50, -30);
    const incorrectLeftIsland = new Vector3(-130, 40, 0);
    const incorrectRightIsland = new Vector3(130, 40, 0);
    const incorrectLeftIslandLookAt = new Vector3(-60, 20, 0);
    const incorrectRightIslandLooAt = new Vector3(60, 20, 0);
    const correctLeftIsland = new Vector3(-60, CAMERA_TILT, 50);
    const correctRightIsland = new Vector3(60, CAMERA_TILT, 50);
    const correctLeftIslandLookAt = new Vector3(-60, CAMERA_TILT, CAMERA_UP);
    const correctRightIslandLooAt = new Vector3(60, CAMERA_TILT, CAMERA_UP);

    const onAnswerPositionReached = () => {
      // console.log('정답 위치에 도달했습니다.');
      displayAnswer();
    };

    // 골든벨
    if (type === 2) {
      const delayBetweenMoves = 1;

      gsap
        .timeline()
        .to(orbitControls.current.target, {
          duration: 2,
          x: answerPosition.x,
          y: answerPosition.y + 40,
          z: answerPosition.z - 90,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(
          camera.position,
          {
            duration: 2,
            x: answerPosition.x,
            y: answerPosition.y + 40,
            z: answerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onAnswerPositionReached)
        .to({}, { duration: 0.1 }) // 대기
        .to(
          camera.position,
          {
            // 왼쪽 출발
            duration: 4,
            x: -50, // 오른쪽으로 이동
            y: answerPosition.y - 35,
            z: answerPosition.z + 50,
          },
          `+=${delayBetweenMoves}`
        )
        .to(
          orbitControls.current.target,
          {
            // 카메라가 이동하는 동안 중앙을 바라보도록
            duration: 4,
            x: 0,
            y: answerPosition.y - 20,
            z: answerPosition.z - 400,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .to(camera.position, {
          // 오른쪽 도착
          duration: 4,
          x: 50, // 오른쪽으로 이동
          y: answerPosition.y - 35,
          z: answerPosition.z + 50,
        })
        .to(
          orbitControls.current.target,
          {
            // 카메라가 이동하는 동안 중앙을 바라보도록
            duration: 4,
            x: 0,
            y: answerPosition.y - 20,
            z: answerPosition.z - 400,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .to(
          // 맵 전체 뷰
          orbitControls.current.target,
          {
            duration: 2,
            x: 0,
            y: 50,
            z: 10,
            onUpdate: () => orbitControls.current.update(),
          }
        )
        .to(
          camera.position,
          {
            duration: 2,
            x: 0,
            y: 60,
            z: 80,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(displayTopThree);
    } else {
      const delayBetweenMoves = 1;

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

      const onIncorrectPositionReached = () => {
        // console.log('오답 위치에 도달했습니다.');

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
        }, 10000); // 브릿지가 1초 후에 파괴되므로, 총 2초 후에 리셋

        // 컴포넌트 언마운트 시 타이머 클리어 (옵션)
        return () => {
          clearTimeout(bridgeBreakTimer);
          clearTimeout(resetTimer);
        };
      };

      const onCorrectPositionReached = () => {
        // console.log('정답자 위치에 도달했습니다.');
        playTwinkleSound();
      };

      const onOriginalPositionReached = () => {
        // console.log('원래 위치로 돌아왔습니다.');
        displayTopThree();
        setBridgeBreak(false);
        setLeftIslandBreak(false);
        setRightIslandBreak(false);
        stopIsBreak();
        turnOffCamera();
      };

      // 카메라 무빙
      gsap
        .timeline()
        .to(orbitControls.current.target, {
          duration: 2,
          x: answerPosition.x,
          y: answerPosition.y + 40,
          z: answerPosition.z - 90,
          onUpdate: () => orbitControls.current.update(),
        })
        .to(
          camera.position,
          {
            duration: 2,
            x: answerPosition.x,
            y: answerPosition.y + 40,
            z: answerPosition.z,
            onUpdate: () => orbitControls.current.update(),
          },
          '<'
        )
        .call(onAnswerPositionReached)
        .to({}, { duration: 0.1 }) // 대기
        // .to(
        //   orbitControls.current.target,
        //   {
        //     duration: 2,
        //     x: incorrectAnswerLookAt.x,
        //     y: incorrectAnswerLookAt.y,
        //     z: incorrectAnswerLookAt.z,
        //     onUpdate: () => orbitControls.current.update(),
        //   },
        //   `+=${delayBetweenMoves}`
        // )
        // .to(
        //   camera.position,
        //   {
        //     duration: 2,
        //     x: incorrectAnswerPosition.x,
        //     y: incorrectAnswerPosition.y,
        //     z: incorrectAnswerPosition.z,
        //     onUpdate: () => orbitControls.current.update(),
        //   },
        //   '<'
        // )
        .to(
          // 맵 전체 뷰
          orbitControls.current.target,
          {
            duration: 2,
            x: 0,
            y: 50, // 중심점을 보도록 y를 0으로 설정
            z: 10, // 중심점을 보도록 z를 0으로 설정
            onUpdate: () => orbitControls.current.update(),
          },
          `+=${delayBetweenMoves}`
        )
        .to(
          camera.position,
          {
            duration: 2,
            x: 0,
            y: 60,
            z: 80, // 카메라를 더 멀리 위치시킴
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
        .call(onOriginalPositionReached);
      // .to(
      //   orbitControls.current.target,
      //   {
      //     duration: 2,
      //     x: 0,
      //     y: CAMERA_TILT,
      //     z: -CAMERA_UP,
      //     onUpdate: () => orbitControls.current.update(),
      //   },
      //   `+=${delayBetweenMoves}`
      // )
      // .to(
      //   camera.position,
      //   {
      //     duration: 2,
      //     x: 0,
      //     y: CAMERA_TILT,
      //     z: CAMERA_TILT,
      //     onUpdate: () => orbitControls.current.update(),
      //   },
      //   '<'
      // )
      // .call(onOriginalPositionReached);
      // .to(
      //   // 맵 전체 뷰
      //   orbitControls.current.target,
      //   {
      //     duration: 2,
      //     x: 0,
      //     y: 50, // 중심점을 보도록 y를 0으로 설정
      //     z: 10, // 중심점을 보도록 z를 0으로 설정
      //     onUpdate: () => orbitControls.current.update(),
      //   },
      //   `+=${delayBetweenMoves}`
      // )
      // .to(
      //   camera.position,
      //   {
      //     duration: 2,
      //     x: 0,
      //     y: 70,
      //     z: 80, // 카메라를 더 멀리 위치시킴
      //     onUpdate: () => orbitControls.current.update(),
      //   },
      //   '<'
      // );
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

    // O/X
    let CAMERA_Y = 60;
    let CAMERA_Z = 80;
    let TARGET_Y = 50;
    if (type === 1) {
      CAMERA_Y = 60;
      CAMERA_Z = 80;
      TARGET_Y = 50;
    }
    // 골든벨
    else {
      CAMERA_Y = 60;
      CAMERA_Z = 60;
      TARGET_Y = 53;
    }

    // 카메라 무빙 시작
    gsap
      .timeline()
      // 칠판 줌인
      .to(orbitControls.current.target, {
        duration: DURATION,
        x: blackboardPosition.x,
        y: blackboardPosition.y + 40, // 10
        z: blackboardPosition.z - 90,
        onUpdate: () => orbitControls.current.update(),
      })
      .to(
        camera.position,
        {
          duration: DURATION,
          x: blackboardPosition.x,
          y: blackboardPosition.y + 40,
          z: blackboardPosition.z,
          onUpdate: () => orbitControls.current.update(),
        },
        '<' // 앞 애니메이션과 동시에 실행
      )
      // 칠판 줌아웃
      .to(
        // 맵 전체 뷰
        orbitControls.current.target,
        {
          duration: DURATION,
          x: 0,
          y: TARGET_Y,
          z: 10,
          onUpdate: () => orbitControls.current.update(),
        },
        `+=${delayBetweenMoves}`
      )
      .to(
        camera.position,
        {
          duration: DURATION,
          x: 0,
          y: CAMERA_Y,
          z: CAMERA_Z,
          onUpdate: () => orbitControls.current.update(),
        },
        '<'
      );
  }, [camera, orbitControls]);

  return { setResultView, setQuizStartView };
};
