import React, { useEffect, useRef } from 'react';
import { 
  ArrowRightIcon, 
  ChartBarIcon, 
  StarIcon, 
  CakeIcon,
  SparklesIcon,
  HeartIcon,
  CheckIcon,
  ChatBubbleBottomCenterTextIcon, 
  CommandLineIcon, 
  PencilSquareIcon, 
  RocketLaunchIcon, 
  BuildingStorefrontIcon, 
  ShoppingBagIcon, 
  BoltIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/solid';

// --- DATA TESTIMONI BARU (LEBIH BANYAK) ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Aisha P.",
    role: "Owner, Sweet Berries Corner",
    content: "Sejak pakai StrawberryCafe, saya jadi tahu menu apa yang paling laku. Tidak ada lagi cerita kehabisan sirup stroberi!",
    stars: 5,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=A&font=inter"
  },
  {
    id: 2,
    name: "Budi S.",
    role: "Manajer, Red Petal Cafe",
    content: "Fitur loyalitas pelanggan-nya luar biasa. Pelanggan saya senang kumpulkan poin dan jadi lebih sering datang.",
    stars: 5,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=B&font=inter"
  },
  {
    id: 3,
    name: "Citra Lestari",
    role: "Barista, Kopi Senja",
    content: "Tampilan kasirnya sangat mudah digunakan. Pesanan custom seperti 'less sugar' tercatat rapi tanpa bingung.",
    stars: 5,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=C&font=inter"
  },
  {
    id: 4,
    name: "Dimas Anggara",
    role: "Owner, Roti Gembul",
    content: "Manajemen stok otomatisnya penyelamat! HPP terhitung akurat, profit jadi lebih terukur setiap bulannya.",
    stars: 4,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=D&font=inter"
  },
  {
    id: 5,
    name: "Erika M.",
    role: "Franchise Owner",
    content: "Saya punya 3 cabang, dan memantau semuanya lewat satu dashboard sangat memudahkan hidup saya.",
    stars: 5,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=E&font=inter"
  },
  {
    id: 6,
    name: "Fajar Sidiq",
    role: "Head Chef, Pasta & Pastry",
    content: "Resep digital sangat membantu tim dapur menjaga konsistensi rasa. Kualitas makanan kami jadi stabil.",
    stars: 5,
    avatar: "https://placehold.co/50x50/FADBE1/E63968?text=F&font=inter"
  }
];

// --- CUSTOM HOOK ---
const useAnimateOnScroll = (ref, threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);
};

// --- KOMPONEN KECIL ---
const FooterLink = ({ href, children }) => (
  <a href={href} className="text-slate-500 hover:text-red-500 transition-colors duration-200">
    {children}
  </a>
);

const SocialIconLink = ({ href, children }) => (
  <a href={href} className="text-slate-400 hover:text-red-500 transition-colors duration-200">
    {children}
  </a>
);

