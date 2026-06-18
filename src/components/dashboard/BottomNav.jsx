import React from 'react';

const BottomNav = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-white/10 md:hidden z-40 h-18 grid grid-cols-4 items-center px-2 pb-[env(safe-area-inset-bottom)] shadow-level-2 backdrop-blur-md bg-primary/95">
      
      <button 
        onClick={() => onChangeTab('home')}
        aria-current={activeTab === 'home' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-xl py-2 transition-all duration-300 ${activeTab === 'home' ? 'text-secondary-container bg-white/10' : 'text-white/50'}`}
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'home' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.5px]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span className={`font-body text-[10px] tracking-wide uppercase transition-all duration-300 ${activeTab === 'home' ? 'font-bold opacity-100' : 'font-medium opacity-60'}`}>Home</span>
      </button>

      <button 
        onClick={() => onChangeTab('browse')}
        aria-current={activeTab === 'browse' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-xl py-2 transition-all duration-300 ${activeTab === 'browse' ? 'text-secondary-container bg-white/10' : 'text-white/50'}`}
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'browse' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.5px]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span className={`font-body text-[10px] tracking-wide uppercase transition-all duration-300 ${activeTab === 'browse' ? 'font-bold opacity-100' : 'font-medium opacity-60'}`}>Browse</span>
      </button>

      <button 
        onClick={() => onChangeTab('orders')}
        aria-current={activeTab === 'orders' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-xl py-2 transition-all duration-300 ${activeTab === 'orders' ? 'text-secondary-container bg-white/10' : 'text-white/50'}`}
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'orders' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.5px]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <span className={`font-body text-[10px] tracking-wide uppercase transition-all duration-300 ${activeTab === 'orders' ? 'font-bold opacity-100' : 'font-medium opacity-60'}`}>Orders</span>
      </button>

      <button 
        onClick={() => onChangeTab('account')}
        aria-current={activeTab === 'account' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-xl py-2 transition-all duration-300 ${activeTab === 'account' ? 'text-secondary-container bg-white/10' : 'text-white/50'}`}
      >
        <svg className={`w-5 h-5 transition-transform duration-300 ${activeTab === 'account' ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.5px]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span className={`font-body text-[10px] tracking-wide uppercase transition-all duration-300 ${activeTab === 'account' ? 'font-bold opacity-100' : 'font-medium opacity-60'}`}>Settings</span>
      </button>

    </nav>
  );
};

export default BottomNav;
