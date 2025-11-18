import React from 'react';
import { 
  CakeIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/solid';

// Ikon SVG untuk logo Google
const GoogleIcon = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.828 6.22C34.556 2.444 29.61 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.563-.14-3.123-.401-4.665z"/>
    <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.867-5.867C34.556 2.444 29.61 0 24 0C16.74 0 10.766 4.376 6.306 10.691z"/>
    <path fill="#4CAF50" d="M24 48c5.61 0 10.556-2.444 14.828-6.22l-6.571-4.819C29.919 41.108 25.613 44 20.5 44c-5.166 0-9.676-2.449-12.7-6.221l-6.571 4.819C10.766 43.624 16.74 48 24 48z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l38.828 6.22C34.556 2.444 29.61 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.563-.14-3.123-.401-4.665z"/>
  </svg>
);

// Komponen Gembok Kecil Modern
const FloatingLock = ({ delay }) => (
  <div 
    className={`absolute w-10 h-10 animate-float-delayed z-20`}
    style={{ animationDelay: `${delay}s`, transform: 'rotate(15deg)' }}
  >
    {/* Shackle/Loop atas */}
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-t-full bg-slate-300 shadow-md"></div>
    {/* Body/Badan Gembok */}
    <div className="absolute top-3 w-8 h-8 bg-white rounded-lg shadow-xl border border-slate-100 flex items-center justify-center">
      {/* Detail lubang kunci */}
      <div className="w-2 h-2 rounded-full bg-red-400"></div>
    </div>
  </div>
);

// --- KOMPONEN BARU START ---

// Komponen Kunci Mengambang
const FloatingKey = ({ delay, className }) => (
  <div 
    className={`absolute w-12 h-6 animate-float ${className} z-20`}
    style={{ animationDelay: `${delay}s`, transform: 'rotate(-30deg)' }}
  >
    {/* Kepala Kunci */}
    <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-red-400"></div>
    </div>
    {/* Batang Kunci */}
    <div className="absolute top-2 left-5 w-6 h-2 bg-slate-300 rounded-sm shadow-md"></div>
    {/* Gigi Kunci */}
    <div className="absolute top-4 left-8 w-1 h-2 bg-slate-300 shadow-md"></div>
  </div>
);

// Komponen Perisai Ceklis Mengambang
const FloatingShieldCheck = ({ delay, className }) => (
  <div 
    className={`absolute w-10 h-10 animate-float-delayed ${className} z-20`}
    style={{ animationDelay: `${delay}s`, transform: 'rotate(-10deg)' }}
  >
    <div className="w-full h-full bg-white rounded-lg shadow-xl border border-slate-100 flex items-center justify-center">
      {/* Ceklis */}
      <div className="w-4 h-2 border-l-4 border-b-4 border-green-500 transform rotate-[-45deg] translate-y-[-2px]"></div>
    </div>
  </div>
);

// Komponen Ikon Pengguna Mengambang
const FloatingUserIcon = ({ delay, className }) => (
  <div 
    className={`absolute w-10 h-10 animate-float ${className} z-20`}
    style={{ animationDelay: `${delay}s`, transform: 'rotate(5deg)' }}
  >
    <div className="w-full h-full bg-white rounded-full shadow-lg border border-slate-100 overflow-hidden">
      {/* Kepala */}
      <div className="w-4 h-4 bg-slate-300 rounded-full mx-auto mt-2"></div>
      {/* Badan */}
      <div className="w-8 h-5 bg-slate-300 rounded-t-full mx-auto mt-1"></div>
    </div>
  </div>
);

// --- KOMPONEN BARU END ---


