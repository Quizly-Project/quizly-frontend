import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Text3D } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';

export default function Blackboard(props) {
  const { nodes, materials } = useGLTF('/Environment/Blackboard.glb');

  // material
  const chalkMaterial = new MeshStandardMaterial({
    color: '#FFFFF0',
    roughness: 0.8,
  });

  const fullText =
    'Q. 태풍은 적도 부근에서 형성되어 북반구에서는 시계 반대 방향으로 회전합니다.';
  const [displayedText, setDisplayedText] = useState('');

  // 글자를 한 글자씩 추가하는 함수
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
      }
    }, 100); // 글자가 나타나는 간격 (밀리초 단위로 조절 가능)
    return () => clearInterval(interval);
  }, [fullText]);

  // 줄바꿈 적용
  const maxLineLength = 20;
  const splitText = (text, maxLength) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }
    return lines;
  };

  const lines = splitText(displayedText, maxLineLength);

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Blackboard_Q"
        castShadow
        receiveShadow
        geometry={nodes.Blackboard_Q.geometry}
        material={materials.phong1SG}
        scale={250}
      />
      {/* Text */}
      {lines.map((line, index) => (
        <Text3D
          key={index}
          scale={10}
          font="/fonts/UhBee_Regular.json"
          position={[-100, 30 - index * 30, 10]} // 텍스트의 위치를 조정하여 줄바꿈
        >
          {line}
          <meshStandardMaterial attach="material" {...chalkMaterial} />
        </Text3D>
      ))}
    </group>
  );
}

useGLTF.preload('/Environment/Blackboard.glb');
