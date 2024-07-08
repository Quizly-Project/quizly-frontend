/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';

export default function Beachside(props) {
  const { nodes, materials } = useGLTF('/Environment/beachside.glb');
  return (
    <RigidBody type="fixed" colliders="trimesh" friction={5}>
      <group {...props} dispose={null}>
        <group name="Box001" scale={0.614}>
          <mesh
            name="Box001_1"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1.geometry}
            material={materials['01___Default']}
          />
          <mesh
            name="Box001_1_1"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_1.geometry}
            material={materials['02___Default']}
          />
          <mesh
            name="Box001_1_2"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_2.geometry}
            material={materials['09___Default']}
          />
          <mesh
            name="Box001_1_3"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_3.geometry}
            material={materials['08___Default']}
          />
          <mesh
            name="Box001_1_4"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_4.geometry}
            material={materials['04___Default']}
          />
          <mesh
            name="Box001_1_5"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_5.geometry}
            material={materials['10___Default']}
          />
          <mesh
            name="Box001_1_6"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1_6.geometry}
            material={materials['03___Default']}
          />
        </group>
        <group
          name="beachball"
          position={[32.286, 22.11, 56.468]}
          scale={-7.916}
        >
          <mesh
            name="mesh1945116984"
            castShadow
            receiveShadow
            geometry={nodes.mesh1945116984.geometry}
            material={materials.mat21}
          />
          <mesh
            name="mesh1945116984_1"
            castShadow
            receiveShadow
            geometry={nodes.mesh1945116984_1.geometry}
            material={materials.mat12}
          />
          <mesh
            name="mesh1945116984_2"
            castShadow
            receiveShadow
            geometry={nodes.mesh1945116984_2.geometry}
            material={materials.mat8}
          />
          <mesh
            name="mesh1945116984_3"
            castShadow
            receiveShadow
            geometry={nodes.mesh1945116984_3.geometry}
            material={materials.mat5}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload('/Environment/beachside.glb');
