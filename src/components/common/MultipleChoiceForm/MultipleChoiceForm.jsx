import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import OXQuizForm from '../OXQuizForm/OXQuizForm.jsx';
import MultipleChoiceQuizForm from '../MultipleChoiceQuizForm/MultipleChoiceQuizForm.jsx';
import Button from '../Button/Button.jsx';
import styles from './MultipleChoiceForm.module.css';
import Select from '../Select/Select.jsx';

const MultipleChoiceForm = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizzes: [{ type: '1' }], // 초기 퀴즈 하나를 O/X 타입으로 설정
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'quizzes',
  });

  const onSubmit = data => {
    console.log(data); // 폼 제출 시 처리할 로직
  };

  const options = [
    { value: '1', label: 'O/X' },
    { value: '2', label: '4지선다' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id} className={styles.quizForm}>
          <Select
            id={`quizType-${index}`}
            label={`퀴즈 ${index + 1} 유형`}
            {...register(`quizzes.${index}.type`, {
              required: '퀴즈 유형을 선택해주세요',
            })}
            error={errors.quizzes?.[index]?.type}
            options={options}
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
