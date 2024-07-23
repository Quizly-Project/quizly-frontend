import React, { useEffect } from 'react';
import { Track } from 'livekit-client';
import styles from './ParticipantList.module.css';
import { useLiveKitStore } from '../../../store/liveKitStore';

const ParticipantList = ({
  participants,
  isTeacher,
  onSelectStudent,
  selectedStudent,
}) => {
  const { currentSpeakers } = useLiveKitStore();

  return (
    <div className={styles.participantList}>
      <h3 className={styles.title}>참가자 목록</h3>
      {isTeacher && selectedStudent && (
        <button
          className={styles.resetButton}
          onClick={() => onSelectStudent(null)}
        >
          내 시점으로 돌아가기
        </button>
      )}
      <ul className={styles.list}>
        {participants.map(participant => (
          <li
            key={participant.nickName}
            className={`${styles.participant} ${participant.nickName === selectedStudent ? styles.selected : ''} ${participant.isTeacher ? styles.teacher : ''} ${currentSpeakers.includes(participant.nickName) ? styles.speaking : ''}`}
            onClick={() => isTeacher && onSelectStudent(participant.nickName)}
          >
            <span className={styles.nickname}>{participant.nickName}</span>
            {participant.isTeacher && (
              <span className={styles.teacherBadge}>선생님</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
