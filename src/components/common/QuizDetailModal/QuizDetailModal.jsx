import React from 'react';
import styles from './QuizDetailModal.module.css';
import Button from '../Button/Button.jsx';
import Text from '../Text/Text.jsx';

const QuizDetailModal = ({ quiz, onClose, onCreateRoom }) => {
  if (!quiz) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Text type="title" weight="bold" size="xlarge" color="black">
            {quiz.quizTitle}
          </Text>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <hr className={styles.divider} />
        <Text size="large" color="grey">
          {quiz.quizDescription}
        </Text>

        <div className={styles.quizList}>
          <Text type="subtitle" weight="bold" size="large" color="grey">
            문제 목록
          </Text>
          {quiz.quizs.map((question, index) => (
            <div key={question.quizId} className={styles.quizItem}>
              <span className={styles.quizNumber}>{index + 1}</span>
              <Text size="medium" color="black" className={styles.quizText}>
                {question.question}
              </Text>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={onCreateRoom} color="purple" align="right">
            퀴즈 방 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailModal;
