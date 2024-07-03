import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function SparrowAnimations(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '/Character/Sparrow_Animations.glb'
  );
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig" scale={0.4}>
          <skinnedMesh
            name="Mesh"
            geometry={nodes.Mesh.geometry}
            material={materials.M_Sparrow}
            skeleton={nodes.Mesh.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/Sparrow_Animations.glb');
