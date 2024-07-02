import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useAuthStore from '../../../store/authStore.js';
import OXQuizForm from '../OXQuizForm/OXQuizForm.jsx';
import MultipleChoiceQuizForm from '../MultipleChoiceQuizForm/MultipleChoiceQuizForm.jsx';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/Button.jsx';
import styles from './MultipleChoiceForm.module.css';
import Select from '../Select/Select.jsx';

const MultipleChoiceForm = () => {
  const user = useAuthStore(state => state.user);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizTitle: '',
      description: '',
      creator: '',
      quizzes: [
        {
          type: '1',
          question: '',
          correctAnswer: '0',
          score: '30',
          time: '15',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quizzes',
  });

  const onSubmit = data => {
    console.log(data); // 폼 제출 시 처리할 로직
    const formattedData = {
      ...data,
      creator: user.id,
      quizzes: data.quizzes.map(quiz => {
        if (quiz.type === '2') {
          const { option1, option2, option3, option4, ...restQuiz } = quiz;
          return {
            ...restQuiz,
            type: String(quiz.type), // Ensure type is a string
            options: [
              { optionText: option1, optionNum: '1' },
              { optionText: option2, optionNum: '2' },
              { optionText: option3, optionNum: '3' },
              { optionText: option4, optionNum: '4' },
            ],
          };
        }
        return quiz;
      }),
    };

    console.log(formattedData);
  };

  const quizOptions = [
    { value: '1', label: 'O/X' },
    { value: '2', label: '4지선다' },
  ];

  const scoreOptions = [
    { value: '10', label: '10점' },
    { value: '20', label: '20점' },
    { value: '30', label: '30점' },
    { value: '40', label: '40점' },
    { value: '50', label: '50점' },
  ];

  const timeOptions = [
    { value: '10', label: '10초' },
    { value: '15', label: '15초' },
    { value: '20', label: '20초' },
    { value: '25', label: '25초' },
    { value: '30', label: '30초' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Quiz title*/}
      <InputField
        label="제목"
        {...register('quizTitle', { required: '퀴즈 제목을 입력해주세요' })}
        errors={errors.quizTitle}
      />
      {/* Quiz description */}
      <InputField
        label="설명"
        {...register('description', { required: '퀴즈 설명을 입력해주세요' })}
        errors={errors.description}
        type="textarea"
      />
      {fields.map((field, index) => (
        <div key={field.id} className={styles.quizForm}>
          <Select
            id={`quizType-${index}`}
            label={`${index + 1}`}
            {...register(`quizzes.${index}.type`, {
              required: '퀴즈 유형을 선택해주세요',
            })}
            error={errors.quizzes?.[index]?.type}
            options={quizOptions}
          />
          {watch(`quizzes.${index}.type`) === '1' ? (
            <OXQuizForm register={register} errors={errors} index={index} />
          ) : (
            <MultipleChoiceQuizForm
              register={register}
              errors={errors}
              index={index}
            />
          )}
          {/* Quiz score */}
          <Select
            id={`score-${index}`}
            label="점수"
            {...register(`quizzes.${index}.score`)}
            error={errors.quizzes?.[index]?.score}
            options={scoreOptions}
          />
          {/* Quiz time */}
          <Select
            id={`time-${index}`}
            label="시간"
            {...register(`quizzes.${index}.time`)}
            error={errors.quizzes?.[index]?.time}
            options={timeOptions}
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
          onClick={() => append({ type: '1' })}
        >
          + 퀴즈 추가
        </Button>
        <Button type="submit">퀴즈 생성</Button>
      </div>
    </form>
  );
};

export default MultipleChoiceForm;
