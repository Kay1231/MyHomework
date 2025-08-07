// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFire, FaStar, FaGift, FaArrowRight } from 'react-icons/fa';
import Header from '../component/Header';
import SearchBar from '../component/SearchBar';
import BlindBoxCard from '../component/BlindBoxCard';
import DrawAnimation from '../component/DrawAnimation';

const Home = () => {
  const [featuredBoxes, setFeaturedBoxes] = useState([]);
  const [popularBoxes, setPopularBoxes] = useState([]);
  const [newBoxes, setNewBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drawing, setDrawing] = useState(false);
  const [drawResult, setDrawResult] = useState(null);

  // 模拟从API获取数据
  useEffect(() => {
    // 模拟API请求延迟
    setTimeout(() => {
      // 模拟数据
      const mockData = [
        {
          id: 1,
          name: '罗小黑盲盒',
          coverImage: 'xiaohei.jpg',
          price: 59.9,
          popularity: 98
        },
        {
          id: 2,
          name: '三丽鸥盲盒',
          coverImage: 'sanliou.jpg',
          price: 69.9,
          popularity: 95
        },
      ];
      
      setFeaturedBoxes(mockData.slice(0, 3));
      setPopularBoxes([...mockData].sort((a, b) => b.popularity - a.popularity).slice(0, 4));
      setNewBoxes([...mockData].reverse().slice(0, 4));
      setIsLoading(false);
    }, 800);
  }, []);

  // 模拟抽盒功能
  const handleDraw = () => {
    setDrawing(true);
    setTimeout(() => {
      const results = [
        "海洋之心项链",
        "星空投影灯",
        "森林精灵挂饰",
        "甜品钥匙扣",
        "赛博机械臂",
        "国风团扇"
      ];
      setDrawResult(results[Math.floor(Math.random() * results.length)]);
      setDrawing(false);
    }, 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* 英雄区域 */}
      <div className="relative bg-gradient-to-r from-purple-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                探索未知惊喜<br />
                <span className="text-pink-400">开启你的盲盒之旅</span>
              </h1>
              <p className="text-xl mb-8 text-purple-200 max-w-lg">
                收集独特珍品，体验开盒的无限乐趣！超过100种主题盲盒等你来发现。
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/blindboxes" 
                  className="px-8 py-4 bg-pink-500 hover:bg-pink-600 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
                >
                  立即探索
                </Link>
                <button 
                  onClick={handleDraw}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full text-lg font-bold border-2 border-white border-dashed transition"
                >
                  试试手气
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                {drawing ? (
                  <DrawAnimation />
                ) : drawResult ? (
                  <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaGift className="text-3xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">恭喜获得!</h3>
                    <p className="text-3xl font-bold text-pink-600 mb-6">{drawResult}</p>
                    <button 
                      onClick={() => setDrawResult(null)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                    >
                      再试一次
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-2xl p-2 rotate-6 transform">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xl font-bold text-gray-800">神秘盲盒</h3>
                          <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-bold">限量版</span>
                        </div>
                        <p className="text-gray-600 mb-4">点击"试试手气"立即体验开盒乐趣</p>
                        <div className="h-2 bg-gray-200 rounded-full mb-4">
                          <div className="h-full bg-pink-500 rounded-full w-3/4"></div>
                        </div>
                        <p className="text-sm text-gray-500">剩余: 124/200</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-pink-500 opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-24 h-24 rounded-full bg-purple-500 opacity-20 animate-ping"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-indigo-500 opacity-30 animate-pulse"></div>
          <div className="absolute bottom-1/3 right-10 w-20 h-20 rounded-full bg-pink-500 opacity-20 animate-ping"></div>
        </div>
      </div>
      
      {/* 召唤行动区域 */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">准备好开启你的盲盒之旅了吗？</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-purple-200">
            加入超过10万盲盒收藏家的行列，探索未知的惊喜，收集独特的珍品！
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/blindboxes" 
              className="px-8 py-4 bg-pink-500 hover:bg-pink-600 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition"
            >
              浏览所有盲盒
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-full text-lg font-bold border-2 border-white border-dashed transition"
            >
              注册新账户
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;