import React from 'react';
import styles from './QuizCard.module.css';
import Button from '../Button/Button.jsx';

const QuizCard = ({ title, description, quizType, onClick, ...props }) => {
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
      {typeString == 'O/X' && (
        <div className={(styles.quizTypeTag, styles.typeRed)}>{typeString}</div>
      )}
      {typeString == '골든벨' && (
        <div className={(styles.quizTypeTag, styles.typeGreen)}>
          {typeString}
        </div>
      )}
      {typeString == '기타' && (
        <div className={styles.quizTypeTag}>{typeString}</div>
      )}
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
