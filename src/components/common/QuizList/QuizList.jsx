import QuizCard from '../QuizCard/QuizCard';
import styles from './QuizList.module.css';
const QuizList = ({ quizzes, onClick }) => {
  return (
    <div className={styles.quizGrid}>
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={quiz.quizGroup ? quiz.quizGroup : index}
          title={quiz.quizTitle}
          description={quiz.quizDescription}
          onClick={() => onClick(quiz)}
        />
      ))}
    </div>
  );
};

export default QuizList;
