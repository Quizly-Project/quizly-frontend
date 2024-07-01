import React from 'react';
import Select from '../Select/Select';
import InputField from '../InputField/InputField';
import styles from './MultipleChoiceQuizForm.module.css';

const MultipleChoiceQuizForm = ({ register, errors, index }) => {
  const options = [
    { value: '1', label: '1번' },
    { value: '2', label: '2번' },
    { value: '3', label: '3번' },
    { value: '4', label: '4번' },
  ];

  return (
    <div className={styles.formContainer}>
      <div className={styles.inputField}>
        <InputField
          label="질문"
          name={`quizzes.${index}.question`}
          placeholder="질문을 입력해주세요"
          error={errors.quizzes?.[index]?.question}
          {...register(`quizzes.${index}.question`, {
            required: '질문을 입력해주세요.',
          })}
        />
        {[1, 2, 3, 4].map(num => (
          <InputField
            key={num}
            label={`${num}번`}
            name={`quizzes.${index}.option${num}`}
            placeholder={`${num}번 답을 입력해주세요`}
            error={errors.quizzes?.[index]?.[`option${num}`]}
            {...register(`quizzes.${index}.option${num}`, {
              required: '모든 선택지를 입력해주세요.',
            })}
          />
        ))}
      </div>

      <Select
        id={`quizzes.${index}.correctAnswer`}
        label="정답"
        error={errors.quizzes?.[index]?.correctAnswer}
        options={options}
        {...register(`quizzes.${index}.correctAnswer`, {
          required: '정답을 선택해주세요.',
        })}
      />
    </div>
  );
};

export default MultipleChoiceQuizForm;
