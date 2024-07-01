import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../components/common/InputField/InputField';
import Button from '../components/common/Button/Button';
import Text from '../components/common/Text/Text';
import { log } from 'three/examples/jsm/nodes/Nodes.js';

const Landing = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <Text type="title" weight="bold" size="large" align="center">
        방 코드 입력
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="code"
          register={register}
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
