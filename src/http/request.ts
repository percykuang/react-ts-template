import type { AxiosRequestConfig } from 'axios';

import axiosInstance from './axiosInstance';

// 在开发环境中，导入mock模块
if (process.env.NODE_ENV !== 'production') {
  // 这里不能使用 import 动态导入，会有延迟问题，导致第一次进入页面时，请求接口失败
  require('../mock');
}

// 请求方法类型
export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

// 接口配置类型
export interface ApiConfig {
  url: string;
  method: RequestMethod;
  // 可以添加其他配置项，如是否需要token等
  requiresAuth?: boolean;
}

// 请求参数类型
export interface RequestOptions<P = any, D = any> {
  params?: P; // 查询参数，用于GET请求
  data?: D; // 请求体数据，用于POST/PUT请求
  headers?: Record<string, string>; // 自定义请求头
  [key: string]: any; // 其他axios配置项
}

// 请求函数
export const request = async <T = any, P = any, D = any>(
  config: ApiConfig,
  options: RequestOptions<P, D> = {}
): Promise<T> => {
  const { url, method } = config;
  const { params, data, ...rest } = options;

  try {
    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      ...rest,
    };

    // 根据请求方法添加参数
    if (params && (method === 'get' || method === 'delete')) {
      axiosConfig.params = params;
    }

    if (data && (method === 'post' || method === 'put')) {
      axiosConfig.data = data;
    }

    const response = await axiosInstance(axiosConfig);
    return response as T;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
