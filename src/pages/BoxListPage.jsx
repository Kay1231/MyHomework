import React, { useState, useEffect } from 'react';
import BoxCard from '../components/BoxCard';
import { box } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function BoxListPage() {
  const [boxes, setBoxes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBoxes = async () => {
      const res = await box.getAll();
      setBoxes(res.data);
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