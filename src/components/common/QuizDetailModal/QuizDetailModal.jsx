import React from 'react';
import styles from './QuizDetailModal.module.css';
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
          <Text type="title" weight="bold" size="xlarge" color="primary">
            {quiz.quizTitle}
          </Text>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <Text size="large" color="grey">
          {quiz.quizDescription}
        </Text>
        <hr className={styles.divider} />
        <div className={styles.quizList}>
          <Text type="subtitle" weight="bold" size="large" color="primary">
            문제 목록
          </Text>
          {quiz.quizs.map((question, index) => (
            <div key={question.quizId} className={styles.quizItem}>
              <span className={styles.quizNumber}>{index + 1}</span>
              <Text size="medium" color="dark" className={styles.quizText}>
                {question.question}
              </Text>
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.quizButton} onClick={onCreateRoom}>
            퀴즈 방 만들기
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailModal;
