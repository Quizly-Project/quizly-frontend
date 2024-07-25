import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';
import Text from '../../components/common/Text/Text';

const MainPage = () => {
  const navigate = useNavigate();

  const options = [
    {
      type: '선생님 로그인',
      image: '/Image/teacher-icon.png',
      description: '퀴즈를 만들고 관리하세요',
      onClick: () => navigate('/signin'),
    },
    {
      type: '게임 방 입장',
      image: '/Image/game-icon.png',
      description: '퀴즈에 참여하고 즐겨보세요',
      onClick: () => navigate('/landing'),
    },
  ];

  return (
    <div className={styles.createQuiz}>
      <h1 className={styles.quizlyTitle}>Quizly</h1>
      <div className={styles.quizTypeContainer}>
        {options.map(({ type, image, description, onClick }) => (
          <div className={styles.quizTypeCard} key={type} onClick={onClick}>
            <h3 className={styles.quizTypeTitle}>{type}</h3>
            <img src={image} alt={`${type}`} className={styles.quizTypeImage} />
            <p className={styles.quizTypeDescription}>{description}</p>
            <div className={styles.cardDecoration}></div>
            <div className={styles.floatingElement}></div>
            <div className={styles.floatingElement}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
