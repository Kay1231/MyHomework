import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { getBlindBoxById, drawBlindBox } from '../api/blindbox';
import { commentApi } from '../api/comment';
import LoadingSpinner from './LoadingSpinner';
import DrawAnimation from './DrawAnimation';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const BlindBoxDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [blindBox, setBlindBox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [drawnItem, setDrawnItem] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  
  // 获取盲盒详情
  useEffect(() => {
    const fetchBlindBox = async () => {
      try {
        setLoading(true);
        
        // 获取盲盒详情
        const blindBoxResponse = await getBlindBoxById(id);
        setBlindBox(blindBoxResponse.data);
        
        // 获取评论
        const commentsResponse = await getCommentsByBlindBox(id);
        setComments(commentsResponse.data);
        
        // 检查用户是否已收藏
        if (user) {
          const isLiked = blindBoxResponse.data.likes?.includes(user.id) || false;
          setIsLiked(isLiked);
        }
      } catch (err) {
        setError('获取盲盒详情失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlindBox();
  }, [id, user]);
  
  // 处理抽盒操作
  const handleDraw = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsDrawing(true);
    try {
      const response = await drawBlindBox(blindBox.id);
      setDrawnItem(response.data.data.item);
    } catch (err) {
      setError('抽盒失败，请重试');
    } finally {
      setIsDrawing(false);
    }
  };
  
  // 处理收藏操作
  const handleLikeToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      setIsLiked(!isLiked);
      // 这里实际应该调用API更新收藏状态
      // 为了简化，我们只更新本地状态
    } catch (err) {
      setError('操作失败，请重试');
    }
  };
  
  // 处理评论提交
  const handleCommentSubmit = async (content) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    try {
      // 创建新评论
      const newComment = {
        content,
        blindBoxId: blindBox.id,
        userId: user.id,
        username: user.username
      };
      
      // 实际应该调用API创建评论
      // 这里模拟API响应
      const createdComment = {
        ...newComment,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      // 更新评论列表
      setComments([createdComment, ...comments]);
    } catch (err) {
      setError('评论提交失败');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          返回上一页
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 盲盒基本信息 */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <div className="relative h-96">
              <img 
                className="w-full h-full object-cover"
                src={blindBox.coverImage} 
                alt={blindBox.name} 
              />
              <button
                onClick={handleLikeToggle}
                className={`absolute top-4 right-4 p-2 rounded-full ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/80 text-gray-500 hover:bg-red-100 hover:text-red-500'
                }`}
              >
                {isLiked ? (
                  <HeartIconSolid className="w-6 h-6" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{blindBox.name}</h1>
                <p className="mt-2 text-gray-600">{blindBox.description}</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                {blindBox.items?.length || 0} 种物品
              </div>
            </div>
            
            {/* 抽盒区域 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">立即抽盒</h2>
              <div className="flex justify-center">
                {!isDrawing ? (
                  <button
                    onClick={handleDraw}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
                  >
                    开始抽盒
                  </button>
                ) : (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="mt-2 text-gray-600">抽盒中...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 抽盒结果 */}
      {drawnItem && (
        <div className="max-w-2xl mx-auto mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-300 p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-green-800 text-center mb-6">恭喜获得新物品!</h2>
          <div className="flex flex-col items-center">
            <img 
              src={drawnItem.image} 
              alt={drawnItem.name} 
              className="w-48 h-48 object-contain"
            />
            <div className="mt-6 text-center">
              <p className="text-2xl font-bold">{drawnItem.name}</p>
              <p className="mt-2 text-gray-600">稀有度: <span className="font-semibold text-indigo-600">{drawnItem.rarity}</span></p>
              <p className="text-gray-600">获得概率: <span className="font-semibold text-pink-600">{drawnItem.probability}%</span></p>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setDrawnItem(null)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              继续抽盒
            </button>
            <button
              onClick={() => navigate('/user/orders')}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              查看订单
            </button>
          </div>
        </div>
      )}
      
      {/* 物品列表 */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">包含物品</h2>
          
          {blindBox.items && blindBox.items.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {blindBox.items.map(item => (
                <div 
                  key={item.id} 
                  className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition-shadow"
                >
                  <div className="bg-gray-100 rounded-lg p-2 mb-3">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-24 h-24 object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">概率: {item.probability}%</p>
                    <p className="text-xs px-2 py-1 mt-1 bg-indigo-100 text-indigo-800 rounded-full">
                      {item.rarity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">此盲盒暂无物品信息</p>
            </div>
          )}
        </div>
      </div>
      
      {/* 评论区域 */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">用户评论</h2>
            <span className="text-gray-600">{comments.length} 条评论</span>
          </div>
          
          {/* 评论表单 */}
          <div className="mb-8">
            <CommentForm onSubmit={handleCommentSubmit} />
          </div>
          
          {/* 评论列表 */}
          {comments.length > 0 ? (
            <CommentList comments={comments} />
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">暂无评论，成为第一个评论者吧！</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlindBoxDetail;