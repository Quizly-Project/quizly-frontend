import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import Character from './Character';

const OtherCharacterController = React.memo(
  ({
    path,
    matName,
    nickname,
    pos,
    rank,
    isCorrectAnswerer,
    selectedStudent,
  }) => {
    // console.log('position', pos);
    const rigidbody = useRef();
    const character = useRef();
    const previousPos = useRef(pos);

    const [myPos, setMyPos] = useState({ x: pos.x, y: pos.y, z: pos.z });
    // console.log('MyPos', myPos);

    // 임계점 이상일 때만 렌더링한다.
    const detectMovement = useCallback((oldPos, newPos, threshold = 0.3) => {
      return (
        Math.abs(oldPos.x - newPos.x) > threshold ||
        Math.abs(oldPos.y - newPos.y) > threshold ||
        Math.abs(oldPos.z - newPos.z) > threshold
      );
    }, []);

    // 첫 렌더링 시 스폰 위치
    useEffect(() => {
      rigidbody.current.setTranslation(pos);
    }, []);

    // 정답자이면 춤추게
    const action = isCorrectAnswerer ? 'Fly' : 'Idle_A';

    // 이동한 위치로 클라이언트 모델 다시 렌더링
    useFrame(() => {
      if (detectMovement(previousPos.current, pos)) {
        rigidbody.current.setTranslation(pos);
        const diff = {
          x: previousPos.current.x - pos.x,
          z: previousPos.current.z - pos.z,
        };
        if (diff.x !== 0 || diff.z !== 0) {
          const angle = Math.atan2(diff.x, diff.z);
          character.current.rotation.y = Math.PI + angle;
        }
        previousPos.current = pos;
      }
    });

    useGLTF.preload(`./Character/${path}`);

    return (
      <RigidBody
        ref={rigidbody}
        colliders={false}
        canSleep={false}
        enabledRotations={[false, false, false]}
        gravityScale={0.6}
      >
        {/* <CapsuleCollider args={[0.2, 2.2]} position={[0, 1.25, 0]} /> */}
        <group ref={character}>
          {action && (
            <Character
              path={path}
              matName={matName}
              nickname={nickname}
              scale={2}
              actionType={action}
              rank={rank}
              isCorrectAnswerer={isCorrectAnswerer}
              selectedStudent={selectedStudent}
            />
          )}
        </group>
      </RigidBody>
    );
  }
);

export default OtherCharacterController;
