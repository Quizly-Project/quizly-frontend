import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizResult } from '../api/axios';
import Button from '../components/common/Button/Button.jsx';

import '../styles/QuizResult.css';

const QuizResult = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await getQuizResult(`${code}`);
        const parsedResults = response.map(item => ({
          ...item,
          selectOption:
            typeof item.selectOption === 'string'
              ? JSON.parse(item.selectOption)
              : item.selectOption,
          result:
            typeof item.result === 'string'
              ? JSON.parse(item.result)
              : item.result,
        }));
        setResults(parsedResults);
        // Trigger animation after a short delay to ensure DOM is ready
        setTimeout(() => setAnimate(true), 100);
      } catch (err) {
        console.error('Failed to fetch or process quiz results:', err);
        setError('Failed to load quiz results. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [code]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const maxScore = Math.max(...results.map(r => r.totalScore), 1);

  return (
    <>
      <div className="quiz-result">
        <h1 className="title">퀴즈 결과</h1>

        <div className="chart">
          {results.map((info, index) => (
            <div key={info.stuId} className="bar-container">
              <span className="score">{info.totalScore}</span>
              <div
                className={`bar ${animate ? 'animate' : ''}`}
                style={{
                  '--final-height': `${(info.totalScore / maxScore) * 100}%`,
                }}
              ></div>
              <span className="name">{info.nickName}</span>
            </div>
          ))}
        </div>

        <h2 className="subtitle">상세 결과</h2>
        <div className="result-cards">
          {results.map(info => (
            <div key={info.stuId} className="result-card">
              <h3>{info.nickName}</h3>
              <p className="total-score">총점: {info.totalScore}</p>
              <div className="result-details">
                {info.result.map((result, idx) => (
                  <div key={idx} className="question-result">
                    <span className="question-number">Q{idx + 1}</span>
                    <span
                      className={`user-answer ${result ? 'correct' : 'incorrect'}`}
                    >
                      {info.selectOption[idx]}
                    </span>
                    <span className="correct-answer">
                      정답: {result ? info.selectOption[idx] : '?'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="button-container">
        <Button
          onClick={() => navigate('/dashboard')}
          align="center"
          color="primary"
        >
          홈으로
        </Button>
      </div>
    </>
  );
};

export default QuizResult;
