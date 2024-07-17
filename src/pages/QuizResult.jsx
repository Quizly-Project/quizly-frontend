import React, { useState, useEffect } from 'react';
import getQuizResult from '../api/axios.js';
import { useNavigate } from 'react-router-dom';
import styles from './QuizResult.module.css';

const QuizResult = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getQuizResult('quizResult/uYkv').then(res => {
      const parsedResults = res.data.map(item => ({
        ...item,
        selectOption: JSON.parse(item.selectOption),
        result: JSON.parse(item.result),
      }));
      setResults(parsedResults);
    });
  }, []);

  const getOptionDisplay = option => {
    return option === 1 ? 'O' : 'X';
  };

  const getResultDisplay = result => {
    return result === 1 ? (
      <span className={styles['result-icon']}>🟢</span>
    ) : (
      <span className={styles['result-icon']}>🔴</span>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Quiz Results</h1>
      {results.length === 0 ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nickname</th>
                <th>Select Option</th>
                <th>Result</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map(result => (
                <tr key={result.stuId}>
                  <td>{result.nickName}</td>
                  <td>
                    <div className={styles['option-result']}>
                      {result.selectOption.map((option, index) => (
                        <span key={index}>
                          Q{index + 1}: {getOptionDisplay(option)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className={styles['option-result']}>
                      {result.result.map((res, index) => (
                        <span key={index}>
                          Q{index + 1}: {getResultDisplay(res)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{result.totalScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
