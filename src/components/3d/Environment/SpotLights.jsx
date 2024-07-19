import { useRef } from 'react';
import * as THREE from 'three';
import { SpotLight, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const SpotLights = ({ position, targetPosition, intensity }) => {
  const { scene } = useThree();
  const spotLightRef = useRef();

  // useHelper(spotLightRef, THREE.SpotLightHelper);

  // 목표 위치
  const target = new THREE.Object3D();
  target.position.set(targetPosition[0], targetPosition[1], targetPosition[2]);
  scene.add(target);

  return (
    <SpotLight
      ref={spotLightRef}
      position={position}
      target={target}
      distance={100}
      angle={0.7}
      intensity={intensity}
      scale={300}
      castShadow
      penumbra={0}
      volumetric
    />
  );
};

export default SpotLights;
