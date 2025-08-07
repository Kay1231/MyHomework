import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrderHistory } from '../api/order';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import OrderCard from './OrderCard';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'recent', 'favorite'

  // 获取订单历史
  useEffect(() => {
    if (!user) return;
    
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrderHistory();
        setOrders(response.data.orders || []);
      } catch (err) {
        setError('获取订单历史失败，请重试');
        console.error('获取订单历史失败:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [user]);

  // 过滤订单
  const filteredOrders = orders.filter(order => {
    if (filter === 'recent') {
      // 最近30天的订单
      const orderDate = new Date(order.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return orderDate > thirtyDaysAgo;
    }
    if (filter === 'favorite') {
      // 收藏的订单
      return order.isFavorite;
    }
    return true; // 全部订单
  });

  // 切换收藏状态
  const toggleFavorite = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, isFavorite: !order.isFavorite } 
          : order
      )
    );
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">请先登录</h2>
          <p className="text-gray-600 mb-6">登录后查看您的抽盒历史记录</p>
          <a 
            href="/login" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            立即登录
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          重新加载
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">我的抽盒记录</h1>
          <p className="text-gray-600 mt-2">
            查看您的所有抽盒历史，共 {orders.length} 条记录
          </p>
        </div>
        
        {/* 过滤选项 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部记录
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'recent'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            最近30天
          </button>
          <button
            onClick={() => setFilter('favorite')}
            className={`px-4 py-2 rounded-full text-sm ${
              filter === 'favorite'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            收藏记录
          </button>
        </div>
        
        {/* 订单列表 */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={filter === 'favorite' ? "暂无收藏记录" : "暂无抽盒记录"}
            description={filter === 'favorite' 
              ? "您还没有收藏任何抽盒记录" 
              : "您还没有抽盒记录，快去抽取盲盒吧！"}
            actionText="去抽盒"
            actionLink="/blindboxes"
          />
        )}
      </div>
    </div>
  );
};

export default OrderHistory;