import SpotLights from './SpotLights';

const BasicSpotLights = () => {
  return (
    <>
      {/* 칠판 spotlight */}
      {/* <SpotLights
        position={[70, 90, -50]}
        targetPosition={[10, 37, -120]}
        intensity={10000}
      />
      <SpotLights
        position={[-80, 90, -50]}
        targetPosition={[10, 37, -120]}
        intensity={10000}
      /> */}
      {/* Yes/NO spotlight */}
      <SpotLights
        position={[0, 50, -10]}
        targetPosition={[0, 8.7, -50]}
        intensity={3000}
      />
    </>
  );
};

export default BasicSpotLights;
