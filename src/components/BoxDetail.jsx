import React from 'react';

export default function BoxDetail({ box }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{box.name}</h2>
      <img 
        src={box.image} 
        alt={box.name} 
        className="w-full max-h-80 object-contain mb-8"
      />
      
      <h3 className="text-xl font-semibold mb-4">包含物品:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {box.items.map(item => (
          <div key={item.id} className="border rounded p-3">
            <img 
              src={item.image || DEFAULT_ITEM_IMAGE} 
              alt={item.name} 
              className="w-full h-32 object-contain mb-2"
            />
            <p className="text-center">{item.name}</p>
            <p className="text-center text-sm text-gray-500">
              概率: {(item.probability * 100).toFixed(2)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}