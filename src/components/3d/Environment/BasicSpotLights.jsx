import SpotLights from './SpotLights';

const BasicSpotLights = () => {
  return (
    <>
      {/* 칠판 spotlight */}
      <SpotLights position={[70, 90, -50]} targetPosition={[10, 37, -120]} />
      <SpotLights position={[-80, 90, -50]} targetPosition={[10, 37, -120]} />
      {/* Yes/NO spotlight */}
      <SpotLights position={[0, 50, -10]} targetPosition={[0, 8.7, -50]} />)
    </>
  );
};

export default BasicSpotLights;
