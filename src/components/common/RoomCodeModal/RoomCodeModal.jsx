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
        <Text type="title" weight="bold" size="large">
          퀴즈방 생성 성공!
        </Text>
        <Text size="medium">{code}</Text>
        <div className={styles.buttonContainer}>
          <Button onClick={onMove}>퀴즈방 이동</Button>
          <Button color="secondary" onClick={onClose}>
            방 닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCodeModal;
