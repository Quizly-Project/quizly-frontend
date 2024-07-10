import React, { useState, useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import styles from './ChatComponent.module.css';

const socket = io('http://localhost:3002');

function ChatComponent({ nickName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetHideTimeout = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleNewMessage = message => {
      setMessages(prevMessages => [...prevMessages, message]);
      setIsExpanded(true);
      resetHideTimeout();
    };

    socket.on('message', handleNewMessage);
    socket.on('user-joined', data =>
      handleNewMessage({ message: data.message, type: 'system' })
    );
    socket.on('user-left', data =>
      handleNewMessage({ message: data.message, type: 'system' })
    );

    return () => {
      socket.off('message');
      socket.off('user-joined');
      socket.off('user-left');
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [resetHideTimeout]);

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    resetHideTimeout();
  }, [resetHideTimeout]);

  const sendMessage = e => {
    e.preventDefault();
    if (inputMessage && nickName) {
      socket.emit('newMessage', { nickname: nickName, message: inputMessage });
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
            <span className={styles.timestamp}>
              {new Date().toLocaleTimeString()}
            </span>
            {msg.type === 'system' ? (
              <span className={styles.systemText}>{msg.message}</span>
            ) : (
              <>
                <span
                  className={`${styles.nickname} ${msg.nickname === nickName ? styles.selfNickname : ''}`}
                >
                  {msg.nickname}
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
