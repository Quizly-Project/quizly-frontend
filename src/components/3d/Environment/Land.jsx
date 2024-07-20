import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export default function Land(props) {
  const { nodes, materials } = useGLTF('/Environment/Land.glb');
  return (
    <RigidBody type="fixed" colliders="hull" friction={5}>
      <group {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="Xland_cell"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell.geometry}
            material={materials['Dirt.001']}
            position={[59.492, -26.874, -17.878]}
          />
          <mesh
            name="Xland_cell001"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell001.geometry}
            material={materials['Dirt.001']}
            position={[62.887, -54.061, -13.564]}
          />
          <mesh
            name="Xland_cell002"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell002.geometry}
            material={materials['Dirt.001']}
            position={[46.281, -11.6, 10.581]}
          />
          <group name="Xland_cell003" position={[61.049, 5.845, 29.417]}>
            <mesh
              name="Xland_cell002_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell002_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell002_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell002_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell004" position={[44.898, 5.423, 19.931]}>
            <mesh
              name="Xland_cell003_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell003_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell003_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell003_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell005" position={[59.563, -2.263, -33.43]}>
            <mesh
              name="Xland_cell004_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell004_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell004_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell004_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell006" position={[54.585, 5.748, 35.879]}>
            <mesh
              name="Xland_cell005_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell005_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell005_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell005_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell007"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell007.geometry}
            material={materials['Dirt.001']}
            position={[70.559, -29.587, 9.541]}
          />
          <mesh
            name="Xland_cell008"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell008.geometry}
            material={materials['Dirt.001']}
            position={[49.383, -50.634, 13.461]}
          />
          <mesh
            name="Xland_cell009"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell009.geometry}
            material={materials['Dirt.001']}
            position={[39.618, -34.788, 3.682]}
          />
          <mesh
            name="Xland_cell010"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell010.geometry}
            material={materials['Dirt.001']}
            position={[73.903, -51.668, -4.748]}
          />
          <mesh
            name="Xland_cell011"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell011.geometry}
            material={materials['Dirt.001']}
            position={[72.658, -15.396, -11.554]}
          />
          <mesh
            name="Xland_cell012"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell012.geometry}
            material={materials['Dirt.001']}
            position={[60.96, -70.126, 4.661]}
          />
          <mesh
            name="Xland_cell013"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell013.geometry}
            material={materials['Dirt.001']}
            position={[70.515, -56.093, 7.327]}
          />
          <group name="Xland_cell014" position={[58.789, 4.685, -28.051]}>
            <mesh
              name="Xland_cell013_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell013_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell013_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell013_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell015"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell015.geometry}
            material={materials['Dirt.001']}
            position={[40.902, -27.573, -15.767]}
          />
          <group name="Xland_cell016" position={[72.813, 0.089, 18.893]}>
            <mesh
              name="Xland_cell015_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell015_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell015_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell015_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell017" position={[37.279, -3.265, -2.976]}>
            <mesh
              name="Xland_cell016_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell016_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell016_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell016_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell018"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell018.geometry}
            material={materials['Dirt.001']}
            position={[59.484, -70.248, -5.171]}
          />
          <group name="Xland_cell019" position={[73.6, 2.24, 0.767]}>
            <mesh
              name="Xland_cell018_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell018_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell018_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell018_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell020"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell020.geometry}
            material={materials['Dirt.001']}
            position={[60.048, -50.838, 18.655]}
          />
          <mesh
            name="Xland_cell021"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell021.geometry}
            material={materials['Dirt.001']}
            position={[57.504, -15.007, 21.695]}
          />
          <group name="Xland_cell022" position={[44.62, -1.817, -19.903]}>
            <mesh
              name="Xland_cell021_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell021_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell021_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell021_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <group name="Xland_cell023" position={[72.602, 3.871, -21.495]}>
            <mesh
              name="Xland_cell022_1"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell022_1.geometry}
              material={materials['Dirt.001']}
            />
            <mesh
              name="Xland_cell022_2"
              castShadow
              receiveShadow
              geometry={nodes.Xland_cell022_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
          <mesh
            name="Xland_cell024"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell024.geometry}
            material={materials['Dirt.001']}
            position={[52.18, -70.117, 1.223]}
          />
          <mesh
            name="Xland_cell025"
            castShadow
            receiveShadow
            geometry={nodes.Xland_cell025.geometry}
            material={materials['Dirt.001']}
            position={[47.599, -54.514, -5.996]}
          />
        </group>
      </group>
    </RigidBody>
  );
}
