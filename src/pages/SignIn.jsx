import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Title from '../components/common/Text';
import '../../src/styles/formWrapper.css';
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Title align="center" type="title">
        로그인
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="id"
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
          name="pw"
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

        <Button wide={true} round={true}>
          로그인
        </Button>
      </form>
      <Button wide={true} round={true} color="secondary">
        회원가입
      </Button>
    </>
  );
};
export default SignIn;
