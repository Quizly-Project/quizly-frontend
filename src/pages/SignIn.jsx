import React from 'react';
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
  const login = useAuthStore(state => state.login);

  const onSubmit = data => {
    // 여기서 실제로는 백엔드 API를 호출해야 하지만,
    // 지금은 간단한 검증만 수행합니다.
    if (login(data.username, data.password)) {
      console.log('Login successful');
      navigate('/dashboard');
    } else {
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password',
      });
      setError('password', {
        type: 'manual',
        message: 'Invalid email or password',
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
          name="email"
          type="id"
          className="center"
          placeholder="이메일을 입력하세요."
          {...register('username', {
            required: '이메일을 입력해주세요.',
            // pattern: {
            //   value: /^\S+@\S+$/i,
            //   message: '올바른 이메일 주소를 입력해주세요.',
            // },
          })}
          error={errors.email}
          required="Email is required"
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
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
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
