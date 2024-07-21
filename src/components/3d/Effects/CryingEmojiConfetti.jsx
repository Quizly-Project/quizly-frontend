import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CryingEmojiConfetti = ({ position, count = 10 }) => {
  const mesh = useRef();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 5 + Math.random() * 20; // 움직임 범위 더 축소
      const speed = 0.002 + Math.random() / 15; // 속도 더 감소
      const xFactor = -10 + Math.random() * 20; // x축 범위 더 축소
      const yFactor = 0 + Math.random() * 15; // y축 범위 조정 (위로만 움직이도록)
      const zFactor = -10 + Math.random() * 20; // z축 범위 더 축소
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const texture = useMemo(
    () => new THREE.TextureLoader().load('/Image/crying-emoji.png'),
    []
  );

  useFrame(state => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.max(0.3, Math.cos(t)); // 크기 변화 범위 조정

      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 20) * factor) +
          (Math.sin(t * 1) * factor) / 20,
        (particle.my / 10) * b +
          yFactor +
          (Math.abs(Math.sin((t / 20) * factor)) * factor) / 20, // 위로만 움직이도록 수정
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 20) * factor) +
          (Math.sin(t * 3) * factor) / 20
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]} position={position}>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

export default CryingEmojiConfetti;
