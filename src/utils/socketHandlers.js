import { set } from 'react-hook-form';

export const createSocketHandlers = (
  setClientCoords,
  setQuiz,
  setIsStarted,
  nickname,
  setQuizResult,
  setTimer,
  setIsQuizEnded,
  setParticipants,
  setQuizCnt,
  setQuizIndex
) => {
  /* ------- Socket events ------- */
  // 기존 접속중인 클라이언트의 위치 저장
  // data: [식별자: {nickName, {x, y, z}}, ...]
  const handleEveryonePosition = data => {
    console.log('everyone pos', data);
    const { userlocations, clientInfo, quizCnt } = data;
    setParticipants(clientInfo.clientCnt);
    setQuizCnt(quizCnt);
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords }; // clientCoords의 불변성을 지키기 위해 newCoords 사용
      Object.keys(userlocations).forEach(key => {
        const { nickName, position } = userlocations[key];
        if (nickName !== nickname && nickName !== 'teacher') {
          newCoords[nickName] = position;
        }
      });

      return newCoords;
    });
  };

  // 다른 클라이언트 입장ㄱ
  // data: {nickName, {0, 0, 0}}
  const handleNewClientPosition = data => {
    console.log('new client pos', data);
    const { clientInfo, userlocations } = data;
    setParticipants(clientInfo.clientCnt);
    setClientCoords(prevCoords => {
      return {
        ...prevCoords,
        [userlocations.nickName]: userlocations.position,
      };
    });
  };

  // 다른 클라이언트가 이동
  // data: {nickName, {x, y, z}}
  const handleTheyMove = data => {
    // console.log('they move', data);
    setClientCoords(prevCoords => {
      return { ...prevCoords, [data.nickName]: data.position };
    });
  };

  // 다른 클라이언트가 연결 해제
  // data: {nickName}
  const handleSomeoneExit = data => {
    console.log('someone exit', data);
    const { nickName, clientInfo } = data;
    setParticipants(clientInfo.clientCnt);
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords };
      delete newCoords[nickName];
      return newCoords;
    });
  };

  const handleQuiz = data => {
    const { currentQuizIndex, quiz } = data;
    console.log('퀴즈 시작', data);
    setQuiz(quiz);
    setIsStarted(true);
    setQuizIndex(currentQuizIndex + 1);
    setQuizResult(null);
  };

  const handleTimerStart = duration => {
    console.log('타이머 시작', duration);
    setTimer(duration);
    const interval = setInterval(() => {
      console.log('타이머', duration);
      duration--;
      setTimer(duration);
      if (duration <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleTimeOut = data => {
    console.log('타이머 종료', data);
    setIsStarted(false);
    setQuizResult(data);
  };

  const handleQuizEnd = data => {
    console.log('퀴즈 종료', data);
    setQuizResult(data);
    setIsQuizEnded(true);
  };

  return {
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
    handleQuizEnd,
  };
};
