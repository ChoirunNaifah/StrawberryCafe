import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Impor library Recharts untuk visualisasi data
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


// Impor Heroicons
import {
  CreditCardIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  TagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  ChartBarIcon,
  ChartPieIcon,
} from '@heroicons/react/24/solid';

// Impor komponen cetak yang sudah diperbaiki
import PrintButton from '../components/PrintService';

// --- (Komponen Modal dan ConfirmationModal tidak ada perubahan) ---
const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-200 bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-lg transform scale-100 transition-transform duration-300 animate-scale-up border border-gray-200">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
          <h3 className="text-xl font-bold text-gray-800 drop-shadow-sm">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <Modal title="Konfirmasi Hapus" onClose={onCancel}>
      <p className="text-gray-700 text-center mb-6">Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 rounded-full text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Batal
        </button>
        <button
          onClick={onConfirm}
          className="px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors"
        >
          Hapus
        </button>
      </div>
    </Modal>
  );
};

// --- (Komponen statistik tidak ada perubahan) ---
const StatCard = ({ icon, title, value, color }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white bg-opacity-70 rounded-2xl p-6 shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105">
      <div className={`p-4 rounded-full ${color}`}>
        <IconComponent className="h-8 w-8 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const PaymentPieChart = ({ data }) => {
  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const WeeklyBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="transaksi" fill="#FF6384" name="Jumlah Transaksi" />
      </BarChart>
    </ResponsiveContainer>
  );
};


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    id: null,
    customerName: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    paymentMethod: 'Tunai',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // ======================================================
  // === PERUBAHAN 1: State untuk Paginasi ===
  // ======================================================
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Tampilkan 10 transaksi per halaman

  const API_TRANSACTIONS_URL = 'http://localhost:3001/transactions';
  const API_MENU_URL = 'http://localhost:3001/menuItems';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [transactionsResponse, menuResponse] = await Promise.all([
          fetch(API_TRANSACTIONS_URL),
          fetch(API_MENU_URL)
        ]);
        
        if (!transactionsResponse.ok || !menuResponse.ok) {
          throw new Error('Gagal memuat data dari server');
        }
        
        const transactionsData = await transactionsResponse.json();
        const menuData = await menuResponse.json();
        const sortedTransactions = transactionsData.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(sortedTransactions);
        setMenuItems(menuData);
        toast.success("Data berhasil dimuat dari API!");
      } catch (error) {
        console.error("Kesalahan:", error);
        toast.error("Gagal memuat data. Pastikan json-server berjalan.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ================================================================
  // === PERUBAHAN 2: Reset halaman ke 1 jika filter berubah ===
  // ================================================================
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterBy]);
  
  const transactionStats = useMemo(() => {
    // ... (logika statistik tidak berubah)
    if (!transactions || transactions.length === 0) {
      return {
        todayCount: 0, thisMonthRevenue: 0, mostUsedPaymentMethod: 'N/A',
        pieChartData: [], barChartData: [],
      };
    }
    const today = new Date().toISOString().slice(0, 10);
    const todayCount = transactions.filter(t => t.date.startsWith(today)).length;
    const currentMonth = new Date().toISOString().slice(0, 7);
    const thisMonthTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
    const thisMonthRevenue = thisMonthTransactions.reduce((sum, t) => sum + t.total, 0);
    const paymentCounts = transactions.reduce((acc, t) => {
      acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + 1;
      return acc;
    }, {});
    const mostUsedPaymentMethod = Object.keys(paymentCounts).length > 0
      ? Object.keys(paymentCounts).reduce((a, b) => paymentCounts[a] > paymentCounts[b] ? a : b)
      : 'N/A';
    const pieChartData = Object.entries(paymentCounts).map(([name, value]) => ({ name, value }));
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d;
    }).reverse();
    const barChartData = last7Days.map(day => {
      const dayString = day.toISOString().slice(0, 10);
      const dayName = day.toLocaleDateString('id-ID', { weekday: 'short' });
      const count = transactions.filter(t => t.date.startsWith(dayString)).length;
      return { name: dayName, transaksi: count };
    });
    return {
      todayCount, thisMonthRevenue, mostUsedPaymentMethod,
      pieChartData, barChartData,
    };
  }, [transactions]);
  
  // --- (Fungsi-fungsi lain tidak ada perubahan) ---
  const openModal = (transaction = null) => {
    if (transaction) {
      setFormData({
        ...transaction,
        id: transaction.id,
        items: Array.isArray(transaction.items) ? transaction.items : [{ name: '', quantity: 1, price: 0 }],
      });
      setIsEditing(true);
    } else {
      setFormData({
        id: null, customerName: '', items: [{ name: '', quantity: 1, price: 0 }], paymentMethod: 'Tunai',
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };
  const handleAddItem = () => {
    setFormData(prev => ({
      ...prev, items: [...prev.items, { name: '', quantity: 1, price: 0 }]
    }));
  };
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    let price = newItems[index].price;
    if (field === 'name') {
      const selectedItem = menuItems.find(item => item.name === value);
      price = selectedItem ? selectedItem.price : 0;
    }
    newItems[index] = { ...newItems[index], [field]: value, price };
    setFormData(prev => ({ ...prev, items: newItems }));
  };
  const handleRemoveItem = (index) => {
    setFormData(prev => ({
        ...prev, items: prev.items.filter((_, i) => i !== index),
    }));
  };
  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const itemPrice = menuItems.find(menu => menu.name === item.name)?.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  const handleSave = async () => {
    if (!formData.customerName) {
      toast.error("Nama pelanggan harus diisi!");
      return;
    }
    if (formData.items.some(item => !item.name || item.quantity <= 0)) {
      toast.error("Detail item harus diisi dengan benar!");
      return;
    }
    const totalHarga = calculateTotal();
    const transactionData = {
      customerName: formData.customerName, items: formData.items,
      total: totalHarga, paymentMethod: formData.paymentMethod,
      date: isEditing ? formData.date : new Date().toISOString(),
    };
    try {
      if (isEditing) {
        const response = await fetch(`${API_TRANSACTIONS_URL}/${formData.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...transactionData, id: formData.id }),
        });
        const updatedTransaction = await response.json();
        setTransactions(transactions.map(t => t.id === formData.id ? updatedTransaction : t));
        toast.success("Transaksi berhasil diperbarui!");
      } else {
        const response = await fetch(API_TRANSACTIONS_URL, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transactionData),
        });
        const newTransaction = await response.json();
        setTransactions([newTransaction, ...transactions]);
        toast.success("Transaksi baru berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
      toast.error("Gagal menyimpan transaksi ke server.");
    }
    setIsModalOpen(false);
  };
  const handleDelete = (id) => {
    setTransactionToDelete(id);
    setIsConfirmationModalOpen(true);
  };
  const confirmDelete = async () => {
    if (transactionToDelete) {
      try {
        await fetch(`${API_TRANSACTIONS_URL}/${transactionToDelete}`, { method: 'DELETE' });
        setTransactions(transactions.filter(t => t.id !== transactionToDelete));
        toast.info("Transaksi berhasil dihapus!", { position: "bottom-right" });
      } catch (error) {
        console.error("Gagal menghapus transaksi:", error);
        toast.error("Gagal menghapus transaksi dari server.");
      }
      setIsConfirmationModalOpen(false);
      setTransactionToDelete(null);
    }
  };
  const cancelDelete = () => {
    setIsConfirmationModalOpen(false);
    setTransactionToDelete(null);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearchTerm = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              transaction.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filterBy === 'all') {
      return matchesSearchTerm;
    } else if (filterBy === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      return matchesSearchTerm && transaction.date.startsWith(today);
    } else if (filterBy === 'thisMonth') {
      const currentMonth = new Date().toISOString().slice(0, 7);
      return matchesSearchTerm && transaction.date.startsWith(currentMonth);
    }
    return matchesSearchTerm;
  });

  // ======================================================
  // === PERUBAHAN 3: Logika untuk membagi data per halaman ===
  // ======================================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };


  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fade-in font-inter">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10 flex-col sm:flex-row space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <CreditCardIcon className="h-12 w-12 text-pink-500 animate-spin-slow" />
            <h2 className="text-4xl font-extrabold text-pink-700 tracking-wide drop-shadow-lg">
              Manajemen Transaksi
            </h2>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all transform hover:scale-110 duration-500 shadow-lg group font-semibold text-lg"
          >
            <PlusCircleIcon className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform duration-500" />
            Tambah Transaksi 
          </button>
        </div>
        
        {/* === Bagian Statistik & Visualisasi (tidak ada perubahan) === */}
        <div className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={ShoppingCartIcon} title="Total Transaksi Hari Ini" value={transactionStats.todayCount} color="bg-blue-400"/>
                <StatCard icon={BanknotesIcon} title="Pendapatan Bulan Ini" value={`Rp ${transactionStats.thisMonthRevenue.toLocaleString('id-ID')}`} color="bg-green-400" />
                <StatCard icon={TagIcon} title="Pembayaran Favorit" value={transactionStats.mostUsedPaymentMethod} color="bg-yellow-400" />
            </div>
        </div>
        <div className="mb-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 bg-white bg-opacity-70 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-700 mb-4 flex items-center">
                    <ChartPieIcon className="h-6 w-6 mr-2 text-pink-500"/>
                    Distribusi Pembayaran
                </h3>
                {transactionStats.pieChartData.length > 0 ? (
                    <PaymentPieChart data={transactionStats.pieChartData} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">Data tidak cukup.</div>
                )}
            </div>
            <div className="lg:col-span-3 bg-white bg-opacity-70 rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-lg text-gray-700 mb-4 flex items-center">
                    <ChartBarIcon className="h-6 w-6 mr-2 text-pink-500"/>
                    Aktivitas 7 Hari Terakhir
                </h3>
                <WeeklyBarChart data={transactionStats.barChartData} />
            </div>
        </div>


        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text" placeholder="Cari berdasarkan nama pelanggan atau item..."
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 shadow-md text-gray-800"
            />
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>
          <select
            value={filterBy} onChange={(e) => setFilterBy(e.target.value)}
            className="p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 shadow-md text-gray-800"
          >
            <option value="all">Semua Transaksi</option>
            <option value="today">Hari Ini</option>
            <option value="thisMonth">Bulan Ini</option>
          </select>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white border-opacity-30 shadow-xl bg-white bg-opacity-50">
          <table className="min-w-full">
            <thead className="bg-white bg-opacity-70 backdrop-blur-sm">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Tanggal & Waktu</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Nama Pelanggan</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Item</th>
                <th className="py-4 px-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Total Harga</th>
                <th className="py-4 px-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 text-lg">Memuat data...</td>
                </tr>
              // =================================================================================
              // === PERUBAHAN 4: Mapping 'currentTransactions' bukan 'filteredTransactions' ===
              // =================================================================================
              ) : currentTransactions && currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="transition-all duration-300 transform hover:bg-white hover:bg-opacity-80 hover:scale-[1.01] even:bg-gray-100"
                  >
                    <td className="py-4 px-6 text-gray-600">{formatDate(transaction.date)}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{transaction.customerName}</td>
                    <td className="py-4 px-6 text-gray-600">
                      <ul className="list-disc list-inside">
                        {Array.isArray(transaction.items) && transaction.items.map((item, index) => (
                          <li key={index}>{item.name} ({item.quantity})</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-bold">Rp {transaction.total.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-6 text-right space-x-4">
                      <div className="inline-block align-middle">
                        <PrintButton transactionData={{
                          ...transaction, 
                          date: formatDate(transaction.date), 
                          items: transaction.items.map(item => ({
                            name: item.name,
                            price: menuItems.find(menu => menu.name === item.name)?.price * item.quantity || 0,
                            quantity: item.quantity,
                          }))
                        }} />
                      </div>
                      <button
                        onClick={() => openModal(transaction)}
                        className="text-yellow-500 hover:text-yellow-600 transition-colors transform hover:scale-110"
                        title="Edit"
                      >
                        <PencilSquareIcon className="h-6 w-6 inline-block" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-500 hover:text-red-600 transition-colors transform hover:scale-110"
                        title="Hapus"
                      >
                        <TrashIcon className="h-6 w-6 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500">
                    <h3 className="text-xl">Tidak ada data transaksi.</h3>
                    <p className="mt-2 text-sm">Tambahkan transaksi baru untuk memulai.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* ========================================================= */}
        {/* === PERUBAHAN 5: Komponen UI untuk tombol Paginasi === */}
        {/* ========================================================= */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full font-semibold text-gray-700 bg-white shadow-md hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`h-10 w-10 rounded-full font-bold shadow-md transition-all duration-200
                  ${currentPage === number + 1 
                    ? 'bg-pink-500 text-white scale-110' 
                    : 'bg-white text-pink-500 hover:bg-pink-100'
                  }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full font-semibold text-gray-700 bg-white shadow-md hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
          </div>
        )}

        {/* --- Bagian Modal (tidak ada perubahan) --- */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} title={isEditing ? 'Edit Transaksi' : 'Tambah Transaksi'}>
            <div className="flex flex-col space-y-5 mt-6">
              <div className="flex items-center space-x-3 w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-800">
                <CalendarDaysIcon className="h-6 w-6 text-pink-500" />
                <span className="text-gray-500">{formatDate(isEditing ? formData.date : new Date().toISOString())}</span>
              </div>
              <div className="flex items-center space-x-3 w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-800">
                <UserCircleIcon className="h-6 w-6 text-pink-500" />
                <input
                  type="text" className="w-full focus:outline-none bg-transparent placeholder-gray-400"
                  placeholder="Nama Pelanggan" value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 max-h-60 overflow-y-auto">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <ListBulletIcon className="h-5 w-5 mr-2 text-pink-500" />
                  Daftar Item
                </h4>
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 mb-3">
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    >
                      <option value="">Pilih Item</option>
                      {menuItems.map((menuItem) => (
                        <option key={menuItem.id} value={menuItem.name}>
                          {menuItem.name} - Rp {menuItem.price.toLocaleString('id-ID')}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number" className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                      placeholder="Qty" min="1" value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                    <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-600 transition-colors">
                      <TrashIcon className="h-6 w-6" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddItem}
                  className="flex items-center text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors mt-2"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-1" />
                  Tambah Item
                </button>
              </div>
              <div className="flex items-center justify-between p-4 border-t border-gray-300 mt-4">
                <div className="font-bold text-gray-800 flex items-center">
                  <ShoppingCartIcon className="h-6 w-6 mr-2 text-pink-500" />
                  Total:
                </div>
                <div className="font-bold text-2xl text-pink-600">
                  Rp {calculateTotal().toLocaleString('id-ID')}
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full p-4 border border-gray-300 rounded-xl bg-white text-gray-800">
                <TagIcon className="h-6 w-6 text-pink-500" />
                <select
                  className="w-full focus:outline-none bg-transparent placeholder-gray-400"
                  value={formData.paymentMethod}
                  onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                >
                  <option value="Tunai">Tunai</option>
                  <option value="Kartu Debit">Kartu Debit</option>
                  <option value="Kartu Kredit">Kartu Kredit</option>
                  <option value="QRIS">QRIS</option>
                </select>
              </div>
              <button 
                onClick={handleSave} 
                className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-pink-600 mt-6 transition-all transform hover:scale-105 duration-300 shadow-lg"
              >
                Simpan
              </button>
            </div>
          </Modal>
        )}
        {isConfirmationModalOpen && (
          <ConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete} />
        )}
      </div>
    </div>
  );
};

export default Transactions;