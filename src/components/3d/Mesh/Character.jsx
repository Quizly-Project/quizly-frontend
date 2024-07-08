import React, { useEffect, useRef } from 'react';
import { useGLTF, Html, useAnimations } from '@react-three/drei';

const Character = React.memo(({ path, matName, nickname, actionType }) => {
  const group = useRef();

  const { nodes, materials, animations } = useGLTF(`/Character/${path}`);
  const { actions } = useAnimations(animations, group);

  useGLTF.preload(`/Character/${path}`);

  useEffect(() => {
    // play action
    actions[actionType].reset().fadeIn(0.5).play();

    // stop action
    return () => {
      actions[actionType].fadeOut(0.5);
    };
  }, [actionType]);

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Rig" castShadow>
          <skinnedMesh
            castShadow
            geometry={nodes.Mesh.geometry}
            material={materials[matName]}
            skeleton={nodes.Mesh.skeleton}
            scale={2}
          />
          <primitive object={nodes.root} />
          <Html
            position={[0, 3, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
          >
            👤 {nickname}
          </Html>
        </group>
      </group>
    </group>
  );
});

export default Character;
