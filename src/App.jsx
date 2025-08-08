import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BoxListPage from './pages/BoxListPage';
import BoxDetailPage from './pages/BoxDetailPage';
import DrawPage from './pages/DrawPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoxListPage />} />
        <Route path="/box/:id" element={<BoxDetailPage />} />
        <Route path="/box/:id/draw" element={<DrawPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/init" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;