import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectCreateQuiz.module.css';
import Text from './Text';
import Button from './Button';

const SelectCreateQuiz = () => {
  const [quizSelect, setQuizSelect] = useState(null);
  const navigate = useNavigate();

  const quizTypes = [
    {
      type: '객관식',
      image: '/images/multiple-choice.png',
      urlPath: 'multiple-choice',
    },
    {
      type: '주관식',
      image: '/images/short-answer.png',
      urlPath: 'short-answer',
    },
  ];

  const handleSelectQuiz = type => {
    setQuizSelect(type);
  };

  const handleCreateQuiz = () => {
    if (!quizSelect) {
      alert('퀴즈 유형을 선택해주세요.');
      return;
    }
    const selectedQuiz = quizTypes.find(quiz => quiz.type === quizSelect);
    navigate(`/create/${selectedQuiz.urlPath}`);
  };

  return (
    <div className={styles.createQuiz}>
      <Text type="title" weight="bold" size="large">
        퀴즈 만들기
      </Text>
      <div className={styles.quizTypeContainer}>
        {quizTypes.map(({ type, image }) => (
          <div
            className={`${styles.quizTypeCard} ${
              quizSelect === type ? styles.selected : ''
            }`}
            key={type}
            onClick={() => handleSelectQuiz(type)}
          >
            <Text type="subtitle">{type}</Text>
            <img
              src={image}
              alt={`${type} 퀴즈`}
              className={styles.quizTypeImage}
            ></img>
          </div>
        ))}
      </div>
      <Button align="right" onClick={handleCreateQuiz}>
        만들기
      </Button>
    </div>
  );
};

export default SelectCreateQuiz;
