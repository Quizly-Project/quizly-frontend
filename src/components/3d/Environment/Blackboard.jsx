import React, { useEffect, useState, useMemo } from 'react';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';
import useAudioStore from '../../../store/audioStore';
import useQuizRoomStore from '../../../store/quizRoomStore';

export default function Blackboard(props) {
  const { isAnswerDisplayed, type } = useQuizRoomStore(state => state.quizRoom);
  const { startTimer } = useQuizRoomStore();

  const chalkMaterial = useMemo(
    () => ({
      color: '#FFF5C0',
      emissive: '#FFF5C0',
      emissiveIntensity: 1.0,
    }),
    []
  );
  const oMaterial = useMemo(
    () => ({
      color: '#22C514',
      emissive: '#22C514',
      emissiveIntensity: 1.0,
    }),
    []
  );
  const xMaterial = useMemo(
    () => ({
      color: '#7DDA75',
      emissive: '#7DDA75',
      emissiveIntensity: 1.0,
    }),
    []
  );

  const fullText = props.text.question;
  const [displayedText, setDisplayedText] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');

  const {
    initializeWritingSound,
    playWritingSound,
    stopWritingSound,
    initializeRightSound,
    playRightSound,
    stopRightSound,
    initializeWrongSound,
    playWrongSound,
    stopWrongSound,
  } = useAudioStore();

  useEffect(() => {
    console.log('props.text', props.text);
  }, [props.text]);

  useEffect(() => {
    initializeWritingSound();
    initializeRightSound(), initializeWrongSound();
  }, [initializeWritingSound, initializeRightSound, initializeWrongSound]);

  useEffect(() => {
    if (!fullText || isAnswerDisplayed) return;
    let index = 0;
    playWritingSound();
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        stopWritingSound();
        startTimer();
      }
    }, 1500 / fullText.length);

    return () => {
      clearInterval(interval);
      stopWritingSound();
    };
  }, [
    fullText,
    playWritingSound,
    stopWritingSound,
    isAnswerDisplayed,
    startTimer,
  ]);

  const maxLineLength = 20;
  const splitText = (text, maxLength) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });
    if (currentLine.length > 0) {
      lines.push(currentLine.trim());
    }
    return lines;
  };

  const lines = splitText(displayedText, maxLineLength);
  const answerLines = splitText(displayedAnswer, maxLineLength);

  const OX = text => {
    if (text === '1') return 'O';
    if (text === '2') return 'X';
    return text;
  };

  useEffect(() => {
    // console.log('isAnswerDisplayed', isAnswerDisplayed);
    let timer;
    if (isAnswerDisplayed) {
      timer = setTimeout(() => {
        setDisplayedAnswer(props.text.correctAnswer);

        if (props.text.correctAnswer === '1') {
          // 정답: o
          playRightSound();
        } else if (props.text.correctAnswer === '2') {
          // 정답: x
          playWrongSound();
        } else {
          playRightSound();
        }
      }, 1000);
    }

    // Cleanup 함수
    return () => {
      if (timer) clearTimeout(timer);
      setDisplayedAnswer('');
      stopRightSound();
      stopWrongSound();
    };
  }, [
    isAnswerDisplayed,
    props.text.correctAnswer,
    playRightSound,
    playWrongSound,
  ]);
  return (
    <group {...props} dispose={null}>
      {isAnswerDisplayed ? (
        type === 1 ? (
          <>
            {lines.map((line, index) => (
              <Text3D
                key={index}
                scale={15}
                font="/fonts/UhBee_Regular.json"
                position={[-170, 100 - index * 40, -30]}
              >
                {line}
                <meshPhongMaterial attach="material" {...chalkMaterial} />
              </Text3D>
            ))}
            <Text3D
              scale={50}
              font="/fonts/UhBee_Regular.json"
              position={[-20, -20, -30]}
            >
              {OX(displayedAnswer)}
              <meshPhongMaterial
                attach="material"
                {...(displayedAnswer === 'O' ? oMaterial : xMaterial)}
              />
            </Text3D>
          </>
        ) : (
          answerLines.map((line, index) => (
            <Text3D
              key={index}
              scale={15}
              font="/fonts/UhBee_Regular.json"
              position={[-760, 100 - index * 40, -30]}
            >
              {line}
              <meshPhongMaterial attach="material" {...chalkMaterial} />
            </Text3D>
          ))
        )
      ) : (
        lines.map((line, index) => (
          <Text3D
            key={index}
            scale={15}
            font="/fonts/UhBee_Regular.json"
            position={[-170, 100 - index * 40, -30]}
          >
            {line}
            <meshPhongMaterial attach="material" {...chalkMaterial} />
          </Text3D>
        ))
      )}
    </group>
  );
}
