import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/Button.jsx';
import Text from '../Text/Text.jsx';
import styles from './ShortAnswerForm.module.css';

const ShortAnswerForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizzes: [{ question: '', answer: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quizzes',
  });

  const onSubmit = data => {
    console.log(data); // 여기서 데이터를 처리합니다
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.quizForm}>
          <Text className={`${styles.index}`} weight="bold" size="medium">
            {index + 1}번
          </Text>
          <InputField
            className={styles.question}
            label={`질문`}
            name={`quizzes.${index}.question`}
            placeholder="질문을 입력해주세요"
            error={errors.quizzes?.[index]?.question}
            {...register(`quizzes.${index}.question`, {
              required: '질문을 입력해주세요.',
            })}
          />
          <InputField
            className={styles.answer}
            label={`정답`}
            name={`quizzes.${index}.answer`}
            placeholder="정답을 입력해주세요"
            error={errors.quizzes?.[index]?.answer}
            {...register(`quizzes.${index}.answer`, {
              required: '정답을 입력해주세요.',
            })}
          />
          <Button type="button" color="secondary" onClick={() => remove(index)}>
            - 퀴즈 삭제
          </Button>
        </div>
      ))}
      <div className={styles.buttons}>
        <Button
          type="button"
          color="primary"
          onClick={() => append({ question: '', answer: '' })}
        >
          + 퀴즈 추가
        </Button>
        <Button type="submit">퀴즈 생성</Button>
      </div>
    </form>
  );
};

export default ShortAnswerForm;
