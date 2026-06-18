import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import BottomNav from '../components/dashboard/BottomNav';
import ToastNotification from '../components/dashboard/ToastNotification';

const Icons = {
  Chart: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Package: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Truck: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Settings: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Search: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Bell: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  X: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Pencil: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>,
  Trash: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Menu: () => <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Sort: () => <svg className="w-3 h-3 text-on-surface-variant flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>,
  Download: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
};

const ADMIN_DASHBOARD_BASE = '/dashboard/admin';
const TABS = [
  { id: 'home', label: 'Dashboard', slug: '', icon: Icons.Chart },
  { id: 'catalog', label: 'Catalog', slug: 'catalog', icon: Icons.Package },
  { id: 'ops', label: 'Operations', slug: 'ops', icon: Icons.Truck },
  { id: 'settings', label: 'Settings', slug: 'settings', icon: Icons.Settings },
];

const INITIAL_PRODUCTS = [
  { id: 'prod-1', name: 'Local Rice', category: 'Grains', priceValue: 480, stock: 240, status: 'Active', img: '/product_rice.png', origin: 'Ogun' },
  { id: 'prod-2', name: 'Catfish', category: 'Protein', priceValue: 1200, stock: 48, status: 'Low Stock', img: '/product_catfish.png', origin: 'Kogi' },
  { id: 'prod-3', name: 'Fresh Tomatoes', category: 'Vegetables', priceValue: 320, stock: 0, status: 'Out of Stock', img: '/product_tomatoes.png', origin: 'Kaduna' },
];

const INITIAL_ORDERS = [
  {
    id: '#FC-0892',
    customer: 'Amara Adebayo',
    items: '5kg Rice + 3kg Tomatoes',
    totalValue: 4200,
    status: 'Delivered',
    date: 'Nov 12',
    deliveryHub: 'Lekki drop-off',
    lineItems: [
      { name: 'Local Rice', qty: 5, price: 480, sub: 2400 },
      { name: 'Fresh Tomatoes', qty: 3, price: 320, sub: 960 },
      { name: 'Delivery', qty: 1, price: 840, sub: 840 },
    ],
  },
  {
    id: '#FC-0901',
    customer: 'Chinedu Okeke',
    items: '10kg Yam + 2kg Catfish',
    totalValue: 8500,
    status: 'In Transit',
    date: 'Nov 18',
    deliveryHub: 'Lagos distribution hub',
    lineItems: [
      { name: 'Yam', qty: 10, price: 280, sub: 2800 },
      { name: 'Catfish', qty: 2, price: 1200, sub: 2400 },
      { name: 'Delivery', qty: 1, price: 3300, sub: 3300 },
    ],
  },
];

const INITIAL_PAYMENTS = [
  { id: 'PMT-204', orderId: '#FC-0915', customer: 'Kemi Lawal', amountValue: 9600, method: 'Bank Transfer', status: 'Pending settlement', reference: 'TRX-2281', paidAt: 'Nov 22, 8:42 AM', reviewed: false, notes: 'Transfer received, reconciliation still pending.' },
  { id: 'PMT-198', orderId: '#FC-0901', customer: 'Chinedu Okeke', amountValue: 8500, method: 'Card', status: 'Paid', reference: 'TRX-2244', paidAt: 'Nov 18, 7:14 AM', reviewed: true, notes: 'Payment verified and matched to dispatch batch.' },
];

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const getTabFromPath = (pathname) => {
  if (pathname === ADMIN_DASHBOARD_BASE || pathname === `${ADMIN_DASHBOARD_BASE}/`) return 'home';
  const prefix = `${ADMIN_DASHBOARD_BASE}/`;
  if (!pathname.startsWith(prefix)) return null;
  const slug = pathname.slice(prefix.length);
  return TABS.find((tab) => tab.slug === slug)?.id ?? null;
};

const getPathForTab = (tabId) => {
  const tab = TABS.find((item) => item.id === tabId);
  return tab ? (tab.slug ? `${ADMIN_DASHBOARD_BASE}/${tab.slug}` : ADMIN_DASHBOARD_BASE) : null;
};

