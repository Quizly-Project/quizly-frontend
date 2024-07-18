import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, Html, useAnimations } from '@react-three/drei';

import useQuizRoomStore from '../../../store/quizRoomStore';

const Character = React.memo(
  ({ path, matName, nickname, actionType, rank }) => {
    const group = useRef();

    const { nodes, materials, animations } = useGLTF(`/Character/${path}`);
    const { actions } = useAnimations(animations, group);
    // console.log(actions);

    const { getParticipantsMap } = useQuizRoomStore();
    const { type } = useQuizRoomStore(state => state.quizRoom);
    const participants = getParticipantsMap();
    const writeStatus = useMemo(() => {
      if (participants[nickname]?.writeStatus === 'Done')
        return participants[nickname]?.userAnswer;
      else if (participants[nickname]?.writeStatus === 'isWriting')
        return 'isWriting';
      else return '';
    }, [participants, nickname]);

    const getRankEmoji = useMemo(() => {
      if (rank[0]?.nickName === nickname) return '👑';
      if (rank[1]?.nickName === nickname) return '🥈';
      if (rank[2]?.nickName === nickname) return '🥉';
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
      <group ref={group} dispose={null} scale={2.5}>
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
            {type === 1 && (
              <Html
                position={[0, 3, 0]}
                wrapperClass="label"
                center
                distanceFactor={10}
                scale={400}
              >
                {getRankEmoji}
                {nickname}
              </Html>
            )}
            {type === 2 && (
              <Html position={[0, 3.5, 0]} center distanceFactor={60}>
                <div className="status-bubble">
                  <div className="name-tag">
                    {getRankEmoji && (
                      <span className="crown-icon">{getRankEmoji}</span>
                    )}
                    <span className="nickname">{nickname}</span>
                  </div>
                  <div className="status-text">
                    {writeStatus === 'isWriting' ? (
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    ) : (
                      writeStatus
                    )}
                  </div>
                </div>
              </Html>
            )}
          </group>
        </group>
      </group>
    );
  }
);

export default Character;
