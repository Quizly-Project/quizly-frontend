import { RigidBody } from '@react-three/rapier';

export default function XLevel() {
  return (
    <>
      <mesh
        position-x={-25}
        position-y={-2.5}
        rotation-x={-Math.PI * 0.5}
        scale={50}
      >
        <boxGeometry args={[1, 1, 0.1]} />
        <meshBasicMaterial color="#FF7B7B" />
      </mesh>
    </>
  );
}
