import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoxDetail from '../components/BoxDetail';
import { box } from '../services/api';
import CommentSection from '../components/CommentSection';

// 前端预设盲盒详情 - 使用字符串键
const PRESET_BOX_DETAILS = {
  '1': {
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
  '2': {
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
  '3': {
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
};

export default function BoxDetailPage() {
  const { id } = useParams();
  const [boxData, setBoxData] = useState(null); // 统一使用一个状态变量
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usePreset, setUsePreset] = useState(false);

  useEffect(() => {
    const fetchBoxDetail = async () => {
      try {
        setLoading(true);
        const res = await box.getDetail(id);
        
        // 检查API返回的数据结构
        console.log('API响应数据:', res.data);
        
        // 确保数据结构正确
        if (res.data && res.data.items) {
          setBoxData(res.data);
          setError(null);
        } else {
          // API返回了数据但格式不正确
          throw new Error('API返回的数据格式不正确');
        }
      } catch (err) {
        console.error('获取盲盒详情失败:', err);
        
        // 尝试使用前端预设
        const stringId = String(id);
        if (PRESET_BOX_DETAILS[stringId]) {
          setBoxData({
            ...PRESET_BOX_DETAILS[stringId],
            comments: [] // 添加空的评论数组
          });
          setUsePreset(true);
          setError('使用演示数据: ' + err.message);
        } else {
          setError('盲盒详情加载失败: ' + err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoxDetail();
  }, [id]);

  const handleAddComment = async (content) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('请先登录');
      return;
    }
    
    try {
    // 发送评论
    const response = await fetch('http://localhost:7001/api/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: parseInt(userId),
        boxId: parseInt(id),
        content
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      // 将新评论添加到现有评论列表中
      setBoxData(prev => ({
        ...prev,
        comments: [result.data, ...(prev.comments || [])] // 新评论在前
      }));
    } else {
      throw new Error(result.message || '评论提交失败');
    }
  } catch (error) {
    console
.error('提交评论失败:', error);
    setError('评论提交失败: ' + error.message);
  }
};

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">加载盲盒详情...</p>
      </div>
    );
  }

  if (error && !usePreset) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            重试
          </button>
        </div>
      </div>
    );
  }

  if (!boxData) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-xl">未找到盲盒详情</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <BoxDetail box={boxData} />
      
      {/* 评论区域 */}
      <CommentSection 
        comments={boxData.comments || []} 
        onAddComment={handleAddComment} 
      />
    </div>
  );
}