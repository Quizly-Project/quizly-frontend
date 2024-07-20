import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function LandMeshes() {
  const { nodes, materials } = useGLTF('/Environment/Land.glb');

  const renderMesh = (node, name, parentPosition = [0, 0, 0]) => {
    const position = node.position
      ? [
          node.position.x + parentPosition[0],
          node.position.y + parentPosition[1],
          node.position.z + parentPosition[2],
        ]
      : parentPosition;

    const materialName = node.material?.name;
    const material = materialName
      ? materials[materialName]
      : new THREE.MeshStandardMaterial({ color: 0xcccccc });

    return (
      <mesh
        key={name}
        name={name}
        castShadow
        receiveShadow
        geometry={node.geometry}
        material={material}
        position={position}
      />
    );
  };

  const renderGroup = (node, name, parentPosition = [0, 0, 0]) => {
    const position = node.position
      ? [
          node.position.x + parentPosition[0],
          node.position.y + parentPosition[1],
          node.position.z + parentPosition[2],
        ]
      : parentPosition;

    return (
      <group key={name} name={name} position={position}>
        {node.children.map((child, index) => {
          const childName = `${name}_${index}`;
          return child.type === 'Mesh'
            ? renderMesh(child, childName, position)
            : renderGroup(child, childName, position);
        })}
      </group>
    );
  };

  return (
    <group name="Scene">
      {Object.entries(nodes).map(([name, node]) => {
        if (node.type === 'Mesh') {
          return renderMesh(node, name);
        } else if (node.type === 'Group') {
          return renderGroup(node, name);
        }
        return null;
      })}
    </group>
  );
}

export default React.memo(LandMeshes);
