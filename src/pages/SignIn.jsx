import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Text from '../components/common/Text';
import useAuthStore from '../store/authStore';

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
    if (data.email === 'test@example.com' && data.password === 'password123') {
      const userData = { id: 1, email: data.email, name: '디테일' };
      login(userData);
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
          type="email"
          className="center"
          placeholder="이메일을 입력하세요."
          register={register}
          errors={errors}
          required="Email is required"
          round={true}
          pattern={{
            value: /^\S+@\S+$/i,
            message: 'Invalid email address',
          }}
        />
        <InputField
          name="password"
          type="password"
          className="center"
          register={register}
          placeholder="비밀번호를 입력하세요."
          errors={errors}
          required="Password is required"
          round={true}
          minLength={{
            value: 8,
            message: 'Password must be at least 8 characters',
          }}
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
