import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PRESET_BOXES = [
  {
    id: 1,
    name: "罗小黑盲盒",
    image: "/xiaohei.jpg",
    items: [
      { id: 101, name: "小黑A", image: "/xiaoheiA.jpg", probability: 0.1 },
      { id: 102, name: "小黑B", image: "/xiaoheiB.jpg", probability: 0.1 },
      { id: 103, name: "小黑C", image: "/xiaoheiC.jpg", probability: 0.4 },
      { id: 104, name: "小黑D", image: "/xiaoheiD.jpg", probability: 0.4 }
    ]
  },
  {
    id: 2,
    name: "三丽鸥盲盒",
    image: "/sanliou.jpg",
    items: [
      { id: 201, name: "玉桂狗", image: "/yuguigou.jpg", probability: 0.05 },
      { id: 202, name: "凯蒂猫", image: "/kitty.jpg", probability: 0.15 },
      { id: 203, name: "帕恰狗", image: "/pacha.jpg", probability: 0.3 },
      { id: 204, name: "库洛米", image: "/kuluomi.jpg", probability: 0.5 }
    ]
  },
  {
    id: 3,
    name: "美食盲盒",
    image: "/meishi.jpg",
    items: [
      { id: 301, name: "烧烤", image: "/shaokao.jpg", probability: 0.05 },
      { id: 302, name: "蛋糕", image: "/dangao.jpg", probability: 0.15 },
      { id: 303, name: "奶茶", image: "/naicha.jpg", probability: 0.3 },
      { id: 304, name: "拉面", image: "/lamian.jpg", probability: 0.5 }
    ]
  }
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInitDatabase = async () => {
    if (!window.confirm('确定要初始化数据库吗？这将覆盖所有现有盲盒数据！')) {
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:7001/api/init/preset-boxes', {
        boxes: PRESET_BOXES
      });
      
      setResult(response.data);
      if (response.data.success) {
        alert('数据库初始化成功！');
      } else {
        alert('初始化失败: ' + response.data.message);
      }
    } catch (error) {
      console.error('初始化失败:', error);
      setResult({
        success: false,
        message: error.response?.data?.message || error.message
      });
      alert('初始化失败: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">数据库管理</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">初始化预设盲盒</h2>
        <p className="mb-4 text-gray-600">
          此操作将使用预设盲盒数据覆盖数据库中的所有盲盒信息。
        </p>
        
        <button
          onClick={handleInitDatabase}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? '初始化中...' : '初始化数据库'}
        </button>
        
        {result && (
          <div className={`mt-4 p-3 rounded ${
            result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {result.message}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}