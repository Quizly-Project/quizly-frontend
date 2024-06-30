import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import Text from '../components/common/Text';

const SignUp = () => {
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
      <Button wide={true} round={true} color="secondary">
        로그인으로 이동
      </Button>
    </>
  );
};
export default SignUp;
