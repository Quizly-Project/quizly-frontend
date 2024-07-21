import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button/Button.jsx';
import InputField from '../components/common/InputField/InputField.jsx';
import Text from '../components/common/Text/Text.jsx';
import useAuthStore from '../store/authStore.js';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async data => {
    try {
      const success = await login(data.username, data.password);
      if (success) {
        console.log('Login successful');
      } else {
        setError('username', {
          type: 'manual',
          message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.',
        });
        setError('password', {
          type: 'manual',
          message: '유효하지 않은 사용자 이름 또는 비밀번호입니다.',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('username', {
        type: 'manual',
        message: '로그인 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <>
      <Text align="center" type="title">
        로그인
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="username"
          type="text"
          className="center"
          placeholder="사용자 이름을 입력하세요."
          {...register('username', {
            required: '사용자 이름을 입력해주세요.',
          })}
          error={errors.username}
          round={true}
        />
        <InputField
          name="password"
          type="password"
          className="center"
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 4,
              message: '비밀번호는 최소 4자 이상이어야 합니다.',
            },
          })}
          placeholder="비밀번호를 입력하세요."
          error={errors.password}
          round={true}
        />

        <Button wide={true} round={true} type="submit">
          로그인
        </Button>
      </form>
      <Button
        wide={true}
        round={true}
        color="secondary"
        onClick={() => navigate('/signup')}
      >
        회원가입
      </Button>
    </>
  );
};

export default SignIn;
