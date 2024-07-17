import React, { useState, useMemo, useEffect, useRef } from 'react';
import styles from './Timer.module.css';

const getGradient = percent => {
  const hue = (percent * 1.2).toFixed(0);
  return `linear-gradient(90deg, hsl(${hue}, 100%, 50%), hsl(${Math.max(0, hue - 40)}, 100%, 50%))`;
};

const Timer = React.memo(({ timer }) => {
  const { percent, remainingTime } = timer;
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);

  const timerStyle = useMemo(
    () => ({
      '--timer-width': `${percent}%`,
      '--timer-gradient': getGradient(percent),
    }),
    [percent]
  );

  const timerClass = useMemo(() => {
    if (percent <= 30 && percent > 0) return styles.critical;
    if (percent <= 60 && percent > 30) return styles.warning;
    return '';
  }, [percent]);

  return (
    <div className={styles.timerContainer}>
      <div className={`${styles.timerGauge} ${timerClass}`} style={timerStyle}>
        <span className={styles.timerText}>{remainingTime}초</span>
      </div>
    </div>
  );
});

export default Timer;
