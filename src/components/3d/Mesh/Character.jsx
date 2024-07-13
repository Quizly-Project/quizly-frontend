import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, Html, useAnimations } from '@react-three/drei';

const Character = React.memo(
  ({ path, matName, nickname, actionType, rank }) => {
    const group = useRef();

    const { nodes, materials, animations } = useGLTF(`/Character/${path}`);
    const { actions } = useAnimations(animations, group);

    const getRankMedal = useMemo(() => {
      console.log('getRankMedal', nickname, rank);
      if (rank[0]?.nickName === nickname) {
        return '👑';
      } else if (rank[1]?.nickName === nickname) {
        return '🥈';
      } else if (rank[2]?.nickName === nickname) {
        return '🥉';
      }
      return '';
    }, [nickname, rank]);

    useGLTF.preload(`/Character/${path}`);

    useEffect(() => {
      // play action
      actions[actionType].reset().fadeIn(0.5).play();

      // stop action
      return () => {
        if (actions[actionType]) {
          actions[actionType].fadeOut(0.5);
        }
      };
    }, [actionType]);

    return (
      <group ref={group} dispose={null} scale={2}>
        <group name="Scene">
          <group name="Rig" castShadow>
            <skinnedMesh
              castShadow
              geometry={nodes.Mesh.geometry}
              material={materials[matName]}
              skeleton={nodes.Mesh.skeleton}
              scale={2}
              frustumCulled={false}
            />
            <primitive object={nodes.root} />
            <Html
              position={[0, 3, 0]}
              wrapperClass="label"
              center
              distanceFactor={10}
              scale={400}
            >
              {getRankMedal} {nickname}
            </Html>
          </group>
        </group>
      </group>
    );
  }
);

export default Character;
