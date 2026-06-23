import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNav from '../components/dashboard/BottomNav';
import ToastNotification from '../components/dashboard/ToastNotification';
import ProductFormModal from '../components/dashboard/ProductFormModal';
import { PRODUCT_CATALOG, ORDERS } from '../data/mockData';
import VendorHomeTab from '../components/dashboard/VendorHomeTab';
import VendorCatalogTab from '../components/dashboard/VendorCatalogTab';
import VendorOpsTab from '../components/dashboard/VendorOpsTab';
import VendorEarningsTab from '../components/dashboard/VendorEarningsTab';
import VendorSettingsTab from '../components/dashboard/VendorSettingsTab';

const Icons = {
  Chart: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Package: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Truck: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Earnings: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
  Settings: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  X: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Menu: () => <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Search: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Bell: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
};

const VENDOR_DASHBOARD_BASE = '/dashboard/vendor';
const TABS = [
  { id: 'home', label: 'Dashboard', slug: '', icon: Icons.Chart },
  { id: 'catalog', label: 'Catalog', slug: 'catalog', icon: Icons.Package },
  { id: 'ops', label: 'Operations', slug: 'ops', icon: Icons.Truck },
  { id: 'earnings', label: 'Earnings', slug: 'earnings', icon: Icons.Earnings },
  { id: 'settings', label: 'Settings', slug: 'settings', icon: Icons.Settings },
];

const getTabFromPath = (pathname) => {
  if (pathname === VENDOR_DASHBOARD_BASE || pathname === `${VENDOR_DASHBOARD_BASE}/`) return 'home';
  const prefix = `${VENDOR_DASHBOARD_BASE}/`;
  if (!pathname.startsWith(prefix)) return null;
  const slug = pathname.slice(prefix.length);
  return TABS.find((tab) => tab.slug === slug)?.id ?? null;
};

