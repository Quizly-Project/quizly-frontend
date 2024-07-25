import React, { useMemo } from 'react';
import { Text3D } from '@react-three/drei';

const OXText = () => {
  // 분필 material
  const oMaterial = useMemo(
    () => ({
      color: '#00ff00',
      emissive: '#00ff00',
      emissiveIntensity: 1.0,
    }),
    []
  );
  const xMaterial = useMemo(
    () => ({
      color: '#ff0000',
      emissive: '#ff0000',
      emissiveIntensity: 1.0,
    }),
    []
  );

  return (
    <>
      <Text3D
        scale={60}
        font="/fonts/UhBee_Regular.json"
        position={[-280, 70, -200]}
        rotation-y={0.7}
      >
        O
        <meshPhongMaterial attach="material" {...oMaterial} />
      </Text3D>
      <Text3D
        scale={60}
        font="/fonts/UhBee_Regular.json"
        position={[210, 60, -240]}
        rotation-y={-0.7}
      >
        X
        <meshPhongMaterial attach="material" {...xMaterial} />
      </Text3D>
    </>
  );
};

export default OXText;
