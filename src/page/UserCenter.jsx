// src/pages/UserCenter.jsx
import React, { useState } from 'react';
import { FaUser, FaBox, FaHistory, FaHeart, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import Header from '../component/Header';

const UserCenter = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState({
    id: 1,
    username: '盲盒玩家',
    email: 'player@example.com',
    avatar: null,
    joinDate: '2023-01-15',
    points: 1280
  });
  
  // 模拟用户订单数据
  const orders = [
    { id: 1, date: '2023-10-15', boxName: '海洋奇遇盲盒', price: 59.9, status: '已完成', items: ['海洋之心项链', '贝壳挂饰'] },
    { id: 2, date: '2023-10-10', boxName: '星空幻想盲盒', price: 69.9, status: '已完成', items: ['星空投影灯', '星座徽章'] },
    { id: 3, date: '2023-10-05', boxName: '森林秘境盲盒', price: 49.9, status: '运输中', items: ['森林精灵挂饰'] },
    { id: 4, date: '2023-09-28', boxName: '甜品物语盲盒', price: 45.9, status: '已完成', items: ['甜甜圈钥匙扣', '冰淇淋挂件'] },
  ];
  
  // 模拟收藏数据
  const favorites = [
    { id: 1, name: '赛博朋克盲盒', price: 79.9, popularity: 96 },
    { id: 2, name: '国风雅韵盲盒', price: 65.9, popularity: 93 },
    { id: 3, name: '萌宠乐园盲盒', price: 55.9, popularity: 90 },
  ];
  
  // 模拟开盒历史
  const history = [
    { id: 1, date: '2023-10-15 14:30', boxName: '海洋奇遇盲盒', item: '海洋之心项链', rarity: '稀有' },
    { id: 2, date: '2023-10-15 14:28', boxName: '海洋奇遇盲盒', item: '贝壳挂饰', rarity: '普通' },
    { id: 3, date: '2023-10-10 10:15', boxName: '星空幻想盲盒', item: '星空投影灯', rarity: '超稀有' },
    { id: 4, date: '2023-10-10 10:12', boxName: '星空幻想盲盒', item: '星座徽章', rarity: '普通' },
    { id: 5, date: '2023-10-05 16:40', boxName: '森林秘境盲盒', item: '森林精灵挂饰', rarity: '稀有' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 用户信息侧边栏 */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-3xl text-gray-500" />
                </div>
                <button className="absolute bottom-2 right-2 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition">
                  <FaEdit size={12} />
                </button>
              </div>
              <h2 className="text-xl font-bold">{user.username}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <div className="mt-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm inline-block">
                会员等级: 黄金会员
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">积分</span>
                <span className="font-bold text-purple-600">{user.points}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">加入日期</span>
                <span className="font-medium">{user.joinDate}</span>
              </div>
            </div>
            
            {/* 用户菜单 */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'orders' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaBox className="mr-3" /> 我的订单
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'history' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaHistory className="mr-3" /> 开盒历史
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'settings' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaCog className="mr-3" /> 账户设置
              </button>
              <button className="flex items-center w-full p-3 rounded-lg text-red-500 hover:bg-red-50 transition">
                <FaSignOutAlt className="mr-3" /> 退出登录
              </button>
            </nav>
          </div>
          
          {/* 内容区域 */}
          <div className="lg:col-span-3">
            {/* 订单标签页 */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">我的订单</h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {orders.map(order => (
                    <div key={order.id} className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-bold">{order.boxName}</h3>
                          <p className="text-gray-500 text-sm">订单日期: {order.date}</p>
                        </div>
                        <div>
                          <span className="font-bold text-pink-600">¥{order.price}</span>
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                            order.status === '已完成' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex -space-x-2 mr-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                          ))}
                        </div>
                        <div>
                          <p className="text-sm">
                            获得物品: {order.items.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          查看详情
                        </button>
                        {order.status === '已完成' && (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                            再次购买
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <p className="text-gray-500">共 {orders.length} 个订单</p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    查看更多历史订单
                  </button>
                </div>
              </div>
            )}
            
            {/* 开盒历史标签页 */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">开盒历史</h2>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {history.map(item => (
                    <div key={item.id} className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
                          <div>
                            <h3 className="font-bold">{item.item}</h3>
                            <p className="text-gray-500 text-sm">来自: {item.boxName}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-500 text-sm">{item.date}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            item.rarity === '超稀有' 
                              ? 'bg-purple-100 text-purple-800' 
                              : item.rarity === '稀有' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.rarity}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                          查看详情
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-center">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    加载更多
                  </button>
                </div>
              </div>
            )}
            
            {/* 设置标签页 */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">账户设置</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">个人信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">用户名</label>
                        <input
                          type="text"
                          value={user.username}
                          onChange={(e) => setUser({...user, username: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">电子邮箱</label>
                        <input
                          type="email"
                          value={user.email}
                          onChange={(e) => setUser({...user, email: e.target.value})}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">修改密码</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">当前密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">新密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">确认新密码</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                      保存设置
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UserCenter;