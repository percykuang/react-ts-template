import { Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import type { RouteConfig } from './types';

// 递归生成路由元素
export const generateRouteElements = (routes: RouteConfig[]): React.ReactNode =>
  routes.map((route) => {
    const { path, component: Component, children } = route;

    // 设置页面标题
    if (route.meta?.title) {
      document.title = route.meta.title;
    }

    // 包装组件，添加Suspense
    const element = (
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    );

    // 如果有子路由，递归处理
    if (children && children.length > 0) {
      return (
        <Route key={path} path={path} element={element}>
          {generateRouteElements(children)}
        </Route>
      );
    }

    // 没有子路由的情况
    return <Route key={path} path={path} element={element} />;
  });

// 渲染路由
export const renderRoutes = (routes: RouteConfig[]) => (
  <Routes>{generateRouteElements(routes)}</Routes>
);
