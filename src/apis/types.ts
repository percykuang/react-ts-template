/**
 * API 类型定义
 * 包含通用API类型和具体模块类型
 */
// 导入模块接口
import type { RequestOptions } from '@/http';

/**
 * 通用API方法类型
 * 定义了一个API方法的基本结构
 *
 * @template Params - 请求参数类型
 * @template Data - 请求数据类型
 * @template Response - 响应数据类型
 */
export type ApiMethod<Params = any, Data = any, Response = any> = (
  options?: RequestOptions<Params, Data>
) => Promise<Response>;
