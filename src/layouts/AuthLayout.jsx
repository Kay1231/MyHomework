// src/layouts/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* 顶部导航 */}
      <header className="py-5 px-6">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-indigo-800">盲盒抽盒机</span>
          </Link>
        </div>
      </header>
      
      {/* 主要内容区域 */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* 左侧宣传内容 */}
            <div className="hidden md:block animate-fade-in">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">开启惊喜盲盒之旅</h1>
                <p className="text-gray-600 mb-6">
                  加入盲盒抽盒机，体验无限可能的惊喜时刻。收集稀有物品，与社区分享你的开箱喜悦。
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">海量盲盒选择</h3>
                      <p className="text-gray-600">从动漫手办到潮流饰品，多种主题盲盒等你探索</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">稀有物品收集</h3>
                      <p className="text-gray-600">有机会抽取超稀有隐藏款，提升收藏价值</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">社区互动</h3>
                      <p className="text-gray-600">分享你的开箱体验，查看他人评论</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 盲盒展示图 */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden animate-slide-up delay-100">
                  <div className="pb-[100%] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-300 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden animate-slide-up delay-200">
                  <div className="pb-[100%] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md overflow-hidden animate-slide-up delay-300">
                  <div className="pb-[100%] relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-yellow-300 rounded-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 右侧表单区域 */}
            <div className="animate-fade-in delay-300">
              {children}
            </div>
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="py-6 px-4 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} 盲盒抽盒机 - 开启你的惊喜之旅</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="/terms" className="hover:text-indigo-600">服务条款</Link>
            <Link to="/privacy" className="hover:text-indigo-600">隐私政策</Link>
            <Link to="/contact" className="hover:text-indigo-600">联系我们</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;