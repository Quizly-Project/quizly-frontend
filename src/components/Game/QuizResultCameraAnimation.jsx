import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { gsap } from 'gsap';

const QuizResultCameraAnimation = ({
  answerPosition,
  incorrectAnswerPosition,
  correctAnswerPosition,
  originalPosition,
}) => {
  const { camera } = useThree();
  const animationSequence = useRef();

  const lookAtTarget = useRef(new Vector3());

  useFrame(() => {
    if (!animationSequence.current) {
      animationSequence.current = gsap
        .timeline()
        .to(camera.position, {
          duration: 2,
          x: answerPosition.x,
          y: answerPosition.y,
          z: answerPosition.z,
          ease: 'power2.inOut',
          onUpdate: () => {
            // 답안 위치 앞쪽을 바라보도록 설정
            lookAtTarget.current.set(
              0,
              answerPosition.y,
              answerPosition.z - 100
            );
            camera.lookAt(lookAtTarget.current);
          },
        })
        .to(camera.position, {
          duration: 2,
          x: incorrectAnswerPosition.x,
          y: incorrectAnswerPosition.y,
          z: incorrectAnswerPosition.z,
          ease: 'power2.inOut',
          onUpdate: () =>
            camera.lookAt(
              incorrectAnswerPosition.x,
              incorrectAnswerPosition.y,
              incorrectAnswerPosition.z
            ),
        })
        .to(camera.position, {
          duration: 2,
          x: correctAnswerPosition.x,
          y: correctAnswerPosition.y,
          z: correctAnswerPosition.z,
          ease: 'power2.inOut',
          onUpdate: () =>
            camera.lookAt(
              correctAnswerPosition.x,
              correctAnswerPosition.y,
              correctAnswerPosition.z
            ),
        })
        .to(camera.position, {
          duration: 2,
          x: originalPosition.x,
          y: originalPosition.y,
          z: originalPosition.z,
          ease: 'power2.inOut',
          onUpdate: () => camera.lookAt(0, 0, 0),
        });
    }

    return () => {
      if (animationSequence.current) {
        animationSequence.current.kill();
        animationSequence.current = null;
      }
    };
  }, [
    camera,
    answerPosition,
    incorrectAnswerPosition,
    correctAnswerPosition,
    originalPosition,
  ]);

  return null;
};

export default QuizResultCameraAnimation;
