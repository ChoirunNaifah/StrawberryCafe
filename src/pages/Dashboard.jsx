import React, { useState, useEffect, useRef } from 'react';
import {
  ChartBarSquareIcon,
  UserIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

// Komponen Loading Screen (tidak diubah)
const StrawberryLoadingScreen = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.9;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay musik dicegah oleh browser:", error);
        });
      }
    }
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            to { transform: rotate(360deg) scale(1); }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }
          @keyframes float-up {
            0% { transform: translateY(0); opacity: 0; }
            10%, 90% { opacity: 0.7; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
        `}
      </style>
      
      <audio ref={audioRef} src="/music/strawberry-theme.mp3" loop />

      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-pink-800 opacity-30"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${Math.random() * 100}%`,
              animation: `float-up ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              bottom: '-20px',
            }}
          />
        ))}
        
        <div className="relative flex flex-col items-center">
          <img 
            src="/images/straw.png" 
            alt="Loading Strawberry" 
            className="w-48 h-48 animate-spin-slow drop-shadow-2xl" 
          />
          <p className="mt-8 text-2xl font-bold text-white tracking-widest drop-shadow-lg animate-pulse">
            Loading Sweetness...
          </p>
        </div>
      </div>
    </>
  );
};

// Data dummy (tidak diubah)
const initialCustomers = [
  { id: 1, name: 'Budi Santoso' }, { id: 2, name: 'Siti Aminah' }, { id: 3, name: 'Joko Susanto' },
  { id: 4, name: 'Dewi Lestari' }, { id: 5, name: 'Ahmad Fauzi' }, { id: 6, name: 'Rina Wulandari' },
  { id: 7, name: 'Agus Setiawan' }, { id: 8, name: 'Linda Puspita' }, { id: 9, name: 'Eko Nugroho' },
  { id: 10, name: 'Yuniarti Halim' }, { id: 11, name: 'Hendra Wijaya' }, { id: 12, name: 'Fitri Handayani' },
  { id: 13, name: 'Tri Hartono' }, { id: 14, name: 'Wulan Sari' }, { id: 15, name: 'Andi Prasetyo' },
  { id: 16, name: 'Maya Kusuma' }, { id: 17, name: 'Iwan Gunawan' }, { id: 18, name: 'Dian Permata' },
  { id: 19, name: 'Rizky Maulana' }, { id: 20, name: 'Putri Rahayu' },
];
const initialMenu = [
    { id: 1, name: 'Strawberry Shortcake Slice', price: 45000 }, { id: 2, name: 'Iced Strawberry Latte', price: 32000 },
    { id: 3, name: 'Strawberry Swiss Roll', price: 35000 }, { id: 4, name: 'Strawberry Cheesecake', price: 55000 },
    { id: 5, name: 'Fresh Strawberry Juice', price: 28000 }, { id: 6, name: 'Strawberry Souffle Pancake', price: 65000 },
    { id: 7, name: 'Strawberry Mille Crepe', price: 48000 }, { id: 8, name: 'Sparkling Strawberry Lemonade', price: 30000 },
    { id: 9, name: 'Strawberry Milk Boba', price: 33000 }, { id: 10, name: 'Classic Strawberry Tart', price: 42000 },
    { id: 11, name: 'Velvet Berry Cupcake', price: 25000 }, { id: 12, name: 'Strawberry Smoothie Bowl', price: 50000 },
    { id: 13, name: 'Hot Strawberry Blossom Tea', price: 26000 }, { id: 14, name: 'Strawberry Frappuccino', price: 38000 },
    { id: 15, name: 'Mini Strawberry Pavlova', price: 40000 }, { id: 16, name: 'Matcha Strawberry Latte', price: 35000 },
    { id: 17, name: 'Strawberry Danish Pastry', price: 28000 }, { id: 18, name: 'Strawberry Mojito (Non-Alcohol)', price: 34000 },
    { id: 19, name: 'Mineral Water', price: 10000 }, { id: 20, name: 'Americano', price: 22000 },
];
const initialTransactions = [
  { id: 1, customerId: 1, total: 45000 }, { id: 2, customerId: 2, total: 30000 }, { id: 3, customerId: 3, total: 60000 },
  { id: 4, customerId: 4, total: 35000 }, { id: 5, customerId: 5, total: 50000 }, { id: 6, customerId: 1, total: 25000 },
  { id: 7, customerId: 2, total: 40000 }, { id: 8, customerId: 3, total: 55000 }, { id: 9, customerId: 6, total: 33000 },
  { id: 10, customerId: 7, total: 78000 }, { id: 11, customerId: 8, total: 25000 }, { id: 12, customerId: 9, total: 46000 },
  { id: 13, customerId: 10, total: 105000 }, { id: 14, customerId: 11, total: 36000 }, { id: 15, customerId: 12, total: 54000 },
  { id: 16, customerId: 13, total: 88000 }, { id: 17, customerId: 14, total: 17000 }, { id: 18, customerId: 15, total: 62000 },
  { id: 19, customerId: 1, total: 30000 }, { id: 20, customerId: 5, total: 95000 }, { id: 21, customerId: 8, total: 43000 },
  { id: 22, customerId: 18, total: 28000 }, { id: 23, customerId: 20, total: 112000 }, { id: 24, customerId: 19, total: 49000 },
  { id: 25, customerId: 7, total: 32000 }, { id: 26, customerId: 4, total: 58000 }, { id: 27, customerId: 16, total: 67000 },
  { id: 28, customerId: 17, total: 22000 }, { id: 29, customerId: 2, total: 80000 }, { id: 30, customerId: 10, total: 45000 },
];
const bestSellingProducts = [
    { name: 'Strawberry Blossom Latte', sales: 120 }, { name: 'Strawberry Swiss Roll', sales: 95 },
    { name: 'Strawberry Shortcake Slice', sales: 80 }, { name: 'Strawberry Milk Delight', sales: 70 },
    { name: 'Strawberry Souffle Pancake', sales: 65 },
];
const notificationData = [
    { id: 1, message: 'Penjualan baru: Strawberry Latte (Rp32.000)', time: '5 menit yang lalu' },
    { id: 2, message: 'Pelanggan baru terdaftar: Budi Santoso', time: '1 jam yang lalu' },
    { id: 3, message: 'Stok Strawberry Souffle Pancake hampir habis!', time: '3 jam yang lalu' },
];

// Fungsi & Hook utilitas (tidak diubah)
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
};

const useCountUp = (endValue, duration = 1500) => {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = 1 - Math.pow(1 - (frame / totalFrames), 3);
      const currentCount = Math.round(endValue * progress);
      setCount(currentCount);
      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(endValue);
      }
    }, frameRate);
    return () => clearInterval(counter);
  }, [endValue, duration, totalFrames]);
  return count;
};

const AnimatedNumber = ({ value, formatter }) => {
  const count = useCountUp(value);
  return <span>{formatter ? formatter(count) : count}</span>;
};

// Komponen UI (tidak diubah)
const NotificationIcon = ({ count = 0, onClick }) => (
    <div className="relative">
      <button onClick={onClick} className="bg-white bg-opacity-70 dark:bg-gray-700 dark:bg-opacity-50 p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {count > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {count}
          </span>
        )}
      </button>
    </div>
);

const DonutChart = ({ data, total }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    let currentOffset = 0;
    return (
      <div className="flex flex-col items-center">
        <svg width="150" height="150" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#e0e0e0" className="dark:stroke-gray-600" strokeWidth="15" />
          {data.map((slice, index) => {
            const strokeDasharray = `${(slice.value / total) * circumference} ${circumference}`;
            const offset = currentOffset;
            currentOffset += (slice.value / total) * circumference;
            return (
              <circle key={index} cx="50" cy="50" r={radius} fill="transparent" stroke={slice.color} strokeWidth="15"
                strokeDasharray={strokeDasharray} strokeDashoffset={-offset} strokeLinecap="round" transform="rotate(-90 50 50)">
                <animate attributeName="stroke-dashoffset" from={circumference} to={-offset} dur="1.5s" fill="freeze" />
              </circle>
            );
          })}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="16" className="fill-gray-800 dark:fill-gray-100" fontWeight="bold">
            {total}
          </text>
        </svg>
        <div className="mt-4 text-center">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item.label}: <span className="font-bold">{item.value}</span></p>
            </div>
          ))}
        </div>
      </div>
    );
};
 
const BarChart = ({ data, onBarClick }) => {
    const maxSales = Math.max(...data.map(d => d.sales));
    const height = 150;
    const width = 400;
    const barWidth = 40;
    const padding = 20;
    const barSpacing = (width - 2 * padding - data.length * barWidth) / (data.length - 1);
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return (
      <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-40 p-6 rounded-2xl shadow-lg relative overflow-hidden w-full flex-1">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Produk Terlaris</h3>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          {data.map((d, i) => {
            const barHeight = (d.sales / maxSales) * (height - 2 * padding);
            const x = padding + i * (barWidth + barSpacing);
            return (
              <g key={i} onClick={() => onBarClick(d)} className="cursor-pointer group">
                <rect x={x} y={height - padding} width={barWidth} height={0} fill={colors[i % colors.length]} rx="5" ry="5"
                  className="group-hover:opacity-80 transition-opacity"
                  style={{'--bar-height': `${barHeight}px`, '--bar-translate-y': `${-barHeight}px`, animation: `bar-grow 0.8s ${i * 0.15}s ease-out forwards`}}
                />
                <text x={x + barWidth / 2} y={height - 5} textAnchor="middle" fontSize="12" className="fill-gray-500 dark:fill-gray-400">
                  {d.name.split(' ').map(word => word[0]).join('')}
                </text>
              </g>
            );
          })}
        </svg>
        <style>{`@keyframes bar-grow { to { height: var(--bar-height); transform: translateY(var(--bar-translate-y)); } }`}</style>
      </div>
    );
};
  
const LineChart = ({ data }) => {
    const maxSales = Math.max(...data.map(d => d.sales));
    const width = 400;
    const height = 150;
    const padding = 20;
    const scaleX = (index) => (index / (data.length - 1)) * (width - 2 * padding) + padding;
    const scaleY = (value) => height - padding - (value / maxSales) * (height - 2 * padding);
    const points = data.map((d, i) => `${scaleX(i)},${scaleY(d.sales)}`).join(' ');
    const linePath = `M${points}`;
    const areaPath = `M${points} L${scaleX(data.length - 1)},${height - padding} L${scaleX(0)},${height - padding} Z`;
    return (
      <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-40 p-6 rounded-2xl shadow-lg relative overflow-hidden w-full">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">Penjualan Harian</h3>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
          <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" /><stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" /></linearGradient></defs>
          <path d={areaPath} fill="url(#areaGradient)" />
          <path d={linePath} fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{strokeDasharray: '1000', strokeDashoffset: '1000', animation: 'dash-line 2s ease-in-out forwards'}}/>
          {data.map((d, i) => (
            <React.Fragment key={i}>
              <circle cx={scaleX(i)} cy={scaleY(d.sales)} r="5" fill="#EC4899" stroke="#fff" className="dark:stroke-gray-800" strokeWidth="2" style={{opacity: 0, animation: `fade-in 0.5s ${2 + i * 0.1}s forwards`}}/>
              <text x={scaleX(i)} y={scaleY(d.sales) - 10} textAnchor="middle" fontSize="12" fontWeight="bold" className="fill-gray-800 dark:fill-gray-100" style={{opacity: 0, animation: `fade-in 0.5s ${2.2 + i * 0.1}s forwards`}}>{d.sales}</text>
            </React.Fragment>
          ))}
          {data.map((d, i) => (
            <text key={i} x={scaleX(i)} y={height - 5} textAnchor="middle" fontSize="12" className="fill-gray-500 dark:fill-gray-400">{d.day}</text>
          ))}
        </svg>
        <style>{`@keyframes dash-line { to { stroke-dashoffset: 0; } } @keyframes fade-in { to { opacity: 1; } }`}</style>
      </div>
    );
};
 
// --- DIMODIFIKASI: UserProfilePopup (dengan Fitur Edit) ---
const UserProfilePopup = ({ user, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    // Jika prop 'user' berubah (misalnya setelah disimpan),
    // perbarui state formulir lokal, kecuali sedang mengedit.
    if (!isEditing) {
      setFormData(user);
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(formData); // Kirim data baru ke Dashboard
    setIsEditing(false); // Keluar dari mode edit
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user); // Kembalikan data ke data 'user' prop yang asli
  };

  return (
    <div className="absolute top-20 right-8 z-50 bg-gradient-to-br from-pink-50 via-pink-100 to-red-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-700 rounded-2xl shadow-xl p-6 w-80 transform origin-top-right animate-popup-in">
      <div className="flex flex-col items-center text-center">
        <img src="https://png.pngtree.com/png-clipart/20230408/original/pngtree-administration-of-women-job-vacancies-png-image_9037121.png" alt="Cute Admin Girl Cartoon" className="w-24 h-24 rounded-full object-cover shadow-md mb-4"/>
        
        {!isEditing ? (
          <>
            {/* --- Mode Tampilan --- */}
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{formData.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{formData.job}</p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="break-all">{formData.email}</span>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="mt-6 w-full py-2 px-4 rounded-full text-white font-semibold bg-pink-500 hover:bg-pink-600 transition-colors shadow-lg"
            >
              Edit Profil
            </button>
            <button className="mt-3 w-full py-2 px-4 rounded-full text-pink-600 dark:text-pink-400 font-semibold bg-white/50 dark:bg-gray-700/50 hover:bg-white/80 dark:hover:bg-gray-600 transition-colors">
              Logout
            </button>
          </>
        ) : (
          <>
            {/* --- Mode Edit --- */}
            <form onSubmit={handleSave} className="w-full space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block text-left">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-lg bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block text-left">Pekerjaan</label>
                <input
                  type="text"
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-lg bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full p-2 rounded-lg bg-white/80 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              <div className="flex space-x-2 pt-3">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2 px-4 rounded-full text-gray-700 dark:text-gray-300 font-semibold bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="w-full py-2 px-4 rounded-full text-white font-semibold bg-pink-500 hover:bg-pink-600 transition-colors shadow-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
 
const NotificationPopup = ({ onClose }) => (
    <div className="absolute top-20 right-28 z-50 bg-gradient-to-br from-pink-50 via-pink-100 to-red-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-700 rounded-2xl shadow-xl p-6 w-96 transform origin-top-right animate-popup-in">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">Notifikasi</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <div className="space-y-4">
        {notificationData.map((notif) => (
          <div key={notif.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{notif.message}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
);

const ProductDetailPopup = ({ product, onClose }) => {
  if (!product) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-pink-50 via-pink-100 to-red-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-700 rounded-2xl shadow-xl p-8 w-full max-w-md transform animate-popup-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Detail Penjualan</h3>
          <p className="text-lg font-semibold text-pink-600 dark:text-pink-400 mb-6">{product.name}</p>
          <div className="space-y-4 text-left">
            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Unit Terjual</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{product.sales} unit</p>
            </div>
            <div className="p-4 bg-white/50 dark:bg-gray-700/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Analisis Lanjutan</p>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Grafik tren penjualan harian untuk produk ini akan tersedia di pembaruan selanjutnya.</p>
            </div>
          </div>
          <button onClick={onClose} className="mt-8 w-full py-2 px-4 rounded-full text-white font-semibold bg-pink-500 hover:bg-pink-600 transition-colors shadow-lg">Tutup</button>
        </div>
      </div>
    </div>
  );
};

const LowStockAlert = ({ items }) => {
  const stockThreshold = 12;

  return (
    <>
      <style>
        {`
          @keyframes slide-in-bottom {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in-bottom { animation: slide-in-bottom 0.5s ease-out forwards; }

          @keyframes progress-fill {
            from { width: 0%; }
            to { width: var(--progress-width); }
          }
          .animate-progress-fill { animation: progress-fill 1s ease-out forwards; }
          
          @keyframes pulse-warning {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          .animate-pulse-warning { animation: pulse-warning 2s infinite ease-in-out; }
        `}
      </style>
      <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-40 p-6 rounded-2xl shadow-lg flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-red-500/20 rounded-full mr-3 animate-pulse-warning">
             <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Peringatan Stok Rendah</h3>
        </div>
        <div className="space-y-4 overflow-y-auto pr-2 flex-1">
          {items
            .filter(item => item.stock <= stockThreshold)
            .map((item, index) => {
              const percentage = (item.stock / 20) * 100;
              const barColor = item.stock < 6 ? 'bg-red-500' : 'bg-yellow-500';

              return (
                <div 
                  key={item.id} 
                  className="opacity-0 animate-slide-in-bottom"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className={`font-bold ${item.stock < 6 ? 'text-red-500' : 'text-yellow-500'}`}>
                      Sisa: {item.stock}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${barColor} animate-progress-fill`}
                      style={{ '--progress-width': `${percentage}%`, animationDelay: `${200 + index * 150}ms` }}
                    ></div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
};

// --- BARU: Komponen Notifikasi Stok di Tengah Layar ---
const CenterStockAlertPopup = ({ items, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-gradient-to-br from-pink-50 via-pink-100 to-red-100 dark:from-slate-800 dark:via-gray-800 dark:to-slate-700 rounded-2xl shadow-xl p-8 w-full max-w-lg transform animate-popup-in">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="p-3 bg-red-500/20 rounded-full mb-4 animate-pulse-warning">
             <ExclamationTriangleIcon className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Peringatan Stok Rendah!
          </h3>
          <p className="text-md text-gray-600 dark:text-gray-300 mb-6">
            Beberapa produk Anda akan segera habis dan perlu diisi ulang.
          </p>
          
          <div className="w-full max-h-48 overflow-y-auto space-y-2 text-left bg-white/30 dark:bg-gray-700/30 p-4 rounded-lg">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-700 dark:text-gray-200">{item.name}</span>
                <span className="font-bold text-red-500">Sisa: {item.stock}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onClose} 
            className="mt-8 w-full py-2 px-4 rounded-full text-white font-semibold bg-pink-500 hover:bg-pink-600 transition-colors shadow-lg"
          >
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Komponen Pelacak Target Penjualan (tidak diubah) ---
const SalesGoalTracker = ({ goal, current }) => {
  const percentage = Math.min(Math.round((current / goal) * 100), 100);
  const animatedPercentage = useCountUp(percentage);
  
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <>
      <style>
        {`
          @keyframes fill-progress {
            from { stroke-dashoffset: ${circumference}; }
            to { stroke-dashoffset: ${offset}; }
          }
          .progress-ring__circle--animated {
            animation: fill-progress 2s ease-out forwards;
          }
        `}
      </style>
      <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-40 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center h-full">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Target Penjualan Bulan Ini</h3>
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 120 120">
            <circle
              className="stroke-current text-pink-200 dark:text-gray-700"
              strokeWidth="10"
              fill="transparent"
              r={radius}
              cx="60"
              cy="60"
            />
            <circle
              className="progress-ring__circle--animated stroke-current text-pink-500 dark:text-pink-400"
              strokeWidth="10"
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="60"
              cy="60"
              style={{
                strokeDasharray: circumference,
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-pink-600 dark:text-pink-300">
              {animatedPercentage}%
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Tercapai</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <span className="font-bold">{formatRupiah(current)}</span> dari {formatRupiah(goal)}
        </p>
      </div>
    </>
  );
};

// --- Komponen Feed Aktivitas (tidak diubah) ---
const LiveActivityFeed = () => {
  const initialActivities = [
    { icon: <ShoppingCartIcon className="h-5 w-5"/>, text: 'Penjualan baru oleh Siti Aminah', time: 'baru saja' },
    { icon: <UserIcon className="h-5 w-5"/>, text: 'Pelanggan baru: Andi Prasetyo', time: '2 menit lalu' },
    { icon: <ArchiveBoxIcon className="h-5 w-5"/>, text: 'Stok Strawberry Shortcake diupdate', time: '5 menit lalu' },
  ];
  
  const [activities, setActivities] = useState(initialActivities);

  useEffect(() => {
    const newActivities = [
      'Penjualan baru oleh Budi Santoso',
      'Stok Matcha Premium hampir habis!',
      'Pelanggan baru: Rina Wulandari',
      'Penjualan besar: Strawberry Souffle',
    ];

    const interval = setInterval(() => {
      const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
      const newEntry = {
        icon: randomActivity.includes('Pelanggan') ? <UserIcon className="h-5 w-5"/> : <ShoppingCartIcon className="h-5 w-5"/>,
        text: randomActivity,
        time: 'baru saja',
      };

      setActivities(prev => [newEntry, ...prev.slice(0, 2)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes slide-in-top {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in-top {
            animation: slide-in-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          }
        `}
      </style>
      <div className="bg-white bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-40 p-6 rounded-2xl shadow-lg h-full">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className={`flex items-start ${index === 0 ? 'animate-slide-in-top' : ''}`}>
              <div className="flex-shrink-0 mr-3 mt-1 p-2 bg-pink-100 dark:bg-gray-700 rounded-full text-pink-500 dark:text-pink-400">
                {activity.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{activity.text}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// --- Custom Hook useMouseGlow (tidak diubah) ---
const useMouseGlow = (ref) => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                ref.current.style.setProperty('--mouse-x', `${x}px`);
                ref.current.style.setProperty('--mouse-y', `${y}px`);
            }
        };

        const currentRef = ref.current;
        if (currentRef) {
            currentRef.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, [ref]);
};


// --- DIMODIFIKASI: Komponen Dashboard Utama (Menggabungkan semua fitur) ---
const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [typingText, setTypingText] = useState("");
    const fullText = "Hello, Admiin!";
    const typingSpeed = 150;
    const [showProfilePopup, setShowProfilePopup] = useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false);
    const [notificationCount, setNotificationCount] = useState(notificationData.length);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // --- State untuk Fitur Edit Profil ---
    const [userProfile, setUserProfile] = useState({
      name: 'CHOIRUN NAIFAH',
      job: 'Front End Development',
      email: 'choirunnaifah@gmail.com'
    });

    // --- State untuk Fitur Notifikasi Stok Tengah ---
    const [showCenterStockAlert, setShowCenterStockAlert] = useState(false);

    const cardsContainerRef = useRef(null);
    useMouseGlow(cardsContainerRef);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 6000);
      return () => clearTimeout(timer);
    }, []);
 
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
 
    useEffect(() => {
      document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);
 
    const toggleProfilePopup = () => {
      setShowProfilePopup(prev => !prev);
      setShowNotificationPopup(false);
    };
 
    const toggleNotificationPopup = () => {
      setShowNotificationPopup(prev => !prev);
      setShowProfilePopup(false);
    };

    const handleBarClick = (product) => setSelectedProduct(product);
    const handleCloseProductPopup = () => setSelectedProduct(null);

    // --- Handler untuk Fitur Edit Profil ---
    const handleProfileSave = (newProfileData) => {
      setUserProfile(newProfileData);
      // Di aplikasi nyata, Anda bisa menambahkan notifikasi "Berhasil Disimpan"
    };

    // --- Handler untuk Fitur Notifikasi Stok Tengah ---
    const handleCloseCenterStockAlert = () => {
      setShowCenterStockAlert(false);
    };
 
    // Data stok rendah (didefinisikan di level komponen agar bisa diakses useEffect)
    const lowStockData = [
        { id: 1, name: 'Strawberry Tiramisu Delight', stock: 8 },
        { id: 2, name: 'Korean Strawberry Milk', stock: 4 },
        { id: 3, name: 'Strawberry Blossom Latte', stock: 11 },
        { id: 4, name: 'Strawberry Soufflé Pancake', stock: 5 },
        { id: 5, name: 'Strawberry Blossom Latte', stock: 9 },
    ];

    // Data yang difilter untuk notifikasi
    const stockThreshold = 12;
    const itemsForAlert = lowStockData.filter(item => item.stock <= stockThreshold);

    useEffect(() => {
      if (!isLoading) {
        let i = 0;
        const typingEffect = setInterval(() => {
          if (i < fullText.length) {
            setTypingText(prev => prev + fullText.charAt(i));
            i++;
          } else {
            clearInterval(typingEffect);
          }
        }, typingSpeed);
        
        // --- Pemicu untuk Notifikasi Stok Tengah ---
        if (itemsForAlert.length > 0) {
          setShowCenterStockAlert(true);
        }

        return () => clearInterval(typingEffect);
      }
    }, [isLoading]); // Hanya bergantung pada isLoading
 
    const totalCustomers = initialCustomers.length;
    const totalMenuItems = initialMenu.length;
    const totalTransactions = initialTransactions.length;
    const totalRevenue = initialTransactions.reduce((sum, t) => sum + t.total, 0);
 
    const dailySalesData = [
      { day: 'Sen', sales: 45 }, { day: 'Sel', sales: 60 }, { day: 'Rab', sales: 75 },
      { day: 'Kam', sales: 50 }, { day: 'Jum', sales: 90 }, { day: 'Sab', sales: 85 }, { day: 'Min', sales: 70 },
    ];
 
    const employeeData = [
      { label: 'Pria', value: 22, color: '#FF69B4' }, { label: 'Wanita', value: 10, color: '#8A2BE2' },
    ];
    const totalEmployees = employeeData.reduce((sum, item) => sum + item.value, 0);
 
    if (isLoading) {
      return <StrawberryLoadingScreen />;
    }
 
    return (
      <>
        <style>{`
            @keyframes popup-in { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } } 
            .animate-popup-in { animation: popup-in 0.3s ease-out forwards; } 
            @keyframes card-fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } 
            .animate-card { animation: card-fade-in 0.6s ease-out forwards; opacity: 0; }
            
            .card-glow-effect {
                position: relative;
                background: var(--card-bg-color);
                transition: background 0.3s ease;
            }
            .card-glow-effect::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                border-radius: 1rem;
                background: radial-gradient(
                    300px circle at var(--mouse-x) var(--mouse-y),
                    var(--glow-color) 0%,
                    transparent 100%
                );
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
            }
            .card-glow-effect:hover::before {
                opacity: 1;
            }
        `}</style>

        {/* --- Render Notifikasi Stok Tengah --- */}
        {showCenterStockAlert && (
          <CenterStockAlertPopup 
            items={itemsForAlert} 
            onClose={handleCloseCenterStockAlert} 
          />
        )}

        {selectedProduct && <ProductDetailPopup product={selectedProduct} onClose={handleCloseProductPopup} />}

        <div className="p-8 relative min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-slate-800 transition-colors duration-500">
            <div className="bg-white bg-opacity-30 dark:bg-gray-800 dark:bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-3xl shadow-2xl mb-8 flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                    <span>{typingText}</span>
                </h2>
                <div className="flex items-center space-x-4">
                    <input type="text" placeholder="Search..." className="p-2 pl-4 rounded-full bg-white bg-opacity-50 dark:bg-gray-700 border border-white border-opacity-50 dark:border-gray-600 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 dark:focus:ring-pink-500 transition-all duration-300"/>
                    <button className="bg-white bg-opacity-70 dark:bg-gray-700 dark:bg-opacity-50 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <button onClick={toggleDarkMode} className="bg-white bg-opacity-70 dark:bg-gray-700 dark:bg-opacity-50 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300">
                        {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-pink-600" />}
                    </button>
                    <NotificationIcon count={notificationCount} onClick={toggleNotificationPopup}/>
                    <button onClick={toggleProfilePopup}>
                        <img src="https://png.pngtree.com/png-clipart/20230408/original/pngtree-administration-of-women-job-vacancies-png-image_9037121.png" alt="Admin Avatar" className="w-10 h-10 rounded-full object-cover shadow-lg" />
                    </button>
                </div>
            </div>
 
            {showNotificationPopup && <NotificationPopup onClose={toggleNotificationPopup} />}
            
            {/* --- Render Popup Profil (dengan Fitur Edit) --- */}
            {showProfilePopup && (
              <UserProfilePopup 
                user={userProfile} 
                onClose={toggleProfilePopup} 
                onSave={handleProfileSave}
              />
            )}
 
            <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="p-6 rounded-2xl shadow-lg flex items-center transform transition-transform hover:scale-105 duration-300 text-white animate-card card-glow-effect" 
                    style={{ animationDelay: '100ms', '--card-bg-color': 'linear-gradient(to bottom right, #a78bfa, #f472b6)', '--glow-color': 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="text-3xl mr-4"><UserIcon className="w-8 h-8"/></div>
                    <div>
                        <p className="text-sm font-light">Total Pelanggan</p>
                        <h3 className="text-2xl font-bold"><AnimatedNumber value={totalCustomers} /></h3>
                    </div>
                </div>
                <div className="p-6 rounded-2xl shadow-lg flex items-center transform transition-transform hover:scale-105 duration-300 text-white animate-card card-glow-effect"
                    style={{ animationDelay: '200ms', '--card-bg-color': 'linear-gradient(to bottom right, #f472b6, #ef4444)', '--glow-color': 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="text-3xl mr-4"><ShoppingCartIcon className="w-8 h-8"/></div>
                    <div>
                        <p className="text-sm font-light">Total Menu Makanan</p>
                        <h3 className="text-2xl font-bold"><AnimatedNumber value={totalMenuItems} /></h3>
                    </div>
                </div>
                <div className="p-6 rounded-2xl shadow-lg flex items-center transform transition-transform hover:scale-105 duration-300 text-white animate-card card-glow-effect"
                    style={{ animationDelay: '300ms', '--card-bg-color': 'linear-gradient(to bottom right, #60a5fa, #22d3ee)', '--glow-color': 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="text-3xl mr-4"><ArchiveBoxIcon className="w-8 h-8"/></div>
                    <div>
                        <p className="text-sm font-light">Total Transaksi</p>
                        <h3 className="text-2xl font-bold"><AnimatedNumber value={totalTransactions} /></h3>
                    </div>
                </div>
                <div className="p-6 rounded-2xl shadow-lg flex items-center transform transition-transform hover:scale-105 duration-300 text-white animate-card card-glow-effect"
                    style={{ animationDelay: '400ms', '--card-bg-color': 'linear-gradient(to bottom right, #4ade80, #14b8a6)', '--glow-color': 'rgba(255, 255, 255, 0.1)' }}>
                    <div className="text-3xl mr-4"><ChartBarSquareIcon className="w-8 h-8"/></div>
                    <div>
                        <p className="text-sm font-light">Total Pendapatan</p>
                        <h3 className="text-xl font-bold"><AnimatedNumber value={totalRevenue} formatter={formatRupiah} /></h3>
                    </div>
                </div>
            </div>
 
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <LineChart data={dailySalesData} />
                </div>
                <LiveActivityFeed />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <SalesGoalTracker goal={50000000} current={totalRevenue} />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BarChart data={bestSellingProducts} onBarClick={handleBarClick} />
                    <LowStockAlert items={lowStockData} />
                </div>
            </div>

        </div>
      </>
    );
};
 
export default Dashboard;