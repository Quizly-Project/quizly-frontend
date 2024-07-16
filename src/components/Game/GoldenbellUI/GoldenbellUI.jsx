import { useState } from 'react';
import useInputFocusedStore from '../../../store/inputFocusedStore';
import useSocketStore from '../../../store/socketStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

import styles from './GoldenbellUI.module.css';

const GoldenbellUI = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const { setIsInputGoldenbellFocused } = useInputFocusedStore();
  const { socket, isConnected } = useSocketStore();
  const { roomCode, nickName } = useQuizRoomStore(state => state.quizRoom);
  const sendMessage = e => {
    e.preventDefault();
    if (inputMessage && isConnected) {
      socket.emit('submitAnswer', { roomCode, answer: inputMessage, nickName });
      setIsInputGoldenbellFocused(false);
      setIsDisabled(true);
    }
  };

  const handleFocus = () => {
    socket.emit('isWriting', { roomCode, nickName });
    setIsInputGoldenbellFocused(true);
  };

  const handleBlur = () => {
    setIsInputGoldenbellFocused(false);
  };

  return (
    <form
      onSubmit={sendMessage}
      className={styles['input-container']}
      onClick={e => e.stopPropagation()}
    >
      <input
        type="text"
        value={inputMessage}
        onChange={e => setInputMessage(e.target.value)}
        placeholder={isDisabled ? `${inputMessage}` : '정답을 입력해주세요'}
        className={styles['answer-input']}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={isDisabled}
      />
      <button
        type="submit"
        className={`${styles['submit-btn']} ${isDisabled && styles.disabled}`}
        disabled={isDisabled}
      >
        {isDisabled ? '제출완료' : '제출'}
      </button>
    </form>
  );
};

export default GoldenbellUI;
