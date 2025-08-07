import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const OrderCard = ({ order, onToggleFavorite }) => {
  const createdAt = new Date(order.createdAt);
  const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
  const formattedTime = `${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* 盲盒信息 */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={order.blindBox.coverImage} 
                alt={order.blindBox.name} 
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                {order.blindBox.items?.length || 0}种
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-800">{order.blindBox.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{formattedDate} {formattedTime}</p>
              </div>
              
              <button 
                onClick={() => onToggleFavorite(order.id)}
                className="text-red-500 hover:text-red-700"
                aria-label={order.isFavorite ? "取消收藏" : "收藏"}
              >
                {order.isFavorite ? (
                  <HeartSolid className="w-6 h-6" />
                ) : (
                  <HeartOutline className="w-6 h-6" />
                )}
              </button>
            </div>
            
            <div className="mt-3 flex items-center">
              <span className="text-sm text-gray-600 mr-3">抽中物品:</span>
              <div className="flex items-center">
                <img 
                  src={order.item.image} 
                  alt={order.item.name} 
                  className="w-10 h-10 object-cover rounded border border-gray-200"
                />
                <span className="ml-2 font-medium">{order.item.name}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Link 
            to={`/orders/${order.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            查看详情 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;