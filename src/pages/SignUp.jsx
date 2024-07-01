import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button/Button.jsx';
import InputField from '../components/common/InputField/InputField.jsx';
import Text from '../components/common/Text/Text.jsx';
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Text align="center" type="title">
        회원가입
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="id"
          type="email"
          className="center"
          placeholder="이메일"
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
          name="pw"
          type="password"
          className="center"
          register={register}
          placeholder="비밀번호"
          errors={errors}
          required="Password is required"
          round={true}
          minLength={{
            value: 8,
            message: 'Password must be at least 8 characters',
          }}
        />
        <InputField
          name="check_pw"
          type="password"
          className="center"
          register={register}
          placeholder="비밀번호 확인"
          errors={errors}
          required="Password is required"
          round={true}
          minLength={{
            value: 8,
            message: 'Password must be at least 8 characters',
          }}
        />

        <Button wide={true} round={true}>
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
