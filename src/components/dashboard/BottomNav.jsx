import React from 'react';

const BottomNav = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary md:hidden z-40 h-16 grid grid-cols-5 items-center px-1 pb-[env(safe-area-inset-bottom)]">
      
      <button 
        onClick={() => onChangeTab('home')}
        aria-current={activeTab === 'home' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 min-h-[44px] ${activeTab === 'home' ? 'text-accent' : 'text-muted hover:text-primary transition-colors'}`}
      >
        <svg className="w-[22px] h-[22px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span className="font-body text-[10px] font-medium leading-none">Home</span>
      </button>

      <button 
        onClick={() => onChangeTab('browse')}
        aria-current={activeTab === 'browse' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 min-h-[44px] ${activeTab === 'browse' ? 'text-accent' : 'text-muted hover:text-primary transition-colors'}`}
      >
        <svg className="w-[22px] h-[22px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
        <span className="font-body text-[10px] font-medium leading-none">Browse</span>
      </button>

      <button 
        onClick={() => onChangeTab('orders')}
        aria-current={activeTab === 'orders' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 min-h-[44px] ${activeTab === 'orders' ? 'text-accent' : 'text-muted hover:text-primary transition-colors'}`}
      >
        <svg className="w-[22px] h-[22px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        <span className="font-body text-[10px] font-medium leading-none">Orders</span>
      </button>

      <button 
        onClick={() => onChangeTab('track')}
        aria-current={activeTab === 'track' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 min-h-[44px] ${activeTab === 'track' ? 'text-accent' : 'text-muted hover:text-primary transition-colors'}`}
      >
        <svg className="w-[22px] h-[22px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
        <span className="font-body text-[10px] font-medium leading-none">Track</span>
      </button>

      <button 
        onClick={() => onChangeTab('account')}
        aria-current={activeTab === 'account' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center gap-1 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 min-h-[44px] ${activeTab === 'account' ? 'text-accent' : 'text-muted hover:text-primary transition-colors'}`}
      >
        <svg className="w-[22px] h-[22px] stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span className="font-body text-[10px] font-medium leading-none">Account</span>
      </button>

    </nav>
  );
};

export default BottomNav;
