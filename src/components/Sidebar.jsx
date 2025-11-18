import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChartBarSquareIcon,
  UserIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  ChevronLeftIcon,
  Bars3Icon,
  UsersIcon, // Ikon baru untuk Karyawan
} from '@heroicons/react/24/solid';

// Komponen ikon SVG kustom untuk logo stroberi
const StrawberryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-8 h-8 text-pink-600"
  >
    <path
      fillRule="evenodd"
      d="M10.156 1.442A.75.75 0 0 1 11.25 1a8.25 8.25 0 0 1 6.545 13.064l-2.001-2.879a.75.75 0 0 1 .494-1.28l4.42-1.397a.75.75 0 0 1 .913.435l1.696 2.827a.75.75 0 0 1-.989 1.116l-3.326-2.025a.75.75 0 0 1-.589-.884l2.454-7.584a.75.75 0 0 1 1.439.464l-2.454 7.584a.75.75 0 0 1-.589.884l-3.326 2.025a.75.75 0 0 1-.989-1.116l1.696-2.827a.75.75 0 0 1 .913-.435l4.42 1.397a.75.75 0 0 1 .494 1.28l-2.001 2.879A8.25 8.25 0 0 1 6.347 16.99a.75.75 0 0 1 .442-1.375l2.454-7.584a.75.75 0 0 1 .589-.884l3.326-2.025a.75.75 0 0 1 .989 1.116l-1.696 2.827a.75.75 0 0 1-.913.435L9.66 11.085a.75.75 0 0 1-.494-1.28l2.001-2.879a.75.75 0 0 1 .494-1.28l-2.001 2.879a.75.75 0 0 1-.494-1.28l-4.42-1.397a.75.75 0 0 1-.913.435l-1.696 2.827a.75.75 0 0 1 .989 1.116l3.326 2.025a.75.75 0 0 1 .589.884l-2.454 7.584a.75.75 0 0 1-1.439-.464l2.454-7.584a.75.75 0 0 1 .589-.884l3.326-2.025a.75.75 0 0 1-.989-1.116L10.156 1.442z"
      clipRule="evenodd"
    />
    <path
      d="M10.156 1.442a.75.75 0 0 1 1.094-.492 8.25 8.25 0 0 1 6.545 13.064l-2.001-2.879a.75.75 0 0 1 .494-1.28l4.42-1.397a.75.75 0 0 1 .913.435l1.696 2.827a.75.75 0 0 1-.989 1.116l-3.326-2.025a.75.75 0 0 1-.589-.884l2.454-7.584a.75.75 0 0 1 1.439.464l-2.454 7.584a.75.75 0 0 1-.589.884l-3.326 2.025a.75.75 0 0 1-.989-1.116l1.696-2.827a.75.75 0 0 1 .913-.435l4.42 1.397a.75.75 0 0 1 .494 1.28l-2.001 2.879a8.25 8.25 0 0 1-6.545-13.064z"
    />
  </svg>
);

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: <ChartBarSquareIcon className="h-6 w-6" />, path: '/dashboard' },
    { name: 'Pelanggan', icon: <UserIcon className="h-6 w-6" />, path: '/customers' },
    { name: 'Karyawan', icon: <UsersIcon className="h-6 w-6" />, path: '/employees' }, // Tambah menu Karyawan
    { name: 'Menu', icon: <ShoppingCartIcon className="h-6 w-6" />, path: '/menu' },
    { name: 'Transaksi', icon: <ArchiveBoxIcon className="h-6 w-6" />, path: '/transactions' },
  ];

  return (
    <div
      className={`
        fixed inset-y-0 left-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg border-r border-gray-200 shadow-xl
        transform transition-all duration-300 z-50
        ${isOpen ? 'w-64 translate-x-0' : 'w-24 -translate-x-0'}
      `}
    >
      <div className="p-4 flex justify-between items-center h-20">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-pink-600 transition-colors">
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6 transform transition-transform hover:scale-110" />
          ) : (
            <Bars3Icon className="h-6 w-6 transform transition-transform hover:scale-110" />
          )}
        </button>
      </div>

      <div className="flex flex-col items-center p-4">
        {/* Kontainer untuk logo strawberry tetap ada */}
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} mb-10 transition-all duration-300`}>
          <StrawberryIcon />
          {isOpen && (
            <div className="flex flex-col ml-2 whitespace-nowrap overflow-hidden">
              <h1 className="text-2xl font-bold text-pink-700">Strawberry</h1>
              <h1 className="text-2xl font-bold text-pink-700 mt-[-5px]">Cafe</h1>
            </div>
          )}
        </div>

        {/* Navigasi Utama */}
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-4">
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg font-medium transition-all duration-300
                    ${location.pathname === item.path
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md transform scale-105 font-bold'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-pink-600 hover:font-bold'
                    }
                  `}
                >
                  <span className={`${location.pathname === item.path ? 'text-white' : 'text-black'}`}>{item.icon}</span>
                  {isOpen && <span className="ml-3 transition-opacity duration-200">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;