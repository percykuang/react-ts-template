import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.less';

/**
 * 简化的导航组件，只包含顶部导航栏
 */
const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <div className={styles.navigation}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">React TS Template</Link>
        </div>
        <nav className={styles.navLinks}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          >
            首页
          </Link>
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${location.pathname.includes('/dashboard') ? styles.active : ''}`}
          >
            仪表盘
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
