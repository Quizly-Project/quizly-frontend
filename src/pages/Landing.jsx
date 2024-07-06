import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputField from '../components/common/InputField/InputField';
import Button from '../components/common/Button/Button';
import Text from '../components/common/Text/Text';

const Landing = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    navigate(`/game/${data.code}`);
  };
  return (
    <div>
      <Text type="title" weight="bold" size="large" align="center">
        방 코드 입력
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="code"
          type="text"
          {...register('code', {
            required: '방 코드를 입력해주세요.',
          })}
          errors={errors}
          placeholder="방 코드를 입력하세요"
          round={true}
        />
        <Button type="submit" size="large" wide={true} round={true}>
          입장하기
        </Button>
      </form>
    </div>
  );
};

export default Landing;
