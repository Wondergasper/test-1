import React from 'react';

const navItems = [
  {
    id: 'home',
    label: 'Dashboard',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  {
    id: 'browse',
    label: 'Browse Products',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
        <line x1="6" y1="15" x2="10" y2="15"></line>
      </svg>
    ),
  },
  {
    id: 'track',
    label: 'Track Delivery',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
      </svg>
    ),
  },
  {
    id: 'account',
    label: 'My Account',
    icon: (
      <svg className="w-6 h-6 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
];

const Sidebar = ({ activeTab, onChangeTab }) => {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-primary pt-6 hidden md:flex flex-col z-50">
      {/* Top: Logo */}
      <div className="px-6 mb-8 flex items-center">
        <span className="font-display font-bold text-white text-xl tracking-tight">Farm</span>
        <span className="font-display font-bold text-accent text-xl tracking-tight">Connect</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm transition-all duration-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              } ${index === navItems.length - 1 ? 'mt-auto md:mt-0' : ''}`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Card */}
      <div className="px-6 pb-8">
        <div className="bg-white/8 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-display font-bold text-white text-sm">
              AO
            </div>
            <div>
              <p className="font-body font-medium text-white text-sm leading-tight">Adebayo O.</p>
              <p className="font-body text-white/40 text-[11px] mt-0.5">adebayo@example.com</p>
            </div>
          </div>
          <button className="font-body text-xs text-white/40 hover:text-white/70 mt-4 flex items-center gap-2 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
