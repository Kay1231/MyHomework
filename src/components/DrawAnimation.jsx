import React, { useState, useEffect, useRef } from 'react';

const DrawAnimation = ({ items, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef(null);
  const speedRef = useRef(80); // 初始速度（毫秒）
  
  // 开始抽盒动画
  const startSpin = () => {
    if (isSpinning || !items || items.length === 0) return;
    
    setIsSpinning(true);
    setResult(null);
    speedRef.current = 80;
    
    // 清除之前的定时器
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    // 开始快速切换物品
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
      speedRef.current += 10; // 逐渐加速
    }, speedRef.current);
    
    // 设置停止时间（3-5秒随机）
    const spinDuration = 3000 + Math.random() * 2000;
    
    setTimeout(() => {
      clearInterval(intervalRef.current);
      slowDown();
    }, spinDuration);
  };
  
  // 减速阶段
  const slowDown = () => {
    const slowInterval = setInterval(() => {
      speedRef.current += 50;
      
      setCurrentIndex(prev => (prev + 1) % items.length);
      
      if (speedRef.current > 500) {
        clearInterval(slowInterval);
        finishSpin();
      }
    }, speedRef.current);
  };
  
  // 结束抽盒
  const finishSpin = () => {
    // 随机选择一个物品
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex];
    
    setResult(selectedItem);
    setIsSpinning(false);
    
    // 短暂延迟后调用完成回调
    setTimeout(() => onFinish(selectedItem), 500);
  };
  
  // 清理定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* 抽盒动画容器 - 简化版 */}
      <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-300">
        {/* 物品展示区域 */}
        <div className="relative h-full w-full flex items-center justify-center">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="max-w-full max-h-full object-contain p-4"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* 抽盒按钮 - 简化版 */}
      <button 
        onClick={startSpin}
        disabled={isSpinning}
        className={`mt-8 px-6 py-3 rounded-md font-medium text-white ${
          isSpinning 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSpinning ? '抽盒中...' : '开始抽盒'}
      </button>
      
      {/* 抽盒结果 - 简化版 */}
      {result && (
        <div className="mt-8 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="text-center mb-3">
            <h3 className="text-lg font-medium text-gray-800">抽中物品</h3>
          </div>
          
          <div className="flex justify-center">
            <img 
              src={result.image} 
              alt={result.name} 
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawAnimation;