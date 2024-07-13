import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import Character from './Character';

const CharacterController = ({
  path,
  matName,
  nickname,
  socket,
  isChatFocused,
  updateClientCoords,
  rank,
}) => {
  const rigidbody = useRef(); // 움직임 관리
  const character = useRef(); // 각도 회전 관리

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // World Position
  const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });
  // console.log('MyPos', myPos);

  // Action
  const [action, setAction] = useState('Idle_A');
  // Jump only once
  const [isJumped, setIsJumped] = useState(false);

  // model loading을 한 번만 수행한다.
  const model = useMemo(() => {
    console.log(`Loading model for ${nickname} from ${path}`);
    return (
      <Character
        path={path}
        matName={matName}
        nickname={nickname}
        scale={2}
        actionType="Idle_A"
        rank={rank}
      />
    );
  }, [path, matName, nickname]);

  // 첫 렌더링 시 스폰 위치
  useEffect(() => {
    const defaultPos = {
      x: 0,
      y: 20,
      z: 0,
    };
    rigidbody.current.setTranslation(defaultPos);
    setMyPos(defaultPos);
  }, []);

  // 임계점 이상일 때만 렌더링한다.
  const detectMovement = (oldPos, newPos, threshold = 0.3) => {
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

  const MOVEMENT_SPEED = 70;
  const JUMP_FORCE = 1.5;
  const MAX_LINVEL = 5;

  // 키보드 상하좌우로 움직인다.
  useFrame(() => {
    setAction('Idle_A'); // default action
    if (isChatFocused) return;

    const { forward, backward, leftward, rightward, jump } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const linvel = rigidbody.current.linvel(); // 너무 빨라지지 않도록

    let changeRotation = false;

    if (forward && linvel.z > -MAX_LINVEL) {
      setAction('Walk');
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (backward && linvel.z < MAX_LINVEL) {
      setAction('Walk');
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (leftward && linvel.x > -MAX_LINVEL) {
      setAction('Walk');
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (rightward && linvel.x < MAX_LINVEL) {
      setAction('Walk');
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }
    if (!isJumped && jump) {
      setAction('Jump');
      setIsJumped(true);
      impulse.y += JUMP_FORCE;
    }

    // 바닥에 닿았는지 확인하고, 닿았다면 점프 상태 해제
    if (rigidbody.current.translation().y < 10.4) {
      setIsJumped(false);
    }

    // rigidbody 위치 이동
    rigidbody.current.applyImpulse(impulse, true);
    const newPos = rigidbody.current.translation();
    rigidbody.current.setTranslation(newPos);
    if (detectMovement(myPos, newPos)) {
      setMyPos(newPos);
      updateClientCoords(nickname, newPos); // 위치 업데이트
    }

    // rigidbody 각도 이동
    if (changeRotation) {
      const angle = Math.atan2(impulse.x, impulse.z);
      character.current.rotation.y = angle;
    }
  });

  return (
    <>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        canSleep={false}
        enabledRotations={[false, false, false]}
      >
        {/* collider 내 position: 모델으로부터의 상대적 위치 */}
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
    </>
  );
};

export default CharacterController;
