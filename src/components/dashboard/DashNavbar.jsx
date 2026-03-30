import React from 'react';

const DashNavbar = ({ onOpenCart, onSearch, onNotifications, cartCount = 0, title = 'Dashboard' }) => {
  return (
    <header className="h-16 bg-white border-b border-secondary px-6 flex items-center justify-between sticky top-0 z-30 ml-0 md:ml-64">
      <div className="hidden md:block">
        <h1 className="font-display font-semibold text-xl text-text">{title}</h1>
      </div>

      <div className="md:hidden flex items-center justify-start flex-1 focus-visible:ring-2 outline-none rounded-md" tabIndex={0}>
        <span className="font-display font-bold text-primary text-xl tracking-tight">Farm</span>
        <span className="font-display font-bold text-accent text-xl tracking-tight">Connect</span>
      </div>

      <div className="flex items-center gap-4">
        <button onClick={onSearch} aria-label="Search" className="text-muted hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-accent rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        <button onClick={onNotifications} aria-label="Notifications" className="text-muted hover:text-primary transition-colors relative focus-visible:ring-2 focus-visible:ring-accent rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="bg-accent w-2 h-2 rounded-full absolute top-[10px] right-[10px] border border-white"></span>
        </button>

        <button onClick={onOpenCart} aria-label="Cart" className="text-muted hover:text-primary transition-colors relative focus-visible:ring-2 focus-visible:ring-accent rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="absolute top-[2px] right-[2px] bg-text text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">{cartCount}</span>
        </button>
      </div>
    </header>
  );
};

export default DashNavbar;
