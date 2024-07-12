import React from 'react';
import styles from './Timer.module.css';

const Timer = ({ timer }) => {
  const { percent, remainingTime } = timer;
  // 색상 계산 함수
  const getGradient = percent => {
    const hue = (percent * 1.2).toFixed(0); // 120(초록색)에서 0(빨간색)으로
    return `linear-gradient(90deg, hsl(${hue}, 100%, 50%), hsl(${Math.max(0, hue - 40)}, 100%, 50%))`;
  };

  const isDone = percent <= 0;
  const isCritical = percent <= 30 && percent > 0;
  const isWarning = percent <= 60 && percent > 30;

  return (
    <div className={`${styles.timerContainer} ${isDone ? styles.done : ''}`}>
      <div
        className={`${styles.timerGauge} ${isCritical ? styles.critical : ''} ${isWarning ? styles.warning : ''}`}
        style={{
          width: `${percent}%`,
          backgroundImage: getGradient(percent),
        }}
      >
        <span className={styles.timerText}>{remainingTime}초</span>
      </div>
    </div>
  );
};

export default Timer;
