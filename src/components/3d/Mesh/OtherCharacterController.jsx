import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import Character from './Character';

const OtherCharacterController = React.memo(
  ({ path, matName, nickname, pos }) => {
    const rigidbody = useRef();
    const character = useRef();

    const [myPos, setMyPos] = useState({ x: pos.x, y: pos.y, z: pos.z });

    useEffect(() => {
      const impulse = {
        x: (myPos.x - pos.x) * 0.1,
        y: (myPos.y - pos.y) * 0.1,
        z: (myPos.z - pos.z) * 0.1,
      };

      // angle 변경
      const angle = Math.atan2(impulse.x, impulse.z);
      character.current.rotation.y = Math.PI + angle;

      // position 변경
      setMyPos({ x: pos.x, y: pos.y, z: pos.z });
    }, [pos]);

    useFrame(() => {
      const bodyPos = rigidbody.current.translation();

      const mypos = {
        x: bodyPos.x,
        y: bodyPos.y,
        z: bodyPos.z,
      };

      rigidbody.current.setTranslation(myPos);
      // 움직임이 감지되었을 때 applyImpulse 호출
      const impulse = {
        x: (mypos.x - pos.x) * 0.1,
        y: (mypos.y - pos.y) * 0.1,
        z: (mypos.z - pos.z) * 0.1,
      };

      // 이동
      const newPos = { x: mypos.x, y: mypos.y, z: mypos.z };
      rigidbody.current.applyImpulse(impulse, newPos);
    });

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
          <Character
            path={path}
            matName={matName}
            nickname={nickname}
            scale={2}
            actionType="Idle_A"
          />
        </group>
      </RigidBody>
    );
  }
);

export default OtherCharacterController;
