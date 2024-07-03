export default function Level() {
  return (
    <>
      <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={100}>
        <planeGeometry />
        <meshBasicMaterial color="yellowgreen" />
      </mesh>
    </>
  );
}