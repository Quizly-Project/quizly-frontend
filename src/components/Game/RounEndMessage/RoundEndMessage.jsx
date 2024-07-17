import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated, config } from 'react-spring';
import styles from './RoundEndMessage.module.css';

const RoundEndMessage = ({ message, onComplete, show }) => {
  const [visible, setVisible] = useState(false);
  const whistleRef = useRef(null);

  useEffect(() => {
    whistleRef.current = new Audio('/src/assets/whistle.wav');
    whistleRef.current.preload = 'auto';

    return () => {
      if (whistleRef.current) {
        whistleRef.current.pause();
        whistleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      setVisible(true);
      whistleRef.current
        .play()
        .catch(error => console.error('Failed to play audio:', error));

      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);

      return () => {
        clearTimeout(timer);
        if (whistleRef.current) {
          whistleRef.current.pause();
          whistleRef.current.currentTime = 0;
        }
      };
    }
  }, [show]);

  const transition = useTransition(visible, {
    from: { opacity: 0, transform: 'translateX(-100%) scale(0.8)' },
    enter: { opacity: 1, transform: 'translateX(0%) scale(1)' },
    leave: { opacity: 0, transform: 'translateX(100%) scale(0.8)' },
    config: { tension: 400, friction: 30 }, // 더 빠르고 탄력 있는 애니메이션
    onRest: () => {
      if (!visible) onComplete();
    },
  });

  const backgroundShapes = [...Array(20)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 30 + 20}px`,
  }));

  return transition(
    (style, item) =>
      item && (
        <animated.div style={style} className={styles.container}>
          <div className={styles.background}>
            {backgroundShapes.map((shape, index) => (
              <animated.div
                key={index}
                className={styles.shape}
                style={{
                  ...shape,
                  width: shape.size,
                  height: shape.size,
                  opacity: style.opacity,
                  transform: style.opacity.to(o => `scale(${o * 1.2})`), // 더 큰 스케일 변화
                }}
              />
            ))}
          </div>
          <animated.div
            className={styles.bannerContainer}
            style={{
              transform: style.transform.to(
                t => `${t} rotate(${visible ? '0deg' : '-5deg'})`
              ),
            }}
          >
            <div className={styles.bannerLeft}></div>
            <div className={styles.bannerMiddle}>
              <h1 className={styles.message}>{message}</h1>
            </div>
            <div className={styles.bannerRight}></div>
          </animated.div>
        </animated.div>
      )
  );
};

export default RoundEndMessage;
