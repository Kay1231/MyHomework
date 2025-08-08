import React, { useState, useEffect } from 'react';
import BoxCard from '../components/BoxCard';
import { box } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PRESET_BOXES = [
  {
    id: 1,
    name: "罗小黑盲盒",
    image: "/xiaohei.jpg",
  },
  {
    id: 2,
    name: "三丽鸥盲盒",
    image: "/sanliou.jpg",
  },
  {
    id: 3,
    name: "美食盲盒",
    image: "/meishi.jpg",
  }
];

export default function BoxListPage() {
  const [boxes, setBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]); // 添加过滤后的盲盒列表
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usePreset, setUsePreset] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 添加搜索关键词状态
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBoxes = async () => {
      try {
        setLoading(true);
        const res = await box.getAll();
        console.log('获取盲盒列表:', res.data);
        
        if (res.data && res.data.length > 0) {
          setBoxes(res.data);
          setFilteredBoxes(res.data); // 初始化过滤列表
        } else {
          // 如果后端返回空，使用前端预设
          setBoxes(PRESET_BOXES);
          setFilteredBoxes(PRESET_BOXES); // 初始化过滤列表
          setUsePreset(true);
        }
        
        setError(null);
      } catch (err) {
        console.error('获取盲盒列表失败:', err);
        // API失败时使用前端预设
        setBoxes(PRESET_BOXES);
        setFilteredBoxes(PRESET_BOXES); // 初始化过滤列表
        setUsePreset(true);
        setError('无法连接服务器，使用演示数据');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBoxes();
  }, []);

  // 处理搜索输入变化
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    // 如果搜索词为空，显示所有盲盒
    if (!term.trim()) {
      setFilteredBoxes(boxes);
      return;
    }
    
    // 根据关键词过滤盲盒
    const filtered = boxes.filter(box => 
      box.name.toLowerCase().includes(term.toLowerCase())
    );
    
    setFilteredBoxes(filtered);
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchTerm('');
    setFilteredBoxes(boxes);
  };

  const handleDetail = (boxId) => {
    navigate(`/box/${boxId}`);
  };

  const handleDraw = (boxId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      navigate(`/box/${boxId}/draw`);
    } else {
      alert('请先登录');
      navigate('/login');
    }
  };

  // 添加管理员入口函数
  const goToAdminPage = () => {
    navigate('/admin/init');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">盲盒列表</h1>
        
        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索盲盒名称..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载盲盒列表中...</p>
          </div>
        </div>
      ) : (
        <>
          {filteredBoxes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="mt-4">没有找到匹配的盲盒</p>
              </div>
              <button
                onClick={clearSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                查看所有盲盒
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBoxes.map(box => (
                <BoxCard 
                  key={box.id} 
                  box={box}
                  onDetail={handleDetail}
                  onDraw={handleDraw}
                />
              ))}
            </div>
          )}
          
          {searchTerm && filteredBoxes.length > 0 && (
            <div className="mt-4 text-center text-gray-500">
              找到 {filteredBoxes.length} 个匹配的盲盒
            </div>
          )}
        </>
      )}
    </div>
  );
}