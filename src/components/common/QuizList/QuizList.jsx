import QuizCard from '../QuizCard/QuizCard';
import styles from './QuizList.module.css';
const QuizList = ({ quizzes, onClick }) => {
  return (
    <div className={styles.quizGrid}>
      {quizzes.map((quiz, index) => {
        const firstQuiz = quiz.quizs[0];
        if (!firstQuiz) return;
        const type = firstQuiz.type;

        return (
          <QuizCard
            key={quiz.quizGroup ? quiz.quizGroup : index}
            quizType={type}
            title={quiz.quizTitle}
            description={quiz.quizDescription}
            onClick={() => onClick(quiz)}
          />
        );
      })}
    </div>
  );
};

export default QuizList;
