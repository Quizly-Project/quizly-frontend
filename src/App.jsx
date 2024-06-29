import { useForm } from 'react-hook-form';
import './styles/App.css';
import InputField from './components/common/InputField';
import Button from './components/common/Button';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="id"
        type="email"
        placeholder="이메일을 입력하세요."
        register={register}
        errors={errors}
        required="Email is required"
        pattern={{
          value: /^\S+@\S+$/i,
          message: 'Invalid email address',
        }}
      />
      <InputField
        name="pw"
        type="password"
        register={register}
        placeholder="비밀번호를 입력하세요."
        errors={errors}
        required="Password is required"
        size="medium"
        round={true}
        minLength={{
          value: 8,
          message: 'Password must be at least 8 characters',
        }}
      />

      <InputField
        name="description"
        placeholder="설명을 입력하세요."
        type="textarea"
        register={register}
        errors={errors}
        size="large"
      />
      <Button wide={true} round={true}>
        로그인
      </Button>
    </form>
  );
}

export default App;
