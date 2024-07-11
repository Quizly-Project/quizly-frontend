import React from 'react';
import styles from './StudentResult.module.css';

const StudentResults = ({ quizResult }) => {
  const { answers, correctAnswer } = quizResult;
  const option = ['무응답', '⭕️', '❌'];

  // 학생들의 점수를 기준으로 정렬
  const sortedStudents = Object.entries(answers).sort(
    ([, a], [, b]) => b.totalScore - a.totalScore
  );

  const getRankSymbol = index => {
    switch (index) {
      case 0:
        return '🥇 ';
      case 1:
        return '🥈 ';
      case 2:
        return '🥉 ';
      default:
        return '';
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <h3 className={styles.resultsHeader}>퀴즈 결과</h3>
      <p>정답: {option[correctAnswer]}</p>

      <h4 className={styles.studentResultsHeader}>학생별 결과</h4>
      <ul className={styles.studentList}>
        {sortedStudents.map(([studentName, data], index) => (
          <li key={studentName} className={styles.studentItem}>
            <span className={styles.studentRank}>
              {getRankSymbol(index)}
              {index + 1}
            </span>
            <span className={styles.studentName}>{studentName}</span>
            <span className={styles.studentAnswer}>
              {data.result === '0' ? '⭕️' : '❌'}
            </span>
            <span className={styles.studentScore}>{data.totalScore}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentResults;
