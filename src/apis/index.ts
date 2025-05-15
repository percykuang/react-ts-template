import { createApis } from './createApis';
import type { DashboardApi } from './modules';
import { dashboard } from './modules';

// 创建API集合
const apis = createApis<{
  dashboard: DashboardApi;
}>({
  dashboard,
});

// 导出API实例
export default apis;
