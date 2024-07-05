import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';

const OtherModelComponent = React.memo(({ path, matName, nickname, pos }) => {
  const group = useRef();
  const body = useRef();

  console.log(pos);
  const { nodes, materials, animations } = useGLTF(`./Character/${path}`);
  const { actions } = useAnimations(animations, group);

  const [myPos, setMyPos] = useState({ x: pos.x, y: pos.y, z: pos.z });

  const detectMovement = (oldPos, newPos, threshold = 0) => {
    // 임계점 이상일 때만 렌더링한다.
    return (
      Math.abs(oldPos.x - newPos.x) > threshold ||
      Math.abs(oldPos.y - newPos.y) > threshold ||
      Math.abs(oldPos.z - newPos.z) > threshold
    );
  };

  useEffect(() => {
    // 움직임이 감지되었을 때 applyImpulse 호출
    const impulse = {
      x: (myPos.x - pos.x) * 0.1,
      y: (myPos.y - pos.y) * 0.1,
      z: (myPos.z - pos.z) * 0.1,
    };

    // angle 변경
    const angle = Math.atan2(impulse.x, impulse.z);
    group.current.rotation.y = Math.PI + angle;

    setMyPos({ x: pos.x, y: pos.y, z: pos.z });
  }, [pos]);

  useFrame(() => {
    const bodyPos = body.current.translation();

    const mypos = {
      x: bodyPos.x,
      y: bodyPos.y,
      z: bodyPos.z,
    };

    // 머리 돌리기

    body.current.setTranslation(myPos);
    // 움직임이 감지되었을 때 applyImpulse 호출
    const impulse = {
      x: (mypos.x - pos.x) * 0.1,
      y: (mypos.y - pos.y) * 0.1,
      z: (mypos.z - pos.z) * 0.1,
    };

    // position 변경
    const newPos = { x: mypos.x, y: mypos.y, z: mypos.z };
    body.current.applyImpulse(impulse, newPos);
    // setMyPos(newPos);

    // // angle 변경
    // const angle = Math.atan2(impulse.x, impulse.z);
    // group.current.rotation.y = Math.PI * 2 - angle;
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
        <group name="Rig">
          <skinnedMesh
            name="Mesh"
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
            👤{nickname}
          </Html>
        </group>
      </group>
    </RigidBody>
  );
});

export default OtherModelComponent;
