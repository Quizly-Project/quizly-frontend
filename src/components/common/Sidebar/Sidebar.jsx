import React from 'react';
import useAuthStore from '../../../store/authStore';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { user, logout } = useAuthStore();
  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { icon: '🗂️', text: '둘러보기' },
    { icon: '✏️', text: '퀴즈 만들기' },
    { icon: '📔', text: '내 퀴즈' },
    { icon: '🚪', text: '로그아웃', onClick: handleLogout },
  ];

  return (
    <nav className={styles.sidebar}>
      <div className={styles.userInfo}>
      
        <h2 className={styles.username}>{user} 선생님</h2>
      </div>
      <ul className={styles.menu}>
        {menuItems.map(({ icon, text, onClick }) => (
          <li
            key={text}
            className={`${styles.menuItem} ${activeMenu === text ? styles.active : ''}`}
            onClick={() => {
              setActiveMenu(text);
              onClick && onClick();
            }}
          >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.text}>{text}</span>
          </li>
        ))}
      </ul>
      <div className={styles.cardDecoration}></div>
      <div className={styles.floatingElement}></div>
      <div className={styles.floatingElement}></div>
      <div className={styles.floatingElement}></div>
    </nav>
  );
};

export default Sidebar;
