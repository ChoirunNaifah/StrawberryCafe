import React from 'react';

const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-20 backdrop-filter backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 w-1/3 shadow-2xl relative">
        <h3 className="text-2xl font-bold mb-4 text-pink-600">{title}</h3>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-light transition-colors">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;