import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'; // <--- BARU: Impor Halaman Login
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Employees from './pages/Employees'; 
import Menu from './pages/Menu';
import Transactions from './pages/Transactions';
import './index.css';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); 

  // Daftar path yang membutuhkan Sidebar/Layout
  const privatePaths = ['/dashboard', '/customers', '/employees', '/menu', '/transactions'];

  // Cek apakah Sidebar/Layout harus dirender
  const showLayout = privatePaths.includes(location.pathname);

  // Deteksi ukuran layar
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Komponen Layout untuk Dashboard, dll.
  const DashboardLayout = () => (
    <div className="flex min-h-screen">
      {/* Sidebar HANYA dirender jika showLayout true */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Konten utama */}
      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out 
          ${isMobile ? 'ml-0' : isSidebarOpen ? 'ml-64' : 'ml-24'}
        `}
      >
        <Routes>
          {/* Rute yang menggunakan Layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/transactions" element={<Transactions />} />
          
          {/* Fallback jika mengakses rute internal tanpa awalan yang tepat */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );

  return (
    <Routes>
      {/* Rute Publik (Landing Page & Login Page) */}
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/login" element={<LoginPage />} /> {/* <--- BARU: Rute Halaman Login */}

      {/* Rute Private (Dashboard dan lainnya) - Di-nesting di bawah satu path agar bisa menggunakan Layout */}
      <Route path="/*" element={showLayout ? <DashboardLayout /> : <Navigate to="/" replace />} />
    </Routes>
  );
};

// Wrapper Router dipindahkan ke index.js jika Anda menggunakan App.jsx sebagai root.
// Jika App.jsx adalah root, maka kita perlu menggunakan <Router> di sini.
// Kita kembalikan penggunaan <Router> ke App.jsx, dan mengubah struktur untuk handling Layout.
const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;