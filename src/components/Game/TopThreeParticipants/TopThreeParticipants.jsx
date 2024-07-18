import React, { useState, useEffect } from 'react';
import styles from './TopThreeParticipants.module.css';

const TopThreeParticipants = ({
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

  const medals = ['silver', 'gold', 'bronze'];
  const rankOrder = [1, 0, 2]; // 2등, 1등, 3등 순서

  // console.log('topthree', sortedParticipants);
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
              <div className={`${styles.characterIcon} ${iconClass}`}></div>
              <div className={`${styles.medal} ${styles[medals[index]]}`}></div>
            </div>
            <h3 className={styles.nickname}>{participant.nickName}</h3>
            <p className={styles.score}>{participant.totalScore} 점</p>
          </div>
        );
      })}
    </div>
  );
};

export default TopThreeParticipants;
