import InputField from '../InputField/InputField';
import Select from '../Select/Select';
import styles from './OXQuizForm.module.css';

const OXQuizForm = ({ register, errors, index }) => {
  const options = [
    { value: 'O', label: 'O' },
    { value: 'X', label: 'X' },
  ];
  return (
    <div className={styles.quiz}>
      <InputField
        label="질문"
        {...register(`quizzes.${index}.question`, {
          required: '질문을 입력해주세요',
        })}
        error={errors.quizzes?.[index]?.question}
      />
      {errors.question && <p>{errors.question.message}</p>}
      <Select
        id="correctAnswer"
        label="정답"
        error={errors.correctAnswer}
        options={options}
        {...register(`quizzes.${index}.correctAnswer`, {
          required: '정답을 선택해주세요.',
        })}
      />
    </div>
  );
};

export default OXQuizForm;
