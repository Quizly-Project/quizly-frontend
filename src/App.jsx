import './styles/App.css';
import Button from './components/common/Button';

function App() {
  const handleClick = () => {
    console.log('Button clicked!');
    // 여기에 클릭 시 실행할 로직을 추가하세요
  };
  return (
    <>
      <Button
        onClick={handleClick}
        color="primary"
        size="medium"
        wide={true}
        round={true}
      >
        회원가입
      </Button>
    </>
  );
}

export default App;
