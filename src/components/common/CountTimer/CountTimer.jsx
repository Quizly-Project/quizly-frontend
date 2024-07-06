import React, { useState, useEffect, useRef } from 'react';

const ClockStyleCountdownTimer = ({ size = 200, timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = time => {
    if (!startTimeRef.current) {
      startTimeRef.current = time;
    }
    const elapsedTime = (time - startTimeRef.current) / 1000; // Convert to seconds
    const remainingTime = Math.max(timeLeft - elapsedTime, 0);

    setTimeLeft(remainingTime);

    if (remainingTime > 0 && isActive) {
      requestRef.current = requestAnimationFrame(animate);
    } else if (remainingTime === 0) {
      setIsActive(false);
      alert("Time's up!");
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isActive]);

  const toggleTimer = () => {
    if (!isActive) {
      if (timeLeft === 0) {
        const minutes = parseFloat(inputMinutes);
        if (isNaN(minutes) || minutes <= 0) {
          alert('Please enter a valid number of minutes.');
          return;
        }
        setTimeLeft(minutes * 60);
      }
      startTimeRef.current = null;
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(0);
    setInputMinutes('');
    cancelAnimationFrame(requestRef.current);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = Math.floor(timeLeft % 60);

  const radius = size / 2;
  const strokeWidth = size / 20;
  const center = size / 2;
  const topBtnHeight = size / 10;

  const totalSeconds = parseFloat(inputMinutes) * 60 || 1;
  const progress = 1 - timeLeft / totalSeconds;
  const angle = progress * 360;

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, startAngle);
    const end = polarToCartesian(x, y, radius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
      'L',
      x,
      y,
      'Z',
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    timerText: {
      marginTop: '1rem',
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: 'white',
    },
    inputContainer: {
      marginTop: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '0.25rem 0.5rem',
      width: '6rem',
      textAlign: 'center',
      marginBottom: '0.5rem',
    },
    buttonContainer: {
      display: 'flex',
      gap: '0.5rem',
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      cursor: 'pointer',
      border: 'none',
    },
    startButton: {
      backgroundColor: 'white',
      color: 'black',
    },
    resetButton: {
      backgroundColor: '#4a5568',
      color: 'white',
    },
  };

  return (
    <div style={styles.container}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={center} cy={center} r={radius} fill="black" />
        <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
        />
        <rect
          x={center - topBtnHeight / 2}
          y={strokeWidth / 2}
          width={topBtnHeight}
          height={topBtnHeight}
          rx={topBtnHeight / 4}
          fill="white"
        />

        {[...Array(12)].map((_, i) => {
          const tickAngle = i * 30;
          const tickLength = i % 3 === 0 ? strokeWidth * 1.5 : strokeWidth;
          const x1 =
            center +
            (radius - strokeWidth) * Math.cos((tickAngle * Math.PI) / 180);
          const y1 =
            center +
            (radius - strokeWidth) * Math.sin((tickAngle * Math.PI) / 180);
          const x2 =
            center +
            (radius - strokeWidth - tickLength) *
              Math.cos((tickAngle * Math.PI) / 180);
          const y2 =
            center +
            (radius - strokeWidth - tickLength) *
              Math.sin((tickAngle * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeWidth={strokeWidth / 3}
            />
          );
        })}

        <path
          d={describeArc(center, center, radius - strokeWidth, 0, angle)}
          fill="white"
          opacity={0.3}
        />

        <line
          x1={center}
          y1={center}
          x2={
            center +
            (radius - strokeWidth * 2) *
              Math.cos(((angle - 90) * Math.PI) / 180)
          }
          y2={
            center +
            (radius - strokeWidth * 2) *
              Math.sin(((angle - 90) * Math.PI) / 180)
          }
          stroke="white"
          strokeWidth={strokeWidth / 3}
        />
        <circle cx={center} cy={center} r={strokeWidth / 2} fill="white" />
      </svg>

      <div style={styles.timerText}>
        {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
      </div>

      <div style={styles.inputContainer}></div>
    </div>
  );
};

export default ClockStyleCountdownTimer;
