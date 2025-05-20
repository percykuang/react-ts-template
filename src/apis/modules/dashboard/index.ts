import type { ApiModuleConfig } from '@/apis/createApis';
import type { ApiMethod, ApiResponse } from '@/apis/types';

import type { BookInfo } from './interface';

/**
 * Dashboard 模块 API 接口
 */
export interface DashboardApi {
  // 获取仪表盘数据
  getBooks: ApiMethod<never, never, ApiResponse<{ books: BookInfo[] }>>;
}

// Dashboard模块API配置
const dashboard: ApiModuleConfig<DashboardApi> = {
  // 获取图书数据
  getBooks: {
    url: '/dashboard/books',
    method: 'get',
  },
};

export default dashboard;