const LoginPage = () => {
  return (
    <>
      {/* Animasi Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(15px); }
          }
          @keyframes blob-spin {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
          .animate-blob { animation: blob-spin 10s infinite alternate; }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#FFF5F7] font-sans text-slate-800">
        
        {/* Tombol "Kembali ke Beranda" */}
        <a href="/" className="absolute top-6 left-6 z-20 group flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white transform group-hover:rotate-12 transition-transform duration-300">
            <CakeIcon className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">
            Strawberry<span className="text-red-500">Cafe</span>
          </span>
        </a>

        <div className="flex min-h-screen items-center justify-center py-20 px-6">
          
          {/* Kontainer Utama */}
          <main className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-pink-100/50 flex flex-col lg:flex-row overflow-hidden">

            {/* --- BAGIAN KIRI: FORMULIR --- */}
            <div className="w-full lg:w-1/2 p-10 md:p-16">
              <div className="flex flex-col h-full">
                {/* Logo Kecil */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md shadow-red-500/30 text-white">
                    <CakeIcon className="w-4 h-4" />
                  </div>
                  <span className="text-md font-bold tracking-tight text-slate-800">
                    Strawberry<span className="text-red-500">Cafe</span>
                  </span>
                </div>
                
                <h1 className="text-4xl font-black text-gray-900 leading-tight">
                  Sign In
                </h1>
                <p className="mt-2 text-slate-600">
                  Belum punya akun?{' '}
                  <a href="/register" className="font-bold text-red-500 hover:text-red-600 transition-colors">
                    Daftar di sini
                  </a>
                </p>

                {/* Tombol Google */}
                <button className="w-full flex items-center justify-center gap-3 px-6 py-3 border border-slate-300 rounded-xl mt-8 transition-colors hover:bg-slate-50">
                  <GoogleIcon className="w-6 h-6" />
                  <span className="text-slate-800 font-bold">Sign in with Google</span>
                </button>

                {/* Pemisah "atau" */}
                <div className="relative my-8 flex items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-sm">
                    atau lanjutkan dengan email
                  </span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Formulir Email & Password */}
                <form className="space-y-6">
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-bold text-slate-700"
                    >
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="contoh@kafe.com"
                      className="mt-2 block w-full px-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <label 
                        htmlFor="password" 
                        className="block text-sm font-bold text-slate-700"
                      >
                        Password
                      </label>
                      <a href="/forgot-password" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                        Lupa Password?
                      </a>
                    </div>
                    <input 
                      type="password" 
                      id="password" 
                      placeholder="••••••••"
                      className="mt-2 block w-full px-4 py-3 bg-white border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                    />
                  </div>

                  {/* Tombol Sign In Utama */}
                  <div className="pt-4">
                    <a 
                      href="/dashboard" /* Ganti href ini dengan logic submit form */
                      className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
                      onClick={(e) => {
                        // e.preventDefault(); 
                        // Tambahkan logic submit Anda di sini
                        console.log('Login disubmit');
                      }}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center gap-2 text-lg">
                        Sign In
                        <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                  </div>
                </form>
              </div>
            </div>

            {/* --- BAGIAN KANAN: VISUAL --- */}
            <div className="hidden lg:flex w-1/2 bg-red-50 p-16 relative items-center justify-center overflow-hidden">
              {/* Background Blobs */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>

              {/* Visual Utama: Ilustrasi dari 'public/images/login.png' */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center">
                
                {/* ILUSTRASI UTAMA */}
                <div className="relative w-full max-w-sm">
                  <img 
                    src="/images/login.png" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/FFF5F7/DB2777?text=Ilustrasi+Login'; }}
                    alt="Ilustrasi Login Strawberry Cafe" 
                    className="w-full h-full object-contain animate-float drop-shadow-lg"
                  />
                </div>
                
                <h2 className="text-3xl font-bold text-slate-800 mt-6">
                  Selamat Datang Kembali!
                </h2>
                <p className="text-lg text-slate-600 mt-2 max-w-sm mx-auto">
                  Akses ke semua alat manajemen kafe Anda menunggu.
                </p>
                
                {/* --- Elemen Mengambang --- */}
                
                {/* Gembok (Existing) */}
                <div className="absolute top-20 left-10">
                    <FloatingLock delay={1.5} />
                </div>
                
                {/* --- PENAMBAHAN BARU START --- */}

                {/* Kunci (Baru) */}
                <FloatingKey delay={0.5} className="top-30 right-10" />

                
                {/* Ikon Pengguna (Baru) */}
                <FloatingUserIcon delay={0.2} className="bottom-32 right-27" />
                
                {/* --- PENAMBAHAN BARU END --- */}
                
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
};

export default LoginPage;