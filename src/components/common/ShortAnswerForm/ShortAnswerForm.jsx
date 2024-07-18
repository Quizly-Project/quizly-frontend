import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/authStore.js';
import InputField from '../InputField/InputField.jsx';
import Button from '../Button/Button.jsx';
import Select from '../Select/Select.jsx';
import Text from '../Text/Text.jsx';
import styles from './ShortAnswerForm.module.css';
import { createQuiz } from '../../../api/axios.js';

const ShortAnswerForm = () => {
  const user = useAuthStore(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizTitle: '',
      description: '',
      creator: '',
      quizzes: [
        {
          question: '',
          correctAnswer: '',
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

  const onSubmit = async data => {
    setIsSubmitting(true);
    const formattedData = {
      ...data,
      creator: user,
      quizzes: data.quizzes.map(quiz => ({
        ...quiz,
        type: '2', // Assuming '2' is the type for short answer questions
      })),
    };
    console.log(formattedData);
    try {
      const result = await createQuiz(formattedData);
      console.log(result);
      navigate('/dashboard'); // Navigate to quiz detail page
    } catch (err) {
      setError(
        err.response?.data?.message ||
          '퀴즈 생성에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <InputField
        label="제목"
        {...register('quizTitle', { required: '퀴즈 제목을 입력해주세요' })}
        errors={errors.quizTitle}
      />
      <InputField
        label="설명"
        {...register('description', { required: '퀴즈 설명을 입력해주세요' })}
        errors={errors.description}
        type="textarea"
      />
      {fields.map((field, index) => (
        <div key={field.id} className={styles.quizForm}>
          <Text className={`${styles.index}`} weight="bold" size="medium">
            {index + 1}번
          </Text>
          <InputField
            className={styles.question}
            label={`질문`}
            {...register(`quizzes.${index}.question`, {
              required: '질문을 입력해주세요.',
            })}
            error={errors.quizzes?.[index]?.question}
            placeholder="질문을 입력해주세요"
          />
          <InputField
            className={styles.answer}
            label={`정답`}
            {...register(`quizzes.${index}.correctAnswer`, {
              required: '정답을 입력해주세요.',
            })}
            error={errors.quizzes?.[index]?.answer}
            placeholder="정답을 입력해주세요"
          />
          <Select
            id={`score-${index}`}
            label="점수"
            {...register(`quizzes.${index}.score`)}
            error={errors.quizzes?.[index]?.score}
            options={scoreOptions}
          />
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
          onClick={() =>
            append({ question: '', answer: '', score: '30', time: '15' })
          }
        >
          + 퀴즈 추가
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '생성 중...' : '퀴즈 생성'}
        </Button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default ShortAnswerForm;
