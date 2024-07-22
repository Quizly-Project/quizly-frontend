import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated, config } from 'react-spring';
import useQuizRoomStore from '../../../store/quizRoomStore';
import styles from './ReadyMessage.module.css';

const ReadyMessage = ({ show, onComplete }) => {
  const { turnOnCamera } = useQuizRoomStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        turnOnCamera();
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, turnOnCamera]);

  const transition = useTransition(visible, {
    from: { opacity: 0, transform: 'translateX(-100%) scale(0.8)' },
    enter: { opacity: 1, transform: 'translateX(0%) scale(1)' },
    leave: { opacity: 0, transform: 'translateX(100%) scale(0.8)' },
    config: { tension: 400, friction: 30 },
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
                  transform: style.opacity.to(o => `scale(${o * 1.2})`),
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
              <h1 className={styles.message}>준비!</h1>
            </div>
            <div className={styles.bannerRight}></div>
          </animated.div>
        </animated.div>
      )
  );
};

export default ReadyMessage;
