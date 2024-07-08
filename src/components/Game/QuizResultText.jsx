import { Html } from '@react-three/drei';
import Text from '../common/Text/Text.jsx';
import '../../styles/game.css';

export default function QuizResultText({ quizResult }) {
  console.log(quizResult);
  return (
    <>
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        {quizResult}
      </Text>
    </>
  );
}
