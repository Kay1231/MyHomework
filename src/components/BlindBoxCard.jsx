import React from 'react';
import { Link } from 'react-router-dom';

const BlindBoxCard = ({ blindBox }) => {
  // 添加数据验证
  if (!blindBox || !blindBox.id || !blindBox.coverImage || !blindBox.name) {
    // 返回占位符而不是完整卡片
    return (
      <div className="group relative block rounded-xl overflow-hidden">
        <div className="relative aspect-square bg-gray-200 rounded-xl animate-pulse" />
        <div className="mt-3">
          <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={`/blindboxes/${blindBox.id}`}
      className="group relative block rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img
          src={blindBox.coverImage}
          alt={blindBox.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-image.jpg'; // 添加错误处理
          }}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white px-4 py-2 rounded-full font-medium text-indigo-600 shadow-md">
            查看详情
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="text-lg font-bold text-gray-800 text-center group-hover:text-indigo-600 transition-colors">
          {blindBox.name}
        </h3>
      </div>
    </Link>
  );
};

export default React.memo(BlindBoxCard);