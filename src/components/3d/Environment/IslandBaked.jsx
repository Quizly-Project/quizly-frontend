import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { RigidBody } from '@react-three/rapier';

export default function IslandBaked(props) {
  const { nodes, materials } = useGLTF('/Environment/IslandBaked.glb');

  // TextureLoader를 사용하여 텍스처를 로드합니다.
  const textureLoader = new THREE.TextureLoader();
  const bakedTexture = textureLoader.load('/Environment/baked.jpg'); // 텍스처 파일 경로
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;
  useEffect(() => {
    // 모든 메쉬에 대해 MeshBasicMaterial을 사용하여 텍스처를 적용합니다.
    Object.values(nodes).forEach(node => {
      if (node.geometry) {
        const material = new THREE.MeshBasicMaterial({ map: bakedTexture });
        node.material = material;
      }
    });
  }, [nodes, bakedTexture]);

  return (
    <group {...props} dispose={null}>
      <mesh
        name="Paper"
        geometry={nodes.Paper.geometry}
        material={nodes.Paper.material}
        position={[0, 23.059, 0]}
      />
      <mesh
        name="chair"
        geometry={nodes.chair.geometry}
        material={nodes.chair.material}
        position={[34.809, 14.279, 17.4]}
      />
      <mesh
        name="Sphere"
        geometry={nodes.Sphere.geometry}
        material={nodes.Sphere.material}
        position={[0, 29.847, 0]}
      />
      <mesh
        name="Node002"
        geometry={nodes.Node002.geometry}
        material={nodes.Node002.material}
        position={[1.162, 38.457, 3.457]}
        rotation={[0, 0.085, 0]}
      />
      <mesh
        name="Node003"
        geometry={nodes.Node003.geometry}
        material={nodes.Node003.material}
        position={[-66.792, 38.457, -10.124]}
        rotation={[0, -0.288, 0]}
      />
      <mesh
        name="Book001"
        geometry={nodes.Book001.geometry}
        material={nodes.Book001.material}
        position={[0, 34.714, 0]}
      />
      <mesh
        name="Book002"
        geometry={nodes.Book002.geometry}
        material={nodes.Book002.material}
        position={[0, 34.714, 0]}
      />
      <mesh
        name="Book003"
        geometry={nodes.Book003.geometry}
        material={nodes.Book003.material}
        position={[5.863, 34.714, -4.656]}
      />
      <RigidBody type="fixed" colliders="hull" friction={5}>
        <mesh
          name="Dock_Wide"
          geometry={nodes.Dock_Wide.geometry}
          material={nodes.Dock_Wide.material}
          position={[0, 5.615, 0]}
          rotation={[-Math.PI / 2, 0, -1.573]}
          scale={100}
        />
        <mesh
          name="OLand"
          geometry={nodes.OLand.geometry}
          material={nodes.OLand.material}
          position={[5.804, -26.996, 0]}
        />
        <mesh
          name="Xland"
          geometry={nodes.Xland.geometry}
          material={nodes.Xland.material}
          position={[122.892, -26.996, 0]}
          rotation={[0, -0.003, 0]}
        />
      </RigidBody>
      <mesh
        name="No"
        geometry={nodes.No.geometry}
        material={nodes.No.material}
        position={[-4.61, 13.826, 27.934]}
        rotation={[1.571, 0.094, -3.141]}
        scale={3.351}
      />
      <mesh
        name="Yes"
        geometry={nodes.Yes.geometry}
        material={nodes.Yes.material}
        position={[8.907, 13.24, 27.934]}
        rotation={[1.571, -0.145, -3.141]}
        scale={3.351}
      />
      <mesh
        name="chalk"
        geometry={nodes.chalk.geometry}
        material={nodes.chalk.material}
        position={[70.264, 49.685, -90.076]}
        rotation={[0, 0, 0.378]}
      />
      <group
        name="Nosign"
        position={[-6.892, 10.532, 29.999]}
        rotation={[0, -0.358, 0]}
        scale={2.151}
      >
        <mesh
          name="NoSign"
          geometry={nodes.NoSign.geometry}
          material={nodes.NoSign.material}
          rotation={[-Math.PI / 2, 0, -2.761]}
          scale={100}
        />
      </group>
      <group
        name="Yessign"
        position={[6.626, 10.532, 29.999]}
        rotation={[0, -0.358, 0]}
        scale={2.151}
      >
        <mesh
          name="YesSign"
          geometry={nodes.YesSign.geometry}
          material={nodes.YesSign.material}
          rotation={[-Math.PI / 2, 0, -2.761]}
          scale={100}
        />
      </group>
      <mesh
        name="Blackboard_Q"
        geometry={nodes.Blackboard_Q.geometry}
        material={nodes.Blackboard_Q.material}
        position={[0, 43.193, 0]}
      />
      <mesh
        name="Node"
        geometry={nodes.Node.geometry}
        material={nodes.Node.material}
        position={[0, 50.969, 0]}
      />
      <mesh
        name="Node001"
        geometry={nodes.Node001.geometry}
        material={nodes.Node001.material}
        position={[0, 34.108, 0]}
        rotation={[1.559, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/Environment/IslandBaked.glb');
