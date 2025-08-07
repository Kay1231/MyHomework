// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// 创建认证上下文
const AuthContext = createContext(null);

// 自定义hook，方便组件访问认证上下文
export const useAuth = () => {
  return useContext(AuthContext);
};

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // 初始化检查用户是否已登录
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        // 解码JWT获取用户信息
        const decoded = jwt_decode(token);
        const user = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          isAdmin: decoded.isAdmin || false
        };
        
        // 检查token是否过期
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          // Token已过期
          localStorage.removeItem('token');
          setCurrentUser(null);
        } else {
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Token解析失败:', error);
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // 模拟API请求函数
  const apiRequest = async (url, method, body) => {
    setAuthError(null);
    
    try {
      const response = await fetch(`/api${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(currentUser && { 'Authorization': `Bearer ${localStorage.getItem('token')}` })
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '请求失败');
      }
      
      return data;
    } catch (error) {
      setAuthError(error.message || '发生未知错误');
      throw error;
    }
  };

  // 用户登录
  const login = async (email, password) => {
    try {
      const data = await apiRequest('/auth/login', 'POST', { email, password });
      
      // 存储token
      localStorage.setItem('token', data.token);
      
      // 解码token获取用户信息
      const decoded = jwt_decode(data.token);
      const user = {
        id: decoded.id,
        username: decoded.username,
        isAdmin: decoded.isAdmin || false
      };
      
      setCurrentUser(user);
      navigate('/');
      return true;
    } catch (error) {
      console.error('登录失败:', error);
      return false;
    }
  };

  // 用户注册
  const register = async (username, email, password) => {
    try {
      const data = await apiRequest('/auth/register', 'POST', { username, email, password });
      
      // 自动登录新注册的用户
      localStorage.setItem('token', data.token);
      
      const decoded = jwt_decode(data.token);
      const user = {
        id: decoded.id,
        username: decoded.username,
        isAdmin: decoded.isAdmin || false
      };
      
      setCurrentUser(user);
      navigate('/');
      return true;
    } catch (error) {
      console.error('注册失败:', error);
      return false;
    }
  };

  // 用户登出
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  // 更新用户信息
  const updateUser = async (userData) => {
    try {
      const data = await apiRequest('/users/me', 'PUT', userData);
      
      // 更新当前用户状态
      setCurrentUser(prev => ({
        ...prev,
        ...data.user
      }));
      
      return true;
    } catch (error) {
      console.error('更新用户信息失败:', error);
      return false;
    }
  };

  // 更新密码
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await apiRequest('/users/update-password', 'POST', { currentPassword, newPassword });
      return true;
    } catch (error) {
      console.error('更新密码失败:', error);
      return false;
    }
  };

  // 检查用户是否是管理员
  const isAdmin = () => {
    return currentUser && currentUser.isAdmin;
  };

  // 提供给上下文的值
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin,
    loading,
    authError,
    login,
    register,
    logout,
    updateUser,
    updatePassword,
    apiRequest
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 受保护路由组件
export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // 用户未登录，重定向到登录页
      navigate('/login');
    } else if (!loading && adminOnly && !isAdmin()) {
      // 需要管理员权限但用户不是管理员
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return isAuthenticated && (!adminOnly || isAdmin()) ? children : null;
};

// 管理员路由组件
export const AdminRoute = ({ children }) => {
  return <ProtectedRoute adminOnly={true}>{children}</ProtectedRoute>;
};