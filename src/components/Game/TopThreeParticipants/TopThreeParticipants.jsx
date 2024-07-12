import React, { useState, useEffect } from 'react';
import styles from './TopThreeParticipants.module.css';

const TopThreeParticipants = ({ quizResult, isStarted }) => {
  const { currRank, totalScore } = quizResult;
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const sortedParticipants = currRank
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  const medals = ['🥇', '🥈', '🥉'];

  useEffect(() => {
    if (!isStarted) {
      setIsExiting(false);
      setIsVisible(true);
    } else {
      if (isVisible) {
        setIsExiting(true);

        const timer = setTimeout(() => setIsVisible(false), 500); // 애니메이션 시간과 일치
        return () => clearTimeout(timer);
      }
    }
  }, [isStarted, isVisible]);

  if (!isVisible && !isExiting) return null;

  return (
    <div
      className={`${styles.rankingContainer} ${isExiting ? styles.exiting : ''} ${!isVisible ? styles.hidden : ''}`}
    >
      {sortedParticipants.map((participant, index) => (
        <div
          key={participant.nickName}
          className={`${styles.rankCard} ${styles[`rank${index + 1}`]}`}
          style={{ transitionDelay: `${index * 0.5}s` }}
        >
          <div className={styles.medal}>{medals[index]}</div>
          <h3 className={styles.nickname}>{participant.nickName}</h3>
          <p className={styles.score}>{participant.totalScore} 점</p>
        </div>
      ))}
    </div>
  );
};

export default TopThreeParticipants;
