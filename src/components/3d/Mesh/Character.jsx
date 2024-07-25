import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, Html, useAnimations } from '@react-three/drei';
import Arrow3D from '../Environment/Arrow3D';
import useQuizRoomStore from '../../../store/quizRoomStore';
import CryingEmojiConfetti from '../Effects/CryingEmojiConfetti';
import Emoji from '../Effects/Emoji';

const Character = React.memo(
  ({
    path,
    matName,
    nickname,
    actionType,
    rank,
    isCorrectAnswerer,
    selectedStudent,
  }) => {
    const group = useRef();

    const { nodes, materials, animations } = useGLTF(`/Character/${path}`);
    const { actions } = useAnimations(animations, group);

    const { getParticipantsMap } = useQuizRoomStore();
    const { type, isResultDisplayed, isStarted, isQuestionActive } =
      useQuizRoomStore(state => state.quizRoom);
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
      actions[actionType].reset().fadeIn(0.5).play();

      return () => {
        if (actions[actionType]) {
          actions[actionType].fadeOut(0.5);
        }
      };
    }, [actionType]);

    // 정답자일 경우 더 큰 scale 값을 사용
    const characterScale = isCorrectAnswerer ? 7 : 4;

    useEffect(() => {
      console.log('Character rendered', selectedStudent, nickname);
    }, [selectedStudent, nickname]);

    return (
      <group ref={group} dispose={null} scale={characterScale}>
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
            {selectedStudent === nickname ? (
              <Arrow3D
                position={type === 1 ? [0, 3, 0] : [0, 5, 0]}
                scale={1}
                color="#ffd700"
              />
            ) : null}
            {type === 2 && (
              <Html position={[0, 2.5, 0]} center distanceFactor={60}>
                <div className="status-bubble">
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
            {isStarted &&
              !isQuestionActive &&
              !isResultDisplayed &&
              !isCorrectAnswerer &&
              type === 2 &&
              writeStatus !== 'isWriting' && (
                <Emoji position={[-1, 1, 0]} scale={1.5} />
              )}
            <Html
              position={[0, -0.5, 0]}
              center
              distanceFactor={10}
              scale={400}
            >
              <div className="name-tag">
                {getRankEmoji && (
                  <span className="crown-icon">{getRankEmoji}</span>
                )}
                <span className="nickname">{nickname}</span>
              </div>
            </Html>
          </group>
        </group>
      </group>
    );
  }
);

export default Character;