const getPathForTab = (tabId) => {
  const tab = TABS.find((item) => item.id === tabId);
  return tab ? (tab.slug ? `${VENDOR_DASHBOARD_BASE}/${tab.slug}` : VENDOR_DASHBOARD_BASE) : null;
};

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const VendorDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Vendor State
  const [products, setProducts] = useState(PRODUCT_CATALOG);
  const [orders, setOrders] = useState(ORDERS);
  const [earningsSummary, setEarningsSummary] = useState({
    totalRevenue: 24200,
    paidEarnings: 20000,
    pendingPayout: 4200,
  });
  const [payoutHistory, setPayoutHistory] = useState([
    { id: 'PAY-01', amount: 12000, bankName: 'FCMB', date: 'Nov 15, 2024', status: 'Success' },
    { id: 'PAY-02', amount: 8000, bankName: 'FCMB', date: 'Nov 10, 2024', status: 'Success' },
  ]);

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const activeTab = getTabFromPath(location.pathname);

  const showToast = (message, variant = 'success') => setToast({ message, variant });

  useEffect(() => {
    if (!activeTab) {
      navigate(VENDOR_DASHBOARD_BASE, { replace: true });
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

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/vendor-login');
  };

  // Product CRUD Handlers
  const handleProductSubmit = (product) => {
    const exists = products.some(p => p.id === product.id);
    if (exists) {
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      showToast(`${product.name} updated successfully!`, 'success');
    } else {
      setProducts(prev => [product, ...prev]);
      showToast(`${product.name} listed successfully!`, 'success');
    }
  };

  const handleDeleteProduct = (productId) => {
    const target = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (target) {
      showToast(`${target.name} removed from catalog.`, 'warning');
    }
  };

  // Fulfillment Queue Operations
  const handleAcceptOrder = (order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'In Transit', badge: 'bg-secondary/15 text-secondary' } : o));
    showToast(`Order ${order.id} accepted. Dispatched to hub.`, 'success');
  };

  const handleRejectOrder = (order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Rejected', badge: 'bg-error/10 text-error' } : o));
    showToast(`Order ${order.id} rejected. Total refunded to customer.`, 'warning');
  };

  const handleFulfillOrder = (order) => {
    setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: 'Delivered', badge: 'bg-primary/10 text-primary' } : o));
    
    // Add to pending earnings
    setEarningsSummary(prev => {
      const newRevenue = prev.totalRevenue + order.total;
      const newPending = prev.pendingPayout + order.total;
      return { ...prev, totalRevenue: newRevenue, pendingPayout: newPending };
    });

    showToast(`Order ${order.id} marked as Delivered! Earnings updated.`, 'success');
  };

  // Request Payout
  const handleRequestPayout = () => {
    const pendingAmount = earningsSummary.pendingPayout;
    if (pendingAmount === 0) return;

    setEarningsSummary(prev => ({
      ...prev,
      pendingPayout: 0,
      paidEarnings: prev.paidEarnings + pendingAmount
    }));

    setPayoutHistory(prev => [
      {
        id: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
        amount: pendingAmount,
        bankName: 'FCMB',
        date: 'Just now',
        status: 'Success'
      },
      ...prev
    ]);

    showToast(`Payout of ${formatCurrency(pendingAmount)} completed successfully.`, 'success');
  };

  const handleSaveSettings = (settings) => {
    showToast('Farm profile settings and payout configurations updated.', 'success');
  };

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0">
      
      {/* Sidebar for Desktop */}
      <aside className={`fixed left-0 top-0 h-screen bg-primary pt-8 hidden md:flex flex-col z-50 transition-all duration-300 ease-in-out border-r border-white/5 shadow-level-1 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 w-6 h-6 rounded-full bg-secondary-container text-primary flex items-center justify-center shadow-md border border-white/10 active:scale-90 transition-all cursor-pointer z-50"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className={`w-4 h-4 transition-transform duration-300 ${isCollapsed ? '' : 'rotate-180'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
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
            Vendor Operations
          </p>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-2 overflow-hidden">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                title={isCollapsed ? tab.label : ''}
                className={`flex items-center rounded-2xl font-body text-sm font-bold transition-all duration-200 text-left outline-none group relative overflow-hidden cursor-pointer ${
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
          <button 
            onClick={handleLogout}
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

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-[75%] max-w-xs bg-primary p-8 flex flex-col animate-in slide-in-from-left duration-300 shadow-2xl">
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-white text-xl tracking-tight">Ops Center</span>
              <button className="text-white/40 p-2 cursor-pointer" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <Icons.X />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {TABS.map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => handleTabChange(tab.id)} 
                  className={`flex items-center gap-4 font-body text-lg font-bold transition-colors text-left cursor-pointer ${activeTab === tab.id ? 'text-secondary-container' : 'text-white/60 hover:text-white'}`}
                >
                  <tab.icon /> {tab.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-white/5">
               <button onClick={handleLogout} className="flex items-center gap-4 font-body text-lg font-bold text-white/40 hover:text-error transition-colors cursor-pointer text-left w-full">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> 
                  Log Out
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar */}
        <header className={`h-16 bg-primary border-b border-white/10 px-6 flex items-center justify-between sticky top-0 z-30 transition-all duration-300 shadow-sm ${
          isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'
        }`}>
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-white p-1 -ml-2 outline-none cursor-pointer"><Icons.Menu /></button>
            <h1 className="font-display font-bold text-xl text-white hidden md:block tracking-tight">
              {TABS.find(t => t.id === activeTab)?.label || 'Vendor Portal'}
            </h1>
          </div>
          
          <div className="md:hidden flex items-center justify-center flex-1">
            <span className="font-display font-bold text-white text-xl tracking-tighter">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-[10px] shadow-sm">VP</div>
          </div>
        </header>

        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'} px-4 py-8 md:px-8 max-w-container-max mx-auto pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-8`}>
          <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {activeTab === 'home' && (
              <VendorHomeTab 
                products={products}
                orders={orders}
                formatCurrency={formatCurrency}
                handleTabChange={handleTabChange}
                earningsSummary={earningsSummary}
              />
            )}
            {activeTab === 'catalog' && (
              <VendorCatalogTab 
                products={products}
                formatCurrency={formatCurrency}
                onCreateProductClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                onEditProductClick={(prod) => { setEditingProduct(prod); setIsFormOpen(true); }}
                onDeleteProductClick={handleDeleteProduct}
              />
            )}
            {activeTab === 'ops' && (
              <VendorOpsTab 
                orders={orders}
                formatCurrency={formatCurrency}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOrder}
                onFulfillOrder={handleFulfillOrder}
              />
            )}
            {activeTab === 'earnings' && (
              <VendorEarningsTab 
                earningsSummary={earningsSummary}
                payoutHistory={payoutHistory}
                formatCurrency={formatCurrency}
                onRequestPayout={handleRequestPayout}
              />
            )}
            {activeTab === 'settings' && (
              <VendorSettingsTab 
                onSaveSettings={handleSaveSettings}
                showToast={showToast}
              />
            )}
          </div>
        </main>
      </div>

      <ProductFormModal 
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
        product={editingProduct}
        onSubmit={handleProductSubmit}
      />

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} role="vendor" />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default VendorDashboard;
