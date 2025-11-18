import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactDOM from 'react-dom/client';
import { PrinterIcon } from '@heroicons/react/24/solid';
import Struk from './Struk'; // Impor komponen Struk

const PrintButton = ({ transactionData }) => {
  const handlePrint = async () => {
    // 1. Buat elemen div tersembunyi untuk merender komponen Struk
    const receiptContainer = document.createElement('div');
    receiptContainer.style.position = 'absolute';
    receiptContainer.style.left = '-9999px';
    document.body.appendChild(receiptContainer);

    // 2. Render komponen Struk ke dalam elemen div yang tersembunyi
    const root = ReactDOM.createRoot(receiptContainer);
    root.render(<Struk transaction={transactionData} />);

    // Beri sedikit jeda agar komponen selesai di-render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // 3. Ambil "screenshot" dari konten yang di-render
    const canvas = await html2canvas(receiptContainer, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // 4. Buat instance jsPDF dengan ukuran yang pas
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [canvas.width * 0.264583, canvas.height * 0.264583], // Konversi px ke mm
    });

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // 5. Tambahkan gambar ke PDF dan simpan file
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(
      `struk_${transactionData.customerName.replace(/\s+/g, '_')}_${transactionData.id}.pdf`
    );

    // 6. Hapus elemen div yang tersembunyi setelah selesai
    document.body.removeChild(receiptContainer);
  };

  return (
    <button
      onClick={handlePrint}
      className="text-blue-500 hover:text-blue-600 transition-colors transform hover:scale-110"
      title="Cetak Struk"
    >
      <PrinterIcon className="h-6 w-6 inline-block" />
    </button>
  );
};

export default PrintButton;