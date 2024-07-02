import React, { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const OtherCube = React.memo(({ nickname, pos }) => {
  const meshRef = useRef();

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
      x: meshRef.current.position.x,
      y: meshRef.current.position.y,
      z: meshRef.current.position.z,
    };

    // set mesh position
    meshRef.current.position.x = pos.x;
    meshRef.current.position.y = pos.y;
    meshRef.current.position.z = pos.z;

    if (detectMovement(mypos, pos)) {
      setMyPos(mypos);
    }
  });

  // console.log(meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z);
  return (
    <mesh ref={meshRef} position={[myPos.x, myPos.y, myPos.z]}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
      <Html position={[0, 1, 0]} wrapperClass="label" center distanceFactor={8}>
        👤{nickname}
      </Html>
    </mesh>
  );
});

export default OtherCube;
