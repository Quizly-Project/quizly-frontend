import React from 'react';
import styles from './QuizCard.module.css';
import Text from './Text';
import Button from './Button';

const QuizCard = ({ title, description, ...props }) => {
  return (
    <div className={styles.quizCard}>
      <Text type="subtitle" weight="bold">
        {title}
      </Text>
      <Text size="small">{description}</Text>
      <Button {...props}>퀴즈 보기 →</Button>
    </div>
  );
};

export default QuizCard;
