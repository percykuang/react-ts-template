import { lazy } from 'react';

import type { RouteConfig } from './types';

// 使用React.lazy进行代码分割
const Home = lazy(() => import('@/pages/home'));

export default {
  name: '首页',
  path: '/',
  component: Home,
  meta: {
    title: '首页 - React TypeScript模板',
  },
} as RouteConfig;
