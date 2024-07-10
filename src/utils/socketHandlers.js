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
  setQuizIndex,
  isTeacher,
  setAnswer,
  setQuizAnswerer
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
    setAnswer('');
    setQuizAnswerer('');
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
    const options = ['무응답', 'O', 'X', '4'];
    const correct = ['오답', '정답'];
    console.log('타이머 종료', data);
    if (isTeacher) {
      /*
       * answer: 정답
       * nickName: {
       *    result:[(0:틀림, 1:정답)], // 문제별 정답여부
       *    selectOption:[(0:무효 1~4:선택한 답)], // 문제별 선택한 답
       *    totalScore:0, // 총점
       * }
       */
      setQuizResult(data);
    } else {
      /* answer: 정답
       * userAnwer: 유저 대답(0:무효, 1~4:선택한 답)
       * correntAnswerList: 정답자 리스트
       * nickName: 내이름
       * quizScore: 퀴즈점수
       * result: 정답여부(0:틀림 1:정답)
       * totalScore:내 점수 */

      const { answer, result, totalScore, correctAnswerList } = data;
      setQuizResult(correct[result]);
      setAnswer(options[answer]);
      setQuizAnswerer(correctAnswerList);
    }
    setIsStarted(false);
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
