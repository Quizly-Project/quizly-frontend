import React, { useState, useCallback } from 'react';
import Sidebar from '../common/Sidebar';
import Dashboard from '../../pages/Dashboard';
import SelectCreateQuiz from '../common/SelectCreateQuiz';
import styles from './Layout.module.css';

const Layout = () => {
  const [activeMenu, setActiveMenu] = useState('둘러보기');

  const renderContent = useCallback(() => {
    switch (activeMenu) {
      case '둘러보기':
        return <Dashboard />;
      case '퀴즈 만들기':
        return <SelectCreateQuiz />;
      case '내 퀴즈':
        return <div>내 퀴즈</div>;
      case '설정':
        return <div>설정</div>;
      default:
        return <Dashboard />;
    }
  }, [activeMenu]);
  console.log('activeMenu:', activeMenu);
  return (
    <div className={styles.layout}>
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <main className={styles.mainContent}>{renderContent()}</main>
    </div>
  );
};

export default Layout;
