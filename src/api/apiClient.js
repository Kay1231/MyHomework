// src/api/apiClient.js

// 基础API客户端类
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.REACT_APP_API_BASE_URL || '/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // 设置认证令牌
  setAuthToken(token) {
    this.authToken = token;
  }

  // 移除认证令牌
  clearAuthToken() {
    this.authToken = null;
  }

  // 构建完整请求URL
  buildURL(endpoint) {
    return `${this.baseURL}${endpoint}`;
  }

  // 构建请求头
  buildHeaders(additionalHeaders = {}) {
    const headers = {
      ...this.defaultHeaders,
      ...additionalHeaders
    };

    // 添加认证令牌
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  // 处理响应
  async handleResponse(response) {
    // 尝试解析响应为JSON
    let data;
    try {
      data = await response.json();
    } catch (error) {
      // 如果响应不是JSON，抛出错误
      throw new Error({
        status: response.status,
        message: `Invalid JSON response: ${await response.text()}`
      });
    }

    // 检查响应状态
    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  // 通用请求方法
  async request(method, endpoint, data = null, headers = {}) {
    const url = this.buildURL(endpoint);
    const options = {
      method,
      headers: this.buildHeaders(headers),
      credentials: 'include', // 包含cookies
    };

    // 添加请求体
    if (data) {
      if (data instanceof FormData) {
        // 如果是FormData，移除Content-Type让浏览器自动设置
        delete options.headers['Content-Type'];
        options.body = data;
      } else {
        options.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(url, options);
      return await this.handleResponse(response);
    } catch (error) {
      console.error(`API Error: ${method} ${endpoint}`, error);
      throw error;
    }
  }

  // GET请求
  get(endpoint, params = {}, headers = {}) {
    // 将参数转换为查询字符串
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request('GET', url, null, headers);
  }

  // POST请求
  post(endpoint, data, headers = {}) {
    return this.request('POST', endpoint, data, headers);
  }

  // PUT请求
  put(endpoint, data, headers = {}) {
    return this.request('PUT', endpoint, data, headers);
  }

  // PATCH请求
  patch(endpoint, data, headers = {}) {
    return this.request('PATCH', endpoint, data, headers);
  }

  // DELETE请求
  delete(endpoint, data = null, headers = {}) {
    return this.request('DELETE', endpoint, data, headers);
  }

  // 文件上传
  upload(endpoint, formData, headers = {}) {
    return this.post(endpoint, formData, headers);
  }
}

// 创建API客户端单例实例
const apiClient = new APIClient();

export default apiClient;

// 在AuthContext中集成API客户端的示例
// 注意：在实际应用中，您需要将API客户端与认证上下文集成