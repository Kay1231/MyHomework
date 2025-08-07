// src/api/comment.js (前端调用API的封装)
import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'http://your-api-domain.com/api/comments', // 替换为实际API地址
  timeout: 10000,
});

// 添加请求拦截器（用于添加token等）
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 添加响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // 服务器返回错误状态码
      return Promise.reject({
        status: error.response.status,
        message: error.response.data.message || '请求失败'
      });
    } else {
      // 请求未发出或网络错误
      return Promise.reject({
        status: 500,
        message: '网络错误或服务不可用'
      });
    }
  }
);

export const commentApi = {
  // 创建评论
  async createComment(commentData) {
    try {
      const response = await api.post('/', commentData);
      return {
        success: true,
        message: '评论发布成功',
        data: response
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || '评论发布失败',
        status: error.status || 500
      };
    }
  },

  // 获取盲盒评论
  async getBlindBoxComments(blindBoxId, page = 1, limit = 10) {
    try {
      const response = await api.get('/', {
        params: { blindBoxId, page, limit }
      });
      
      return {
        success: true,
        data: {
          list: response.comments,
          pagination: {
            page,
            limit,
            total: response.total,
            totalPages: Math.ceil(response.total / limit)
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || '获取评论列表失败',
        status: error.status || 500
      };
    }
  },

  // 删除评论
  async deleteComment(id) {
    try {
      await api.delete(`/${id}`);
      return {
        success: true,
        message: '评论删除成功'
      };
    } catch (error) {
      if (error.status === 404) {
        return {
          success: false,
          message: '评论不存在'
        };
      }
      return {
        success: false,
        message: error.message || '删除评论失败',
        status: error.status || 500
      };
    }
  }
};

// 使用示例:
// import { commentApi } from '@/api/comment';
//
// 创建评论
// const result = await commentApi.createComment({
//   userId: '123',
//   blindBoxId: '456',
//   content: '测试评论'
// });
//
// 获取评论
// const comments = await commentApi.getBlindBoxComments('456', 1, 10);
//
// 删除评论
// await commentApi.deleteComment('comment-id-123');