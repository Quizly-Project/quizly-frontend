import React, { useRef, useEffect, useState } from 'react';
import { useKeyboardControls, CameraControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier';
import Character from './Character';

const CharacterController = React.memo(
  ({ path, matName, nickname, socket }) => {
    const rigidbody = useRef();
    const character = useRef();
    const controls = useRef();

    const [subscribeKeys, getKeys] = useKeyboardControls();

    // World Position
    const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });
    // Action
    const [action, setAction] = useState('Idle_A');

    useEffect(() => {
      rigidbody.current.setTranslation({ x: 0, y: 0, z: 0 });
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

    useEffect(() => {
      console.log(action);
    }, [action]);

    const MOVEMENT_SPEED = 50;
    const JUMP_FORCE = 2;
    const MAX_LINVEL = 5;

    // 키보드 상하좌우로 움직인다.
    useFrame(() => {
      setAction('Idle_A'); // default action

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
      if (jump) {
        setAction('Jump');
        impulse.y += JUMP_FORCE;
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
        // console.log('New pos!', myPos, 'to', mypos);
        setMyPos(mypos);
      }

      // camera controls
      if (controls.current) {
        const cameraDistanceY = 12;
        const cameraDistanceZ = 30;
        const playerWorldPos = vec3(rigidbody.current.translation());

        controls.current.setLookAt(
          playerWorldPos.x,
          playerWorldPos.y + cameraDistanceY,
          playerWorldPos.z + cameraDistanceZ,
          playerWorldPos.x,
          playerWorldPos.y + 0.5,
          playerWorldPos.z,
          true
        );
      }
    });

    return (
      <>
        {/* <CameraControls ref={controls} /> */}
        <RigidBody
          ref={rigidbody}
          colliders={false}
          canSleep={false}
          enabledRotations={[false, false, false]}
          mass={10}
          gravityScale={1.6}
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
              />
            )}
          </group>
        </RigidBody>
      </>
    );
  }
);

export default CharacterController;
