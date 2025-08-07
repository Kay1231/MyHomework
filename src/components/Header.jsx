// src/components/UI/Header.jsx
import React, { useState } from 'react';
import { FaUser, FaShoppingCart, FaSearch, FaBoxOpen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ user, onLogout, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleSearch = (query) => {
    onSearch(query);
    setIsSearchOpen(false);
    navigate('/search');
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo 和网站名称 */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <FaBoxOpen className="text-2xl text-pink-400" />
              <span className="ml-2 text-xl font-bold tracking-tight">盲盒奇妙屋</span>
            </Link>
          </div>

          {/* 桌面导航菜单 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-pink-300 transition">首页</Link>
            <Link to="/blindboxes" className="hover:text-pink-300 transition">盲盒列表</Link>
            <Link to="/orders" className="hover:text-pink-300 transition">我的订单</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-1 rounded-lg transition">
                管理后台
              </Link>
            )}
          </nav>

          {/* 右侧功能按钮 */}
          <div className="flex items-center space-x-4">
            {/* 搜索按钮 */}
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-indigo-700 transition"
              aria-label="搜索"
            >
              <FaSearch className="text-lg" />
            </button>

            {/* 购物车按钮 */}
            <Link to="/cart" className="p-2 rounded-full hover:bg-indigo-700 transition relative">
              <FaShoppingCart className="text-lg" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* 用户区域 */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleMenu}
                  className="flex items-center space-x-2 group"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                    <FaUser className="text-indigo-800" />
                  </div>
                  <span className="hidden md:inline font-medium">{user.username}</span>
                </button>

                {/* 用户下拉菜单 */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 hover:bg-indigo-50 transition"
                      onClick={toggleMenu}
                    >
                      个人资料
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 hover:bg-indigo-50 transition"
                      onClick={toggleMenu}
                    >
                      我的订单
                    </Link>
                    {user.isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 hover:bg-indigo-50 transition"
                        onClick={toggleMenu}
                      >
                        管理后台
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        onLogout();
                        toggleMenu();
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 transition"
                    >
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
                >
                  登录
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition hidden md:block"
                >
                  注册
                </Link>
              </div>
            )}

            {/* 移动端菜单按钮 */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-indigo-700 transition"
            >
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white mb-1.5"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                onClick={toggleMenu}
              >
                首页
              </Link>
              <Link 
                to="/blindboxes" 
                className="py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                onClick={toggleMenu}
              >
                盲盒列表
              </Link>
              <Link 
                to="/orders" 
                className="py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                onClick={toggleMenu}
              >
                我的订单
              </Link>
              {user?.isAdmin && (
                <Link 
                  to="/admin" 
                  className="py-2 px-4 rounded-lg bg-yellow-500 text-gray-900 hover:bg-yellow-600 transition"
                  onClick={toggleMenu}
                >
                  管理后台
                </Link>
              )}
              {!user && (
                <div className="flex space-x-3 pt-2">
                  <Link 
                    to="/login" 
                    className="flex-1 py-2 text-center rounded-lg bg-white/20 hover:bg-white/30 transition"
                    onClick={toggleMenu}
                  >
                    登录
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex-1 py-2 text-center rounded-lg bg-pink-500 hover:bg-pink-600 transition"
                    onClick={toggleMenu}
                  >
                    注册
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* 搜索栏 */}
      {isSearchOpen && (
        <div className="container mx-auto px-4 py-3 bg-indigo-900">
          <SearchBar onSearch={handleSearch} autoFocus={true} />
        </div>
      )}
    </header>
  );
};

export default Header;