/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

export default function Beachside(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    '/Environment/Beachside.glb'
  );
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions['wave']) return;
    const action = actions['wave'];

    // Set playback speed to 0.5 (half speed)
    action.setEffectiveTimeScale(0.5);

    // 재생
    action.reset().fadeIn(0.3).play();

    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
      group.current = null;
    };
  }, [actions, mixer]);

  // 일정한 프레임 유지
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="tree1"
          position={[13.476, 52.315, 85.158]}
          rotation={[Math.PI, -1.476, Math.PI]}
          scale={0.647}
        >
          <mesh
            name="Box001_1001"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1001.geometry}
            material={materials['04___Default']}
          />
          <mesh
            name="Box001_1001_1"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1001_1.geometry}
            material={materials['03___Default']}
          />
        </group>
        <group
          name="tree2"
          position={[-2.249, 47.872, -98.787]}
          rotation={[0, 1.137, 0]}
          scale={0.647}
        >
          <mesh
            name="Box001_1002"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1002.geometry}
            material={materials['04___Default']}
          />
          <mesh
            name="Box001_1002_1"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1002_1.geometry}
            material={materials['03___Default']}
          />
        </group>
        <mesh
          name="sea"
          castShadow
          receiveShadow
          geometry={nodes.sea.geometry}
          material={materials['02___Default']}
          position={[-10.457, -4.924, 0.115]}
          scale={[1.214, 1, 1.214]}
        />
        <group
          name="beachball"
          position={[33.631, 10.653, 83.144]}
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
        <group name="tube" position={[-44.617, 6.605, -38.601]} scale={0.614}>
          <mesh
            name="Box001_1005"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1005.geometry}
            material={materials['09___Default.001']}
          />
          <mesh
            name="Box001_1005_1"
            castShadow
            receiveShadow
            geometry={nodes.Box001_1005_1.geometry}
            material={materials['08___Default.001']}
          />
        </group>
        <RigidBody type="fixed" colliders="hull" friction={5}>
          <mesh
            name="bound"
            castShadow
            receiveShadow
            geometry={nodes.bound.geometry}
            material={materials['Sand.001']}
            position={[159.747, 8.592, -1.884]}
            scale={[1.329, 1.095, 1.329]}
          />
          <mesh
            name="wavebound"
            castShadow
            receiveShadow
            geometry={nodes.wavebound.geometry}
            material={materials['Sand.001']}
            position={[-2.612, 5.991, 0]}
            scale={[1.329, 1.095, 1.329]}
          />
        </RigidBody>
      </group>
    </group>
  );
}

useGLTF.preload('/Environment/Beachside.glb');