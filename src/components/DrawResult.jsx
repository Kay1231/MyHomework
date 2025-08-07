import React from 'react';

export default function DrawResult({ item }) {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-6">恭喜获得!</h2>
      <div className="max-w-xs mx-auto border-2 border-yellow-500 rounded-lg p-6 bg-yellow-50">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-contain mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold">{item.name}</h3>
      </div>
      <button 
        onClick={() => window.location.href = '/'}
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        返回首页
      </button>
    </div>
  );
}