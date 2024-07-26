export const createSocketHandlers = (
  setClientCoords,
  setQuiz,
  nickname,
  setQuizResult,
  setParticipants,
  setQuizCnt,
  quizCnt,
  setQuizIndex,
  isTeacher,
  setAnswer,
  setQuizAnswerer,
  setModel,
  setTexture,
  setClientModels,
  setSpotlight,
  setRank,
  setIsCorrectAnswerer,
  updateQuizRoom,
  startQuiz,
  endQuiz,
  addParticipant,
  removeParticipant,
  updateParticipantWriteStatus,
  updateParticipantWriteAnswer,
  resetAllParticipantsWriteStatus,
  resetAllParticipantsWriteAnswer,
  activateQuestion,
  deactivateQuestion,
  displayAnswer,
  hideAnswer,
  displayResult,
  hideResult,
  hideTopThree,
  setQuizDuration,
  displayEndEventVisible
) => {
  /* ------- Socket events ------- */
  // 기존 접속중인 클라이언트의 위치 저장
  // data: [식별자: {nickName, {x, y, z}}, modelMapping, texture]
  const handleEveryonePosition = data => {
    // console.log('everyone pos', data);
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

  const dequantize = (value, min, max, bits = 8) => {
    const range = max - min;
    const step = range / (Math.pow(2, bits) - 1);
    return value * step + min;
  };

  const dequantizePosition = (position, bits = 8) => {
    const ranges = {
      x: { min: -100, max: 100 },
      y: { min: -50, max: 50 },
      z: { min: -50, max: 50 },
    };
    return {
      x: dequantize(position.x, ranges.x.min, ranges.x.max, bits),
      y: dequantize(position.y, ranges.y.min, ranges.y.max, bits),
      z: dequantize(position.z, ranges.z.min, ranges.z.max, bits),
    };
  };
  // 다른 클라이언트 입장
  // data: {nickName, {0, 0, 0}}
  const handleNewClientPosition = data => {
    // console.log('new client pos', data);
    const { clientInfo, userlocations } = data;
    setParticipants(clientInfo);
    addParticipant({ nickName: userlocations.nickName, score: 0 });
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

  // 1. render all
  // const handleTheyMove = data => {
  //   // console.log('they move', data);
  //   setClientCoords(prevCoords => {
  //     return { ...prevCoords, [data.nickName]: data.position };
  //   });
  // };

  // 2. 30fps
  const handleTheyMove = data => {
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords };
      Object.entries(data).forEach(([key, value]) => {
        if (value && value.nickName && value.position) {
          newCoords[value.nickName] = dequantizePosition(value.position);
        }
      });
      return newCoords;
    });
  };

  // 다른 클라이언트가 연결 해제
  // data: {nickName}
  const handleSomeoneExit = data => {
    // console.log('someone exit', data);
    const { nickName, clientInfo } = data;
    setParticipants(clientInfo);
    removeParticipant(nickName);
    setClientCoords(prevCoords => {
      const newCoords = { ...prevCoords };
      delete newCoords[nickName];
      return newCoords;
    });
  };

  const handleQuiz = data => {
    // console.log('퀴즈 시작', data);
    const { currentQuizIndex, quiz } = data;
    hideAnswer();
    setQuiz(quiz);
    // console.log('퀴즈quiz', quiz);
    hideTopThree();
    startQuiz();
    activateQuestion();

    setIsCorrectAnswerer(false);
    setQuizIndex(currentQuizIndex + 1);
    setAnswer('');
    setQuizAnswerer('');
    resetAllParticipantsWriteStatus();
    resetAllParticipantsWriteAnswer();
  };

  const handleTimerStart = duration => {
    // console.log('타이머 시작', duration);
    setQuizDuration(duration);
  };

  const handleTimeOut = data => {
    // console.log('타이머 종료', data);
    const options = ['무응답', 'O', 'X', '4'];

    deactivateQuestion();
    displayEndEventVisible();

    setSpotlight(data.correctAnswer);
    setRank(
      data.currRank.slice(0, 3).map(rank => ({
        nickName: rank.nickName,
        totalScore: rank.totalScore,
      }))
    );

    if (isTeacher) {
      const { correctAnswerList } = data;
      setQuizResult(data);
      setQuizAnswerer(correctAnswerList);
    } else {
      const { answer, correctAnswerList } = data;
      setQuizResult(data);
      setAnswer(options[answer]);
      setQuizAnswerer(correctAnswerList);
      setIsCorrectAnswerer(correctAnswerList.includes(nickname));
    }

    if (data.quizEndVal) endQuiz(); // 스토어에 정의된 endQuiz 액션 사용
    // console.log('quizEndVal', data.quizEndVal);
  };

  const handleQuizEnd = data => {
    // console.log('퀴즈 종료', data);
    endQuiz();
  };

  const handleSelectModel = data => {
    // console.log('model files', data, nickname);
    // console.log(data['name'], data['texture']);
    const modelMapping = data['name'];
    const texture = data['texture'];
    setModel(modelMapping);
    setTexture(texture);

    // clientModels에 내 모델-텍스쳐 정보 저장
    setClientModels(prevModels => {
      const newModels = { ...prevModels };

      newModels[nickname] = { modelMapping, texture };

      return newModels;
    });
  };

  const handleUpdateWriteStatus = data => {
    // console.log('write status', data);

    // 객체의 첫 번째 (유일한) 키-값 쌍을 추출
    const [nickName, statusObj] = Object.entries(data)[0];

    if (nickName && statusObj && statusObj.writeStatus) {
      updateParticipantWriteStatus(nickName, statusObj.writeStatus);
      updateParticipantWriteAnswer(nickName, statusObj.userAnswer);
    } else {
      console.error('Invalid data structure for writeStatus update', data);
    }
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
    handleUpdateWriteStatus,
  };
};
