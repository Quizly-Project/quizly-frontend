import React from 'react';
import { Sprite, SpriteMaterial, TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const Emoji = ({ position, scale = 2 }) => {
  const texture = useLoader(TextureLoader, '/Image/crying-emoji.png');

  return (
    <sprite position={position} scale={[scale, scale, 1]}>
      <spriteMaterial attach="material" map={texture} transparent />
    </sprite>
  );
};

export default Emoji;
