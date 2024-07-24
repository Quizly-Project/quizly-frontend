import React from 'react';
import styles from './QuizCard.module.css';
import Button from '../Button/Button.jsx';

const QuizCard = ({ title, description, quizType, onClick, ...props }) => {
  console.log(quizType);
  let typeString = '';
  switch (quizType) {
    case 1:
      typeString = 'O/X';
      break;

    case 2:
      typeString = '골든벨';
      break;

    default:
      typeString = '기타';
      break;
  }

  return (
    <div className={styles.quizCard} onClick={onClick}>
      <div className={styles.quizTypeTag}>{typeString}</div>
      <h3 className={styles.quizTitle}>{title}</h3>
      <hr className={styles.divider} />
      <p className={styles.quizDescription}>{description}</p>
      <Button color="purple" align="right">
        퀴즈 보기 →
      </Button>
    </div>
  );
};

export default QuizCard;
