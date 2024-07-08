export const createSocketHandlers = (
  setClientCoords,
  setQuiz,
  setIsStarted,
  nickname,
  setQuizResult
) => {
  /* ------- Socket events ------- */
  // 기존 접속중인 클라이언트의 위치 저장
  // data: [식별자: {nickName, {x, y, z}}, ...]
  const handleEveryonePosition = data => {
    // console.log('everyone pos', data);
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords }; // clientCoords의 불변성을 지키기 위해 newCoords 사용
      Object.keys(data).forEach(key => {
        const { nickName, position } = data[key];
        if (nickName !== nickname && nickName !== 'teacher') {
          newCoords[nickName] = position;
        }
      });

      return newCoords;
    });
  };

  // 다른 클라이언트 입장
  // data: {nickName, {0, 0, 0}}
  const handleNewClientPosition = data => {
    // console.log('new client pos', data);
    setClientCoords(prevCoords => {
      return { ...prevCoords, [data.nickName]: data.position };
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
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords };
      delete newCoords[data];
      return newCoords;
    });
  };

  const handleQuiz = data => {
    console.log('퀴즈 시작', data);
    setQuiz(data);
    setIsStarted(true);
    setQuizResult(null);
  };

  const handleTimerStart = duration => {
    console.log('타이머 시작', duration);
    duration--;
    const interval = setInterval(() => {
      console.log('타이머', duration);
      duration--;
      if (duration < 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleTimeOut = data => {
    console.log('타이머 종료', data);
    setIsStarted(false);
    setQuizResult(data);
  };

  return {
    handleEveryonePosition,
    handleNewClientPosition,
    handleTheyMove,
    handleSomeoneExit,
    handleQuiz,
    handleTimerStart,
    handleTimeOut,
  };
};