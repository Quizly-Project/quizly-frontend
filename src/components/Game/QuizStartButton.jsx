import { Html } from '@react-three/drei';
import Button from '../common/Button/Button.jsx';

export default function QuizStartButton({ toggleQuizStart, children }) {
  return (
    <>
      <Button
        type="button"
        size="large"
        wide={true}
        round={true}
        onClick={toggleQuizStart}
      >
        {children}
      </Button>
    </>
  );
}
