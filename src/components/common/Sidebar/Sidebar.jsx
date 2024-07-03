import React, { useState } from 'react';
import useAuthStore from '../../../store/authStore';
import styles from './Sidebar.module.css';
import Text from '../Text/Text';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { user, logout } = useAuthStore();
  console.log('user', user);
  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { icon: '📦', text: '둘러보기' },
    { icon: '✏️', text: '퀴즈 만들기' },
    { icon: '🕒', text: '내 퀴즈' },
    { icon: '⚙️', text: '설정' },
    { icon: '🚪', text: '로그아웃', onClick: handleLogout },
  ];

  return (
    <nav className={styles.sidebar}>
      <Text
        className={`${styles.username}`}
        type="title"
        color="white"
        size="large"
        weight="bold"
      >
        {user} 선생님
      </Text>
      <ul className={`${styles.menu}`}>
        {menuItems.map(({ icon, text, onClick }) => (
          <li
            key={text}
            className={`${styles.menuItem} ${activeMenu === text ? styles.active : ''}`}
            onClick={() => {
              setActiveMenu(text);
              onClick && onClick();
            }}
          >
            <span className={`${styles.icon}`} role="img" aria-label={text}>
              {icon}
            </span>
            <Text
              color={activeMenu === text ? 'secondary' : 'white'}
              weight="bold"
            >
              {text}
            </Text>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
