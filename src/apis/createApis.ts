import type { ApiConfig } from '@/http';
import { request } from '@/http';

// API模块配置类型 - 泛型版本
export type ApiModuleConfig<T = Record<string, any>> = {
  [K in keyof T]?: ApiConfig;
};

// API模块类型 - 泛型版本，用于生成具体的API模块
type ApiModuleType<T> = {
  [K in keyof T]: T[K];
};

/**
 * 生成API模块
 * @param config API模块配置
 * @returns API模块
 */
const createApiModule = <T>(config: ApiModuleConfig<T>): ApiModuleType<T> => {
  const apiModule = {} as ApiModuleType<T>;

  // 遍历配置，为每个API创建请求函数
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      const apiConfig = config[key];

      // 确保apiConfig存在
      if (apiConfig) {
        // 创建请求函数，保留泛型参数的类型信息
        apiModule[key as keyof T] = ((options = {}) =>
          request(apiConfig, options)) as T[typeof key];
      }
    }
  }

  return apiModule;
};

/**
 * 创建API集合
 * @param modules API模块配置集合
 * @returns API集合
 */
export const createApis = <T extends Record<string, any>>(modules: {
  [K in keyof T]: ApiModuleConfig<T[K]>;
}): { [K in keyof T]: ApiModuleType<T[K]> } => {
  // 创建空的API集合
  const apis = {} as { [K in keyof T]: ApiModuleType<T[K]> };

  // 遍历所有模块，动态创建API
  for (const moduleName in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, moduleName)) {
      const moduleConfig = modules[moduleName];
      // 使用类型断言确保类型安全
      apis[moduleName as keyof T] = createApiModule<T[typeof moduleName]>(moduleConfig);
    }
  }

  return apis;
};
