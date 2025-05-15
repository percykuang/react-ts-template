import type { ComponentType, LazyExoticComponent } from 'react';

/**
 * 简化的路由配置项接口
 */
export interface RouteConfig {
  // 路由名称
  name: string;
  // 路由路径
  path: string;
  // 路由组件（可以是普通组件或懒加载组件）
  component: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
  // 路由元数据，可以存放任意附加信息
  meta?: Record<string, any>;
  // 子路由
  children?: RouteConfig[];
}

export interface RouterConfigProps {
  routes?: RouteConfig[];
}
