import { Html } from '@react-three/drei';
import Text from '../common/Text/Text.jsx';
import '../../styles/game.css';

export default function Question({ quizData }) {
  const question = quizData['question'];

  return (
    <>
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        {question}
      </Text>
    </>
  );
}
