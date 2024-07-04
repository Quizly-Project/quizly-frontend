import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useGLTF, useAnimations } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const OtherModelComponent = React.memo(({ path, matName, nickname, pos }) => {
  const group = useRef();
  const body = useRef();

  const { nodes, materials, animations } = useGLTF(`./Character/${path}`);
  const { actions } = useAnimations(animations, group);

  const [myPos, setMyPos] = useState({ x: pos.x, y: pos.y, z: pos.z });

  const detectMovement = (oldPos, newPos, threshold = 0.3) => {
    // 임계점 이상일 때만 렌더링한다.
    return (
      Math.abs(oldPos.x - newPos.x) > threshold ||
      Math.abs(oldPos.y - newPos.y) > threshold ||
      Math.abs(oldPos.z - newPos.z) > threshold
    );
  };

  useFrame(() => {
    const mypos = {
      x: group.current.position.x,
      y: group.current.position.y,
      z: group.current.position.z,
    };

    // set mesh position
    group.current.position.x = pos.x;
    group.current.position.y = pos.y;
    group.current.position.z = pos.z;

    if (detectMovement(mypos, pos)) {
      setMyPos(mypos);
    }
  });

  useGLTF.preload(`./Character/${path}`);

  return (
    <group ref={group} dispose={null} position={[myPos.x, myPos.y, myPos.z]}>
      <group name="Rig" scale={0.5}>
        <skinnedMesh
          name="Mesh"
          geometry={nodes.Mesh.geometry}
          material={materials[matName]}
          skeleton={nodes.Mesh.skeleton}
        />
        <primitive object={nodes.root} />
        <Html
          position={[0, 4, 0]}
          wrapperClass="label"
          center
          distanceFactor={8}
        >
          👤 {nickname}
        </Html>
      </group>
    </group>
  );
});

export default OtherModelComponent;
