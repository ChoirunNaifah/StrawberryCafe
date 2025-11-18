import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Struk from './Struk'; 
import { DownloadIcon } from '@heroicons/react/24/solid';

// Pastikan komponen Modal ada di sini atau diimpor
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

const PrintPreviewModal = ({ transactionData, onClose }) => {
  const handleDownload = async () => {
    // Cari elemen struk berdasarkan ID yang kita tetapkan
    const strukElement = document.getElementById('struk-preview'); 
    
    if (!strukElement) {
      console.error('Elemen struk tidak ditemukan!');
      return;
    }

    const canvas = await html2canvas(strukElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [canvas.width * 0.264583, canvas.height * 0.264583],
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`struk_${transactionData.customerName.replace(/\s+/g, '_')}_${transactionData.id}.pdf`);
  };

  return (
    <Modal onClose={onClose} title="Pratinjau Struk">
      <div className="flex flex-col items-center">
        {/* Konten struk yang akan ditampilkan */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-4 overflow-y-auto max-h-96">
          <Struk transaction={transactionData} id="struk-preview" />
        </div>
        
        <button
          onClick={handleDownload}
          className="flex items-center bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-all transform hover:scale-105 duration-300 shadow-lg font-semibold mt-4"
        >
          <DownloadIcon className="h-5 w-5 mr-2" />
          Download Struk PDF
        </button>
      </div>
    </Modal>
  );
};

export default PrintPreviewModal;