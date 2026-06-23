import React, { useState, useRef, useEffect } from 'react';

const DashNavbar = ({ 
  onOpenCart, 
  onSearch, 
  notifications = [], 
  onMarkAllRead, 
  cartCount = 0, 
  title = 'Dashboard', 
  isCollapsed 
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className={`h-16 bg-primary border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 shadow-sm ${
      isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
    }`}>
      {/* Desktop Title */}
      <div className="hidden md:block">
        <h1 className="font-display font-bold text-xl text-white tracking-tight">{title}</h1>
      </div>

      {/* Mobile Header Logic: Always show brand logo */}
      <div className="md:hidden flex items-center justify-start flex-1">
        <div className="flex items-center animate-in fade-in duration-500">
          <span className="font-display font-bold text-white text-xl tracking-tighter">Farmers</span>
          <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 relative z-10">
        <div className="md:hidden w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-[10px] shadow-sm">AO</div>
        <button onClick={onSearch} aria-label="Search" className="text-white/60 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-secondary-container rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>

        {/* Notifications Dropdown Wrapper */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)} 
            aria-label="Notifications" 
            className="text-white/60 hover:text-white transition-colors relative focus-visible:ring-2 focus-visible:ring-secondary-container rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {notifications.some(n => !n.read) && (
              <span className="bg-secondary-container w-2.5 h-2.5 rounded-full absolute top-[10px] right-[10px] border border-primary"></span>
            )}
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-level-2 border border-outline-variant/30 py-3 z-50 text-on-surface animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 pb-2 border-b border-outline-variant/20 flex justify-between items-center">
                <span className="font-display font-bold text-sm">Notifications</span>
                {notifications.some(n => !n.read) && (
                  <button 
                    onClick={() => {
                      onMarkAllRead();
                      setIsNotifOpen(false);
                    }} 
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-64 overflow-y-auto no-scrollbar py-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-on-surface-variant font-body text-xs font-medium">No notifications yet.</div>
                ) : (
                  notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`px-4 py-3 border-b border-outline-variant/10 last:border-0 hover:bg-background/50 transition-colors flex gap-3 ${!n.read ? 'bg-secondary-container/5' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${!n.read ? 'bg-secondary-container' : 'bg-transparent'}`}></div>
                      <div className="flex-1">
                        <p className="font-body text-xs font-semibold text-on-surface leading-normal text-left">{n.message}</p>
                        <p className="font-body text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider text-left">{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <button onClick={onOpenCart} aria-label="Cart" className="text-white/60 hover:text-white transition-colors relative focus-visible:ring-2 focus-visible:ring-secondary-container rounded-md outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="absolute top-[2px] right-[2px] bg-secondary-container text-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center">{cartCount}</span>
        </button>
      </div>
    </header>
  );
};

export default DashNavbar;
