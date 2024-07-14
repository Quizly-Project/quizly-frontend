import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import Character from './Character';

const OtherCharacterController = ({
  path,
  matName,
  nickname,
  pos,
  rank,
  isCorrectAnswerer,
}) => {
  // console.log('position', pos);
  const rigidbody = useRef();
  const character = useRef();

  const [myPos, setMyPos] = useState({ x: pos.x, y: pos.y, z: pos.z });
  // console.log('MyPos', myPos);

  // Action
  const [action, setAction] = useState('Idle_A');

  // 임계점 이상일 때만 렌더링한다.
  const detectMovement = (oldPos, newPos, threshold = 0.3) => {
    return (
      Math.abs(oldPos.x - newPos.x) > threshold ||
      Math.abs(oldPos.y - newPos.y) > threshold ||
      Math.abs(oldPos.z - newPos.z) > threshold
    );
  };

  // 첫 렌더링 시 스폰 위치
  useEffect(() => {
    const worldPos = {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    };
    rigidbody.current.setTranslation(worldPos);
    setMyPos(worldPos);
  }, []);

  // 정답자이면 춤추게
  useEffect(() => {
    if (isCorrectAnswerer) {
      setAction('Fly');
    } else {
      setAction('Idle_A');
    }
  }, [isCorrectAnswerer]);

  // 이동한 위치로 클라이언트 모델 다시 렌더링
  useFrame(() => {
    // myPos: 기존 position, pos: 새로운 position
    let changeRotation = false;
    // console.log(myPos, pos);
    const diff = {
      x: myPos.x - pos.x,
      y: myPos.y - pos.y,
      z: myPos.z - pos.z,
    };

    // console.log(diff.x, diff.y, diff.z);
    if (diff.x != 0 || diff.z != 0) {
      changeRotation = true;
    }

    // 바라보는 방향으로 얼굴 돌리기
    if (changeRotation) {
      console.log('change');
      const angle = Math.atan2(diff.x, diff.z);
      character.current.rotation.y = Math.PI + angle;
    }

    // pos로 위치 갱신
    if (detectMovement(myPos, pos)) {
      // console.log('New pos!', myPos, 'to', mypos);
      rigidbody.current.setTranslation(pos);
      setMyPos(pos);
    }
  }, []);

  useGLTF.preload(`./Character/${path}`);

  return (
    <RigidBody
      ref={rigidbody}
      colliders={false}
      canSleep={false}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.5, 0.7]} position={[0, 1.25, 0]} />
      <group ref={character}>
        {action && (
          <Character
            path={path}
            matName={matName}
            nickname={nickname}
            scale={2}
            actionType={action}
            rank={rank}
          />
        )}
      </group>
    </RigidBody>
  );
};

export default OtherCharacterController;
