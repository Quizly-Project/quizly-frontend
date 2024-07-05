import React, { useRef, useEffect, useState } from 'react';
import {
  useGLTF,
  Html,
  useKeyboardControls,
  useAnimations,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

const ModelComponent = React.memo(
  ({ path, matName, nickname, pos, socket }) => {
    const group = useRef();
    const body = useRef();

    const { nodes, materials, animations } = useGLTF(`./Character/${path}`);
    const { actions } = useAnimations(animations, group);

    const [subscribeKeys, getKeys] = useKeyboardControls();

    const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });

    const detectMovement = (oldPos, newPos, threshold = 0.5) => {
      // 임계점 이상일 때만 렌더링한다.
      return (
        Math.abs(oldPos.x - newPos.x) > threshold ||
        Math.abs(oldPos.y - newPos.y) > threshold ||
        Math.abs(oldPos.z - newPos.z) > threshold
      );
    };

    // 내 위치가 바뀌면 서버에 위치를 전송한다.
    useEffect(() => {
      socket.emit('send', 1, nickname, myPos); // iMove: 보내줄 데이터 {roomCode, nickName, {x, y, z}}
    }, [myPos]);

    const MOVEMENT_SPEED = 30;
    const MOVEMENT_SPEED_LOW = 15;
    const JUMP_FORCE = 3;
    const MAX_LINVEL = 5;

    // 움직일 수 있는 경우 (나)
    useFrame(() => {
      const { forward, backward, leftward, rightward } = getKeys();

      const impulse = { x: 0, y: 0, z: 0 };
      const linvel = body.current.linvel(); // 너무 빨라지지 않도록

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

      // 얼굴 돌리기
      body.current.applyImpulse(impulse);
      if (changeRotation) {
        const angle = Math.atan2(linvel.x, linvel.z);
        group.current.rotation.y = angle;
      }

      // rigidbody의 위치로 Position을 업데이트
      const bodyPos = body.current.translation();

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

    useGLTF.preload(`./Character/${path}`);

    return (
      <RigidBody
        ref={body}
        colliders={false}
        canSleep={false}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.2, 1]} position={[0, 1.25, 0]} />
        <group ref={group} dispose={null}>
          <group name="Scene">
            <group name="Rig">
              <skinnedMesh
                castShadow
                geometry={nodes.Mesh.geometry}
                material={materials[matName]}
                skeleton={nodes.Mesh.skeleton}
                scale={2}
              />
              <primitive object={nodes.root} />
              <Html
                position={[0, 3, 0]}
                wrapperClass="label"
                center
                distanceFactor={8}
              >
                👤 {nickname}
              </Html>
            </group>
          </group>
        </group>
      </RigidBody>
    );
  }
);

export default ModelComponent;
