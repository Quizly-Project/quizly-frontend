import React, { useState, useEffect, useRef } from 'react';
import VideoAudio from '../LiveKit/VideoAudio.tsx';
import LiveKit from '../LiveKit/LiveKit.tsx';
import styles from './FinalTopThreeParticipants.module.css';
import RemoteVideoDisplay from '../RemoteVideoDisplay/RemoteVideoDisplay.tsx';
import useAudioStore from '../../../store/audioStore.js';

const FinalTopThreeParticipants = ({
  quizResult,
  isStarted,
  participants,
  setShowTopThree,
}) => {
  const { currRank } = quizResult;
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);
  const revealTimersRef = useRef([]);

  const {
    initializeDrumroll,
    initializeFirstPlace,
    playDrumroll,
    stopDrumroll,
    playFirstPlace,
    stopFirstPlace,
  } = useAudioStore();

  const sortedParticipants = currRank
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  const medals = ['silver', 'gold', 'bronze'];
  const rankOrder = [1, 0, 2];
  const revealOrder = [2, 1, 0];

  const startRevealProcess = () => {
    const revealInterval = 2000;

    revealOrder.forEach((order, index) => {
      const timer = setTimeout(
        () => {
          setRevealedCards(prev => {
            const newRevealedCards = [...prev, order];
            if (newRevealedCards.length === 3) {
              stopDrumroll();
              playFirstPlace();
            }
            return newRevealedCards;
          });
        },
        (index + 1) * revealInterval
      );
      revealTimersRef.current.push(timer);
    });
  };

  useEffect(() => {
    initializeDrumroll();
    initializeFirstPlace();
    playDrumroll();
    startRevealProcess();

    return () => {
      stopDrumroll();
      stopFirstPlace();
      revealTimersRef.current.forEach(clearTimeout);
    };
  }, [
    initializeDrumroll,
    initializeFirstPlace,
    playDrumroll,
    stopDrumroll,
    stopFirstPlace,
  ]);

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

        const isRevealed = revealedCards.includes(order);

        return (
          <div
            key={participant.nickName}
            className={`${styles.rankCard} ${styles[`rank${order + 1}`]} ${isRevealed ? styles.reveal : styles.drumroll}`}
            style={{
              order: index,
            }}
          >
            <div className={styles.medalIcon}>
              <RemoteVideoDisplay participantId={participant.nickName} />
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

export default FinalTopThreeParticipants;
