/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function StaticMaterials(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/Environment/Others.glb');
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (actions['others']) {
      const action = actions['others'];

      // 페이드 인과 함께 재생 시작
      action.reset().fadeIn(0.5).play();

      // 액션이 끝났을 때 이벤트 리스너
      const onFinished = e => {
        if (e.action === action) {
          console.log('others animation finished');
          // 여기에 액션이 끝났을 때 수행할 작업을 추가할 수 있습니다
        }
      };

      mixer.addEventListener('finished', onFinished);

      return () => {
        // 클린업: 이벤트 리스너 제거 및 페이드 아웃
        mixer.removeEventListener('finished', onFinished);
        action.fadeOut(0.5);
      };
    }
  }, [actions, mixer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Blackboard002"
          castShadow
          receiveShadow
          geometry={nodes.Blackboard002.geometry}
          material={materials['phong1SG.001']}
          position={[-4.097, 54.078, 108.042]}
          rotation={[Math.PI, -0.002, Math.PI]}
        />
        <mesh
          name="chalk002"
          castShadow
          receiveShadow
          geometry={nodes.chalk002.geometry}
          material={materials.blinn6SG}
          position={[-94.476, 98.815, 100.639]}
          rotation={[0, 0, 0.378]}
        />
        <group
          name="marker002"
          position={[103.063, 20.534, 96.08]}
          rotation={[0.722, 0, 0]}
        >
          <mesh
            name="Node-Mesh009"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh009'].geometry}
            material={materials.lambert4SG}
          />
          <mesh
            name="Node-Mesh009_1"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh009_1'].geometry}
            material={materials.lambert3SG}
          />
        </group>
        <group
          name="NoSign002"
          position={[-6.602, 15.594, 29.702]}
          rotation={[-Math.PI / 2, 0, 3.102]}
          scale={1.289}
        >
          <mesh
            name="Arrow_Side003"
            castShadow
            receiveShadow
            geometry={nodes.Arrow_Side003.geometry}
            material={materials['Wood.003']}
          />
          <mesh
            name="Arrow_Side003_1"
            castShadow
            receiveShadow
            geometry={nodes.Arrow_Side003_1.geometry}
            material={materials.Main_Dark}
          />
          <mesh
            name="Arrow_Side003_2"
            castShadow
            receiveShadow
            geometry={nodes.Arrow_Side003_2.geometry}
            material={materials.text}
          />
        </group>
        <group
          name="Pencil002"
          position={[88.944, 16.408, 101.096]}
          rotation={[0, 0, 1.25]}
        >
          <mesh
            name="Node-Mesh007"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh007'].geometry}
            material={materials.mat13}
          />
          <mesh
            name="Node-Mesh007_1"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh007_1'].geometry}
            material={materials.mat15}
          />
          <mesh
            name="Node-Mesh007_2"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh007_2'].geometry}
            material={materials.mat19}
          />
          <mesh
            name="Node-Mesh007_3"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh007_3'].geometry}
            material={materials.mat23}
          />
          <mesh
            name="Node-Mesh007_4"
            castShadow
            receiveShadow
            geometry={nodes['Node-Mesh007_4'].geometry}
            material={materials.mat7}
          />
        </group>
        <group
          name="Yes002"
          position={[5.471, 17.726, 28.216]}
          rotation={[1.571, -0.145, -3.141]}
          scale={1.139}
        >
          <mesh
            name="Text005"
            castShadow
            receiveShadow
            geometry={nodes.Text005.geometry}
            material={materials.text}
          />
          <mesh
            name="Text005_1"
            castShadow
            receiveShadow
            geometry={nodes.Text005_1.geometry}
            material={materials['Wood.003']}
          />
          <mesh
            name="Text005_2"
            castShadow
            receiveShadow
            geometry={nodes.Text005_2.geometry}
            material={materials.Yes}
          />
        </group>
        <mesh
          name="cloud1"
          castShadow
          receiveShadow
          geometry={nodes.cloud1.geometry}
          material={materials.lambert2SG}
          position={[236.212, 228.835, 5.064]}
        />
        <mesh
          name="cloud2"
          castShadow
          receiveShadow
          geometry={nodes.cloud2.geometry}
          material={materials.lambert2SG}
          position={[-124.305, 228.835, -105.407]}
        />
        <mesh
          name="cloud3"
          castShadow
          receiveShadow
          geometry={nodes.cloud3.geometry}
          material={materials.lambert2SG}
          position={[-108.46, 228.835, 244.262]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/Environment/Others.glb');