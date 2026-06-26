import React from 'react';
import { useCustomer } from '../../context/CustomerContext';

const navItems = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
  },
  {
    id: 'browse',
    label: 'Marketplace',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'My Orders',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
  {
    id: 'wishlist',
    label: 'Saved Items',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
  },
  {
    id: 'account',
    label: 'Settings',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    ),
  },
];

const Sidebar = () => {
  const { activeTab, handleTabChange, isCollapsed, setIsCollapsed } = useCustomer();
  const onToggle = () => setIsCollapsed(!isCollapsed);
  const onChangeTab = handleTabChange;
  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-primary pt-8 hidden md:flex flex-col z-50 shadow-level-1 border-r border-white/5 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={onToggle}
        className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow-md border border-white/10 active:scale-90 transition-all cursor-pointer z-50"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Top: Branding */}
      <div className={`px-6 mb-12 overflow-hidden transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-secondary-container flex-shrink-0 flex items-center justify-center text-primary font-display font-bold text-lg shadow-sm">F</div>
          <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <span className="font-display font-bold text-white text-xl tracking-tighter ml-1">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
          </div>
        </div>
        <p className={`font-body text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-2 whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          Customer Panel
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 flex flex-col gap-2 overflow-hidden">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`flex items-center rounded-2xl font-body text-sm font-bold transition-all duration-200 text-left outline-none group relative overflow-hidden ${
                isCollapsed ? 'justify-center py-4 px-0' : 'px-4 py-3.5 gap-4'
              } ${
                isActive
                  ? 'bg-secondary-container text-primary shadow-lg shadow-secondary-container/10'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`transition-colors flex-shrink-0 ${isActive ? 'text-primary' : 'text-white/30 group-hover:text-secondary-container'}`}>
                {item.icon}
              </div>
              <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                {item.label}
              </span>
              
              {/* Active indicator dot for collapsed state */}
              {isCollapsed && isActive && (
                <div className="absolute right-1 w-1 h-4 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom area */}
      <div className={`px-3 pb-8 mt-auto pt-8 border-t border-white/5 transition-all duration-300 overflow-hidden ${isCollapsed ? 'items-center' : ''}`}>
        <button 
          className={`w-full flex items-center rounded-2xl font-body text-sm font-bold text-white/40 hover:text-error hover:bg-error/5 transition-all duration-200 outline-none cursor-pointer group ${
            isCollapsed ? 'justify-center py-4 px-0' : 'px-4 py-3.5 gap-4'
          }`}
        >
          <div className="text-white/20 group-hover:text-error transition-colors flex-shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
