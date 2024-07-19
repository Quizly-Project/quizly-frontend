import React, { useState, useEffect, useRef } from 'react';
import VideoAudio from '../LiveKit/VideoAudio.tsx';
import LiveKit from '../LiveKit/LiveKit.tsx';
import styles from './FinalTopThreeParticipants.module.css';
import RemoteVideoDisplay from '../RemoteVideoDisplay/RemoteVideoDisplay.tsx';

const FinalTopThreeParticipants = ({
  quizResult,
  isStarted,
  participants,
  hideTopThree,
}) => {
  // console.log('FinalTopThreeParticipants 렌더링', {
  //   quizResult,
  //   isStarted,
  //   participants,
  // });

  const { currRank } = quizResult;
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);
  const drumrollAudioRef = useRef(null);
  const firstPlaceAudioRef = useRef(null);
  const revealTimersRef = useRef([]);

  const sortedParticipants = currRank
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 3);

  const medals = ['silver', 'gold', 'bronze'];
  const rankOrder = [1, 0, 2];
  const revealOrder = [2, 1, 0];

  const startRevealProcess = () => {
    // console.log('startRevealProcess 시작');
    const revealInterval = 2000;

    revealOrder.forEach((order, index) => {
      const timer = setTimeout(
        () => {
          // console.log(`카드 공개: ${order}`);
          setRevealedCards(prev => {
            const newRevealedCards = [...prev, order];
            if (newRevealedCards.length === 3) {
              if (drumrollAudioRef.current) {
                drumrollAudioRef.current.pause();
              }
              if (firstPlaceAudioRef.current) {
                firstPlaceAudioRef.current.currentTime = 0;
                firstPlaceAudioRef.current
                  .play()
                  .catch(e => console.error('FirstPlace 오디오 재생 실패:', e));
              }
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
    // console.log('useEffect 실행');

    // 드럼롤 오디오 재생 시작
    if (drumrollAudioRef.current) {
      drumrollAudioRef.current.loop = true;
      drumrollAudioRef.current
        .play()
        .catch(e => console.error('드럼롤 오디오 재생 실패:', e));
    }

    startRevealProcess();

    return () => {
      console.log('Cleanup 실행');
      if (drumrollAudioRef.current) {
        drumrollAudioRef.current.pause();
      }
      if (firstPlaceAudioRef.current) {
        firstPlaceAudioRef.current.pause();
      }
      revealTimersRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      <audio ref={drumrollAudioRef} src="/Sounds/DrumRoll.mp3" preload="auto" />
      <audio
        ref={firstPlaceAudioRef}
        src="/Sounds/FirstPlace.mp3"
        preload="auto"
      />
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
