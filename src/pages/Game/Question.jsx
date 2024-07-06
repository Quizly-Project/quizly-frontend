import { Html } from '@react-three/drei';
import Text from '../../components/common/Text/Text.jsx';
import '../../styles/game.css';

export default function Question({ quizData }) {
  const question = quizData['question'];

  return (
    <Html position={[0, 2, 0]} wrapperClass="question" center>
      <Text
        type="title"
        align="center"
        color="primary"
        size="large"
        weight="normal"
      >
        {question}
      </Text>
    </Html>
  );
}
