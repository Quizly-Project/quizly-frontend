import React, { useState, useEffect, useRef } from 'react';

const QuizQuestionCompletion = ({ message, onComplete, show }) => {
  const [visible, setVisible] = useState(false);
  const [animationState, setAnimationState] = useState('initial');
  const whistleRef = useRef(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 오디오 객체 생성
    whistleRef.current = new Audio('/src/assets/whistle.wav');
    whistleRef.current.preload = 'auto'; // 오디오 미리 로드

    // 컴포넌트 언마운트 시 오디오 객체 정리
    return () => {
      if (whistleRef.current) {
        whistleRef.current.pause();
        whistleRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (show) {
      // 오디오 재생 및 상태 업데이트를 동시에 시작
      const playAndAnimate = async () => {
        try {
          setVisible(true);
          setAnimationState('slideIn');
          await whistleRef.current.play();
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      };

      playAndAnimate();

      const timer = setTimeout(() => {
        setAnimationState('slideOut');
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 500); // Wait for slide out animation
      }, 2000);

      return () => {
        clearTimeout(timer);
        if (whistleRef.current) {
          whistleRef.current.pause();
          whistleRef.current.currentTime = 0;
        }
      };
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className={`quiz-question-completion ${animationState}`}>
      <div className="content">
        <div className="message">{message}</div>
      </div>
      <style jsx>{`
        .quiz-question-completion {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0, 0, 0, 0.8);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .slideIn {
          animation: fadeIn 0.3s ease forwards;
        }

        .slideOut {
          animation: fadeOut 0.3s ease forwards;
        }

        .content {
          background-color: #ff4136;
          color: white;
          padding: 20px 40px;
          border-radius: 10px;
          font-size: 28px;
          font-weight: bold;
          text-transform: uppercase;
          box-shadow: 0 0 20px rgba(255, 65, 54, 0.7);
        }

        .slideIn .content {
          animation:
            slideInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
            flash 0.5s ease-in-out 3;
        }

        .slideOut .content {
          animation: slideOutRight 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        .message {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100vw);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100vw);
          }
        }

        @keyframes flash {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizQuestionCompletion;
