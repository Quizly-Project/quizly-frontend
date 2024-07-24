import React from 'react';
import styles from './QuizCard.module.css';
import Button from '../Button/Button.jsx';

const QuizCard = ({ title, description, quizType, onClick, ...props }) => {
  let typeString = '';
  let typeClass = '';
  switch (quizType) {
    case 1:
      typeString = 'O/X';
      typeClass = styles.typeRed;
      break;
    case 2:
      typeString = '골든벨';
      typeClass = styles.typeGreen;
      break;
    default:
      typeString = '기타';
      typeClass = styles.typeBlue;
      break;
  }

  return (
    <div className={styles.quizCard} onClick={onClick}>
      <div className={`${styles.quizTypeTag} ${typeClass}`}>{typeString}</div>
      <h3 className={styles.quizTitle}>{title}</h3>
      <p className={styles.quizDescription}>{description}</p>
      <div className={styles.buttonWrapper}>
        <Button color="blue" className={styles.quizButton}>
          퀴즈 시작
        </Button>
      </div>
      <div className={styles.cardDecoration}></div>
      <div className={styles.floatingElement}></div>
      <div className={styles.floatingElement}></div>
      <div className={styles.floatingElement}></div>
    </div>
  );
};

export default QuizCard;
