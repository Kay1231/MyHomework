import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // 这里可以处理登录逻辑，比如调用API
    console.log('用户名:', username);
    console.log('密码:', password);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="relative max-w-xs mx-auto mt-24 p-8 bg-yellow-100 border-4 border-lime-500 rounded-3xl shadow-2xl"
    >
      <div className="mb-6">
        <label className="block text-lime-500 font-bold text-lg mb-2">
          用户名：
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="请输入用户名"
            className="mt-2 w-full px-4 py-2 border-2 border-lime-500 rounded-xl bg-green-50 text-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-inner"
          />
        </label>
      </div>
      <div className="mb-8">
        <label className="block text-lime-500 font-bold text-lg mb-2">
          密码：
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="请输入密码"
            className="mt-2 w-full px-4 py-2 border-2 border-lime-500 rounded-xl bg-green-50 text-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 shadow-inner"
          />
        </label>
      </div>
      <div className="relative">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-lime-500 hover:bg-green-500 text-white font-extrabold rounded-xl shadow-lg border-2 border-green-600 transition-all duration-200"
        >
          登录
        </button>
        <button
          type="button"
          className="absolute -top-7.5 right-0 py-0.5 px-3 text-sm bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg shadow border border-yellow-600 transition-all duration-200"
        >
          注册
        </button>
      </div>
    </form>
  );
};

export default LoginForm;