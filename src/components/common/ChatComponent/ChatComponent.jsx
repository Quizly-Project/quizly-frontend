import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import styles from './ChatComponent.module.css';

function ChatComponent({ roomCode, nickName, setIsChatFocused, isTeacher }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const socket = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setIsChatFocused(false);
    }, 10000);
  }, [setIsChatFocused]);

  useEffect(() => {
    socket.current = io('http://localhost:3002');
    console.log('Connected to socket server');
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;
    if (isTeacher) {
      socket.current.emit('createChatRoom', { roomCode, nickName });
    } else {
      socket.current.emit('joinChatRoom', { roomCode, nickName });
    }
  }, [socket.current]);

  useEffect(() => {
    const handleNewMessage = message => {
      console.log('채팅 왔음:', message);
      setMessages(prevMessages => [...prevMessages, message]);
      if (isExpanded) {
        resetHideTimeout();
      }
    };

    socket.current.on('newMessage', handleNewMessage);
    socket.current.on('user-joined', data =>
      handleNewMessage({ message: data.message, type: 'system' })
    );
    socket.current.on('user-left', data =>
      handleNewMessage({ message: data.message, type: 'system' })
    );

    return () => {
      socket.current.off('newMessage');
      socket.current.off('user-joined');
      socket.current.off('user-left');
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [resetHideTimeout, isExpanded]);

  useEffect(scrollToBottom, [messages]);

  const sendMessage = e => {
    e.preventDefault();
    if (inputMessage && nickName) {
      socket.current.emit('newMessage', {
        nickName,
        message: inputMessage,
        roomCode,
      });
      setInputMessage('');
      setIsExpanded(true);
      resetHideTimeout();
    }
  };

  const toggleExpansion = () => {
    setIsExpanded(prev => !prev);
    if (!isExpanded) {
      resetHideTimeout();
    }
  };

  return (
    <div
      className={`${styles.chatContainer} ${isExpanded ? styles.expanded : styles.collapsed}`}
      onClick={toggleExpansion}
    >
      <div className={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.messageRow} ${msg.type === 'system' ? styles.systemMessage : ''}`}
          >
            {msg.type === 'system' ? (
              <span className={styles.systemText}>{msg.message}</span>
            ) : (
              <>
                <span
                  className={`${styles.nickname} ${msg.nickName === '' ? styles.selfNickname : ''}`}
                >
                  {msg.nickName}
                </span>
                <span className={styles.messageText}>{msg.message}</span>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isExpanded && (
        <form
          onSubmit={sendMessage}
          className={styles.inputForm}
          onClick={e => e.stopPropagation()}
        >
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Type a message"
            className={styles.inputField}
            onFocus={() => setIsChatFocused(true)}
            onBlur={() => setIsChatFocused(false)}
          />
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        </form>
      )}
    </div>
  );
}

export default ChatComponent;
