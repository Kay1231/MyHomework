// src/pages/BlindBoxes.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaFilter, FaSort, FaSearch, FaTimes } from 'react-icons/fa';
import Header from '../component/Header';
import BlindBoxCard from '../component/BlindBoxCard';

const BlindBoxes = () => {
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    sort: 'popular'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // 模拟从API获取数据
  useEffect(() => {
    // 模拟API请求延迟
    setTimeout(() => {
      // 模拟数据
      const mockData = [
        { id: 1, name: '海洋奇遇盲盒', category: '动物', price: 59.9, popularity: 98, isNew: true },
        { id: 2, name: '星空幻想盲盒', category: '科幻', price: 69.9, popularity: 95, isNew: false },
        { id: 3, name: '森林秘境盲盒', category: '自然', price: 49.9, popularity: 92, isNew: true },
        { id: 4, name: '甜品物语盲盒', category: '美食', price: 45.9, popularity: 89, isNew: false },
        { id: 5, name: '赛博朋克盲盒', category: '科幻', price: 79.9, popularity: 96, isNew: true },
        { id: 6, name: '国风雅韵盲盒', category: '文化', price: 65.9, popularity: 93, isNew: false },
        { id: 7, name: '萌宠乐园盲盒', category: '动物', price: 55.9, popularity: 90, isNew: true },
        { id: 8, name: '复古时光盲盒', category: '怀旧', price: 62.9, popularity: 87, isNew: false },
        { id: 9, name: '未来战士盲盒', category: '科幻', price: 75.9, popularity: 94, isNew: true },
        { id: 10, name: '节日限定盲盒', category: '节日', price: 58.9, popularity: 91, isNew: false },
        { id: 11, name: '奇幻生物盲盒', category: '幻想', price: 66.9, popularity: 88, isNew: true },
        { id: 12, name: '城市记忆盲盒', category: '旅行', price: 52.9, popularity: 85, isNew: false },
      ];
      
      setBoxes(mockData);
      setFilteredBoxes(mockData);
      setIsLoading(false);
    }, 800);
  }, []);

  // 处理URL参数
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category') || 'all';
    const priceRange = params.get('price') || 'all';
    const sort = params.get('sort') || 'popular';
    const search = params.get('search') || '';
    
    setFilters({ category, priceRange, sort });
    setSearchQuery(search);
    
    // 应用过滤和排序
    applyFilters(category, priceRange, sort, search);
  }, [location.search, boxes]);

  // 应用过滤和排序
  const applyFilters = (category, priceRange, sort, search) => {
    let result = [...boxes];
    
    // 应用搜索过滤
    if (search) {
      result = result.filter(box => 
        box.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // 应用类别过滤
    if (category !== 'all') {
      result = result.filter(box => box.category === category);
    }
    
    // 应用排序
    if (sort === 'popular') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sort === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === 'new') {
      result.sort((a, b) => b.isNew - a.isNew);
    }
    
    setFilteredBoxes(result);
  };

  // 处理过滤变更
  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    // 更新URL参数
    const params = new URLSearchParams();
    if (newFilters.category !== 'all') params.set('category', newFilters.category);
    if (newFilters.priceRange !== 'all') params.set('price', newFilters.priceRange);
    if (newFilters.sort !== 'popular') params.set('sort', newFilters.sort);
    if (searchQuery) params.set('search', searchQuery);
    
    navigate({ search: params.toString() });
  };

  // 处理搜索
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // 更新URL参数
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.priceRange !== 'all') params.set('price', filters.priceRange);
    if (filters.sort !== 'popular') params.set('sort', filters.sort);
    if (query) params.set('search', query);
    
    navigate({ search: params.toString() });
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
      
      {/* 页面标题和搜索 */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
            探索盲盒世界
          </h1>
          
          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="搜索盲盒名称、关键词..."
                className="w-full py-4 px-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg"
              />
              <button className="absolute right-3 top-3.5 bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition">
                <FaSearch />
              </button>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 shadow-sm"
            >
              <FaFilter /> 筛选条件
            </button>
            <button 
              onClick={() => handleFilterChange('sort', filters.sort === 'popular' ? 'new' : 'popular')}
              className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 shadow-sm"
            >
              <FaSort /> {filters.sort === 'popular' ? '按热度' : '按最新'}
            </button>
          </div>
        </div>
      </div>
      
      {/* 筛选面板 */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">筛选条件</h2>
              <button 
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 类别筛选 */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">类别</h3>
                <div className="flex flex-wrap gap-2">
                  {['all', '动物', '科幻', '自然', '美食', '文化', '怀旧', '节日', '幻想', '旅行'].map(category => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('category', category)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.category === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? '全部' : category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 排序方式 */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">排序方式</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'popular', label: '最受欢迎' },
                    { value: 'price-low', label: '价格从低到高' },
                    { value: 'price-high', label: '价格从高到低' },
                    { value: 'new', label: '最新上架' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('sort', option.value)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        filters.sort === option.value
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 盲盒列表 */}
      <div className="container mx-auto px-4 py-12 flex-grow">
        {filteredBoxes.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">没有找到匹配的盲盒</h3>
            <p className="text-gray-500 mb-6">尝试调整筛选条件或搜索关键词</p>
            <button 
              onClick={() => {
                setFilters({ category: 'all', priceRange: 'all', sort: 'popular' });
                setSearchQuery('');
                navigate('/blindboxes');
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              重置筛选条件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBoxes.map(box => (
              <BlindBoxCard 
                key={box.id}
                box={box}
                onDraw={() => console.log(`抽盲盒: ${box.name}`)}
              />
            ))}
          </div>
        )}
        
        {/* 分页控制 */}
        {filteredBoxes.length > 0 && (
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">1</button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">下一页</button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default BlindBoxes;