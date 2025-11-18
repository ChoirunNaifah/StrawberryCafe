import React, { useState, useEffect, useMemo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// Import CSS untuk react-toastify tidak lagi diperlukan di lingkungan ini.

// Impor komponen dari Recharts
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';

// Ikon dari Heroicons
import {
  BriefcaseIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  UsersIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';

// --- PERBAIKAN: Komponen Modal didefinisikan di dalam file yang sama ---
const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-fade-in-up">
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};


// URL API Anda
const API_URL = 'http://localhost:3001/karyawan';

const availablePositions = [
  'Manager', 'Head Chef', 'Cook', 'Kasir', 'Barista', 'Waiter', 'Waitress', 'Marketing'
].sort();

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: '', position: '', email: '', phone: '', status: 'Aktif', gender: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePieIndex, setActivePieIndex] = useState(0);

  // State untuk Paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Gagal mengambil data karyawan');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      toast.error('Koneksi ke server gagal. Pastikan json-server berjalan.', { position: "top-center" });
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const stats = useMemo(() => {
    const total = employees.length;
    const positionCounts = employees.reduce((acc, emp) => ({ ...acc, [emp.position]: (acc[emp.position] || 0) + 1 }), {});
    const genderCounts = employees.reduce((acc, emp) => ({ ...acc, [emp.gender]: (acc[emp.gender] || 0) + 1 }), {});
    
    const positionData = Object.entries(positionCounts).map(([name, value]) => ({ name, jumlah: value }));
    const genderData = Object.entries(genderCounts).map(([name, value]) => ({ name, jumlah: value }));

    return { total, positionData, genderData };
  }, [employees]);

  const filteredEmployees = useMemo(() => employees
    .filter(employee => selectedPosition === 'All' || employee.position === selectedPosition)
    .filter(employee => {
      const query = searchQuery.toLowerCase();
      // Pastikan semua field ada sebelum memanggil toLowerCase
      const name = employee.name || '';
      const email = employee.email || '';
      return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
    }), [employees, selectedPosition, searchQuery]);
  
  // Logika paginasi
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredEmployees.length, totalPages, currentPage]);


  const uniquePositions = ['All', ...availablePositions];

  const openModal = (employee = null) => {
    if (employee) {
      setFormData(employee);
      setIsEditing(true);
    } else {
      setFormData({ id: null, name: '', position: '', email: '', phone: '', status: 'Aktif', gender: '' });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.position || !formData.email || !formData.phone || !formData.status || !formData.gender) {
      toast.error("Semua field harus diisi!");
      return;
    }

    try {
      let url = API_URL;
      let method = 'POST';
      const employeeData = { ...formData };

      if (isEditing) {
        url = `${API_URL}/${formData.id}`;
        method = 'PUT';
      } else {
        delete employeeData.id;
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) throw new Error(`Gagal ${isEditing ? 'memperbarui' : 'menambahkan'} data`);
      
      toast.success(`Data karyawan berhasil ${isEditing ? 'diperbarui' : 'ditambahkan'}!`);
      fetchEmployees();
      setIsModalOpen(false);

    } catch (error) {
      toast.error('Gagal menyimpan data. Cek koneksi server.');
      console.error('Error saving employee:', error);
    }
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    try {
      const response = await fetch(`${API_URL}/${employeeToDelete.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Gagal menghapus data karyawan');
      
      fetchEmployees();
      toast.info("Data karyawan berhasil dihapus!", { position: "bottom-right" });
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    } catch (error) {
      toast.error('Gagal menghapus data. Cek koneksi server.');
      console.error('Error deleting employee:', error);
    }
  };

  const renderStatusBadge = (status) => {
    const styles = {
      'Aktif': 'bg-green-100 text-green-800', 'Cuti': 'bg-yellow-100 text-yellow-800', 'Tidak Aktif': 'bg-red-100 text-red-800',
    };
    const text = { 'Aktif': '✅ Aktif', 'Cuti': '⏸️ Cuti', 'Tidak Aktif': '❌ Tidak Aktif' };
    return <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status] || 'bg-gray-100'}`}>{text[status] || status}</span>;
  };
  
  const renderPositionBadge = (position) => {
    const positionColors = {
        'Manager': 'bg-purple-100 text-purple-800',
        'Head Chef': 'bg-orange-100 text-orange-800',
        'Cook': 'bg-orange-100 text-orange-800',
        'Marketing': 'bg-indigo-100 text-indigo-800',
        'Default': 'bg-blue-100 text-blue-800',
    };
    const category = ['Manager', 'Head Chef', 'Cook', 'Marketing'].includes(position) ? position : 'Default';
    return <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${positionColors[category]}`}><BriefcaseIcon className="h-4 w-4 mr-1.5" />{position}</span>;
  };

  const GENDER_COLORS = { 'Pria': '#3b82f6', 'Wanita': '#ec4899', 'Lainnya': '#6b7280' };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props;
    return (
      <g>
        <text x={cx} y={cy} dy={-5} textAnchor="middle" fill={fill} fontSize={18} fontWeight="bold">{payload.name}</text>
        <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#333">{`${payload.jumlah} Karyawan`}</text>
        <text x={cx} y={cy} dy={35} textAnchor="middle" fill="#666">{`( ${(percent * 100).toFixed(1)}% )`}</text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      </g>
    );
  };

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <UsersIcon className="h-12 w-12 text-pink-500 animate-spin-slow" />
          <h2 className="text-4xl font-extrabold text-pink-700 tracking-wide drop-shadow-lg">Manajemen Karyawan</h2>
        </div>
        <button onClick={() => openModal()} className="flex items-center bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all transform hover:scale-110 duration-500 shadow-lg group font-semibold text-lg">
          <PlusCircleIcon className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span>Tambah Karyawan</span>
        </button>
      </div>

      <div className="mb-8 p-6 bg-white bg-opacity-50 rounded-2xl shadow-md border border-white border-opacity-30">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Ringkasan Karyawan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center p-4 bg-blue-100 rounded-lg shadow">
              <UserGroupIcon className="h-10 w-10 text-blue-500 mr-4"/>
              <div>
                <p className="text-sm text-blue-700 font-medium">Total Karyawan</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg flex flex-col items-center justify-center shadow">
              <p className="font-semibold text-pink-700 mb-2">Distribusi Gender</p>
              <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                      <Pie data={stats.genderData} dataKey="jumlah" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={40} activeIndex={activePieIndex} activeShape={renderActiveShape} onMouseEnter={(_, index) => setActivePieIndex(index)}>
                        {stats.genderData.map((entry, index) => <Cell key={`cell-${index}`} fill={GENDER_COLORS[entry.name]} />)}
                      </Pie>
                  </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold text-gray-700 mb-2 text-center">Karyawan per Jabatan</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.positionData} margin={{ top: 5, right: 20, left: -15, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} interval={0} angle={-25} textAnchor="end" height={50}/>
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="jumlah" fill="#ec4899" name="Jumlah"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label htmlFor="position-filter" className="text-gray-700 font-medium">Filter Jabatan:</label>
          <select id="position-filter" value={selectedPosition} onChange={(e) => {setSelectedPosition(e.target.value); setCurrentPage(1);}} className="rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
            {uniquePositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
          </select>
        </div>
        <div className="relative">
          <input type="text" placeholder="Cari nama atau email..." value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}} className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm w-64"/>
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white border-opacity-30 shadow-md bg-white bg-opacity-50">
        <table className="min-w-full">
          <thead className="bg-white bg-opacity-70">
            <tr>
              {['Nama', 'Jabatan', 'Status', 'Email', 'Telepon'].map(head => <th key={head} className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">{head}</th>)}
              <th className="py-4 px-6 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-pink-50 hover:bg-opacity-50 transition-colors duration-200">
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${employee.name}&background=e879f9&color=fff&bold=true`} alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-xs text-gray-500">{employee.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{renderPositionBadge(employee.position)}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{renderStatusBadge(employee.status)}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{employee.phone}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal(employee)} className="text-indigo-600 hover:text-indigo-900 mx-2 transform hover:scale-110 transition-transform duration-200"><PencilSquareIcon className="h-6 w-6" /></button>
                    <button onClick={() => openDeleteModal(employee)} className="text-red-600 hover:text-red-900 mx-2 transform hover:scale-110 transition-transform duration-200"><TrashIcon className="h-6 w-6" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                <div className="text-2xl mb-2">🚫</div>
                <h3 className="text-lg font-semibold">Data Tidak Ditemukan</h3>
                <p>{searchQuery ? `Tidak ada karyawan dengan nama/email "${searchQuery}".` : 'Belum ada data karyawan.'}</p>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 px-2">
            <span className="text-sm text-gray-700">
                Menampilkan <span className="font-semibold">{indexOfFirstItem + 1}</span> - <span className="font-semibold">{Math.min(indexOfLastItem, filteredEmployees.length)}</span> dari <span className="font-semibold">{filteredEmployees.length}</span> hasil
            </span>
            <div className="flex items-center space-x-2">
                <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                Sebelumnya
                </button>
                <span className="text-sm text-gray-700">
                    Halaman <span className="font-semibold">{currentPage}</span> / {totalPages}
                </span>
                <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg shadow-md hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                Berikutnya
                </button>
            </div>
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} title={isEditing ? 'Edit Karyawan' : 'Tambah Karyawan'}>
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Jabatan</label>
                <select value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                    <option value="">-- Pilih Jabatan --</option>
                    {availablePositions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                        <option value="Aktif">Aktif</option><option value="Cuti">Cuti</option><option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm">
                        <option value="">-- Pilih Gender --</option><option value="Pria">Pria</option><option value="Wanita">Wanita</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Telepon</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"/>
            </div>
            <div className="flex justify-end pt-4 space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">Batal</button>
                <button type="button" onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600">Simpan</button>
            </div>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Penghapusan">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <ExclamationTriangleIcon className="h-20 w-20 text-red-500 animate-bounce-slow" />
            <p className="text-lg font-medium text-gray-700">Yakin ingin menghapus <strong>{employeeToDelete?.name}</strong>?</p>
            <p className="text-sm text-gray-500">Aksi ini tidak bisa dibatalkan.</p>
            <div className="flex space-x-4 mt-6">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 active:scale-95">Batal</button>
              <button onClick={handleDelete} className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 active:scale-95">Hapus</button>
            </div>
          </div>
        </Modal>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default Employees;

