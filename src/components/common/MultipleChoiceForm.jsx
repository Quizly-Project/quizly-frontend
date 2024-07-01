import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputField from './InputField';
import Button from './Button';

const MultipleChoiceForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quizType: '1', // 기본값을 'O/X'로 설정
    },
  });

  const quizType = watch('quizType'); // 선택된 퀴즈 타입을 실시간으로 관찰

  const onSubmit = data => {
    console.log(data); // 폼 제출 시 처리할 로직
  };

  useEffect(() => {}, [quizType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register('quizType')}>
        <option value="1">O/X</option>
        <option value="2">4지선다</option>
      </select>

      {quizType === '1' && (
        <div>
          <h3>O/X 문제</h3>
          <input
            {...register('question', { required: '질문을 입력해주세요.' })}
            placeholder="질문"
          />
          {errors.question && <p>{errors.question.message}</p>}
          <div>
            <label>
              <input
                type="radio"
                value="O"
                {...register('answer', { required: '답을 선택해주세요.' })}
              />{' '}
              O
            </label>
            <label>
              <input
                type="radio"
                value="X"
                {...register('answer', { required: '답을 선택해주세요.' })}
              />{' '}
              X
            </label>
          </div>
          {errors.answer && <p>{errors.answer.message}</p>}
        </div>
      )}

      {quizType === '2' && (
        <div>
          <h3>4지선다 문제</h3>
          <input
            {...register('question', { required: '질문을 입력해주세요.' })}
            placeholder="질문"
          />
          {errors.question && <p>{errors.question.message}</p>}
          {[1, 2, 3, 4].map(num => (
            <div key={num}>
              <input
                {...register(`option${num}`, {
                  required: '모든 선택지를 입력해주세요.',
                })}
                placeholder={`선택지 ${num}`}
              />
              {errors[`option${num}`] && (
                <p>{errors[`option${num}`].message}</p>
              )}
            </div>
          ))}
          <select
            {...register('correctAnswer', { required: '정답을 선택해주세요.' })}
          >
            <option value="">정답 선택</option>
            <option value="1">선택지 1</option>
            <option value="2">선택지 2</option>
            <option value="3">선택지 3</option>
            <option value="4">선택지 4</option>
          </select>
          {errors.correctAnswer && <p>{errors.correctAnswer.message}</p>}
        </div>
      )}

      <Button type="submit">퀴즈 만들기</Button>
    </form>
  );
};

export default MultipleChoiceForm;