// Komponen Kartu Testimoni Individual
const TestimonialCard = ({ item }) => (
  <div className="w-[350px] flex-shrink-0 mx-4 p-6 bg-white/80 backdrop-blur-md border border-white/50 rounded-2xl shadow-lg shadow-pink-100/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className={`w-4 h-4 ${i < item.stars ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
    <p className="text-slate-700 italic leading-relaxed text-sm mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
      "{item.content}"
    </p>
    <div className="flex items-center gap-3">
      <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
      <div>
        <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
        <p className="text-xs text-slate-500">{item.role}</p>
      </div>
    </div>
  </div>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 012.827 2.827c.248.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808a6.76 6.76 0 01-.465 2.427 4.902 4.902 0 01-2.827 2.827 6.76 6.76 0 01-2.427.465c-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06a6.76 6.76 0 01-2.427-.465A4.902 4.902 0 013.377 19.3c-.248-.636-.416-1.363-.465-2.427C2.863 15.808 2.85 15.454 2.85 12s.013-2.784.06-3.808a6.76 6.76 0 01.465-2.427A4.902 4.902 0 016.19 2.932c.636-.248 1.363-.416 2.427-.465C9.647 2.013 10 2 12.315 2zM12 7.043a4.957 4.957 0 100 9.914 4.957 4.957 0 000-9.914zM12 15.228a3.228 3.228 0 110-6.456 3.228 3.228 0 010 6.456zM16.815 6.732a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
  </svg>
);
const LinkedInIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const LandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const useCaseRef = useRef(null);
  const testimonialsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  
  useAnimateOnScroll(heroRef);
  useAnimateOnScroll(featuresRef);
  useAnimateOnScroll(howItWorksRef);
  useAnimateOnScroll(useCaseRef);
  useAnimateOnScroll(testimonialsRef);
  useAnimateOnScroll(pricingRef);
  useAnimateOnScroll(faqRef);
  useAnimateOnScroll(ctaRef);

  // Membagi testimoni menjadi dua baris
  const firstRow = TESTIMONIALS.slice(0, Math.ceil(TESTIMONIALS.length / 2));
  const secondRow = TESTIMONIALS.slice(Math.ceil(TESTIMONIALS.length / 2));

  return (
    <>
      <style>
        {`
          /* --- KEYFRAMES LAMA --- */
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
          @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(15px); } }
          @keyframes blob-spin {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
          .animate-blob { animation: blob-spin 10s infinite alternate; }
          
          /* --- SCROLL ANIMATION LOGIC --- */
          .scroll-section { opacity: 0; transition: opacity 0.5s ease; }
          .scroll-section.is-visible { opacity: 1; }
          .scroll-child { opacity: 0; transform: translateY(20px); transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
          .scroll-section.is-visible .scroll-child { opacity: 1; transform: translateY(0); }
          .scroll-section.is-visible .delay-100 { transition-delay: 100ms; }
          .scroll-section.is-visible .delay-200 { transition-delay: 200ms; }
          .scroll-section.is-visible .delay-300 { transition-delay: 300ms; }
          .scroll-section.is-visible .delay-500 { transition-delay: 500ms; }

          /* Glass Effect */
          .card-glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.6); }

          /* --- INTERACTIVE EFFECTS --- */
          .card-tilt { transition: transform 0.3s ease; }
          .card-tilt:hover { transform: perspective(1000px) rotateX(4deg) rotateY(-8deg) scale(1.05); box-shadow: 0 25px 50px -12px rgba(236, 72, 153, 0.25); }
          
          @keyframes soft-pulse-shadow {
            0%, 100% { transform: scale(1.1); box-shadow: 0 1.25rem 2.5rem -0.5rem rgba(235, 52, 108, 0.4); }
            50% { transform: scale(1.12); box-shadow: 0 1.5rem 3rem -0.5rem rgba(235, 52, 108, 0.7); }
          }
          .animate-soft-pulse { animation: soft-pulse-shadow 3s ease-in-out infinite; }
          
          /* Shine Effect */
          .card-shine { position: relative; overflow: hidden; }
          .card-shine::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            transform: skewX(-25deg); transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .card-shine:hover::before { left: 150%; }
          
          /* Connector Line */
          .step-card { position: relative; z-index: 1; }
          @media (min-width: 768px) {
            .step-card:not(:last-child)::after {
              content: ''; position: absolute; top: 2rem; right: -4rem; width: 6rem;
              border-top: 3px dashed #FCA5A5; opacity: 0.6; z-index: -10; transform: translateY(1.5rem);
            }
          }
          
          @keyframes icon-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
          .scroll-section.is-visible .animate-icon-pulse { animation: icon-pulse 2.5s ease-in-out 800ms infinite; }

          /* --- NEW: INFINITE SCROLL MARQUEE --- */
          @keyframes scroll-left {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          @keyframes scroll-right {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }

          .marquee-container {
            display: flex;
            width: 100%;
            overflow: hidden;
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .marquee-content {
            display: flex;
            flex-shrink: 0;
            gap: 0; /* handled by margin in card */
          }

          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }

          /* Pause animasi saat di hover agar bisa dibaca */
          .pause-on-hover:hover .marquee-content {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="min-h-screen w-full bg-[#FFF5F7] relative overflow-x-hidden font-sans text-slate-800">
        
        {/* Background Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[20rem] left-20 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* --- 1. NAVBAR (STICKY) --- */}
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-white/80 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <header className="flex justify-between items-center py-5">
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white transform group-hover:rotate-12 transition-transform duration-300">
                  <CakeIcon className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-800">
                   Strawberry<span className="text-red-500">Cafe</span>
                </span>
              </div>
              <a href="login" className="group flex items-center font-bold text-slate-500 hover:text-red-500 transition-colors">
                 Sign In
                <ArrowRightIcon className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </header>
          </div>
        </nav>

        <main className="relative z-10">
         
          {/* --- 2. HERO SECTION --- */}
          <section ref={heroRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 scroll-section">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 z-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 shadow-sm mx-auto lg:mx-0 scroll-child hover:scale-105 transition-transform cursor-default">
                  <HeartIcon className="w-4 h-4 animate-pulse" />
                  <span className="text-sm font-bold">Manisnya Kelola Bisnis</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight text-gray-900 scroll-child delay-100">
                  Kelola Kafe <br/>
                  <span className="text-[#EB346C] inline-block hover:scale-105 transition-transform duration-300 origin-left">Jadi Lebih</span> <br/>
                  <span className="text-pink-500 inline-block hover:scale-105 transition-transform duration-300 origin-left delay-75">Manis.</span>
                </h2>
                <p className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed scroll-child delay-200">
                  Optimalkan operasional Strawberry Cafe Anda dengan
                  dashboard yang intuitif, pelaporan real-time, dan manajemen
                  stok yang efisien.
                </p>
                <div className="pt-4 scroll-child delay-300">
                  <a 
                    href="dashboard" 
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2 text-lg">
                       Mulai Sekarang 
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2 relative flex justify-center scroll-child delay-500">
                <div className="relative w-full max-w-md aspect-square group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-200 to-pink-200 rounded-full filter blur-3xl opacity-60 animate-blob"></div>
                  <img 
                    src="/images/cafe-dashboard-illustration.png" 
                    alt="StrawberryCafe Dashboard Preview" 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-0 opacity-10">
                    <span className="text-9xl">🍓</span>
                  </div>
                  <div className="absolute -top-4 -right-4 md:right-0 bg-white p-4 rounded-2xl shadow-xl shadow-red-100 border border-red-50 animate-float-delayed z-20 hover:scale-110 transition-transform cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg"><ChartBarIcon className="w-6 h-6 text-green-600" /></div>
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Omzet</p>
                        <p className="text-lg font-bold text-slate-800">+35%</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-8 -left-4 md:left-0 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg border border-white animate-float z-20 hover:scale-110 transition-transform cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-100 p-2 rounded-full"><StarIcon className="w-5 h-5 text-yellow-500" /></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">4.9/5.0</p>
                         <p className="text-xs text-slate-500">Customer Happy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- 3. BAGIAN FITUR --- */}
          <section ref={featuresRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Semua yang Anda Butuhkan, <span className="text-red-500">Dalam Satu Genggaman</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Dari analisis penjualan, manajemen resep, hingga program loyalitas pelanggan.
              </p>
            </div>
            
            <div className="mt-24 flex flex-col gap-20 lg:gap-32">
              
              {/* Fitur 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 space-y-5 scroll-child delay-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white transition-transform hover:rotate-6">
                    <ChartBarIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Analisis Penjualan Real-time</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Pahami bisnis Anda lebih dalam. Lihat menu apa yang paling laris, pantau omzet harian dari mana saja, dan identifikasi jam sibuk.
                  </p>
                  <a href="#analytics" className="group inline-flex items-center font-bold text-red-500 hover:text-pink-600 transition-colors">
                    Pelajari lebih lanjut
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="w-full lg:w-1/2 scroll-child delay-200 group">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-red-200/50 border border-red-50 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-red-300/50">
                    <div className="h-8 bg-slate-100 flex items-center gap-1.5 px-4">
                      <div className="w-3 h-3 rounded-full bg-red-300"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                      <div className="w-3 h-3 rounded-full bg-green-300"></div>
                    </div>
                    <div className="p-8 h-64 md:h-80 flex flex-col justify-between bg-red-50/30">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-red-800 uppercase tracking-wider">Omzet Harian</p>
                        <p className="text-3xl font-bold text-slate-800">Rp 4.250.000</p>
                        <p className="text-sm text-green-600 font-semibold">+15% dari kemarin</p>
                      </div>
                      <div className="flex items-end justify-between gap-2 h-32">
                        <div className="w-1/5 h-[30%] bg-red-200 rounded-t-lg transition-all duration-1000 group-hover:h-[40%]"></div>
                        <div className="w-1/5 h-[50%] bg-red-200 rounded-t-lg transition-all duration-1000 delay-100 group-hover:h-[60%]"></div>
                        <div className="w-1/5 h-[80%] bg-red-400 rounded-t-lg shadow-lg transition-all duration-1000 delay-200 group-hover:h-[90%] group-hover:bg-red-500"></div>
                         <div className="w-1/5 h-[60%] bg-red-200 rounded-t-lg transition-all duration-1000 delay-300 group-hover:h-[65%]"></div>
                        <div className="w-1/5 h-[40%] bg-red-200 rounded-t-lg transition-all duration-1000 delay-400 group-hover:h-[50%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fitur 2 */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 space-y-5 scroll-child delay-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white transition-transform hover:-rotate-6">
                    <CakeIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Manajemen Stok & Resep Presisi</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Jangan biarkan kehabisan stok menghambat penjualan. Kelola HPP dengan resep digital, dan biarkan sistem otomatis memotong stok bahan baku.
                  </p>
                  <a href="#inventory" className="group inline-flex items-center font-bold text-red-500 hover:text-pink-600 transition-colors">
                    Pelajari lebih lanjut
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="w-full lg:w-1/2 scroll-child delay-200 group">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-red-200/50 border border-red-50 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="h-8 bg-slate-100 flex items-center gap-1.5 px-4">
                      <div className="w-3 h-3 rounded-full bg-red-300"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                      <div className="w-3 h-3 rounded-full bg-green-300"></div>
                    </div>
                    <div className="p-8 h-64 md:h-80 flex items-center justify-center bg-pink-50/30">
                      <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl p-6 space-y-4">
                        <h4 className="text-lg font-bold text-slate-800">Manajemen Resep:</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm font-semibold text-slate-700"><span>Biji Kopi Arabica</span><span>8.2 / 10kg</span></div>
                             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 group-hover:w-[82%]" style={{width: '0%'}}></div></div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm font-semibold text-slate-700"><span>Sirup Stroberi</span><span>1.5 / 5L</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-red-500 h-2.5 rounded-full transition-all duration-1000 delay-200 group-hover:w-[30%]" style={{width: '0%'}}></div></div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm font-semibold text-slate-700"><span>Susu UHT</span><span>6.7 / 8L</span></div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1"><div className="bg-green-500 h-2.5 rounded-full transition-all duration-1000 delay-300 group-hover:w-[83.75%]" style={{width: '0%'}}></div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fitur 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2 space-y-5 scroll-child delay-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white transition-transform hover:scale-110">
                    <StarIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Program Loyalitas Pelanggan</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Ubah pengunjung biasa menjadi pelanggan setia. Buat program promo, diskon, dan kumpulkan poin dengan mudah.
                  </p>
                  <a href="#loyalty" className="group inline-flex items-center font-bold text-red-500 hover:text-pink-600 transition-colors">
                    Pelajari lebih lanjut
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="w-full lg:w-1/2 scroll-child delay-200 group">
                  <div className="bg-white rounded-2xl shadow-2xl shadow-red-200/50 border border-red-50 overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="h-8 bg-slate-100 flex items-center gap-1.5 px-4">
                      <div className="w-3 h-3 rounded-full bg-red-300"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                      <div className="w-3 h-3 rounded-full bg-green-300"></div>
                    </div>
                    <div className="p-8 h-64 md:h-80 flex items-center justify-center bg-yellow-50/30">
                      <div className="w-full max-w-sm bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                        <div className="flex items-center gap-4 relative z-10">
                          <img src="https://placehold.co/50x50/FADBE1/E63968?text=B&font=inter" alt="Avatar 2" className="w-12 h-12 rounded-full border-2 border-white" />
                          <div>
                            <h4 className="text-lg font-bold">Budi S.</h4>
                            <p className="text-sm text-slate-300">Member Level: <span className="text-yellow-400 font-bold">Gold</span></p>
                          </div>
                        </div>
                        <div className="mt-6 relative z-10">
                          <p className="text-xs uppercase tracking-wider text-slate-400">Poin Loyalitas</p>
                          <p className="text-3xl font-bold">4.850 Poin</p>
                          <div className="w-full bg-slate-700 rounded-full h-2.5 mt-3"><div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-1000 delay-200 group-hover:w-[85%]" style={{width: '0%'}}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --- 4. HOW IT WORKS --- */}
          <section ref={howItWorksRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Mulai Semanis <span className="text-pink-500">1-2-3</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Hanya butuh beberapa menit untuk mengatur dan menjalankan StrawberryCafe.
              </p>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-6 scroll-child delay-100 step-card group">
                <div className="relative inline-flex items-center justify-center w-24 h-24 transition-transform group-hover:scale-110 duration-300">
                  <span className="absolute text-7xl font-black text-red-100 -z-10">1</span>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white animate-icon-pulse">
                    <CommandLineIcon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Setup Cepat</h3>
                <p className="mt-2 text-slate-600">Daftarkan kafe Anda dan masukkan menu-menu andalan Anda.</p>
              </div>
              <div className="text-center p-6 scroll-child delay-200 step-card group">
                <div className="relative inline-flex items-center justify-center w-24 h-24 transition-transform group-hover:scale-110 duration-300">
                  <span className="absolute text-7xl font-black text-red-100 -z-10">2</span>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white animate-icon-pulse" style={{ animationDelay: '900ms' }}>
                    <PencilSquareIcon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Mulai Kelola</h3>
                <p className="mt-2 text-slate-600">Gunakan dashboard untuk melihat penjualan dan mengatur stok.</p>
              </div>
              <div className="text-center p-6 scroll-child delay-300 step-card group">
                <div className="relative inline-flex items-center justify-center w-24 h-24 transition-transform group-hover:scale-110 duration-300">
                  <span className="absolute text-7xl font-black text-red-100 -z-10">3</span>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white animate-icon-pulse" style={{ animationDelay: '1000ms' }}>
                    <RocketLaunchIcon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Lihat Pertumbuhan</h3>
                <p className="mt-2 text-slate-600">Analisis laporan dan buat keputusan bisnis yang lebih baik.</p>
              </div>
            </div>
          </section>

          {/* --- 5. USE CASES --- */}
          <section ref={useCaseRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Sempurna Untuk <span className="text-red-500">Segala Jenis Bisnis</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Baik Anda pemilik kedai kopi, toko roti, atau restoran, kami siap membantu.
              </p>
            </div>
            
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="card-glass p-8 rounded-3xl shadow-lg shadow-pink-100/50 scroll-child delay-100 card-tilt card-shine cursor-default">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
                  <BuildingStorefrontIcon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Kedai Kopi & Barista</h3>
                <p className="mt-2 text-slate-600">
                  Kelola pesanan *custom* (less sugar, extra shot) dengan mudah dan pantau stok biji kopi *single-origin* Anda.
                </p>
              </div>
              <div className="card-glass p-8 rounded-3xl shadow-lg shadow-pink-100/50 scroll-child delay-200 card-tilt card-shine cursor-default">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
                  <ShoppingBagIcon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Toko Roti & Pastry</h3>
                <p className="mt-2 text-slate-600">
                  Atur bahan baku resep secara presisi dan kelola pesanan *pre-order* kue untuk acara spesial pelanggan.
                </p>
              </div>
              <div className="card-glass p-8 rounded-3xl shadow-lg shadow-pink-100/50 scroll-child delay-300 card-tilt card-shine cursor-default">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
                  <BoltIcon className="w-8 h-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-slate-900">Resto Cepat Saji</h3>
                <p className="mt-2 text-slate-600">
                  Percepat alur kasir, integrasi dengan *kitchen display system*, dan analisis jam-jam sibuk untuk optimasi staf.
                </p>
              </div>
            </div>
          </section>
          
          {/* --- 6. TESTIMONI (DIROMBAK TOTAL: INFINITE MARQUEE) --- */}
          <section ref={testimonialsRef} className="py-20 scroll-section overflow-hidden">
            <div className="text-center max-w-2xl mx-auto px-6 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Apa Kata <span className="text-red-500">Pemilik Kafe</span> Lain?
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Mereka telah merasakan manisnya mengelola bisnis dengan kami.
              </p>
            </div>
            
            {/* Marquee Baris 1 (Kiri) */}
            <div className="marquee-container pause-on-hover mb-8">
              <div className="marquee-content animate-scroll-left">
                {/* Render Data Asli */}
                {firstRow.map((item) => (
                   <TestimonialCard key={item.id} item={item} />
                ))}
                 {/* Render Duplikat untuk efek Looping Halus */}
                 {firstRow.map((item) => (
                   <TestimonialCard key={`${item.id}-dup`} item={item} />
                ))}
                {/* Render Triplikat jika layar sangat lebar */}
                 {firstRow.map((item) => (
                   <TestimonialCard key={`${item.id}-tri`} item={item} />
                ))}
              </div>
            </div>

            {/* Marquee Baris 2 (Kanan) */}
            <div className="marquee-container pause-on-hover">
              <div className="marquee-content animate-scroll-right">
                {/* Render Data Asli */}
                {secondRow.map((item) => (
                   <TestimonialCard key={item.id} item={item} />
                ))}
                {/* Render Duplikat */}
                {secondRow.map((item) => (
                   <TestimonialCard key={`${item.id}-dup`} item={item} />
                ))}
                 {/* Render Triplikat */}
                {secondRow.map((item) => (
                   <TestimonialCard key={`${item.id}-tri`} item={item} />
                ))}
              </div>
            </div>
          </section>

          {/* --- 7. PRICING --- */}
          <section ref={pricingRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Harga <span className="text-pink-500">Manis</span> untuk Bisnis Anda
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Pilih paket yang paling sesuai dengan kebutuhan kafe Anda.
              </p>
            </div>
            
            <div className="mt-16 grid lg:grid-cols-3 gap-8 items-center">
              {/* Personal */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100/60 border border-gray-100 scroll-child delay-100 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-slate-900">Personal</h3>
                <p className="mt-2 text-slate-500">Untuk kafe rintisan</p>
                <p className="mt-6 text-4xl font-bold text-slate-900">
                  Rp 150k<span className="text-lg font-normal text-slate-500">/bulan</span>
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />1 Outlet</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />Analisis Dasar</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />Manajemen Stok</li>
                </ul>
                <a href="#pricing-personal" className="mt-8 block w-full text-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                  Pilih Paket
                </a>
              </div>
              
              {/* Business */}
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-8 rounded-[2rem] transform lg:scale-110 scroll-child delay-200 relative animate-soft-pulse hover:animate-none hover:scale-[1.15] transition-all duration-300 z-10">
                <span className="absolute -top-4 right-6 bg-yellow-300 text-slate-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Paling Populer</span>
                <h3 className="text-2xl font-bold text-white">Business</h3>
                <p className="mt-2 text-white/80">Untuk kafe yang sedang berkembang</p>
                <p className="mt-6 text-4xl font-bold text-white">
                  Rp 350k<span className="text-lg font-normal text-white/80">/bulan</span>
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-white"><CheckIcon className="w-5 h-5 text-white" />5 Outlet</li>
                  <li className="flex items-center gap-3 text-white"><CheckIcon className="w-5 h-5 text-white" />Analisis Lengkap</li>
                  <li className="flex items-center gap-3 text-white"><CheckIcon className="w-5 h-5 text-white" />Manajemen Resep</li>
                  <li className="flex items-center gap-3 text-white"><CheckIcon className="w-5 h-5 text-white" />Program Loyalitas</li>
                </ul>
                <a href="#pricing-business" className="mt-8 block w-full text-center px-6 py-3 bg-white text-red-500 font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg">
                  Mulai Uji Coba Gratis
                </a>
              </div>

              {/* Enterprise */}
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-pink-100/60 border border-gray-100 scroll-child delay-300 hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-slate-900">Enterprise</h3>
                <p className="mt-2 text-slate-500">Untuk jaringan kafe besar</p>
                <p className="mt-6 text-4xl font-bold text-slate-900">
                  Rp 550k<span className="text-lg font-normal text-slate-500">/bulan</span>
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />Outlet Unlimited</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />Semua Fitur Business</li>
                  <li className="flex items-center gap-3 text-slate-600"><CheckIcon className="w-5 h-5 text-green-500" />Dukungan Prioritas 24/7</li>
                </ul>
                <a href="#pricing-enterprise" className="mt-8 block w-full text-center px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                  Pilih Paket
                </a>
              </div>
            </div>
          </section>
          
          {/* --- 8. FAQ --- */}
          <section ref={faqRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child">
                Ada Pertanyaan? <span className="text-pink-500">Kami Ada Jawaban.</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600 scroll-child delay-100">
                Beberapa hal yang mungkin ingin Anda ketahui sebelum memulai.
              </p>
            </div>
            
            <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                {q: "Apakah saya perlu kartu kredit untuk uji coba gratis?", a: "Tidak perlu. Anda bisa mendaftar dan menikmati semua fitur paket Business selama 14 hari, tanpa komitmen apa pun."},
                {q: "Apakah ada biaya tersembunyi atau biaya setup?", a: "Tidak ada. Harga kami transparan. Harga paket bulanan yang Anda lihat adalah harga final yang akan Anda bayar."},
                {q: "Bisakah saya upgrade atau downgrade paket saya?", a: "Tentu saja. Anda bisa mengubah paket Anda kapan saja langsung dari dashboard pengaturan akun Anda."},
                {q: "Apakah data penjualan dan resep saya aman?", a: "Keamanan adalah prioritas utama kami. Semua data Anda dienkripsi dan kami melakukan backup harian."},
                {q: "Apakah saya perlu membeli hardware khusus?", a: "Tidak perlu. StrawberryCafe adalah aplikasi berbasis web, bisa diakses dari tablet, laptop, atau HP."},
                {q: "Bagaimana jika saya butuh bantuan?", a: "Tim support kami siap membantu Anda via email dan live chat untuk semua paket berbayar."}
              ].map((faq, idx) => (
                <div key={idx} className="scroll-child hover:bg-white/50 p-4 rounded-xl transition-colors" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <h3 className="text-xl font-bold text-slate-900 flex items-start gap-2">
                    <QuestionMarkCircleIcon className="w-6 h-6 text-red-400 flex-shrink-0" />
                    {faq.q}
                  </h3>
                  <p className="mt-2 pl-8 text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- 9. CTA --- */}
          <section ref={ctaRef} className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 scroll-section">
            <div className="bg-white/60 p-10 md:p-16 rounded-3xl shadow-xl shadow-pink-100/50 text-center relative overflow-hidden group">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" style={{ animationDelay: '3s' }}></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 scroll-child transition-transform group-hover:scale-105 duration-500">
                  Siap Membuat Kafemu Lebih <span className="text-red-500">Manis</span>?
                </h2>
                <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto scroll-child delay-100">
                  Mulai uji coba gratis 14 hari. Tidak perlu kartu kredit.
                </p>
                <div className="mt-8 pt-4 scroll-child delay-200">
                  <a 
                    href="dashboard" 
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-red-500/20 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-2 text-lg">
                      Mulai Sekarang 
                      <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

        </main>
        
        {/* --- 10. FOOTER --- */}
        <footer className="w-full mt-20 pt-16 pb-8 border-t border-red-100 relative z-10 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className="col-span-2 lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 text-white">
                    <CakeIcon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-800">
                    Strawberry<span className="text-red-500">Cafe</span>
                  </span>
                </div>
                <p className="text-slate-500 max-w-sm">
                  Platform manajemen kafe all-in-one untuk membuat operasional bisnis Anda jadi lebih manis.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Produk</h4>
                <div className="flex flex-col space-y-3">
                  <FooterLink href="#features">Fitur</FooterLink>
                  <FooterLink href="#pricing">Harga</FooterLink>
                  <FooterLink href="#demo">Uji Coba Gratis</FooterLink>
                  <FooterLink href="#use-cases">Use Cases</FooterLink>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Perusahaan</h4>
                <div className="flex flex-col space-y-3">
                  <FooterLink href="#about">Tentang Kami</FooterLink>
                  <FooterLink href="#careers">Karir</FooterLink>
                  <FooterLink href="#blog">Blog</FooterLink>
                  <FooterLink href="#contact">Kontak</FooterLink>
                </div>
              </div>

              <div className="col-span-2 md:col-span-4 lg:col-span-2 space-y-4">
                <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Tetap Terhubung</h4>
                <p className="text-slate-500">
                  Dapatkan tips manajemen kafe dan info update fitur terbaru.
                </p>
                <form className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Anda" 
                    className="flex-grow w-full px-4 py-2 rounded-lg border border-red-100 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white/50" 
                  />
                  <button 
                    type="submit" 
                    className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-200"
                  >
                    Daftar
                  </button>
                </form>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-red-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-slate-500 text-center md:text-left">
                © {new Date().getFullYear()} StrawberryCafe. Dibuat oleh <StarIcon className="inline w-4 h-4 text-red-500" /> Choirun Naifah ^-^
              </p>
              <div className="flex items-center gap-5">
                <SocialIconLink href="https://twitter.com"><TwitterIcon /></SocialIconLink>
                <SocialIconLink href="https://instagram.com"><InstagramIcon /></SocialIconLink>
                <SocialIconLink href="https://linkedin.com"><LinkedInIcon /></SocialIconLink>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;