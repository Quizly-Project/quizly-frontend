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
        <Text type="title" weight="bold" size="large">
          {quiz.quizTitle}
        </Text>
        <Text size="medium">{quiz.quizDescription}</Text>
        <div className={styles.buttonContainer}>
          <Button onClick={onCreateRoom}>퀴즈 방 만들기</Button>
          <Button color="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailModal;
