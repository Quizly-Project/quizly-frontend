import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { SpotLight } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';

const AnimatedSpotLight = ({ position, targetPosition, intensity, color }) => {
  const { scene } = useThree();
  const spotLightRef = useRef();
  const timeRef = useRef(0);

  // 목표 위치
  const target = new THREE.Object3D();
  target.position.set(targetPosition[0], targetPosition[1], targetPosition[2]);
  scene.add(target);

  useEffect(() => {
    return () => {
      scene.remove(target);
    };
  }, [scene, target]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    if (spotLightRef.current) {
      // 부드러운 강도 변화
      spotLightRef.current.intensity =
        intensity * (0.8 + Math.sin(timeRef.current * 2) * 0.2);

      // 부드러운 위치 변화 (작은 범위 내에서)
      const offsetX = Math.sin(timeRef.current * 1.5) * 0.2;
      const offsetY = Math.cos(timeRef.current * 1.5) * 0.2;
      spotLightRef.current.position.x = position[0] + offsetX;
      spotLightRef.current.position.y = position[1] + offsetY;
    }
  });

  return (
    <SpotLight
      ref={spotLightRef}
      position={position}
      target={target}
      distance={100}
      angle={0.5} // 각도를 좁혀 더 집중된 빛을 만듭니다
      intensity={intensity}
      penumbra={0.5} // penumbra를 증가시켜 빛의 경계를 부드럽게 만듭니다
      decay={1.5} // decay를 조정하여 빛의 감쇠를 자연스럽게 만듭니다
      color={color || '#ffffff'}
      castShadow
      volumetric
      volumetricMaterial={{
        fog: 0.8, // 안개 효과를 추가하여 빛을 더 부드럽게 만듭니다
        density: 0.15, // 밀도를 낮춰 과도한 빛 산란을 방지합니다
      }}
    />
  );
};

const SpotLights = ({ position, targetPosition, intensity, color }) => {
  return (
    <AnimatedSpotLight
      position={position}
      targetPosition={targetPosition}
      intensity={intensity}
      color={color}
    />
  );
};

export default SpotLights;
