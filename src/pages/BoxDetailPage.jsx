import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { box } from '../services/api';

export default function BoxDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boxDetail, setBoxDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoxDetail = async () => {
      try {
        setLoading(true);
        const response = await box.getDetail(id);
        setBoxDetail(response.data);
        setError(null);
      } catch (err) {
        console.error('获取盲盒详情失败:', err);
        setError('获取盲盒详情失败，请稍后再试');
        setBoxDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxDetail();
  }, [id]);

  const handleDraw = () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/box/${id}/draw`);
    } else {
      alert('请先登录');
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-700">加载盲盒详情中...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">错误！</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  if (!boxDetail) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">提示</strong>
          <span className="block sm:inline"> 未找到盲盒信息</span>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg">
      {/* 盲盒头部信息 */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center overflow-hidden">
            {boxDetail.image ? (
              <img 
                src={boxDetail.image} 
                alt={boxDetail.name} 
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-500">盲盒图片</span>
            )}
          </div>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{boxDetail.name}</h1>
          <p className="text-gray-600 mb-4">
            此盲盒包含 {boxDetail.items?.length || 0} 种不同物品，点击下方按钮抽取属于你的惊喜！
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleDraw}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:-translate-y-1"
            >
              立即抽取盲盒
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              返回盲盒列表
            </button>
          </div>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="border-t border-gray-200 my-8"></div>

      {/* 物品列表 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          盲盒包含物品
        </h2>
        
        {boxDetail.items && boxDetail.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boxDetail.items.map((item, index) => (
              <div 
                key={item.id} 
                className={`border rounded-xl overflow-hidden shadow-md transform transition-transform hover:scale-105 ${
                  index === 0 ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' : 'border-gray-200'
                }`}
              >
                <div className="p-4">
                  <div className="bg-gray-100 border-2 border-dashed rounded-lg w-full h-48 flex items-center justify-center mb-4">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">物品图片</span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    {index === 0 && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        稀有物品
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">抽取概率</span>
                    <span className="font-semibold text-indigo-600">
                      {(item.probability * 100).toFixed(2)}%
                    </span>
                  </div>
                  
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${item.probability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-6 text-center">
            <p className="text-gray-600">该盲盒暂无物品信息</p>
          </div>
        )}
      </div>
      
      {/* 底部CTA */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 text-center mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-3">准备好试试手气了吗？</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          每个盲盒都有独特的惊喜，立即抽取属于你的专属物品！
        </p>
        <button
          onClick={handleDraw}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:-translate-y-1 font-bold"
        >
          抽取盲盒
        </button>
      </div>
    </div>
  );
}