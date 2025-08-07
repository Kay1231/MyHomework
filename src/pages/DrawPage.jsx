import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { box } from '../services/api';
import DrawResult from '../components/DrawResult';
import LoadingSpinner from '../components/LoadingSpinner'; // 需要创建这个组件

const PRESET_DRAW_RESULTS = {
  '1': [
    { id: 101, name: "小黑A", image: "/xiaoheiA.jpg" },
      { id: 102, name: "小黑B", image: "/xiaoheiB.jpg" },
      { id: 103, name: "小黑C", image: "/xiaoheiC.jpg" },
      { id: 104, name: "小黑D", image: "/xiaoheiD.jpg" }
  ],
  '2': [
    { id: 201, name: "玉桂狗", image: "/yuguigou.jpg" },
      { id: 202, name: "凯蒂猫", image: "/kitty.jpg" },
      { id: 203, name: "帕恰狗", image: "/pacha.jpg" },
      { id: 204, name: "库洛米", image: "/kuluomi.jpg" }
  ],
  '3': [
    { id: 301, name: "烧烤", image: "/shaokao.jpg" },
      { id: 302, name: "蛋糕", image: "/dangao.jpg" },
      { id: 303, name: "奶茶", image: "/naicha.jpg" },
      { id: 304, name: "拉面", image: "/lamian.jpg" }
  ]
};

export default function DrawPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); // 添加加载状态
  const [error, setError] = useState(null); // 添加错误状态
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('请先登录');
      navigate('/login');
      return;
    }

    const drawBox = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 尝试真实API调用
        const res = await box.draw(id, userId);
        setResult(res.data);
      } catch (err) {
        console.error('抽盒失败:', err);
        
        // 如果API失败，使用预设数据
        const presetItems = PRESET_DRAW_RESULTS[id] || [];
        
        if (presetItems.length > 0) {
          const randomIndex = Math.floor(Math.random() * presetItems.length);
          const fakeResult = presetItems[randomIndex];
          
          console.warn('使用预设抽取结果:', fakeResult);
          setResult(fakeResult);
        } else {
          setError(`抽盒失败: ${err.message || '未知错误'}`);
        }
      } finally {
        setLoading(false); // 确保加载状态更新
      }
    };

    drawBox();
  }, [id, userId, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">正在抽取盲盒...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h3 className="font-bold text-lg mb-2">抽盒失败</h3>
          <p>{error}</p>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            返回首页
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            重新抽取
          </button>
        </div>
      </div>
    );
  }

  return result ? <DrawResult item={result} /> : null;
}