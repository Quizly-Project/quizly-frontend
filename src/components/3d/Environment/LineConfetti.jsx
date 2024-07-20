import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { extend, useFrame } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const LineConfetti = ({
  isExploding = false,
  amount = 1000,
  radius = 20,
  colors = [
    '#0000ff',
    '#ff0000',
    '#ffff00',
    '#A2CCB6',
    '#FCEEB5',
    '#EE786E',
    '#e0feff',
  ],
  dash = 0.9,
  ...props
}) => {
  const groupRef = useRef();

  const lines = useMemo(() => {
    return Array.from({ length: amount }, () => {
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(radius),
        THREE.MathUtils.randFloatSpread(radius),
        THREE.MathUtils.randFloatSpread(radius)
      );
      const points = Array.from({ length: 10 }, () =>
        pos
          .add(
            new THREE.Vector3(
              THREE.MathUtils.randFloatSpread(radius),
              THREE.MathUtils.randFloatSpread(radius),
              THREE.MathUtils.randFloatSpread(radius)
            )
          )
          .clone()
      );
      const curve = new THREE.CatmullRomCurve3(points).getPoints(300);
      return {
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.max(radius / 100, (radius / 50) * Math.random()),
        speed: Math.max(0.1, 1 * Math.random()),
        curve: curve.flatMap(point => point.toArray()),
        dashOffset: Math.random(),
      };
    });
  }, [amount, radius, colors]);

  useFrame((state, delta) => {
    if (isExploding) {
      lines.forEach(line => {
        line.dashOffset -= (delta * line.speed) / 10;
      });
      groupRef.current.children.forEach((child, index) => {
        child.material.dashOffset = lines[index].dashOffset;
      });
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {lines.map((props, index) => (
        <Fatline key={index} dash={dash} {...props} />
      ))}
    </group>
  );
};

function Fatline({ curve, width, color, speed, dash, dashOffset }) {
  return (
    <mesh>
      <meshLineGeometry points={curve} />
      <meshLineMaterial
        transparent
        lineWidth={width}
        color={color}
        depthWrite={false}
        dashArray={0.25}
        dashRatio={dash}
        dashOffset={dashOffset}
        toneMapped={false}
      />
    </mesh>
  );
}

export default LineConfetti;