const AdminSidebar = ({ activeTab, onChangeTab, isCollapsed, onToggle }) => (
  <aside 
    className={`fixed left-0 top-0 h-screen bg-primary pt-8 hidden md:flex flex-col z-50 transition-all duration-300 ease-in-out border-r border-white/5 shadow-level-1 ${
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

    <div className={`px-6 mb-12 flex flex-col overflow-hidden transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
      <div className="flex items-center gap-1">
        <div className="w-8 h-8 rounded-lg bg-secondary-container flex-shrink-0 flex items-center justify-center text-primary font-display font-bold text-lg shadow-sm">F</div>
        <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <span className="font-display font-bold text-white text-xl tracking-tighter ml-1">Farmers</span>
          <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
        </div>
      </div>
      <p className={`font-body text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-2 whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        Admin Operations
      </p>
    </div>

    <nav className="flex-1 px-3 flex flex-col gap-2 overflow-hidden">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            title={isCollapsed ? tab.label : ''}
            className={`flex items-center rounded-2xl font-body text-sm font-bold transition-all duration-200 text-left outline-none group relative overflow-hidden ${
              isCollapsed ? 'justify-center py-4 px-0' : 'px-4 py-3.5 gap-4'
            } ${
              isActive
                ? 'bg-secondary-container text-primary shadow-lg shadow-secondary-container/10'
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <div className={`transition-colors flex-shrink-0 ${isActive ? 'text-primary' : 'text-white/30 group-hover:text-secondary-container'}`}>
              <tab.icon />
            </div>
            <span className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>

    <div className={`px-4 pb-8 mt-auto pt-8 border-t border-white/5 transition-all duration-300 overflow-hidden ${isCollapsed ? 'items-center' : ''}`}>
      <button className={`w-full flex items-center rounded-2xl font-body text-sm font-bold text-white/40 hover:text-error hover:bg-error/5 transition-all duration-200 outline-none cursor-pointer group ${
            isCollapsed ? 'justify-center py-4 px-0' : 'px-4 py-3.5 gap-4'
          }`}>
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

const AdminNavbar = ({ title, setMobileMenuOpen, onSearch, onNotifications, isCollapsed }) => (
  <header className={`h-16 bg-primary border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 shadow-sm ${
    isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
  }`}>
    {/* Mobile Header Logic: Always show brand logo */}
    <div className="md:hidden flex items-center justify-start flex-1">
      <div className="flex items-center animate-in fade-in duration-500">
        <span className="font-display font-bold text-white text-xl tracking-tighter">Farmers</span>
        <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
      </div>
    </div>

    <div className="flex items-center gap-4 relative z-10">
      <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white p-1 -ml-2 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded"><Icons.Menu /></button>
      <h1 className="font-display font-bold text-xl text-white hidden md:block tracking-tight">{title}</h1>
    </div>
    
    <div className="flex items-center gap-2 md:gap-4 relative z-10">
      <div className="md:hidden w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-[10px] shadow-sm">OP</div>
      <button onClick={onSearch} className="text-white/60 hover:text-white transition-colors focus-visible:ring-2 p-2 rounded-full outline-none"><Icons.Search /></button>
      <button onClick={onNotifications} className="text-white/60 hover:text-white transition-colors relative focus-visible:ring-2 p-2 rounded-full outline-none">
        <Icons.Bell />
        <span className="bg-secondary-container w-2.5 h-2.5 rounded-full absolute top-[6px] right-[6px] border-2 border-primary"></span>
      </button>
    </div>
  </header>
);

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [opsView, setOpsView] = useState('orders'); // 'orders', 'payments', 'deliveries'
  const [settingsTab, setSettingsTab] = useState('general');
  const activeTab = getTabFromPath(location.pathname);

  const showToast = (msg, variant = 'success') => setToast({ msg, variant });

  useEffect(() => {
    if (!activeTab) {
      navigate(ADMIN_DASHBOARD_BASE, { replace: true });
      return;
    }
    setShowContent(false);
    setMobileMenuOpen(false);
    const timer = setTimeout(() => setShowContent(true), 150);
    return () => clearTimeout(timer);
  }, [activeTab, navigate]);

  const handleTabChange = (tabId) => {
    const nextPath = getPathForTab(tabId);
    if (nextPath) navigate(nextPath);
  };

  const renderBadge = (status) => {
    let classes = '';
    if (['Delivered', 'Active', 'Paid', 'Success'].includes(status)) classes = 'bg-primary-fixed text-on-primary-fixed';
    else if (['In Transit', 'Pending settlement', 'Low Stock'].includes(status)) classes = 'bg-secondary-fixed text-on-secondary-fixed';
    else if (['Out of Stock', 'Failed'].includes(status)) classes = 'bg-error-container text-on-error-container';
    else classes = 'bg-surface-variant text-on-surface-variant';
    return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${classes}`}>{status}</span>;
  };

  const renderHome = () => (
    <div className="animate-in fade-in duration-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Revenue', value: formatCurrency(orders.reduce((sum, o) => sum + o.totalValue, 0)), diff: '+12%' },
          { label: 'Orders', value: orders.length.toString(), diff: '+5%' },
          { label: 'Inventory Items', value: products.length.toString(), diff: '0%' },
          { label: 'Total Payments', value: payments.length.toString(), diff: '+8%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-soft border border-outline-variant/10">
            <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{stat.label}</p>
            <p className="font-display font-bold text-2xl text-on-surface mt-2">{stat.value}</p>
            <p className="font-body text-[10px] mt-1 text-secondary font-bold">{stat.diff} <span className="text-on-surface-variant opacity-60">vs last week</span></p>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 mb-8">
        <h3 className="font-display font-bold text-lg text-on-surface mb-6">Recent Operations</h3>
        <div className="flex flex-col gap-4">
           {orders.slice(0, 3).map(order => (
             <div key={order.id} className="flex items-center justify-between p-4 border border-surface rounded-2xl hover:bg-background/50 transition-colors">
               <div>
                 <p className="font-body font-bold text-sm text-on-surface">{order.id} · {order.customer}</p>
                 <p className="font-body text-xs text-on-surface-variant mt-1">{order.items}</p>
               </div>
               {renderBadge(order.status)}
             </div>
           ))}
        </div>
        <Button variant="ghost" size="sm" className="mt-6 w-full" onClick={() => handleTabChange('ops')}>View Full Activity Trail</Button>
      </section>
    </div>
  );

  const renderCatalog = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight hidden md:block">Market Catalog</h2>
        <Button variant="primary" size="sm" className="font-bold" onClick={() => showToast('New product form coming soon.', 'success')}>+ Add New Item</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="bg-white rounded-3xl p-5 shadow-level-1 border border-outline-variant/30 flex items-center gap-4 group hover:shadow-level-2 transition-all">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface flex-shrink-0 border border-outline-variant/20 shadow-inner">
               <img src={prod.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-bold text-sm text-on-surface truncate">{prod.name}</p>
              <p className="font-body text-xs font-bold text-on-surface-variant mt-1">{prod.stock}kg · {formatCurrency(prod.priceValue)}/kg</p>
              <div className="mt-3">{renderBadge(prod.status)}</div>
            </div>
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"><Icons.Pencil /></button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOps = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-8 snap-x pb-2">
        {[
          { id: 'orders', label: 'Order Feed' },
          { id: 'payments', label: 'Payments' },
          { id: 'deliveries', label: 'Logistics' }
        ].map(v => (
          <button 
            key={v.id} 
            onClick={() => setOpsView(v.id)} 
            className={`px-6 py-2.5 rounded-full font-body text-sm font-bold capitalize transition-all snap-start min-h-[44px] whitespace-nowrap active:scale-95 ${opsView === v.id ? 'bg-primary text-secondary-container shadow-md' : 'bg-white border border-outline-variant/30 text-on-surface-variant hover:bg-background'}`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
        <div className="flex justify-between items-center mb-8">
           <h3 className="font-display font-bold text-xl text-on-surface capitalize">{opsView} History</h3>
           <Button variant="ghost" size="sm" className="!px-4"><Icons.Download /> <span className="ml-2">Export CSV</span></Button>
        </div>

        <div className="flex flex-col gap-3">
          {opsView === 'orders' && orders.map(order => (
            <div key={order.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white hover:shadow-sm transition-all">
               <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0"><Icons.Package /></div>
                  <div>
                    <p className="font-body font-bold text-sm text-on-surface">{order.id} · {order.customer}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-1">{order.items}</p>
                    <p className="font-body text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">{order.date} · {order.deliveryHub}</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 self-end sm:self-auto">
                  <p className="font-display font-bold text-sm text-on-surface">{formatCurrency(order.totalValue)}</p>
                  {renderBadge(order.status)}
               </div>
            </div>
          ))}

          {opsView === 'payments' && payments.map(pmt => (
            <div key={pmt.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between gap-4">
               <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${pmt.status === 'Paid' ? 'bg-secondary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}><Icons.Search /></div>
                  <div>
                    <p className="font-body font-bold text-sm text-on-surface">{pmt.id} · {pmt.orderId}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-1">{pmt.customer} · {pmt.method}</p>
                    <p className="font-body text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">{pmt.paidAt} · Ref: {pmt.reference}</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-display font-bold text-sm text-on-surface">{formatCurrency(pmt.amountValue)}</p>
                  <div className="mt-2">{renderBadge(pmt.status)}</div>
               </div>
            </div>
          ))}

          {opsView === 'deliveries' && (
             <div className="flex flex-col gap-4">
               {orders.filter(o => o.status === 'In Transit' || o.status === 'Delivered').map(dlv => (
                 <div key={dlv.id} className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-primary shrink-0 shadow-sm"><Icons.Truck /></div>
                       <div>
                         <p className="font-body font-bold text-sm text-on-surface">Dispatch {dlv.id}</p>
                         <p className="font-body text-xs text-on-surface-variant mt-1">To: {dlv.customer}</p>
                         <p className="font-body text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Assigned to: Rider #402 · {dlv.deliveryHub}</p>
                       </div>
                    </div>
                    {renderBadge(dlv.status)}
                 </div>
               ))}
               <div className="p-8 border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center text-center">
                  <p className="font-body text-sm font-bold text-on-surface-variant">Intelligent Route Engine</p>
                  <p className="font-body text-xs text-on-surface-variant mt-1 max-w-[240px]">Rider assignment and automated route batches are generated every 6 hours.</p>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => {
    const subTabs = [
      { id: 'general', label: 'General' },
      { id: 'team', label: 'Team' },
      { id: 'api', label: 'API & Integrations' },
    ];

    return (
      <div className="animate-in fade-in duration-300">
        <div className="mb-8 flex justify-between items-end">
          <div className="hidden md:block">
            <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">System Settings</h2>
            <p className="font-body text-on-surface-variant mt-1 font-medium">Global configuration for the Farmers Market platform.</p>
          </div>
          <Button variant="primary" size="md" className="font-bold !px-10 ml-auto md:ml-0" onClick={() => showToast('All system changes saved.', 'success')}>Save All</Button>
        </div>

        {/* Sub-navigation */}
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl mb-8 w-fit overflow-x-auto no-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSettingsTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-body text-sm font-bold transition-all whitespace-nowrap min-h-[44px] ${
                settingsTab === tab.id 
                  ? 'bg-white text-primary shadow-level-1' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {settingsTab === 'general' && (
              <>
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Market Operations</h3>
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Weekly Order Cutoff</label>
                        <select defaultValue="Wednesday 6:00 PM" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all">
                          <option>Wednesday 6:00 PM</option>
                          <option>Thursday 9:00 AM</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Delivery Window</label>
                        <select defaultValue="Friday & Saturday" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all">
                          <option>Friday only</option>
                          <option>Friday & Saturday</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Primary Fulfillment Hub</label>
                        <input type="text" defaultValue="Lagos Distribution Hub, Ikeja" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Finances</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface">Farmer Payout Cycle</label>
                      <select defaultValue="T+2" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all">
                        <option>T+1 (Daily)</option>
                        <option>T+2 (Standard)</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20">
                      <div>
                        <p className="font-body font-bold text-sm text-on-surface">Auto-reconcile Transfers</p>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">Automatically match bank transfers to order IDs.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </section>
              </>
            )}

            {settingsTab === 'team' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Team Members</h3>
                  <Button variant="ghost" size="sm" onClick={() => showToast('Invite system not connected.', 'warning')}>+ Invite Admin</Button>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { name: 'Adebayo O.', role: 'Owner', email: 'adebayo@farmersmarket.ng' },
                    { name: 'Sarah J.', role: 'Operations', email: 'sarah@farmersmarket.ng' },
                  ].map((member) => (
                    <div key={member.email} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-xs">{member.name.split(' ')[0][0]}{member.name.split(' ')[1][0]}</div>
                         <div>
                            <p className="font-body font-bold text-sm text-on-surface">{member.name}</p>
                            <p className="font-body text-xs text-on-surface-variant font-medium">{member.email}</p>
                         </div>
                      </div>
                      <span className="font-body text-[10px] font-bold text-on-surface-variant bg-white px-2 py-1 rounded shadow-sm uppercase tracking-widest">{member.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {settingsTab === 'api' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-8">Integrations</h3>
                <div className="flex flex-col gap-6">
                  <div className="p-5 border-2 border-primary rounded-2xl bg-primary/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-secondary-container font-display font-bold text-sm shrink-0">PS</div>
                    <div className="flex-1 min-w-0">
                       <p className="font-body font-bold text-on-surface">Paystack Production</p>
                       <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">Live gateway connected for naira payments.</p>
                    </div>
                    <Badge variant="green">LIVE</Badge>
                  </div>

                  <div className="p-5 border border-outline-variant/30 rounded-2xl bg-surface-container-low flex items-center gap-4 grayscale opacity-60">
                    <div className="w-12 h-12 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-primary font-display font-bold text-sm shrink-0"><svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg></div>
                    <div className="flex-1 min-w-0">
                       <p className="font-body font-bold text-on-surface">Logistics API (TBD)</p>
                       <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">Connect to 3rd party dispatch providers.</p>
                    </div>
                    <span className="font-body text-[10px] font-bold text-on-surface-variant px-2 py-1 bg-white rounded uppercase tracking-widest">Planned</span>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <section className="bg-secondary-container text-primary rounded-3xl p-8 shadow-level-2">
               <h4 className="font-display font-bold text-xl tracking-tight leading-tight">System Integrity</h4>
               <p className="font-body text-primary/70 text-sm mt-3 leading-relaxed font-medium">All critical settings changes are logged and audited in the **Ops Activity** trail.</p>
               <div className="mt-8 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="font-body text-xs font-bold uppercase tracking-widest">Audit Engine Live</span>
               </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-level-1 border border-outline-variant/30">
               <h4 className="font-display font-bold text-lg text-on-surface tracking-tight mb-5">Admin Profiles</h4>
               <p className="font-body text-sm text-on-surface-variant font-medium mb-6">Switch between regional fulfillment hub views.</p>
               <div className="flex flex-col gap-2">
                 {['Lagos Central', 'Abuja Hub', 'Port Harcourt'].map(h => (
                   <button key={h} className={`w-full text-left px-4 py-3 rounded-xl border border-outline-variant/20 font-body text-sm font-bold transition-all ${h === 'Lagos Central' ? 'bg-primary text-white border-primary' : 'bg-surface-container-low text-on-surface-variant hover:border-primary/30'}`}>{h}</button>
                 ))}
               </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      <AdminSidebar 
        activeTab={activeTab} 
        onChangeTab={handleTabChange} 
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-[75%] max-w-xs bg-primary p-8 flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-white text-xl tracking-tight">Ops Center</span>
              <button className="text-white/40 p-2" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <Icons.X />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {TABS.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabChange(tab.id)} 
                  className={`flex items-center gap-4 font-body text-lg font-bold transition-colors ${activeTab === tab.id ? 'text-secondary-container' : 'text-white/60 hover:text-white'}`}
                >
                  <tab.icon /> {tab.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-white/5">
               <button className="flex items-center gap-4 font-body text-lg font-bold text-white/40 hover:text-error transition-colors">
                  <Icons.Trash /> Log Out
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          title={TABS.find(t => t.id === activeTab)?.label || 'Ops'}
          setMobileMenuOpen={setMobileMenuOpen}
          isCollapsed={isCollapsed}
          onSearch={() => showToast('Search coming soon.', 'success')}
          onNotifications={() => showToast('No alerts.', 'success')}
        />

        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'} px-4 py-8 md:px-8 max-w-container-max mx-auto w-full`}>
          <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'catalog' && renderCatalog()}
            {activeTab === 'ops' && renderOps()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} />
      {toast && <ToastNotification message={toast.msg} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminDashboard;
