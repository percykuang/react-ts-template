import React from 'react';

import styles from './styles.module.less';

const Home: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>首页</h1>
    <p className={styles.description}>
      欢迎来到React TypeScript模板项目！这是一个使用React、TypeScript、Webpack和React
      Router构建的项目。
    </p>
  </div>
);

export default Home;
