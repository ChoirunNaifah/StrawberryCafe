import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid'; // Menggunakan ikon Sparkles untuk kesan ceria

const Struk = ({ transaction }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-pink-200 p-8 shadow-2xl rounded-2xl border-2 border-pink-300 font-sans text-gray-800" style={{ width: '350px' }}>
      <div className="text-center mb-6 border-b-2 border-pink-400 pb-4">
        <SparklesIcon className="h-16 w-16 mx-auto text-pink-600 mb-2 animate-pulse" /> {/* Ikon Sparkles */}
        <h2 className="text-3xl font-extrabold text-pink-700 tracking-wide drop-shadow-md">Strawberry Cafe</h2>
        <p className="text-sm text-pink-500 font-medium">Harmoni Rasa dalam Setiap Sajian</p>
      </div>

      <div className="text-sm mb-6 space-y-2">
        <div className="flex justify-between items-center text-gray-700">
          <span className="font-semibold text-pink-600">Tanggal:</span>
          <span>{transaction.date}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="font-semibold text-pink-600">Pelanggan:</span>
          <span className="font-medium">{transaction.customerName || 'Umum'}</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="font-semibold text-pink-600">Metode Bayar:</span>
          <span className="font-medium">{transaction.paymentMethod}</span>
        </div>
      </div>

      <div className="mb-6 bg-white bg-opacity-70 p-4 rounded-lg shadow-inner">
        <h3 className="text-lg font-bold border-b border-pink-300 pb-2 mb-3 text-pink-700 flex items-center">
          Daftar Item
        </h3>
        {transaction.items && transaction.items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-900 font-medium">{item.name} ({item.quantity})</span>
            <span className="text-gray-800">{formatRupiah(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-pink-400 pt-4 flex justify-between items-center font-bold text-lg text-pink-700">
        <span className="text-xl">Total:</span>
        <span className="text-2xl drop-shadow-sm">{formatRupiah(transaction.total)}</span>
      </div>

      <p className="text-center mt-6 text-pink-600 font-semibold text-base italic">
        Terimakasih datang kembali yaa!!
      </p>
    </div>
  );
};

export default Struk;