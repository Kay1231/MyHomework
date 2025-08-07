import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { box } from '../services/api';
import DrawResult from '../components/DrawResult';

export default function DrawPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('请先登录');
      navigate('/login');
      return;
    }

    const drawBox = async () => {
      try {
        const res = await box.draw(id, userId);
        setResult(res.data);
      } catch (error) {
        console.error('抽盒失败:', error);
        alert('抽盒失败，请重试');
        navigate('/');
      }
    };

    drawBox();
  }, [id, userId, navigate]);

  if (!result) return <div className="text-center p-8">加载中...</div>;

  return <DrawResult item={result} />;
}