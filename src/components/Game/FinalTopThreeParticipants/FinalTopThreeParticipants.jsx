import React, { useState, useEffect } from 'react';
import VideoAudio from '../LiveKit/VideoAudio.tsx';
import LiveKit from '../LiveKit/LiveKit.tsx';
import styles from './FinalTopThreeParticipants.module.css';
import RemoteVideoDisplay from '../RemoteVideoDisplay/RemoteVideoDisplay.tsx';

const FinalTopThreeParticipants = ({
  quizResult,
  isStarted,
  participants,
  setShowTopThree,
}) => {
  const { currRank } = quizResult;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const sortedParticipants = currRank
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  console.log('final!!!', sortedParticipants);

  const medals = ['silver', 'gold', 'bronze'];
  const rankOrder = [1, 0, 2]; // 2등, 1등, 3등 순서

  useEffect(() => {
    if (!isStarted) {
      setIsExiting(false);
      setIsVisible(true);
    } else {
      if (isVisible) {
        setIsExiting(true);
        const timer = setTimeout(() => {
          setIsVisible(false);
          setShowTopThree(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isStarted, isVisible]);

  if (!isVisible && !isExiting) return null;

  return (
    <>
      <div
        className={`${styles.rankingContainer} ${isExiting ? styles.exiting : ''} ${!isVisible ? styles.hidden : ''}`}
      >
        {rankOrder.map((order, index) => {
          const participant = sortedParticipants[order];

          if (!participant) return null;

          const participantData = participants.find(
            p => p.nickName === participant.nickName
          );
          const iconClass = participantData ? styles[participantData.icon] : '';

          return (
            <div
              key={participant.nickName}
              className={`${styles.rankCard} ${styles[`rank${order + 1}`]}`}
              style={{
                transitionDelay: `${index * 0.5}s`,
                order: index,
              }}
            >
              <div className={styles.medalIcon}>
                {/* <div className={`${styles.characterIcon} ${iconClass}`}></div> */}
                {/* 모델 초상화 대신 탑3 랭킹 학생들의 캠+음성을 출력한다. */}
                {/* local videocomponent, remote videocomponent + audiocomponent 출력 */}
                <RemoteVideoDisplay participantId={participant.nickName} />
                <div
                  className={`${styles.medal} ${styles[medals[index]]}`}
                ></div>
              </div>
              <h3 className={styles.nickname}>{participant.nickName}</h3>
              <p className={styles.score}>{participant.totalScore} 점</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FinalTopThreeParticipants;