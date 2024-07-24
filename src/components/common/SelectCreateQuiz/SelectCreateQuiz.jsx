import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SelectCreateQuiz.module.css';
import Text from '../Text/Text';

const SelectCreateQuiz = () => {
  const [quizSelect, setQuizSelect] = useState(null);
  const navigate = useNavigate();

  const quizTypes = [
    {
      type: '객관식',
      image: '/Image/multiple-choice.png',
      urlPath: 'multiple-choice',
      description: 'O, X의 선택지 중 정답을 고르는 퀴즈',
    },
    {
      type: '도전 골든벨',
      image: '/Image/short-answer.png',
      urlPath: 'short-answer',
      description: '주어진 문제에 대한 답을 직접 입력하는 퀴즈',
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
      <Text type="title" weight="bold" size="xlarge" color="primary" align="center">
        퀴즈 유형 선택
      </Text>
      <div className={styles.quizTypeContainer}>
        {quizTypes.map(({ type, image, description }) => (
          <div
            className={`${styles.quizTypeCard} ${
              quizSelect === type ? styles.selected : ''
            }`}
            key={type}
            onClick={() => handleSelectQuiz(type)}
          >
            <h3 className={styles.quizTypeTitle}>{type}</h3>
            <img
              src={image}
              alt={`${type} 퀴즈`}
              className={styles.quizTypeImage}
            />
            <p className={styles.quizTypeDescription}>{description}</p>
            <div className={styles.cardDecoration}></div>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
          </div>
        ))}
      </div>
      <button className={styles.nextButton} onClick={handleCreateQuiz}>
        퀴즈 만들기
      </button>
    </div>
  );
};

export default SelectCreateQuiz;
