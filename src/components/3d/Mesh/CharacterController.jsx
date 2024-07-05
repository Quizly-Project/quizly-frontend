import React, { useRef, useEffect, useState } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import Character from './Character';

const CharacterController = React.memo(
  ({ path, matName, nickname, socket }) => {
    const rigidbody = useRef();
    const character = useRef();

    const [subscribeKeys, getKeys] = useKeyboardControls();

    const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });

    // 임계점 이상일 때만 렌더링한다.
    const detectMovement = (oldPos, newPos, threshold = 0.5) => {
      return (
        Math.abs(oldPos.x - newPos.x) > threshold ||
        Math.abs(oldPos.y - newPos.y) > threshold ||
        Math.abs(oldPos.z - newPos.z) > threshold
      );
    };

    // 내 위치가 바뀌면 서버에 위치를 전송한다.
    useEffect(() => {
      socket.emit('iMove', { nickName: nickname, position: myPos }); // 보내줄 데이터 {nickName, {x, y, z}}
    }, [myPos]);

    const MOVEMENT_SPEED = 30;
    const JUMP_FORCE = 3;
    const MAX_LINVEL = 5;

    // 키보드 상하좌우로 움직인다.
    useFrame(() => {
      const { forward, backward, leftward, rightward } = getKeys();

      const impulse = { x: 0, y: 0, z: 0 };
      const linvel = rigidbody.current.linvel(); // 너무 빨라지지 않도록

      let changeRotation = false;

      if (forward && linvel.z > -MAX_LINVEL) {
        impulse.z -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (backward && linvel.z < MAX_LINVEL) {
        impulse.z += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (leftward && linvel.x > -MAX_LINVEL) {
        impulse.x -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (rightward && linvel.x < MAX_LINVEL) {
        impulse.x += MOVEMENT_SPEED;
        changeRotation = true;
      }

      // 바라보는 방향으로 얼굴 돌리기
      rigidbody.current.applyImpulse(impulse);
      if (changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z);
        character.current.rotation.y = angle;
      }

      // rigidbody의 위치로 Position을 업데이트
      const bodyPos = rigidbody.current.translation();

      const mypos = {
        x: bodyPos.x,
        y: bodyPos.y,
        z: bodyPos.z,
      };

      if (detectMovement(myPos, mypos)) {
        console.log('New pos!', mypos);
        setMyPos(mypos);
      }
    });

    return (
      <RigidBody
        ref={rigidbody}
        colliders={false}
        canSleep={false}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.5, 0.7]} position={[0, 1.25, 0]} />
        <group ref={character}>
          <Character
            path={path}
            matName={matName}
            nickname={nickname}
            scale={2}
          />
        </group>
      </RigidBody>
    );
  }
);

export default CharacterController;
