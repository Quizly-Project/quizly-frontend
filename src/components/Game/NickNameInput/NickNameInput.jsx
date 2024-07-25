import { useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './NickNameInput.module.css';

const NickNameInput = ({ onClick }) => {
  const [inputNickName, setInputNickName] = useState('');

  // onClick prop이 함수인지 확인하는 방어 코드 추가
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지
    if (typeof onClick === 'function') {
      onClick(inputNickName);
    } else {
      console.error('onClick prop is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputContainer}>
      <input
        className={styles.inputField}
        type="text"
        value={inputNickName}
        onChange={(e) => setInputNickName(e.target.value)}
        placeholder="닉네임을 입력하세요"
      />

      <button type="submit" className={styles.gameButton}>
        게임 시작!
      </button>
    </form>
  );
};

export default NickNameInput;