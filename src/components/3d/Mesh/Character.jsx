import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useGLTF, Html, useAnimations } from '@react-three/drei';
import Arrow3D from '../Environment/Arrow3D';
import useQuizRoomStore from '../../../store/quizRoomStore';
import Emoji from '../Effects/Emoji';

// 캐릭터별 색상 정의
const characterColors = {
  M_Turtle: '#90EE90', // 연한 초록
  M_Tuna: '#483D8B', // 연한 파랑
  M_Seagull: '#FFD700', // 금색 (골드)
  M_Sardine: '#87CEFA', // 밝은 하늘색
  M_Salmon: '#FFA07A', // 연한 연어색
  M_Prawn: '#FFB3BA', // 연한 분홍
  M_Octopus: '#DDA0DD', // 자주색 (연한 보라)
  M_JellyFish: '#FFB6C1', // 연한 분홍
};

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

    const [statusDimensions, setStatusDimensions] = useState({
      width: 200,
      height: 110,
    });

    useEffect(() => {
      if (writeStatus && writeStatus !== 'isWriting') {
        const newHeight = Math.min(
          300,
          Math.max(110, writeStatus.length * 1.5)
        );
        const newWidth = Math.min(400, Math.max(200, writeStatus.length * 8));
        setStatusDimensions({ width: newWidth, height: newHeight });
      } else {
        setStatusDimensions({ width: 200, height: 110 });
      }
    }, [writeStatus]);

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

    useEffect(() => {
      console.log(`Character ${nickname} status:`, writeStatus);
    }, [nickname, writeStatus]);

    const boardColor = characterColors[matName] || '#FFFFFF';

    const getBadgeContent = () => {
      if (isCorrectAnswerer) return '🏆';
      if (rank[0]?.nickName === nickname) return '👑';
      if (rank[1]?.nickName === nickname) return '🥈';
      if (rank[2]?.nickName === nickname) return '🥉';
      return '🌟'; // 기본 뱃지
    };

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
            {type === 2 && isStarted && (
              <Html position={[0, 2.5, 0]} center distanceFactor={60}>
                <div
                  className="status-bubble"
                  style={{
                    width: `${statusDimensions.width}px`,
                    height: `${statusDimensions.height}px`,
                    transform: `translateY(-${statusDimensions.height}px)`,
                    borderColor: boardColor,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: '10px solid #ddd',
                      borderRadius: '12px',
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      right: '-15px',
                      backgroundColor: boardColor,
                      color: 'white',
                      borderRadius: '50%',
                      width: '60px', // 크기 증가
                      height: '60px', // 크기 증가
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px', // 폰트 크기 증가
                      boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                      zIndex: 10,
                      border: '3px solid white', // 테두리 추가
                    }}
                  >
                    {getBadgeContent()}
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
            {/* {isStarted &&
              !isQuestionActive &&
              !isResultDisplayed &&
              !isCorrectAnswerer &&
              type === 2 &&
              writeStatus !== 'isWriting' && (
                <Emoji position={[-1.5, 5, 0]} scale={1.5} />
              )} */}
            <Html position={[0, -1.2, 0]} center distanceFactor={10} scale={1}>
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
