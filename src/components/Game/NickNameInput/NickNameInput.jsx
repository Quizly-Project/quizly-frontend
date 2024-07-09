import { useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './NickNameInput.module.css';

const NickNameInput = ({ onClick, ...props }) => {
  const [inputNickName, setInputNickName] = useState('');

  // onClick prop이 함수인지 확인하는 방어 코드 추가
  const handleOnClick = () => {
    if (typeof onClick === 'function') {
      onClick(inputNickName);
    } else {
      console.error('onClick prop is not a function');
    }
  };

  return (
    <div className={`${styles.inputContainer} alignCenter`}>
      <input
        type="text"
        value={inputNickName}
        onChange={e => setInputNickName(e.target.value)}
        placeholder="닉네임을 입력하세요"
        className={styles.inputField}
        {...props}
      />
      <button onClick={handleOnClick}>확인</button>
    </div>
  );
};

export default NickNameInput;
