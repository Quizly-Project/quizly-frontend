import SpotLights from './SpotLights';
import ExplosionConfetti from './ExplosionConfetti';
import LineConfetti from './LineConfetti';

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
      {/* <LineConfetti
        isExploding={true}
        amount={50}
        radius={100}
        colors={[
          '#0000ff',
          '#ff0000',
          '#ffff00',
          '#A2CCB6',
          '#FCEEB5',
          '#EE786E',
          '#e0feff',
        ]}
        dash={0.9}
      /> */}
    </>
  );
};

export default OEffects;
