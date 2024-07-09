import { useSpring } from '@react-spring/three';

const CrabSpringProps = () => {
  // 꽃게 spring animation
  const crab1Props = useSpring({
    position: [0.083, 0.795, 41.946], // 점프 후 위치
    from: { position: [0.083, 0.295, 41.946] }, // 시작 위치
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab2Props = useSpring({
    position: [-0.053, 0.795, 28.289],
    from: { position: [-0.053, 0.295, 28.289] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab3Props = useSpring({
    position: [0.083, 0.795, 14.089],
    from: { position: [0.083, 0.295, 14.089] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab4Props = useSpring({
    position: [-0.053, 0.795, 0.009],
    from: { position: [-0.053, 0.295, 0.009] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab5Props = useSpring({
    position: [0.083, 0.795, -13.924],
    from: { position: [0.083, 0.295, -13.924] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab6Props = useSpring({
    position: [-0.053, 0.795, -27.733],
    from: { position: [-0.053, 0.295, -27.733] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  const crab7Props = useSpring({
    position: [0.083, 0.795, -41.973],
    from: { position: [0.083, 0.295, -41.973] },
    config: { duration: 500 },
    loop: { reverse: true },
  });

  // 별가사리 spring animation
  const starfish1Props = useSpring({
    position: [1.137, 0.5, 37.836],
    from: { position: [1.137, 0, 37.836] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  const starfish2Props = useSpring({
    position: [1.137, 0.5, 23.896],
    from: { position: [1.137, 0, 23.896] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  const starfish3Props = useSpring({
    position: [1.137, 0.5, 9.737],
    from: { position: [1.137, 0, 9.737] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  const starfish4Props = useSpring({
    position: [1.137, 0.5, -4.354],
    from: { position: [1.137, 0, -4.354] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  const starfish5Props = useSpring({
    position: [1.137, 0.3, -18.42],
    from: { position: [1.137, 0, -18.42] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  const starfish6Props = useSpring({
    position: [1.137, 0.3, -32.378],
    from: { position: [1.137, 0, -32.378] },
    config: { duration: 500 },
    loop: { reverse: true, delay: 500 },
  });

  return {
    crab1Props,
    crab2Props,
    crab3Props,
    crab4Props,
    crab5Props,
    crab6Props,
    crab7Props,
    starfish1Props,
    starfish2Props,
    starfish3Props,
    starfish4Props,
    starfish5Props,
    starfish6Props,
  };
};

export default CrabSpringProps;
