import React from 'react';
import styles from './RoomCodeModal.module.css';
import Button from '../Button/Button.jsx';
import Text from '../Text/Text.jsx';

const RoomCodeModal = ({ code, onClose, onMove }) => {
  if (!code) return null;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <Text
          type="title"
          weight="bold"
          size="large"
          align="center"
          color="black"
        >
          퀴즈 방 생성 성공!
        </Text>
        <hr className={styles.divider} />
        <Text
          size="medium"
          align="center"
          color="grey"
          className={styles.codeText}
        >
          {code}
        </Text>
        <div className={styles.buttonContainer}>
          <Button onClick={onMove} color="purple" align="right">
            퀴즈방 이동
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCodeModal;
