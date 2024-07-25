import React from 'react';
import { Text3D, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const GlowMaterial = shaderMaterial(
  {
    color: new THREE.Color(0.1, 0.8, 0.1), // 초록색
  },
  // vertex shader
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform vec3 color;
    varying vec3 vNormal;
    
    void main() {
      // 가장자리 글로우 효과
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
      
      // 최종 색상 계산
      vec3 glow = color * intensity;
      vec3 finalColor = mix(color, glow, 0.6);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ GlowMaterial });

function ShimmeringText({ children, ...props }) {
  return (
    <Text3D font="/fonts/UhBee_Regular.json" {...props}>
      {children}
      <glowMaterial attach="material" color={new THREE.Color(0.1, 38, 0.1)} />
    </Text3D>
  );
}

export default ShimmeringText;
