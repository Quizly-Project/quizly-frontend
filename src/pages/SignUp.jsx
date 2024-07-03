import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button.jsx';
import InputField from '../components/common/InputField/InputField.jsx';
import Text from '../components/common/Text/Text.jsx';
import useAuthStore from '../store/authStore.js';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const signup = useAuthStore(state => state.signup);

  const onSubmit = async data => {
    console.log(data);
    try {
      const success = await signup(data);
      if (success) {
        navigate('/');
      } else {
        setError('username', {
          type: 'manual',
          message: 'Signup failed. Please try again.',
        });
      }
    } catch (error) {
      setError('username', {
        type: 'manual',
        message: error.message || 'An error occurred during signup.',
      });
    }
  };

  return (
    <>
      <Text align="center" type="title">
        회원가입
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="username"
          type="text"
          className="center"
          placeholder="아이디를 입력하세요."
          {...register('username', {
            required: '아이디를 입력해주세요.',
            minLength: {
              value: 4,
              message: '아이디는 최소 4자 이상이어야 합니다.',
            },
          })}
          error={errors.username}
          round={true}
        />
        <InputField
          name="email"
          type="email"
          className="center"
          placeholder="이메일을 입력하세요."
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^\S+@\S+$/i,
              message: '올바른 이메일 주소를 입력해주세요.',
            },
          })}
          error={errors.email}
          round={true}
        />
        <InputField
          name="password"
          type="password"
          className="center"
          placeholder="비밀번호를 입력하세요."
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
          })}
          error={errors.password}
          round={true}
        />

        <Button wide={true} round={true} type="submit">
          회원가입
        </Button>
      </form>
      <Button
        wide={true}
        round={true}
        color="secondary"
        onClick={() => navigate('/signin')}
      >
        로그인으로 이동
      </Button>
    </>
  );
};

export default SignUp;
