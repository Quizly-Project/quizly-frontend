import React from 'react';
import styles from './StudentResult.module.css';

const StudentResults = ({ quizResult, quiz, quizCnt }) => {
  const { answers, correctAnswer, currRank } = quizResult;
  const option = ['무응답', '⭕️', '❌'];
  const getRankSymbol = index => {
    switch (index) {
      case 0:
        return '🥇 ';
      case 1:
        return '🥈 ';
      case 2:
        return '🥉 ';
      default:
        return index + 1;
    }
  };

  Object.keys(answers).forEach(key => {
    const studentData = answers[key];
    studentData.correctCnt = 0;
    studentData.result.forEach((result, idx) => {
      if (result === '1') {
        studentData.correctCnt += 1;
      }
    });
  });

  return (
    <div className={styles.resultsContainer}>
      <h3 className={styles.resultsHeader}>문제: {quiz.question}</h3>
      <p>정답: {option[correctAnswer]}</p>

      <h4 className={styles.studentResultsHeader}>학생별 결과</h4>
      <ul className={styles.studentList}>
        {currRank.map((student, index) => {
          const studentData = answers[student.nickName];
          return (
            <li key={student.nickName} className={styles.studentItem}>
              <span className={styles.studentRank}>{getRankSymbol(index)}</span>
              <span className={styles.studentName}>{student.nickName}</span>
              <span className={styles.studentAnswers}>
                {studentData.correctCnt}/{quizCnt}
              </span>
              <span className={styles.studentScore}>{student.totalScore}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StudentResults;
