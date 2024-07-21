import React from 'react';
import SpotLights from '../Environment/SpotLights';
import ExplosionConfetti from '../Environment/ExplosionConfetti';

const QuizResultEffects = ({
  isStarted,
  isQuestionActive,
  type,
  quizAnswerer,
  isCorrectAnswerer,
  clientCoords,
  nickname,
}) => {
  if (!isStarted || isQuestionActive || type !== 2 || !quizAnswerer)
    return null;

  const allPlayers = Object.keys(clientCoords);

  return (
    <>
      {allPlayers.map(player => {
        const isCorrect = quizAnswerer.includes(player);
        const isCurrentPlayer = player === nickname;

        return (
          <React.Fragment key={player}>
            {isCorrect ? (
              // 정답자 효과
              <>
                <ExplosionConfetti
                  position={[
                    clientCoords[player].x,
                    clientCoords[player].y,
                    clientCoords[player].z,
                  ]}
                  rate={1}
                  fallingHeight={15}
                  amount={50}
                  areaWidth={20}
                  isExploding
                />
                <SpotLights
                  position={[
                    clientCoords[player].x,
                    clientCoords[player].y + 30,
                    clientCoords[player].z,
                  ]}
                  targetPosition={[
                    clientCoords[player].x,
                    clientCoords[player].y,
                    clientCoords[player].z,
                  ]}
                  intensity={10000}
                  color="#FFD700" // 금색 스포트라이트
                />
              </>
            ) : (
              // 오답자 효과
              <>
                {/* <ExplosionConfetti
                  position={[
                    clientCoords[player].x,
                    clientCoords[player].y,
                    clientCoords[player].z,
                  ]}
                  rate={1}
                  fallingHeight={15}
                  amount={50}
                  areaWidth={50}
                  isExploding
                  colors={['#808080', '#A9A9A9', '#D3D3D3']} // 회색 계열의 색상
                /> */}
                <SpotLights
                  position={[
                    clientCoords[player].x,
                    clientCoords[player].y + 10,
                    clientCoords[player].z,
                  ]}
                  targetPosition={[
                    clientCoords[player].x,
                    clientCoords[player].y,
                    clientCoords[player].z,
                  ]}
                  intensity={1000}
                  color="#000000" // 스틸블루 색상의 스포트라이트
                />
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default QuizResultEffects;
