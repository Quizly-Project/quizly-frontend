import React, { useRef, useEffect, useState } from 'react';
import {
  Clone,
  useGLTF,
  Html,
  useKeyboardControls,
  useAnimations,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const ModelComponent = React.memo(
  ({ path, matName, nickname, pos, socket }) => {
    const group = useRef();
    const { nodes, materials, animations } = useGLTF(`./Character/${path}`);
    const { actions } = useAnimations(animations, group);

    const [subscribeKeys, getKeys] = useKeyboardControls();

    const [myPos, setMyPos] = useState({ x: 0, y: 0, z: 0 });

    const detectMovement = (oldPos, newPos, threshold = 0.3) => {
      // 임계점 이상일 때만 렌더링한다.
      return (
        Math.abs(oldPos.x - newPos.x) > threshold ||
        Math.abs(oldPos.y - newPos.y) > threshold ||
        Math.abs(oldPos.z - newPos.z) > threshold
      );
    };

    // 내 위치가 바뀌면 서버에 위치를 전송한다.
    useEffect(() => {
      socket.emit('send', 1, nickname, myPos);
    }, [myPos]);

    // 움직일 수 있는 경우 (나)
    useFrame(() => {
      const { forward, backward, leftward, rightward } = getKeys();

      const alpha = 1;
      if (forward) {
        group.current.position.z -= 0.1 * alpha;
      }
      if (backward) {
        group.current.position.z += 0.1 * alpha;
      }
      if (leftward) {
        group.current.position.x -= 0.1 * alpha;
      }
      if (rightward) {
        group.current.position.x += 0.1 * alpha;
      }

      const mypos = {
        x: group.current.position.x,
        y: group.current.position.y,
        z: group.current.position.z,
      };

      if (detectMovement(myPos, mypos)) {
        setMyPos(mypos);
      }
    });

    useGLTF.preload(`./Character/${path}`);

    return (
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Rig" scale={0.4}>
            <skinnedMesh
              name="Mesh"
              geometry={nodes.Mesh.geometry}
              material={materials[matName]}
              skeleton={nodes.Mesh.skeleton}
            />
            <primitive object={nodes.root} />
            <Html
              position={[0, 4, 0]}
              wrapperClass="label"
              center
              distanceFactor={8}
            >
              👤{nickname}
            </Html>
          </group>
        </group>
      </group>
    );
  }
);

export default ModelComponent;
