import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// === PERUBAHAN DIMULAI: 8. Indikator Loading pada Tombol “Simpan” ===
// Mengimpor spinner dari react-spinners
import { ClipLoader } from 'react-spinners';
// === PERUBAHAN SELESAI ===

// Ikon Heroicons (tidak ada perubahan)
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ShoppingBagIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';

// Komponen Layar Pemuatan (Loading Screen) (tidak ada perubahan)
const StrawberryLoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 overflow-hidden animate-fade-in">
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
          src="/images/strawberry.png" 
          alt="Loading Strawberry" 
          className="w-48 h-48 animate-spin-slow drop-shadow-2xl" 
        />
        <p className="mt-8 text-2xl font-bold text-white tracking-widest drop-shadow-lg animate-pulse">
          Loading Sweetness...
        </p>
      </div>
    </div>
  );
};

// Komponen Modal (tidak ada perubahan)
const Modal = ({ onClose, title, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 shadow-2xl w-full max-w-md transform scale-100 transition-transform duration-300 animate-scale-up border border-gray-300">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300 mb-4">
          <h3 className="text-xl font-bold text-gray-800 drop-shadow-sm">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: '',
    isAvailable: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('default');
  const audioRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // === PERUBAHAN DIMULAI: 8. Indikator Loading pada Tombol “Simpan” ===
  // State untuk melacak status penyimpanan
  const [isSaving, setIsSaving] = useState(false);
  // === PERUBAHAN SELESAI ===

  useEffect(() => {
    const fetchMenuFromAPI = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      try {
        const response = await fetch('http://localhost:3001/menuItems');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMenuItems(data);
        toast.success("Berhasil memuat data dari API!");
      } catch (error) {
        console.error("Gagal memuat menu:", error);
        toast.error("Gagal memuat menu dari server. Pastikan server sudah berjalan.");
      } finally {
        setLoading(false);
      }
    };
    fetchMenuFromAPI();
  }, []);

  useEffect(() => {
    if (loading) {
      audioRef.current?.play().catch(error => {
        console.warn("Audio autoplay was prevented:", error);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [loading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, sortBy]);

  const openModal = (item = null) => {
    if (item) {
      setFormData({ ...item, isAvailable: item.isAvailable !== undefined ? item.isAvailable : true });
      setImagePreview(item.image);
      setIsEditing(true);
    } else {
      setFormData({ id: null, name: '', category: '', price: '', stock: '', description: '', image: '', isAvailable: true });
      setImagePreview('');
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
        toast.error("Nama dan harga harus diisi!");
        return;
      }
    
    // === PERUBAHAN DIMULAI: 8. Indikator Loading pada Tombol “Simpan” ===
    setIsSaving(true);
    // === PERUBAHAN SELESAI ===

    // Menambahkan delay agar spinner terlihat
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        if (isEditing) {
          await fetch(`http://localhost:3001/menuItems/${formData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          setMenuItems(menuItems.map(m => m.id === formData.id ? formData : m));
          toast.success("Menu berhasil diperbarui!");
        } else {
          const newId = menuItems.length ? Math.max(...menuItems.map(m => Number(m.id))) + 1 : 1;
          const itemToSave = { ...formData, id: newId };
          await fetch('http://localhost:3001/menuItems', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemToSave),
          });
          setMenuItems([...menuItems, itemToSave]);
          toast.success("Menu baru berhasil ditambahkan!");
        }
    } catch (error) {
        console.error("Gagal menyimpan menu:", error);
        toast.error("Gagal menyimpan menu ke server.");
    } finally {
        // === PERUBAHAN DIMULAI: 8. Indikator Loading pada Tombol “Simpan” ===
        setIsSaving(false);
        // === PERUBAHAN SELESAI ===
        setIsModalOpen(false);
    }
  };
  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };
  const handleDelete = async () => {
    if (itemToDelete) {
        try {
          await fetch(`http://localhost:3001/menuItems/${itemToDelete.id}`, {
            method: 'DELETE',
          });
          setMenuItems(menuItems.filter(m => m.id !== itemToDelete.id));
          toast.info("Menu berhasil dihapus!");
        } catch (error) {
          console.error("Gagal menghapus menu:", error);
          toast.error("Gagal menghapus menu dari server.");
        }
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
      }
  };
  const handleToggleAvailability = async (item) => {
    const updatedItem = { ...item, isAvailable: !item.isAvailable };
    try {
      await fetch(`http://localhost:3001/menuItems/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });
      setMenuItems(menuItems.map(m => m.id === item.id ? updatedItem : m));
      toast.success(`Status ${item.name} berhasil diubah!`);
    } catch (error) {
      console.error("Gagal mengubah status:", error);
      toast.error("Gagal mengubah status item.");
    }
  };
  const filteredItems = menuItems.filter(item => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Semua' || item.category === filterCategory;
    return matchesSearchTerm && matchesCategory;
  });
  const sortedAndFilteredItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
        case 'price-asc':
            return parseFloat(String(a.price).replace(/\./g, '')) - parseFloat(String(b.price).replace(/\./g, ''));
        case 'price-desc':
            return parseFloat(String(b.price).replace(/\./g, '')) - parseFloat(String(a.price).replace(/\./g, ''));
        case 'name-asc':
            return a.name.localeCompare(b.name);
        case 'name-desc':
            return b.name.localeCompare(a.name);
        default:
            return 0;
    }
  });
  const uniqueCategories = ['Semua', ...new Set(menuItems.map(item => item.category))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAndFilteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  
  if (loading) {
    return (
      <>
        <audio ref={audioRef} src="/music/strawberry-theme.mp3" loop />
        <StrawberryLoadingScreen />
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            to { transform: rotate(300deg) scale(1); }
          }
          .animate-spin-slow { animation: spin-slow 4s linear infinite; }
          @keyframes float-up {
            0% { transform: translateY(0); opacity: 0; }
            10%, 90% { opacity: 0.7; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
          .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </>
    );
  }

  return (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-2xl animate-fade-in-slow">
      <audio ref={audioRef} src="/music/strawberry-theme.mp3" loop />
      <div className="relative z-10">
        {/* Header (tidak ada perubahan) */}
        <div className="flex justify-between items-center mb-6 flex-col sm:flex-row space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <ShoppingBagIcon className="h-12 w-12 text-pink-500 animate-pulse-fast" />
            <h2 className="text-4xl font-extrabold text-pink-700 tracking-wide drop-shadow-lg">
              Daftar Menu Makanan
            </h2>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-all transform hover:scale-110 duration-500 shadow-lg group font-semibold text-lg"
          >
            <PlusCircleIcon className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform duration-500" />
            Tambah Menu
          </button>
        </div>

        {/* Filter dan Pencarian (tidak ada perubahan) */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="Cari menu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 shadow-md text-gray-800"
                />
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 shadow-md text-gray-800"
            >
                {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300 shadow-md text-gray-800"
            >
                <option value="default">Urutkan...</option>
                <option value="name-asc">Nama (A-Z)</option>
                <option value="name-desc">Nama (Z-A)</option>
                <option value="price-asc">Harga (Termurah)</option>
                <option value="price-desc">Harga (Termahal)</option>
            </select>
        </div>
        
        {currentItems.length > 0 ? (
          <>
            <div 
              key={currentPage} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-page"
            >
              {currentItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`
                    bg-white bg-opacity-50 backdrop-filter backdrop-blur-md p-6 rounded-3xl shadow-xl flex flex-col items-center group relative overflow-hidden 
                    transition-all duration-400 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl
                    ${!item.isAvailable ? 'grayscale opacity-60' : ''} 
                    animate-item-enter
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {!item.isAvailable && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 transform -rotate-12 shadow-lg">
                      HABIS
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></div>
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative flex items-center justify-center shadow-lg border-4 border-white transform group-hover:rotate-3 transition-transform duration-500">
                    {/* === PERUBAHAN DIMULAI: 7. Animasi Hover pada Gambar Menu === */}
                    {/* Mengganti 'group-hover:scale-110' dengan 'group-hover:-translate-y-[5px] group-hover:scale-105' */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 transform group-hover:-translate-y-[5px] group-hover:scale-105" 
                    />
                    {/* === PERUBAHAN SELESAI === */}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 text-center mb-1 drop-shadow-sm">{item.name}</h3>
                  <p className="text-sm text-gray-600 text-center px-2 mb-2">{item.description}</p>
                  <p className="text-xl font-bold text-pink-500 mt-auto drop-shadow">
                    Rp {item.price}
                  </p>
                  <div className="flex w-full flex-col space-y-2 mt-4">
                    <button
                      onClick={() => handleToggleAvailability(item)}
                      className={`w-full py-2 rounded-xl text-sm font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2
                        ${item.isAvailable ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}
                      `}
                    >
                      {item.isAvailable ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                      <span>{item.isAvailable ? 'Tandai Habis' : 'Tandai Tersedia'}</span>
                    </button>
                    <div className="flex w-full space-x-2">
                      <button
                        onClick={() => openModal(item)}
                        className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-purple-500 hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
                      >
                        <PencilSquareIcon className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(item)}
                        className="flex-1 py-2 rounded-xl text-sm font-bold text-white bg-pink-500 hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Paginasi (tidak ada perubahan) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-10 space-x-2">
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
          </>
        ) : (
          // === PERUBAHAN DIMULAI: 2. Tampilan “Empty State” yang Lebih Manis ===
          // Mengganti teks polos dengan komponen yang lebih menarik
          <div className="flex flex-col items-center justify-center py-16">
            <img src="/images/empty-state.png" alt="No Menu" className="w-48 h-48 opacity-80" />
            <p className="text-gray-500 text-lg mt-4">Belum ada menu yang cocok 🍰</p>
          </div>
          // === PERUBAHAN SELESAI ===
        )}

        {/* Modal */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)} title={isEditing ? 'Edit Menu' : 'Tambah Menu'}>
              <div className="flex flex-col space-y-4 mt-4">
                  <input type="text" className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" placeholder="Nama Item" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input type="text" className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" placeholder="Kategori" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
                  <input type="text" className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" placeholder="Harga (contoh: 38.000)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                  <input type="number" className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" placeholder="Stok" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                  <textarea className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" placeholder="Deskripsi Item" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  <div className="flex items-center space-x-3">
                      <input
                          type="checkbox"
                          id="isAvailable"
                          className="h-5 w-5 text-pink-500 border-pink-300 rounded focus:ring-pink-400"
                          checked={formData.isAvailable}
                          onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                      />
                      <label htmlFor="isAvailable" className="font-medium text-gray-800">
                          Item Tersedia
                      </label>
                  </div>
                  <label className="block text-sm font-medium text-gray-800">Foto Item:</label>
                  <input type="file" accept="image/*" className="p-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-800" onChange={handleImageUpload} />
                  {imagePreview && (
                      <div className="mt-2 text-center">
                          <img src={imagePreview} alt="Pratinjau" className="max-h-40 mx-auto rounded-lg shadow-md" />
                      </div>
                  )}

                  {/* === PERUBAHAN DIMULAI: 8. Indikator Loading pada Tombol “Simpan” === */}
                  <button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="flex items-center justify-center bg-pink-500 text-white px-4 py-3 rounded-lg hover:bg-pink-600 mt-4 transition-colors transform hover:scale-105 duration-8000 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <>
                        <ClipLoader color={"#ffffff"} size={20} />
                        <span className="ml-2">Menyimpan...</span>
                      </>
                    ) : (
                      'Simpan'
                    )}
                  </button>
                  {/* === PERUBAHAN SELESAI === */}

              </div>
          </Modal>
        )}
        {isDeleteModalOpen && (
              <Modal onClose={() => setIsDeleteModalOpen(false)} title="Konfirmasi Penghapusan">
                  <div className="flex flex-col items-center justify-center space-y-4 text-center">
                      <ExclamationCircleIcon className="h-20 w-20 text-red-500 animate-bounce-slow" />
                      <p className="text-lg font-medium text-gray-700">
                          Apakah Anda yakin ingin menghapus menu **{itemToDelete?.name}**?
                      </p>
                      <p className="text-sm text-gray-500">
                          Aksi ini tidak bisa dibatalkan.
                      </p>
                      <div className="flex space-x-4 mt-6">
                          <button
                              onClick={() => setIsDeleteModalOpen(false)}
                              className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                          >
                              Batal
                          </button>
                          <button
                              onClick={handleDelete}
                              className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                          >
                              Hapus
                          </button>
                      </div>
                  </div>
              </Modal>
        )}
      </div>
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
      
      <style>{`
        @keyframes item-enter-sweet {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.98) rotate(-2deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }
        .animate-item-enter {
          animation: item-enter-sweet 0.9s ease-in-out forwards;
          opacity: 0;
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%) skewX(-20deg); }
            100% { transform: translateX(200%) skewX(-20deg); }
        }
        .animate-shimmer {
            animation: shimmer 1.5s infinite;
        }
        @keyframes fade-page {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-page { 
            animation: fade-page 0.5s ease; 
        }
      `}</style>
    </div>
  );
};

export default Menu;