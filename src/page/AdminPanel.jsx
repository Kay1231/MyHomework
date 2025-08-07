// src/pages/AdminPanel.jsx
import React, { useState } from 'react';
import { FaBox, FaUsers, FaChartBar, FaCog, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Header from '../component/Header';
import BlindBoxForm from '../component/BlindBoxForm';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('blindboxes');
  const [showForm, setShowForm] = useState(false);
  const [editingBox, setEditingBox] = useState(null);
  
  // 模拟盲盒数据
  const [blindBoxes, setBlindBoxes] = useState([
    {
      id: 1,
      name: '海洋奇遇盲盒',
      probabilities: [
        { item: '海洋之心项链', chance: 0.05, image: '' },
        { item: '贝壳手链', chance: 0.15, image: '' },
        { item: '海星挂饰', chance: 0.3, image: '' },
        { item: '海螺钥匙扣', chance: 0.5, image: '' },
      ]
    },
    {
      id: 2,
      name: '星空幻想盲盒',
      probabilities: [
        { item: '月球灯', chance: 0.1, image: '' },
        { item: '星星投影仪', chance: 0.2, image: '' },
        { item: '星座项链', chance: 0.3, image: '' },
        { item: '银河手链', chance: 0.4, image: '' },
      ]
    },
    {
      id: 3,
      name: '森林秘境盲盒',
      probabilities: [
        { item: '精灵翅膀', chance: 0.08, image: '' },
        { item: '蘑菇灯', chance: 0.12, image: '' },
        { item: '树叶书签', chance: 0.3, image: '' },
        { item: '橡果挂饰', chance: 0.5, image: '' },
      ]
    }
  ]);
  
  // 模拟用户数据
  const users = [
    { id: 1, username: '盲盒玩家1', email: 'player1@example.com', joinDate: '2023-01-10', orderCount: 12 },
    { id: 2, username: '盲盒玩家2', email: 'player2@example.com', joinDate: '2023-02-15', orderCount: 8 },
    { id: 3, username: '盲盒收藏家', email: 'collector@example.com', joinDate: '2023-03-20', orderCount: 25 },
    { id: 4, username: '新手玩家', email: 'newplayer@example.com', joinDate: '2023-10-01', orderCount: 2 },
  ];
  
  // 模拟统计信息
  const stats = {
    totalUsers: 12580,
    newUsersToday: 42,
    totalBoxes: 28,
    totalOrders: 8942,
    revenue: 562340
  };

  // 处理表单提交
  const handleSubmit = (formData) => {
    if (formData.id) {
      // 更新现有盲盒
      setBlindBoxes(blindBoxes.map(box => 
        box.id === formData.id ? formData : box
      ));
    } else {
      // 添加新盲盒
      const newId = Math.max(...blindBoxes.map(b => b.id), 0) + 1;
      setBlindBoxes([...blindBoxes, { ...formData, id: newId }]);
    }
    setShowForm(false);
    setEditingBox(null);
  };
  
  // 删除盲盒
  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个盲盒吗？此操作不可撤销。')) {
      setBlindBoxes(blindBoxes.filter(box => box.id !== id));
    }
  };
  
  // 编辑盲盒
  const handleEdit = (box) => {
    setEditingBox(box);
    setShowForm(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">管理员面板</h1>
          <p className="text-gray-600">管理盲盒、用户和查看网站数据</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 管理员侧边栏 */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 h-fit">
            {/* 管理员菜单 */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('blindboxes')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'blindboxes' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaBox className="mr-3" /> 盲盒管理
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'users' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaUsers className="mr-3" /> 用户管理
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'stats' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaChartBar className="mr-3" /> 数据统计
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center w-full p-3 rounded-lg transition ${
                  activeTab === 'settings' 
                    ? 'bg-purple-100 text-purple-700 font-bold' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <FaCog className="mr-3" /> 系统设置
              </button>
            </nav>
            
            {/* 添加新盲盒按钮 */}
            <button
              onClick={() => {
                setEditingBox(null);
                setShowForm(true);
              }}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2"
            >
              <FaPlus /> 添加新盲盒
            </button>
          </div>
          
          {/* 内容区域 */}
          <div className="lg:col-span-3">
            {/* 盲盒管理标签页 */}
            {activeTab === 'blindboxes' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">盲盒管理</h2>
                  <p className="text-gray-600">管理所有盲盒，包括添加、编辑和删除</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">盲盒名称</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物品数量</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">概率分布</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {blindBoxes.map(box => (
                        <tr key={box.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{box.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              {box.probabilities.length} 个物品
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs">
                              {box.probabilities.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>{item.item}</span>
                                  <span className="font-medium">{(item.chance * 100).toFixed(1)}%</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(box)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(box.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-500">共 {blindBoxes.length} 个盲盒</p>
                </div>
              </div>
            )}
            
            {/* 用户管理标签页 */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">用户管理</h2>
                  <p className="text-gray-600">管理所有注册用户</p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">加入日期</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">订单数</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{user.username}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{user.joinDate}</td>
                          <td className="px-6 py-4">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                              {user.orderCount} 单
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              查看详情
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                  <p className="text-gray-500">共 {users.length} 个用户</p>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    加载更多
                  </button>
                </div>
              </div>
            )}
            
            {/* 数据统计标签页 */}
            {activeTab === 'stats' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">数据统计</h2>
                  <p className="text-gray-600">网站关键数据指标</p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{stats.totalUsers}</div>
                      <div className="text-gray-700">总用户数</div>
                      <div className="text-sm text-gray-500 mt-1">今日新增: {stats.newUsersToday}</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalBoxes}</div>
                      <div className="text-gray-700">盲盒总数</div>
                      <div className="text-sm text-gray-500 mt-1">8个系列</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                      <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalOrders}</div>
                      <div className="text-gray-700">总订单数</div>
                      <div className="text-sm text-gray-500 mt-1">昨日订单: 124</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">¥{stats.revenue.toLocaleString()}</div>
                      <div className="text-gray-700">总收入</div>
                      <div className="text-sm text-gray-500 mt-1">本月收入: ¥86,540</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold mb-4">热门盲盒排行</h3>
                    <div className="space-y-4">
                      {blindBoxes.map((box, index) => (
                        <div key={box.id} className="flex items-center">
                          <div className="w-10 h-10 flex items-center justify-center bg-purple-100 text-purple-800 rounded-full font-bold mr-4">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{box.name}</div>
                            <div className="text-sm text-gray-500">{(Math.random() * 100 + 500).toFixed(0)}次开盒</div>
                          </div>
                          <div className="text-pink-600 font-bold">
                            ¥{(Math.random() * 100 + 50).toFixed(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4">用户活跃度</h3>
                    <div className="h-64 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
                      用户活跃度图表
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* 系统设置标签页 */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-xl font-bold">系统设置</h2>
                  <p className="text-gray-600">网站全局配置</p>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">网站信息</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 mb-2">网站名称</label>
                        <input
                          type="text"
                          defaultValue="盲盒奇妙屋"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">网站标语</label>
                        <input
                          type="text"
                          defaultValue="探索未知惊喜，开启你的盲盒之旅"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">维护模式</h3>
                    <div className="flex items-center">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-purple-600 focus:ring-purple-500" 
                        />
                        <span className="ml-2">启用维护模式</span>
                      </label>
                      <span className="ml-4 text-sm text-gray-500">启用后普通用户将无法访问网站</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4">通知设置</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-700 mb-2">管理员邮箱</label>
                        <input
                          type="email"
                          defaultValue="admin@blindbox.com"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">新订单通知</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                          <option>实时通知</option>
                          <option>每日汇总</option>
                          <option>不通知</option>
                        </select>
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
      
      {/* 盲盒表单弹窗 */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-3xl">
            <BlindBoxForm 
              initialData={editingBox}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingBox(null);
              }}
            />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AdminPanel;