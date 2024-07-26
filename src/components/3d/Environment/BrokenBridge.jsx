/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';

export default function BrokenBridge(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Environment/Bridge.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (!actions['bridge']) return;

    const action = actions['bridge'];

    // 한 번만 실행
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;

    // 재생
    action.reset().fadeIn(0.5).play();

    // 액션 종료 리스너
    const onFinished = e => {
      if (e.action === action) {
        // console.log('Animation finished');
        // 애니메이션을 첫 프레임으로 리셋하고 정지
        action.reset();
        action.stop();
      }
    };

    mixer.addEventListener('finished', onFinished);

    return () => {
      if (action) {
        action.fadeOut(0.5);
        mixer.removeEventListener('finished', onFinished);
      }
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
        <mesh
          name="Cube001_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_cell.geometry}
          material={materials['Wood.003']}
          position={[-22.307, 9.317, 14.657]}
        />
        <mesh
          name="Cube001_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_cell001.geometry}
          material={materials['Wood.003']}
          position={[-29.524, 8.647, 14.657]}
        />
        <mesh
          name="Cube001_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_cell002.geometry}
          material={materials['Wood.003']}
          position={[-2.695, 9.32, 14.657]}
        />
        <mesh
          name="Cube001_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Cube001_cell003.geometry}
          material={materials['Wood.003']}
          position={[17.921, 9.32, 14.657]}
        />
        <mesh
          name="Cube002_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube002_cell.geometry}
          material={materials['Wood.003']}
          position={[-21.525, 9.32, -14.715]}
        />
        <mesh
          name="Cube002_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube002_cell001.geometry}
          material={materials['Wood.003']}
          position={[4.576, 9.32, -14.715]}
        />
        <mesh
          name="Cube002_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube002_cell002.geometry}
          material={materials['Wood.003']}
          position={[23.122, 9.32, -14.715]}
        />
        <mesh
          name="Cube007_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_cell.geometry}
          material={materials['Wood.003']}
          position={[-21.633, 8.363, 0]}
        />
        <mesh
          name="Cube007_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_cell001.geometry}
          material={materials['Wood.003']}
          position={[-10.901, 8.363, 0]}
        />
        <mesh
          name="Cube007_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_cell002.geometry}
          material={materials['Wood.003']}
          position={[27.161, 8.363, 0]}
        />
        <mesh
          name="Cube007_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_cell003.geometry}
          material={materials['Wood.003']}
          position={[19.159, 8.363, 0]}
        />
        <mesh
          name="Cube007_cell004"
          castShadow
          receiveShadow
          geometry={nodes.Cube007_cell004.geometry}
          material={materials['Wood.003']}
          position={[2.731, 8.363, 0]}
        />
        <mesh
          name="Cube008_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_cell.geometry}
          material={materials['Wood.003']}
          position={[-21.679, 8.291, 5.066]}
        />
        <mesh
          name="Cube008_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_cell001.geometry}
          material={materials['Wood.003']}
          position={[-17.594, 8.363, 6.728]}
        />
        <mesh
          name="Cube008_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_cell002.geometry}
          material={materials['Wood.003']}
          position={[-6.97, 8.363, 5.265]}
        />
        <mesh
          name="Cube008_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_cell003.geometry}
          material={materials['Wood.003']}
          position={[29.39, 7.659, 8.316]}
        />
        <mesh
          name="Cube008_cell004"
          castShadow
          receiveShadow
          geometry={nodes.Cube008_cell004.geometry}
          material={materials['Wood.003']}
          position={[18.567, 8.282, 6.246]}
        />
        <mesh
          name="Cube009_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube009_cell.geometry}
          material={materials['Wood.003']}
          position={[-13.393, 8.363, 11.482]}
        />
        <mesh
          name="Cube009_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube009_cell001.geometry}
          material={materials['Wood.003']}
          position={[12.552, 8.363, 11.482]}
        />
        <mesh
          name="Cube009_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube009_cell002.geometry}
          material={materials['Wood.003']}
          position={[0.612, 8.363, 13.253]}
        />
        <mesh
          name="Cube010_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell.geometry}
          material={materials['Wood.003']}
          position={[-8.696, 8.529, -4.807]}
        />
        <mesh
          name="Cube010_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell001.geometry}
          material={materials['Wood.003']}
          position={[-28.912, 8.363, -4.466]}
        />
        <mesh
          name="Cube010_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell002.geometry}
          material={materials['Wood.003']}
          position={[1.641, 8.007, -3.178]}
        />
        <mesh
          name="Cube010_cell003"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell003.geometry}
          material={materials['Wood.003']}
          position={[-28.816, 8.363, -7.16]}
        />
        <mesh
          name="Cube010_cell004"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell004.geometry}
          material={materials['Wood.003']}
          position={[2.953, 9.043, -3.198]}
        />
        <mesh
          name="Cube010_cell005"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_cell005.geometry}
          material={materials['Wood.003']}
          position={[10.846, 8.424, -4.859]}
        />
        <mesh
          name="Cube011_cell"
          castShadow
          receiveShadow
          geometry={nodes.Cube011_cell.geometry}
          material={materials['Wood.003']}
          position={[-15.122, 8.363, -11.536]}
        />
        <mesh
          name="Cube011_cell001"
          castShadow
          receiveShadow
          geometry={nodes.Cube011_cell001.geometry}
          material={materials['Wood.003']}
          position={[18.44, 8.363, -11.536]}
        />
        <mesh
          name="Cube011_cell002"
          castShadow
          receiveShadow
          geometry={nodes.Cube011_cell002.geometry}
          material={materials['Wood.003']}
          position={[3.317, 8.363, -11.536]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Environment/Bridge.glb');
