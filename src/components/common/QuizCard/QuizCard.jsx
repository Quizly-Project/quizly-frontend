import React from 'react';
import styles from './QuizCard.module.css';
import Text from '../Text/Text.jsx';
import Button from '../Button/Button.jsx';

const QuizCard = ({ title, description, onClick, ...props }) => {
  return (
    <div className={styles.quizCard} onClick={onClick}>
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
