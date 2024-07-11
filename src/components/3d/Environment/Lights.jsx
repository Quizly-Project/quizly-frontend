import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export default function Lights() {
  const lightRef = useRef();
  const shadowCameraRef = useRef();
  const scene = useThree(state => state.scene);

  useEffect(() => {
    shadowCameraRef.current = new THREE.CameraHelper(
      lightRef.current.shadow.camera
    );
    scene.add(shadowCameraRef.current);

    // toggle camera helper
    // shadowCameraRef.current.visible = false;

    return () => {
      scene.remove(shadowCameraRef.current);
    };
  }, [lightRef.current]);

  return (
    <>
      <directionalLight
        ref={lightRef}
        position={[-200, 200, 0]}
        castShadow
        intensity={1}
        shadow-mapSize-width={8192}
        shadow-mapSize-height={8192}
        shadow-camera-near={200}
        shadow-camera-far={400}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
