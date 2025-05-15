import { lazy } from 'react';

import type { RouteConfig } from './types';

// 使用React.lazy进行代码分割
const Dashboard = lazy(() => import('@/pages/dashboard'));

// 导入Dashboard子页面组件
export default {
  name: '仪表盘',
  path: '/dashboard/*',
  component: Dashboard,
  meta: {
    title: '仪表盘 - React TypeScript模板',
  },
} as RouteConfig;
