import React, { useState } from 'react';
import styles from './TeacherQuizDashboard.module.css';
import InputField from '../../components/common/InputField/InputField.jsx';
import Button from '../../components/common/Button/Button.jsx';
import Text from '../../components/common/Text/Text.jsx';

const TeacherQuizDashboard = () => {
  const [participants, setParticipants] = useState([
    { id: 1, name: '김현수 1' },
    { id: 2, name: '신동우 2' },
    { id: 3, name: '유영우 3' },
    { id: 4, name: '조재룡 4' },
    { id: 5, name: '황연경 5' },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditName(name);
  };

  const handleSave = id => {
    setParticipants(
      participants.map(p => (p.id === id ? { ...p, name: editName } : p))
    );
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Text type="title" align="center">
          참여 중인 사람
        </Text>
        <div className={styles.participantList}>
          {participants.map(participant => (
            <div key={participant.id} className={styles.participantItem}>
              {editingId === participant.id ? (
                <>
                  <InputField
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                  <div>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => handleSave(participant.id)}
                    >
                      저장
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={handleCancel}
                    >
                      취소
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Text>{participant.name}</Text>
                  <div>
                    <Button
                      type="button"
                      color="secondary"
                      onClick={() =>
                        handleEdit(participant.id, participant.name)
                      }
                    >
                      ✏️
                    </Button>
                    <Button type="button" color="secondary">
                      ❌
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.card} ${styles.quizInfo}`}>
        <Text type="subtitle">퀴즈 제목</Text>
        <Text>
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries.
        </Text>
        <div className={styles.quizCode}>
          <Text>6D01G76</Text>
        </div>
      </div>
      <Button type="button" color="primary" wide={true} round={true}>
        시작
      </Button>
    </div>
  );
};

export default TeacherQuizDashboard;
