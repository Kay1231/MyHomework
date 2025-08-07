import React, { useState, useEffect } from 'react';
import BoxCard from '../components/BoxCard';
import { box } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PRESET_BOXES = [
  {
    id: 1,
    name: "罗小黑盲盒",
    image: "/xiaohei.jpg",
  },
  {
    id: 2,
    name: "三丽鸥盲盒",
    image: "/sanliou.jpg",
  },
  {
    id: 3,
    name: "美食盲盒",
    image: "/meishi.jpg",
  }
];

export default function BoxListPage() {
  const [boxes, setBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usePreset, setUsePreset] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const res = await box.getAll();
        console
.log('获取盲盒列表:', res.data);
        
        if (res.data && res.data.length > 0) {
          setBoxes(res.data);
        } else {
          // 如果后端返回空，使用前端预设
          setBoxes(PRESET_BOXES);
          setUsePreset(true);
        }
        
        setError(null);
      } catch (err) {
        console
.error('获取盲盒列表失败:', err);
        // API失败时使用前端预设
        setBoxes(PRESET_BOXES);
        setUsePreset(true);
        setError('无法连接服务器，使用演示数据');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoxes();
  }, []);

  const handleDetail = (boxId) => {
    navigate(`/box/${boxId}`);
  };

  const handleDraw = (boxId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/box/${boxId}/draw`);
    } else {
      alert('请先登录');
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">盲盒列表</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map(box => (
          <BoxCard 
            key={box.id} 
            box={box}
            onDetail={handleDetail}
            onDraw={handleDraw}
          />
        ))}
      </div>
    </div>
  );
}