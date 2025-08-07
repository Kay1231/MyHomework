import React from 'react';

export default function BoxCard({ box, onDetail, onDraw }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={box.image} 
        alt={box.name} 
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h3 className="text-lg font-semibold mb-2">{box.name}</h3>
      <div className="flex justify-between">
        <button 
          onClick={() => onDetail(box.id)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          详情
        </button>
        <button 
          onClick={() => onDraw(box.id)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          抽取
        </button>
      </div>
    </div>
  );
}