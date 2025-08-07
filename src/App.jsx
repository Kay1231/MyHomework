// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './component/Header';
import Home from './page/Home';
import BlindBoxes from './page/BlindBoxes';
import UserCenter from './page/UserCenter';
import AdminPanel from './page/AdminPanel';
import Login from './component/LoginForm';
import Register from './component/Register';
import BlindBoxDetail from './component/BlindBoxDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blindboxes" element={<BlindBoxes />} />
              <Route path="/blindboxes/:id" element={<BlindBoxDetail />} />
              <Route path="/user" element={<UserCenter />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;