import { useState } from 'react'
import './App.css'
import LoginForm from './component/LoginForm'
import BlindBox from './component/blindbox'

function App() {

  const handleLogin = () => {
    window.location.href = "http://localhost:5173/login";
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* 登录按钮，右上角绝对定位 */}
      <button
        className="absolute top-6 right-8 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow font-semibold transition"
        onClick={handleLogin}
      >
        登录
      </button>
      {/* 盲盒展示，居中排列 */}
      <div className="flex justify-center items-center gap-8 min-h-screen">
        <BlindBox
          image="xiaohei.jpg"
          name="罗小黑战记盲盒"
          onDetail={() => alert("自定义盲盒详情！")}
        />
        <BlindBox
          image="sanliou.jpg"
          name="三丽鸥盲盒"
          onDetail={() => alert("元气少女盲盒详情！")}
        />
      </div>
    </div>
  )
}

export default App

