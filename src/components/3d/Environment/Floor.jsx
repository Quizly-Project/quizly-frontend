import React from 'react';
import { Plane } from '@react-three/drei';

function Floor({ width, height }) {
  return (
    <Plane
      args={[width, height]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -200, 0]}
    >
      <meshBasicMaterial transparent opacity={0} color="red" />
    </Plane>
  );
}

export default Floor;
