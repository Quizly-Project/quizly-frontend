import React, { useRef, useEffect, useState } from 'react';
import { Html, useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Cube = React.memo(({ nickname, socket }) => {
  const meshRef = useRef();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });

  const detectMovement = (oldPos, newPos, threshold = 0.3) => {
    // 임계점 이상일 때만 렌더링한다.
    return (
      Math.abs(oldPos.x - newPos.x) > threshold ||
      Math.abs(oldPos.y - newPos.y) > threshold ||
      Math.abs(oldPos.z - newPos.z) > threshold
    );
  };

  // 내 위치가 바뀌면 서버에 위치를 전송한다.
  useEffect(() => {
    socket.emit('send', 1, nickname, myPos);
  }, [myPos]);

  useFrame(() => {
    const { forward, backward, leftward, rightward } = getKeys();

    const alpha = 1;
    if (forward) {
      meshRef.current.position.z -= 0.1 * alpha;
    }
    if (backward) {
      meshRef.current.position.z += 0.1 * alpha;
    }
    if (leftward) {
      meshRef.current.position.x -= 0.1 * alpha;
    }
    if (rightward) {
      meshRef.current.position.x += 0.1 * alpha;
    }

    const mypos = {
      x: meshRef.current.position.x,
      y: meshRef.current.position.y,
      z: meshRef.current.position.z,
    };

    if (detectMovement(myPos, mypos)) {
      setMyPos(mypos);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
      <Html position={[0, 1, 0]} wrapperClass="label" center distanceFactor={8}>
        👤{nickname}
      </Html>
    </mesh>
  );
});

export default Cube;
