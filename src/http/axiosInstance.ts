import axios from 'axios';

// 创建共享的axios实例
export const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等认证信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 可以在这里统一处理响应数据
    const res = response.data;
    // 假设后端返回的数据结构为 { code: number, data: any, message: string }
    if (res.code === 0 || res.code === 200) {
      // 修改response.data，保持response的其他属性不变
      response.data = {
        code: res.code,
        data: res.data,
        message: res.message,
      };
      return response.data;
    }
    return Promise.reject(new Error(res.message));
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
