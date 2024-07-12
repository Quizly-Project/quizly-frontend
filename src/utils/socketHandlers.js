import { set } from 'react-hook-form';

export const createSocketHandlers = (
  setClientCoords,
  setQuiz,
  setIsStarted,
  nickname,
  setQuizResult,
  startTimer,
  setIsQuizEnded,
  setParticipants,
  setQuizCnt,
  setQuizIndex,
  isTeacher,
  setAnswer,
  setQuizAnswerer,
  setModel,
  setTexture,
  setClientModels,
  setSpotlight,
  setRank
) => {
  /* ------- Socket events ------- */
  // 기존 접속중인 클라이언트의 위치 저장
  // data: [식별자: {nickName, {x, y, z}}, modelMapping, texture]
  const handleEveryonePosition = data => {
    console.log('everyone pos', data);
    const { userlocations, clientInfo, quizCnt } = data;
    setParticipants(clientInfo);
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
    // 클라이언트가 사용중인 모델 정보 저장
    setClientModels(prevModels => {
      const newModels = { ...prevModels };
      Object.keys(userlocations).forEach(key => {
        const { nickName, modelMapping, texture } = userlocations[key];
        if (nickName !== nickname && nickName !== 'teacher') {
          newModels[nickName] = { modelMapping, texture };
        }
      });

      return newModels;
    });
  };

  // 다른 클라이언트 입장
  // data: {nickName, {0, 0, 0}}
  const handleNewClientPosition = data => {
    console.log('new client pos', data);
    const { clientInfo, userlocations } = data;
    setParticipants(clientInfo);
    setClientCoords(prevCoords => {
      return {
        ...prevCoords,
        [userlocations.nickName]: userlocations.position,
      };
    });
    // 새로운 클라이언트가 사용할 모델 정보 저장
    setClientModels(prevModels => {
      const newModels = { ...prevModels };
      const { userlocations } = data;
      const { nickName, modelMapping, texture } = userlocations;

      newModels[nickName] = { modelMapping, texture };

      return newModels;
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
    setParticipants(clientInfo);
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
    if (!isTeacher) setQuizResult(null);
    setAnswer('');
    setQuizAnswerer('');
  };

  const handleTimerStart = duration => {
    console.log('타이머 시작', duration);
    startTimer(duration);
  };

  const handleTimeOut = data => {
    const options = ['무응답', 'O', 'X', '4'];
    const correct = ['오답', '정답'];
    console.log('타이머 종료', data);

    // spotlight를 켤 영역 찾기
    setSpotlight(data.correctAnswer);

    // 현재 1, 2, 3위 계산
    const topThree = data.currRank.slice(0, 3).map(rank => ({
      nickName: rank.nickName,
      totalScore: rank.totalScore,
    }));

    // 인원수가 1명이나 2명일 경우 예외 처리
    while (topThree.length < 3) {
      topThree.push({ nickName: '', totalScore: 0 });
    }

    setRank(topThree);

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
      // console.log(options[answer]);
      setQuizAnswerer(correctAnswerList);
    }
    setIsStarted(false);
  };

  const handleQuizEnd = data => {
    console.log('퀴즈 종료', data);
    // setQuizResult(data);
    setIsQuizEnded(true);
  };

  const handleSelectModel = data => {
    // console.log('model files', data);
    // console.log(data['name'], data['texture']);
    setModel(data['name']);
    setTexture(data['texture']);
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
    handleSelectModel,
  };
};
