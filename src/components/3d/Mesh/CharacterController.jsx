import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import Character from './Character';
import useInputFocusedStore from '../../../store/inputFocusedStore';
import useQuizRoomStore from '../../../store/quizRoomStore';
import spawnLocations from '../../../utils/spawnLocations';
import useSocketStore from '../../../store/socketStore';

const MOVEMENT_SPEED = 500;
const JUMP_FORCE = 5;
const MAX_LINVEL = 5;
const JUMP_LIMIT = 11.8;

const CharacterController = ({
  path,
  matName,
  nickname,
  socket,
  updateClientCoords,
  rank,
  isCorrectAnswerer,
  isStarted,
  clientCoords,
}) => {
  const { isBreak } = useQuizRoomStore(state => state.quizRoom);
  const { isInputChatFocused, isInputGoldenbellFocused } =
    useInputFocusedStore();
  const rigidbody = useRef(); // 움직임 관리
  const character = useRef(); // 각도 회전 관리

  const [subscribeKeys, getKeys] = useKeyboardControls();

  // World Position
  const spawn = useMemo(() => spawnLocations(matName), [matName]);
  const [myPos, setMyPos] = useState(spawn);
  // Action
  const [action, setAction] = useState('Idle_A');
  // Jump only once
  const [isJumped, setIsJumped] = useState(false);

  // 첫 렌더링 시 스폰 위치
  useEffect(() => {
    rigidbody.current.setTranslation(spawn);
    setMyPos(spawn);
  }, [spawn]);

  // 내 위치가 바뀌면 서버에 위치를 전송한다.
  useEffect(() => {
    // console.log(myPos);
    socket.emit('iMove', { nickName: nickname, position: myPos }); // 보내줄 데이터 {nickName, {x, y, z}}
  }, [myPos]);

  useEffect(() => {
    console.log('clientCoords', clientCoords);
  }, [clientCoords]);

  // 임계점 이상일 때만 렌더링한다.
  const detectMovement = useCallback((oldPos, newPos, threshold = 0.3) => {
    return (
      Math.abs(oldPos.x - newPos.x) > threshold ||
      Math.abs(oldPos.y - newPos.y) > threshold ||
      Math.abs(oldPos.z - newPos.z) > threshold
    );
  }, []);

  const handleMovement = useCallback(
    (linvel, impulse) => {
      const { forward, backward, leftward, rightward, jump } = getKeys();

      let newAction = 'Idle_A';
      let changeRotation = false;

      if (forward && linvel.z > -MAX_LINVEL) {
        // newAction = 'Walk';
        impulse.z -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (backward && linvel.z < MAX_LINVEL) {
        // newAction = 'Walk';
        impulse.z += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (leftward && linvel.x > -MAX_LINVEL) {
        // newAction = 'Walk';
        impulse.x -= MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (rightward && linvel.x < MAX_LINVEL) {
        // newAction = 'Walk';
        impulse.x += MOVEMENT_SPEED;
        changeRotation = true;
      }
      if (!isJumped && jump) {
        newAction = 'Jump';
        setIsJumped(true);
        impulse.y += JUMP_FORCE;
      }

      return { newAction, changeRotation, impulse };
    },
    [getKeys, isJumped]
  );

  // 키보드 상하좌우로 움직인다.
  useFrame(() => {
    if (isInputChatFocused || isInputGoldenbellFocused) {
      if (action !== 'Idle_A') setAction('Idle_A');
      return;
    }

    if (!isStarted && isCorrectAnswerer) {
      if (action !== 'Fly') setAction('Fly');
      return;
    }

    const linvel = rigidbody.current.linvel();
    const impulse = { x: 0, y: 0, z: 0 };

    // 움직임 처리
    const {
      newAction,
      changeRotation,
      impulse: newImpulse,
    } = handleMovement(linvel, impulse);

    rigidbody.current.applyImpulse(newImpulse, true);
    const newPos = rigidbody.current.translation();

    // 전역 좌표 업데이트
    if (detectMovement(myPos, newPos)) {
      setMyPos(newPos);
      updateClientCoords(nickname, newPos);
    }

    // 바라보는 방향으로 고개 돌리기
    if (changeRotation) {
      const angle = Math.atan2(newImpulse.x, newImpulse.z);
      character.current.rotation.y = angle;
    }

    // set action
    if (action !== newAction) setAction(newAction);

    // 점프 제한
    if (newPos.y < JUMP_LIMIT) {
      setIsJumped(false);
    }
  });

  const handleCollision = () => {
    console.log('collision', clientCoords, nickname);
    console.log('cc', clientCoords[nickname]);
    const { x, y, z } = clientCoords[nickname];
    rigidbody.current.setTranslation({ x, y, z });
  };

  useEffect(() => {
    if (socket) socket.on('collision', handleCollision);

    return () => {
      socket.off('collision', handleCollision);
    };
  }, []);

  return (
    <>
      <RigidBody
        ref={rigidbody}
        colliders={false}
        canSleep={false}
        enabledRotations={[false, false, false]}
        gravityScale={isBreak ? 20 : 1}
      >
        {/* collider 내 position: 모델으로부터의 상대적 위치 */}
        <CapsuleCollider args={[0.2, 2.2]} position={[0, 1.25, 0]} />
        <group ref={character}>
          {action && (
            <Character
              path={path}
              matName={matName}
              nickname={nickname}
              scale={2}
              actionType={action}
              rank={rank}
            />
          )}
        </group>
      </RigidBody>
    </>
  );
};

export default CharacterController;
