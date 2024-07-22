import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Arrow3D = ({ position = [0, 3, 0], color = '#ffffff', scale = 0.5 }) => {
  const arrowRef = useRef();

  // 화살표 모양 정의
  const shape = new THREE.Shape();
  shape.moveTo(0, -1);
  shape.lineTo(0.7, 0.5);
  shape.lineTo(0.2, 0.5);
  shape.lineTo(0.2, 1);
  shape.lineTo(-0.2, 1);
  shape.lineTo(-0.2, 0.5);
  shape.lineTo(-0.7, 0.5);
  shape.lineTo(0, -1);

  const extrudeSettings = {
    steps: 2,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  useFrame(state => {
    if (arrowRef.current) {
      // 부드러운 상하 움직임
      arrowRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.5;
      // Y축 기준 회전
      arrowRef.current.rotation.y += 0.05;
    }
  });

  return (
    <group>
      <mesh
        ref={arrowRef}
        position={position}
        scale={scale}
        rotation={[0, 0, 0]}
      >
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <pointLight
        position={position}
        intensity={1}
        distance={10}
        color={color}
      />
    </group>
  );
};

export default Arrow3D;
