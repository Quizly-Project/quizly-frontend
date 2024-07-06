import { Html } from '@react-three/drei';
import Button from '../../components/common/Button/Button.jsx';

export default function QuizStartButton({ toggleQuizStart }) {
  return (
    <Html position={[0, 8, 0]} wrapperClass="label" center>
      <Button
        type="button"
        size="large"
        wide={true}
        round={true}
        onClick={toggleQuizStart}
      >
        퀴즈 시작
      </Button>
    </Html>
  );
}
