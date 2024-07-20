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

  const fullText = props.text.question;
  const [displayedText, setDisplayedText] = useState('');
  const [displayedAnswer, setDisplayedAnswer] = useState('');

  const { initializeWritingSound, playWritingSound, stopWritingSound } =
    useAudioStore();

  useEffect(() => {
    console.log('props.text', props.text);
  }, [props.text]);

  useEffect(() => {
    initializeWritingSound();
  }, [initializeWritingSound]);

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

  const maxLineLength = 17;
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

  const OX = text => {
    if (text === '1') return 'O';
    if (text === '2') return 'X';
    return text;
  };

  useEffect(() => {
    console.log('isAnswerDisplayed', isAnswerDisplayed);
    if (isAnswerDisplayed) {
      setDisplayedAnswer(props.text.correctAnswer);
    }
  }, [isAnswerDisplayed, props.text.correctAnswer]);

  return (
    <group {...props} dispose={null}>
      {isAnswerDisplayed ? (
        <Text3D
          scale={30}
          font="/fonts/UhBee_Regular.json"
          position={[-20, -30, 110]}
        >
          {type === 1 ? OX(displayedAnswer) : displayedAnswer}
          <meshPhongMaterial attach="material" {...chalkMaterial} />
        </Text3D>
      ) : (
        lines.map((line, index) => (
          <Text3D
            key={index}
            scale={8}
            font="/fonts/UhBee_Regular.json"
            position={[-80, 10 - index * 22, 93]}
          >
            {line}
            <meshPhongMaterial attach="material" {...chalkMaterial} />
          </Text3D>
        ))
      )}
    </group>
  );
}
