import React, { useState, useEffect, useMemo } from 'react';

// Impor React-Toastify
import { ToastContainer, toast } from 'react-toastify';
// Catatan: Impor CSS 'react-toastify/dist/ReactToastify.css' dihapus karena menyebabkan error kompilasi di lingkungan ini.
// Anda mungkin perlu menautkan file CSS ini di file HTML utama Anda agar notifikasi tampil dengan benar.

// Impor Recharts untuk grafik
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Ikon dari Heroicons
import {
    UserCircleIcon,
    TrashIcon,
    PencilSquareIcon,
    PlusCircleIcon,
    UserGroupIcon,
    ExclamationCircleIcon,
    MagnifyingGlassIcon,
    ChartPieIcon,
    AtSymbolIcon,
    CalendarDaysIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';

// URL API
const API_URL = 'http://localhost:3001/customers';

const Modal = ({ children, onClose, title }) => (
    <div 
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-filter backdrop-blur-sm z-50 flex justify-center items-center"
        onClick={onClose}
    >
        <div 
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 transform transition-all animate-fade-in-up"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XMarkIcon className="h-7 w-7" />
                </button>
            </div>
            {children}
        </div>
    </div>
);


// Komponen untuk kartu statistik
const StatCard = ({ icon, title, value, color }) => (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg p-6 rounded-2xl shadow-lg flex items-center space-x-4 transition-transform transform hover:scale-105">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', phone: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState({});

    // State untuk paginasi
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Anda bisa mengubah jumlah item per halaman di sini

    // Fungsi untuk mengambil data pelanggan dari API
    const fetchCustomers = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Gagal mengambil data pelanggan');
            }
            const data = await response.json();
            setCustomers(data);
            toast.success("Berhasil memuat data dari API", {
                position: "top-right",
                autoClose: 2000,
            });
        } catch (error) {
            toast.error('Koneksi ke server gagal. Pastikan json-server berjalan.', {
                position: "top-center",
                autoClose: 5000,
            });
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    
    // Menghitung statistik menggunakan useMemo untuk efisiensi
    const stats = useMemo(() => {
        const totalCustomers = customers.length;

        // Hitung pelanggan baru minggu ini
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const newCustomersThisWeek = customers.filter(c => c.id && new Date(c.id) > oneWeekAgo).length;

        // Hitung domain email yang paling banyak digunakan
        const domainCounts = customers.reduce((acc, customer) => {
            if (customer.email && customer.email.includes('@')) {
                const domain = customer.email.split('@')[1];
                if (domain) {
                    acc[domain] = (acc[domain] || 0) + 1;
                }
            }
            return acc;
        }, {});

        const mostFrequentDomain = Object.keys(domainCounts).reduce((a, b) => domainCounts[a] > domainCounts[b] ? a : b, 'N/A');
        
        const domainDataForChart = Object.entries(domainCounts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Urutkan agar yang terbesar di awal

        return {
            totalCustomers,
            newCustomersThisWeek,
            mostFrequentDomain,
            domainData: domainDataForChart,
        };

    }, [customers]);

    // Warna untuk Pie Chart
    const PIE_COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];


    const openModal = (customer = null) => {
        if (customer) {
            setFormData(customer);
            setIsEditing(true);
        } else {
            setFormData({ id: null, name: '', email: '', phone: '' });
            setIsEditing(false);
        }
        setErrors({});
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nama wajib diisi.";
        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Format email tidak valid.";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Nomor telepon wajib diisi.";
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = "Nomor telepon hanya boleh berisi angka.";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            toast.error("Terdapat kesalahan pada formulir.");
            return;
        }

        try {
            if (isEditing) {
                const response = await fetch(`${API_URL}/${formData.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) throw new Error('Gagal memperbarui data pelanggan');
                toast.success("Data pelanggan berhasil diperbarui! 🎉");
            } else {
                const newCustomer = { ...formData, id: new Date().getTime() }; // Gunakan timestamp sebagai ID
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newCustomer),
                });
                if (!response.ok) throw new Error('Gagal menambahkan pelanggan baru');
                toast.success("Pelanggan baru berhasil ditambahkan! ✨");
            }

            fetchCustomers();
            setIsModalOpen(false);
            setErrors({});
        } catch (error) {
            toast.error('Gagal menyimpan data. Cek koneksi server.');
            console.error('Error saving customer:', error);
        }
    };

    const openDeleteModal = (customer) => {
        setCustomerToDelete(customer);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!customerToDelete) return;

        try {
            const response = await fetch(`${API_URL}/${customerToDelete.id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Gagal menghapus data pelanggan');
            
            fetchCustomers();
            toast.info("Data pelanggan berhasil dihapus!🗑️", { position: "bottom-right" });
            setIsDeleteModalOpen(false);
            setCustomerToDelete(null);
        } catch (error) {
            toast.error('Gagal menghapus data. Cek koneksi server.');
            console.error('Error deleting customer:', error);
        }
    };
    
    const filteredCustomers = customers.filter(customer =>
        (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 📄 Logika Paginasi
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const paginatedCustomers = filteredCustomers.slice(indexOfFirst, indexOfLast);

    const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

    // Reset ke halaman pertama setiap kali ada pencarian baru
    useEffect(() => { setCurrentPage(1); }, [searchTerm]);


    return (
        <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                    <UserGroupIcon className="h-12 w-12 text-pink-500 animate-bounce-slow" />
                    <h2 className="text-4xl font-extrabold text-pink-700 tracking-wide drop-shadow-lg">Manajemen Pelanggan</h2>
                </div>
                <button
                    onClick={() => openModal()}
                    className="flex items-center bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-all transform hover:scale-105 duration-300 shadow-lg group active:scale-95"
                >
                    <PlusCircleIcon className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="font-semibold text-lg">Tambah Pelanggan</span>
                </button>
            </div>

            {/* Bagian Statistik & Insight */}
            <div className="mb-8">
                 <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center"><ChartPieIcon className="h-7 w-7 mr-2 text-pink-500"/> Statistik & Insight</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                     <StatCard 
                         icon={<UserGroupIcon className="h-6 w-6 text-white"/>}
                         title="Total Pelanggan"
                         value={stats.totalCustomers}
                         color="bg-blue-400"
                     />
                      <StatCard 
                         icon={<CalendarDaysIcon className="h-6 w-6 text-white"/>}
                         title="Baru Minggu Ini"
                         value={stats.newCustomersThisWeek}
                         color="bg-green-400"
                     />
                      <StatCard 
                         icon={<AtSymbolIcon className="h-6 w-6 text-white"/>}
                         title="Domain Teratas"
                         value={stats.mostFrequentDomain}
                         color="bg-yellow-400"
                     />
                    
                     <div className="md:col-span-2 lg:col-span-2 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg p-4 rounded-2xl shadow-lg">
                         <h4 className="font-semibold text-gray-700 mb-2 text-center">Distribusi Domain Email</h4>
                         {stats.domainData.length > 0 ? (
                              <ResponsiveContainer width="100%" height={200}>
                                  <PieChart>
                                      <Pie
                                          data={stats.domainData}
                                          cx="50%"
                                          cy="50%"
                                          labelLine={false}
                                          outerRadius={80}
                                          fill="#8884d8"
                                          dataKey="value"
                                          nameKey="name"
                                      >
                                          {stats.domainData.map((entry, index) => (
                                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                          ))}
                                      </Pie>
                                      <Tooltip formatter={(value, name) => [`${value} pelanggan`, name]} />
                                      <Legend iconSize={10} />
                                  </PieChart>
                              </ResponsiveContainer>
                         ) : (
                             <div className="flex items-center justify-center h-full text-gray-500">
                                 Belum ada data untuk ditampilkan.
                             </div>
                         )}
                     </div>
                 </div>
            </div>

            <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Cari pelanggan berdasarkan nama atau email..."
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white border-opacity-30 shadow-md bg-white bg-opacity-50">
                <table className="min-w-full">
                      <thead className="bg-white bg-opacity-70">
                          <tr>
                              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Nama</th>
                              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Email</th>
                              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">Telepon</th>
                              <th className="py-4 px-6 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">Aksi</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                          {paginatedCustomers.length > 0 ? (
                              paginatedCustomers.map((customer) => (
                                  <tr
                                      key={customer.id}
                                      className="border-t border-white border-opacity-30 transition-all duration-300 hover:bg-white hover:bg-opacity-80 transform hover:scale-[1.01] animate-fade-in-down"
                                  >
                                      <td className="py-3 px-4 text-gray-800 font-medium flex items-center space-x-2">
                                          <UserCircleIcon className="h-5 w-5 text-pink-500" />
                                          <span>{customer.name}</span>
                                      </td>
                                      <td className="py-3 px-4 text-gray-600">{customer.email}</td>
                                      <td className="py-3 px-4 text-gray-600">{customer.phone}</td>
                                      <td className="py-3 px-4 text-right space-x-3">
                                          <button
                                              onClick={() => openModal(customer)}
                                              className="text-yellow-500 hover:text-yellow-700 transition-colors transform hover:scale-125 active:scale-110"
                                              title="Edit"
                                          >
                                              <PencilSquareIcon className="h-6 w-6 inline-block" />
                                          </button>
                                          <button
                                              onClick={() => openDeleteModal(customer)}
                                              className="text-red-500 hover:text-red-700 transition-colors transform hover:scale-125 active:scale-110"
                                              title="Hapus"
                                          >
                                              <TrashIcon className="h-6 w-6 inline-block" />
                                          </button>
                                      </td>
                                  </tr>
                              ))
                          ) : (
                              <tr>
                                  <td colSpan="4" className="py-12 text-center text-gray-500">
                                      <h3 className="text-xl font-semibold">
                                          {searchTerm ? "Tidak ada pelanggan yang cocok." : "Tidak ada data pelanggan."}
                                      </h3>
                                      <p className="mt-2 text-sm">
                                          {searchTerm ? "Coba kata kunci lain atau tambahkan pelanggan baru." : "Tambahkan pelanggan baru untuk memulai."}
                                      </p>
                                  </td>
                              </tr>
                          )}
                      </tbody>
                </table>
                {/* Kontrol Paginasi */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center px-6 py-3 bg-white bg-opacity-70">
                        <span className="text-sm text-gray-700">
                            Menampilkan <span className="font-semibold">{indexOfFirst + 1}</span> - <span className="font-semibold">{Math.min(indexOfLast, filteredCustomers.length)}</span> dari <span className="font-semibold">{filteredCustomers.length}</span> pelanggan
                        </span>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={handlePrev} 
                                disabled={currentPage === 1}
                                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-pink-100 transition-colors"
                            >
                                <ChevronLeftIcon className="h-5 w-5"/>
                            </button>
                            <span className="text-sm font-semibold text-gray-800">
                                Halaman {currentPage} dari {totalPages}
                            </span>
                            <button 
                                onClick={handleNext} 
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 hover:bg-pink-100 transition-colors"
                            >
                                <ChevronRightIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)} title={isEditing ? 'Edit Pelanggan' : 'Tambah Pelanggan'}>
                    <div className="flex flex-col space-y-5 mt-4">
                        <div>
                            <input
                                type="text"
                                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all w-full ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}`}
                                placeholder="Nama Lengkap"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    if (errors.name) setErrors({ ...errors, name: null });
                                }}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <input
                                type="email"
                                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all w-full ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}`}
                                placeholder="Alamat Email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (errors.email) setErrors({ ...errors, email: null });
                                }}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <input
                                type="tel"
                                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 transition-all w-full ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-pink-300 focus:ring-pink-400'}`}
                                placeholder="Nomor Telepon"
                                value={formData.phone}
                                onChange={(e) => {
                                    setFormData({ ...formData, phone: e.target.value });
                                    if (errors.phone) setErrors({ ...errors, phone: null });
                                }}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <button onClick={handleSave} className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 mt-4 transition-colors transform hover:scale-105 duration-300 shadow-lg active:scale-95">
                            Simpan
                        </button>
                    </div>
                </Modal>
            )}

            {isDeleteModalOpen && (
                <Modal onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Penghapusan">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <ExclamationCircleIcon className="h-20 w-20 text-red-500 animate-bounce-slow" />
                        <p className="text-lg font-medium text-gray-700">
                            Apakah Anda yakin ingin menghapus pelanggan <strong>{customerToDelete?.name}</strong>?
                        </p>
                        <p className="text-sm text-gray-500">
                            Aksi ini tidak bisa dibatalkan.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors active:scale-95"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors active:scale-95"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Customers;

