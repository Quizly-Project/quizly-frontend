import SpotLights from './SpotLights';
import ExplosionConfetti from './ExplosionConfetti';

const OEffects = () => {
  return (
    <>
      <SpotLights
        position={[-60, 50, 0]}
        targetPosition={[-60, 8.7, 0]}
        intensity={10000}
      />
      <ExplosionConfetti
        position-x={-60}
        rate={2}
        fallingHeight={30}
        amount={50}
        isExploding
      />
    </>
  );
};

export default OEffects;
