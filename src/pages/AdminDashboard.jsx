import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import BottomNav from '../components/dashboard/BottomNav';
import ToastNotification from '../components/dashboard/ToastNotification';
import { PRODUCT_CATALOG, ORDERS, INITIAL_PAYMENTS } from '../data/mockData';

const Icons = {
  Chart: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Vendors: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Package: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  Truck: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Wallet: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="12" y1="4" x2="12" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line><circle cx="12" cy="12" r="2"></circle></svg>,
  Users: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  FileText: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Settings: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  X: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Menu: () => <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Download: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Bell: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  Search: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
};

const ADMIN_DASHBOARD_BASE = '/dashboard/admin';
const TABS = [
  { id: 'home', label: 'Dashboard', slug: '', icon: Icons.Chart },
  { id: 'vendors', label: 'Vendors', slug: 'vendors', icon: Icons.Vendors },
  { id: 'products', label: 'Products', slug: 'products', icon: Icons.Package },
  { id: 'orders', label: 'Orders', slug: 'orders', icon: Icons.Truck },
  { id: 'wallets', label: 'Wallets', slug: 'wallets', icon: Icons.Wallet },
  { id: 'users', label: 'Users', slug: 'users', icon: Icons.Users },
  { id: 'reports', label: 'Reports', slug: 'reports', icon: Icons.FileText },
  { id: 'settings', label: 'Settings', slug: 'settings', icon: Icons.Settings },
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

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Dynamic Admin State ---
  const [vendors, setVendors] = useState([
    { id: 'VND-001', name: 'Baba G. Farms', location: 'Ogun State', productsCount: 12, rating: 4.8, status: 'Active', contact: 'baba@farm.ng', performance: 98 },
    { id: 'VND-002', name: 'Benue Growers Co.', location: 'Benue State', productsCount: 8, rating: 4.5, status: 'Pending Approval', contact: 'benue@growers.ng', performance: 92 },
    { id: 'VND-003', name: 'Kano Onion Traders', location: 'Kano State', productsCount: 15, rating: 4.2, status: 'Suspended', contact: 'kano@onions.ng', performance: 75 },
    { id: 'VND-004', name: 'Kogi Fisheries', location: 'Kogi State', productsCount: 6, rating: 4.9, status: 'Active', contact: 'kogi@fish.ng', performance: 99 },
  ]);

  const [products, setProducts] = useState([
    { id: 'rice', name: 'Local Rice', category: 'Grains', priceValue: 480, stock: 240, status: 'Approved', origin: 'Ogun State', vendor: 'Baba G. Farms', image: '/product_rice.png' },
    { id: 'tomatoes', name: 'Fresh Tomatoes', category: 'Vegetables', priceValue: 320, stock: 150, status: 'Pending Approval', origin: 'Kaduna State', vendor: 'Kaduna Farms', image: '/product_tomatoes.png' },
    { id: 'catfish', name: 'Catfish', category: 'Protein', priceValue: 1200, stock: 48, status: 'Approved', origin: 'Kogi State', vendor: 'Kogi Fisheries', image: '/product_catfish.png' },
    { id: 'yam', name: 'Sweet Yam', category: 'Tubers', priceValue: 280, stock: 0, status: 'Out of Stock', origin: 'Benue State', vendor: 'Benue Growers Co.', image: '/product_yam.png' },
  ]);

  const [categories, setCategories] = useState(['Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits', 'Oil']);
  
  const [orders, setOrders] = useState([
    { id: '#FC-0892', customer: 'Amara Adebayo', items: '5kg Rice + 3kg Tomatoes', totalValue: 4200, status: 'Delivered', date: 'Nov 12', deliveryHub: 'Lekki drop-off', paymentStatus: 'Paid', disputeStatus: 'None' },
    { id: '#FC-0901', customer: 'Chinedu Okeke', items: '10kg Yam + 2kg Catfish', totalValue: 8500, status: 'In Transit', date: 'Nov 18', deliveryHub: 'Lagos distribution hub', paymentStatus: 'Paid', disputeStatus: 'None' },
    { id: '#FC-0915', customer: 'Kemi Lawal', items: '20kg Local Rice', totalValue: 9600, status: 'Processing', date: 'Nov 22', deliveryHub: 'Ikeja hub', paymentStatus: 'Paid', disputeStatus: 'Open Dispute' },
  ]);

  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  const [transactions, setTransactions] = useState([
    { id: 'TRX-101', user: 'Amara Adebayo', type: 'Purchase', amount: -4200, date: 'Nov 12', status: 'Success' },
    { id: 'TRX-102', user: 'Chinedu Okeke', type: 'Purchase', amount: -8500, date: 'Nov 18', status: 'Success' },
    { id: 'TRX-103', user: 'Kemi Lawal', type: 'Purchase', amount: -9600, date: 'Nov 22', status: 'Success' },
    { id: 'TRX-104', user: 'Baba G. Farms', type: 'Payout', amount: 15000, date: 'Nov 15', status: 'Success' },
  ]);

  const [users, setUsers] = useState([
    { id: 'USR-001', name: 'Amara Adebayo', email: 'amara@example.com', role: 'customer', status: 'Active', permissions: 'Buy, Top-up' },
    { id: 'USR-002', name: 'Chinedu Okeke', email: 'chinedu@example.com', role: 'customer', status: 'Active', permissions: 'Buy, Top-up' },
    { id: 'USR-003', name: 'Sarah J.', email: 'sarah@farmersmarket.ng', role: 'admin', status: 'Active', permissions: 'Fulfillment Supervisor' },
    { id: 'USR-004', name: 'Adebayo O.', email: 'adebayo@farmersmarket.ng', role: 'admin', status: 'Active', permissions: 'Super Admin' },
  ]);

  // Configurations
  const [platformFees, setPlatformFees] = useState(5); // 5% commission
  const [signupBonus, setSignupBonus] = useState(500); // ₦500
  const [farmerRewardsRate, setFarmerRewardsRate] = useState(2); // 2% points reward
  const [gatewayMode, setGatewayMode] = useState('Sandbox');
  const [deliveryBaseFee, setDeliveryBaseFee] = useState(850);
  const [deliveryExpressFee, setDeliveryExpressFee] = useState(1500);

  // Sub-tab States
  const [settingsTab, setSettingsTab] = useState('general');
  const [reportsTab, setReportsTab] = useState('revenue');

  // Modals / Overlay States
  const [editingVendor, setEditingVendor] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const activeTab = getTabFromPath(location.pathname);

  const showToast = (message, variant = 'success') => setToast({ message, variant });

  useEffect(() => {
    if (!activeTab) {
      navigate(ADMIN_DASHBOARD_BASE, { replace: true });
      return;
    }
    setShowContent(false);
    setMobileMenuOpen(false);
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [activeTab, navigate]);

  const handleTabChange = (tabId) => {
    const nextPath = getPathForTab(tabId);
    if (nextPath) navigate(nextPath);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/admin-login');
  };

  const renderBadge = (status) => {
    let classes = '';
    if (['Delivered', 'Active', 'Approved', 'Paid', 'Success', 'Resolved'].includes(status)) classes = 'bg-primary/10 text-primary';
    else if (['In Transit', 'Pending Approval', 'Pending settlement', 'Low Stock'].includes(status)) classes = 'bg-secondary/15 text-secondary';
    else if (['Out of Stock', 'Failed', 'Cancelled', 'Rejected', 'Suspended', 'Open Dispute'].includes(status)) classes = 'bg-error/10 text-error';
    else classes = 'bg-surface-container text-on-surface-variant';
    return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${classes}`}>{status}</span>;
  };

  // --- Handlers for Admin Portal Features ---
  
  // Vendor Actions
  const handleApproveVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Active' } : v));
    showToast(`Vendor ${id} approved successfully!`, 'success');
  };

  const handleSuspendVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'Suspended' } : v));
    showToast(`Vendor ${id} suspended.`, 'warning');
  };

  const handleSaveVendorInfo = (e) => {
    e.preventDefault();
    setVendors(prev => prev.map(v => v.id === editingVendor.id ? editingVendor : v));
    setEditingVendor(null);
    showToast('Vendor information updated.', 'success');
  };

  // Product Actions
  const handleApproveProduct = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
    showToast(`Product approved for catalog listings.`, 'success');
  };

  const handleRejectProduct = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    showToast(`Product listing request rejected.`, 'warning');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    setProducts(prev => prev.map(p => p.id === editingProduct.id ? editingProduct : p));
    setEditingProduct(null);
    showToast('Product listings updated.', 'success');
  };

  const handleRemoveProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product listing removed from catalog.', 'warning');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory.trim())) {
      showToast('Category already exists.', 'error');
      return;
    }
    setCategories(prev => [...prev, newCategory.trim()]);
    setNewCategory('');
    showToast('New product category registered.', 'success');
  };

  const handleRemoveCategory = (cat) => {
    setCategories(prev => prev.filter(c => c !== cat));
    showToast(`Category ${cat} deleted.`, 'warning');
  };

  // Order & Dispute Actions
  const handleResolveDispute = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, disputeStatus: 'Resolved' } : o));
    showToast(`Dispute on order ${id} marked as resolved.`, 'success');
  };

  const handleIssueRefund = (orderId, amount, customerName) => {
    // Log transaction
    setTransactions(prev => [
      { id: `TRX-${Math.floor(Math.random() * 900) + 100}`, user: customerName, type: 'Refund', amount: amount, date: 'Just now', status: 'Success' },
      ...prev
    ]);
    // Set payment status
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, paymentStatus: 'Refunded', status: 'Cancelled', badge: 'bg-error/10 text-error' } : o));
    showToast(`Refund of ${formatCurrency(amount)} logged successfully.`, 'success');
  };

  // User Actions
  const handleSaveUser = (e) => {
    e.preventDefault();
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    showToast('User permissions updated.', 'success');
  };

  // --- Dynamic Tab Renderers ---

  // 1. Dashboard View
  const renderHome = () => {
    const totalSales = orders.filter(o => o.status === 'Delivered' || o.status === 'In Transit').reduce((sum, o) => sum + o.totalValue, 0);
    const systemUptime = "99.98%";
    const gatewayLatency = "12ms";

    return (
      <div className="animate-in fade-in duration-200 text-left">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'System Turnover', value: formatCurrency(totalSales), diff: '+12% this week' },
            { label: 'Total Orders Feed', value: `${orders.length} orders`, diff: 'Fulfillment running' },
            { label: 'Vendor Partnerships', value: `${vendors.filter(v => v.status === 'Active').length} active`, diff: `${vendors.filter(v => v.status === 'Pending Approval').length} pending approval` },
            { label: 'Platform Consumers', value: `${users.filter(u => u.role === 'customer').length} registered`, diff: 'Active wallets' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-soft border border-outline-variant/10">
              <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">{stat.label}</p>
              <p className="font-display font-bold text-2xl text-on-surface mt-2">{stat.value}</p>
              <p className="font-body text-[10px] mt-1 text-secondary font-bold">{stat.diff}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* System Health */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 flex flex-col justify-between">
             <div>
                <h3 className="font-display font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
                   <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                   Platform Engine Health
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                   <div className="bg-background p-4 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">API Status</span>
                      <p className="text-xl font-display font-bold text-primary mt-1">{systemUptime}</p>
                   </div>
                   <div className="bg-background p-4 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">Paystack ping</span>
                      <p className="text-xl font-display font-bold text-primary mt-1">{gatewayLatency}</p>
                   </div>
                   <div className="bg-background p-4 rounded-xl text-center">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase">Server Load</span>
                      <p className="text-xl font-display font-bold text-primary mt-1">4.2%</p>
                   </div>
                </div>
             </div>
             <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-xs font-semibold leading-relaxed text-primary">
                System tasks are executing normally. Local database instances, background wallet transactions, and webhooks are active and healthy.
             </div>
          </div>

          {/* Quick Config Summary */}
          <div className="bg-secondary-container text-primary rounded-3xl p-8 shadow-level-2 flex flex-col justify-between">
             <div>
                <h4 className="font-display font-bold text-xl tracking-tight leading-tight">Policy Constants</h4>
                <p className="font-body text-primary/70 text-sm mt-3 leading-relaxed font-medium">Global fee thresholds currently applied to checkouts:</p>
                <ul className="mt-4 flex flex-col gap-2 font-body text-xs font-bold">
                   <li className="flex justify-between border-b border-primary/10 pb-1"><span>Platform Fee Commission:</span><span>{platformFees}%</span></li>
                   <li className="flex justify-between border-b border-primary/10 pb-1"><span>New User Wallet Bonus:</span><span>{formatCurrency(signupBonus)}</span></li>
                   <li className="flex justify-between"><span>Farmer Reward Rate:</span><span>{farmerRewardsRate}% cashback</span></li>
                </ul>
             </div>
             <Button variant="ghost" size="sm" className="mt-6 w-full !bg-primary !text-white active:scale-95" onClick={() => handleTabChange('settings')}>Configure Values</Button>
          </div>
        </div>
      </div>
    );
  };

  // 2. Vendors Management View
  const renderVendors = () => (
    <div className="animate-in fade-in duration-200 text-left bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
      <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Partners & Vendors Management</h3>
      <div className="overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 font-body text-xs text-on-surface-variant font-bold">
              <th className="pb-3">Vendor Name</th>
              <th className="pb-3">State/Location</th>
              <th className="pb-3">Listed Products</th>
              <th className="pb-3">Performance Score</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(v => (
              <tr key={v.id} className="border-b border-outline-variant/10 font-body text-sm hover:bg-background/40 transition-colors">
                <td className="py-4">
                  <p className="font-bold text-on-surface">{v.name}</p>
                  <span className="text-xs text-on-surface-variant">{v.contact}</span>
                </td>
                <td className="py-4 font-semibold text-on-surface-variant">{v.location}</td>
                <td className="py-4 font-semibold text-on-surface">{v.productsCount} items</td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold">{v.performance}%</span>
                    <div className="w-16 h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${v.performance}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4">{renderBadge(v.status)}</td>
                <td className="py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    {v.status === 'Pending Approval' && (
                      <Button variant="primary" size="xs" className="!px-3 font-bold" onClick={() => handleApproveVendor(v.id)}>Approve</Button>
                    )}
                    {v.status === 'Active' && (
                      <Button variant="ghost" size="xs" className="!px-3 !bg-error/5 hover:!bg-error/15 !text-error font-bold" onClick={() => handleSuspendVendor(v.id)}>Suspend</Button>
                    )}
                    {v.status === 'Suspended' && (
                      <Button variant="primary" size="xs" className="!px-3 font-bold" onClick={() => handleApproveVendor(v.id)}>Re-activate</Button>
                    )}
                    <button onClick={() => setEditingVendor(v)} className="font-body text-xs text-primary font-bold hover:underline ml-2">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 3. Products Management View
  const renderProducts = () => (
    <div className="animate-in fade-in duration-200 text-left grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Products Catalog Table */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
        <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Product Catalog Audit</h3>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 font-body text-xs text-on-surface-variant font-bold">
                <th className="pb-3">Product</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b border-outline-variant/10 font-body text-sm hover:bg-background/40 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-outline-variant/10">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{p.name}</p>
                        <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Vendor: {p.vendor}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-on-surface-variant">{p.category}</td>
                  <td className="py-4 font-bold text-on-surface">{formatCurrency(p.priceValue)}</td>
                  <td className="py-4 font-semibold text-on-surface">{p.stock > 0 ? `${p.stock}kg` : renderBadge('Out of Stock')}</td>
                  <td className="py-4">{renderBadge(p.status)}</td>
                  <td className="py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      {p.status === 'Pending Approval' && (
                        <>
                          <Button variant="primary" size="xs" className="!px-2.5 font-bold" onClick={() => handleApproveProduct(p.id)}>Approve</Button>
                          <Button variant="ghost" size="xs" className="!px-2.5 !bg-error/5 hover:!bg-error/15 !text-error font-bold" onClick={() => handleRejectProduct(p.id)}>Reject</Button>
                        </>
                      )}
                      <button onClick={() => setEditingProduct(p)} className="font-body text-xs text-primary font-bold hover:underline ml-2">Edit</button>
                      <button onClick={() => handleRemoveProduct(p.id)} className="font-body text-xs text-error font-bold hover:underline ml-2">Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Categories Panel */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 flex flex-col gap-6 h-fit">
        <div>
          <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-2">Manage Categories</h3>
          <p className="font-body text-xs text-on-surface-variant font-medium">Add/Delete marketplace catalog groups.</p>
        </div>

        <form onSubmit={handleAddCategory} className="flex gap-2">
          <input 
            type="text" 
            placeholder="New Category..." 
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/40"
          />
          <Button type="submit" variant="primary" size="sm" className="font-bold">Add</Button>
        </form>

        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <div key={cat} className="flex items-center gap-1 bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/10 text-xs font-bold text-on-surface">
              <span>{cat}</span>
              <button type="button" onClick={() => handleRemoveCategory(cat)} className="text-on-surface-variant hover:text-error ml-1 focus:outline-none">✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 4. Orders Management View
  const renderOrders = () => (
    <div className="animate-in fade-in duration-200 text-left bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
      <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Operations & Order Fulfillment</h3>
      
      {/* Mobile/Tablet Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mb-6">
        {orders.map(o => (
          <div key={o.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-body font-bold text-sm text-on-surface">{o.id}</p>
                <span className="text-xs text-on-surface-variant">{o.date}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                {renderBadge(o.status)}
                {o.disputeStatus !== 'None' && renderBadge(o.disputeStatus)}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant border-t border-outline-variant/10 pt-3">
              <div>
                <p className="font-semibold text-on-surface">{o.customer}</p>
                <span className="text-[10px] block mt-0.5">{o.items}</span>
              </div>
              <span>Total: <strong className="text-on-surface">{formatCurrency(o.totalValue)}</strong></span>
            </div>
            <div className="flex justify-end gap-2 border-t border-outline-variant/10 pt-3 mt-1">
              <Button variant="primary" size="xs" className="!px-3 font-bold" onClick={() => setTrackingOrder(o)}>Track</Button>
              {o.disputeStatus !== 'None' && o.disputeStatus !== 'Resolved' && (
                <Button variant="ghost" size="xs" className="!px-3 !bg-primary/5 hover:!bg-primary/10 !text-primary font-bold" onClick={() => handleResolveDispute(o.id)}>Resolve Dispute</Button>
              )}
              {o.paymentStatus !== 'Refunded' && (
                <Button variant="ghost" size="xs" className="!px-3 !bg-error/5 hover:!bg-error/15 !text-error font-bold" onClick={() => handleIssueRefund(o.id, o.totalValue, o.customer)}>Issue Refund</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 font-body text-xs text-on-surface-variant font-bold">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Total Value</th>
              <th className="pb-3">Fulfillment Status</th>
              <th className="pb-3">Dispute State</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-outline-variant/10 font-body text-sm hover:bg-background/40 transition-colors">
                <td className="py-4 font-bold text-on-surface">{o.id}</td>
                <td className="py-4">
                  <p className="font-semibold text-on-surface">{o.customer}</p>
                  <span className="text-xs text-on-surface-variant">{o.items}</span>
                </td>
                <td className="py-4 text-on-surface-variant font-medium">{o.date}</td>
                <td className="py-4 font-bold text-on-surface">{formatCurrency(o.totalValue)}</td>
                <td className="py-4">{renderBadge(o.status)}</td>
                <td className="py-4">{o.disputeStatus === 'None' ? <span className="text-xs text-on-surface-variant font-medium">None</span> : renderBadge(o.disputeStatus)}</td>
                <td className="py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <Button variant="primary" size="xs" className="!px-3 font-bold" onClick={() => setTrackingOrder(o)}>Track</Button>
                    {o.disputeStatus !== 'None' && o.disputeStatus !== 'Resolved' && (
                      <Button variant="ghost" size="xs" className="!px-3 !bg-primary/5 hover:!bg-primary/10 !text-primary font-bold" onClick={() => handleResolveDispute(o.id)}>Resolve Dispute</Button>
                    )}
                    {o.paymentStatus !== 'Refunded' && (
                      <Button variant="ghost" size="xs" className="!px-3 !bg-error/5 hover:!bg-error/15 !text-error font-bold" onClick={() => handleIssueRefund(o.id, o.totalValue, o.customer)}>Issue Refund</Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 5. Wallet Management View
  const renderWallets = () => {
    const totalTransactions = transactions.length;
    const netVolume = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return (
      <div className="animate-in fade-in duration-200 text-left grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ledger & Transactions Audit */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Ledger & Transaction Audits</h3>
              <p className="font-body text-xs text-on-surface-variant font-medium mt-1">Audit of consumer checkouts and partner payouts.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Ledger Volume</span>
              <p className="font-display font-bold text-lg text-primary">{formatCurrency(netVolume)}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {transactions.map(t => (
              <div key={t.id} className="p-4 rounded-xl border border-outline-variant/10 bg-background/30 flex justify-between items-center">
                <div>
                  <p className="font-body font-bold text-sm text-on-surface">{t.user}</p>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">{t.id} · {t.type} · {t.date}</span>
                </div>
                <div className="text-right">
                  <p className={`font-display font-bold text-sm ${t.amount < 0 ? 'text-on-surface' : 'text-primary'}`}>
                    {t.amount < 0 ? '-' : '+'}{formatCurrency(Math.abs(t.amount))}
                  </p>
                  <span className="text-[9px] font-bold uppercase text-primary tracking-wider">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incentives & Bonus Configuration */}
        <div className="flex flex-col gap-6">
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
            <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-primary rounded-full"></span>
              Consumer Sign-up Incentives
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Registration Bonus Amount (₦)</label>
                <input 
                  type="number" 
                  value={signupBonus}
                  onChange={(e) => setSignupBonus(Number(e.target.value))}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
                />
              </div>
              <Button variant="primary" size="md" className="font-bold w-full" onClick={() => showToast('Signup bonus amount updated.', 'success')}>Save Incentive settings</Button>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
            <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
              Farmer Reward Multiplier
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Reward Points rate (%)</label>
                <input 
                  type="number" 
                  value={farmerRewardsRate}
                  onChange={(e) => setFarmerRewardsRate(Number(e.target.value))}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
                />
              </div>
              <Button variant="primary" size="md" className="font-bold w-full" onClick={() => showToast('Farmer reward rate updated.', 'success')}>Save Reward multiplier</Button>
            </div>
          </section>
        </div>
      </div>
    );
  };

  // 6. User Management View
  const renderUsers = () => (
    <div className="animate-in fade-in duration-200 text-left bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Active User Registry</h3>
          <p className="font-body text-xs text-on-surface-variant font-medium mt-1">Configure global user levels, roles, and administrative operator keys.</p>
        </div>
        <Button variant="ghost" size="sm" className="!px-4 font-bold border border-outline-variant/30" onClick={() => showToast('Team invitation triggered.', 'success')}>+ Add Operator</Button>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mb-6">
        {users.map(u => (
          <div key={u.id} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-body font-bold text-sm text-on-surface">{u.name}</p>
                <span className="text-xs text-on-surface-variant">{u.email}</span>
              </div>
              {renderBadge(u.status)}
            </div>
            <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant border-t border-outline-variant/10 pt-3">
              <span>Role: <strong className={`font-bold uppercase tracking-wider ${u.role === 'admin' ? 'text-primary' : 'text-on-surface-variant'}`}>{u.role}</strong></span>
              <span>Scope: <strong className="text-on-surface font-semibold">{u.permissions}</strong></span>
            </div>
            <div className="flex justify-end border-t border-outline-variant/10 pt-3 mt-1">
              <button onClick={() => setEditingUser(u)} className="font-body text-xs text-primary font-bold hover:underline">Edit Scope</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/30 font-body text-xs text-on-surface-variant font-bold">
              <th className="pb-3">User</th>
              <th className="pb-3">System Access Role</th>
              <th className="pb-3">Permissions Scope</th>
              <th className="pb-3">Account Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b border-outline-variant/10 font-body text-sm hover:bg-background/40 transition-colors">
                <td className="py-4">
                  <p className="font-bold text-on-surface">{u.name}</p>
                  <span className="text-xs text-on-surface-variant">{u.email}</span>
                </td>
                <td className="py-4">
                  <span className={`text-xs font-bold uppercase tracking-wider ${u.role === 'admin' ? 'text-primary' : 'text-on-surface-variant'}`}>{u.role}</span>
                </td>
                <td className="py-4 font-semibold text-on-surface-variant text-xs">{u.permissions}</td>
                <td className="py-4">{renderBadge(u.status)}</td>
                <td className="py-4 text-right">
                  <button onClick={() => setEditingUser(u)} className="font-body text-xs text-primary font-bold hover:underline">Edit Scope</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 7. Reports View
  const renderReports = () => {
    const reportTabs = [
      { id: 'revenue', label: 'Revenue Reports' },
      { id: 'sales', label: 'Sales Reports' },
      { id: 'vendor', label: 'Vendor Performance' },
      { id: 'state', label: 'State-by-State' },
      { id: 'customer', label: 'Acquisitions' },
    ];

    return (
      <div className="animate-in fade-in duration-300 text-left bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
        <div className="mb-6">
          <h2 className="font-display font-bold text-xl text-on-surface tracking-tight">Interactive Platform Reports</h2>
          <p className="font-body text-xs text-on-surface-variant mt-1 font-medium">Select a metrics group below to audit performance benchmarks.</p>
        </div>

        {/* Report sub-tabs */}
        <div className="flex gap-2 border-b border-outline-variant/20 pb-2 mb-8 overflow-x-auto no-scrollbar">
          {reportTabs.map(rt => (
            <button
              key={rt.id}
              onClick={() => setReportsTab(rt.id)}
              className={`px-4 py-2 rounded-lg font-body text-xs font-bold transition-all whitespace-nowrap min-h-[38px] cursor-pointer ${
                reportsTab === rt.id 
                  ? 'bg-primary text-secondary-container shadow-sm' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-background'
              }`}
            >
              {rt.label}
            </button>
          ))}
        </div>

        {reportsTab === 'revenue' && (
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-on-surface">Revenue Growth Metrics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-outline-variant/20 rounded-2xl p-5 bg-background/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Gross Merchandise Value (GMV)</span>
                <p className="font-display font-bold text-3xl text-on-surface mt-2">₦22,300,000</p>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-4">
                  <div className="bg-primary h-full w-[82%]"></div>
                </div>
                <span className="text-[10px] font-bold text-secondary mt-2 block">82% of Annual Target Achieved</span>
              </div>
              <div className="border border-outline-variant/20 rounded-2xl p-5 bg-background/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Commission Income (Platform Fees)</span>
                <p className="font-display font-bold text-3xl text-on-surface mt-2">₦1,115,000</p>
                <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-4">
                  <div className="bg-primary h-full w-[65%]"></div>
                </div>
                <span className="text-[10px] font-bold text-secondary mt-2 block">65% platform margin increase</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="mt-4 cursor-pointer" onClick={() => showToast('Revenue PDF audit report compiled.', 'success')}>Download Full PDF Report</Button>
          </div>
        )}

        {reportsTab === 'sales' && (
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-on-surface">Marketplace Category Sales</h4>
            <div className="flex flex-col gap-4">
              {[
                { category: 'Grains', sales: '₦4,820,000', percentage: 40 },
                { category: 'Protein (Catfish/Livestock)', sales: '₦3,615,000', percentage: 30 },
                { category: 'Tubers (Yams/Potatoes)', sales: '₦2,410,000', percentage: 20 },
                { category: 'Vegetables & Produce', sales: '₦1,205,000', percentage: 10 },
              ].map(item => (
                <div key={item.category} className="p-4 border border-outline-variant/10 rounded-xl bg-background/20">
                  <div className="flex justify-between items-center text-xs font-bold mb-2">
                    <span className="text-on-surface">{item.category}</span>
                    <span className="text-primary">{item.sales} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full" style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {reportsTab === 'vendor' && (
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-on-surface">Vendor Fulfillment Performance</h4>
            
            {/* Mobile/Tablet Card View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {[
                { name: 'Baba G. Farms', batches: 42, rate: '98%', rating: '4.8 ★' },
                { name: 'Kogi Fisheries', batches: 24, rate: '99%', rating: '4.9 ★' },
                { name: 'Benue Growers Co.', batches: 18, rate: '92%', rating: '4.5 ★' },
              ].map(v => (
                <div key={v.name} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <p className="font-body font-bold text-sm text-on-surface">{v.name}</p>
                    <span className="text-xs font-semibold text-primary">{v.rate} fulfillment</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant border-t border-outline-variant/10 pt-2 mt-1">
                    <span>Loads: {v.batches}</span>
                    <span>Rating: {v.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/20 font-body text-xs text-on-surface-variant font-bold">
                    <th className="pb-2">Farm Vendor</th>
                    <th className="pb-2">Dispatched Batches</th>
                    <th className="pb-2">Fulfillment Rate</th>
                    <th className="pb-2">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Baba G. Farms', batches: 42, rate: '98%', rating: '4.8 ★' },
                    { name: 'Kogi Fisheries', batches: 24, rate: '99%', rating: '4.9 ★' },
                    { name: 'Benue Growers Co.', batches: 18, rate: '92%', rating: '4.5 ★' },
                  ].map(v => (
                    <tr key={v.name} className="border-b border-outline-variant/10 font-body font-semibold">
                      <td className="py-3 text-on-surface">{v.name}</td>
                      <td className="py-3 text-on-surface-variant">{v.batches} loads</td>
                      <td className="py-3 text-primary">{v.rate}</td>
                      <td className="py-3 text-on-surface">{v.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {reportsTab === 'state' && (
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-on-surface">State-by-State Sales Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { state: 'Lagos State', sales: '₦12,450,000', label: 'Primary Urban hub' },
                { state: 'Ogun State', sales: '₦4,800,000', label: 'Farming Corridor' },
                { state: 'Benue State', sales: '₦2,350,000', label: 'Tuber Corridor' },
              ].map(st => (
                <div key={st.state} className="p-4 rounded-xl border border-outline-variant/15 text-left bg-background/20">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">{st.label}</span>
                  <p className="font-display font-bold text-lg text-on-surface mt-2">{st.state}</p>
                  <p className="font-body font-bold text-sm text-primary mt-1">{st.sales}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {reportsTab === 'customer' && (
          <div className="flex flex-col gap-6">
            <h4 className="font-display font-bold text-lg text-on-surface">Customer Acquisitions Track</h4>
            <div className="p-6 border border-outline-variant/15 rounded-2xl bg-background/10 text-center">
              <span className="text-xs font-bold text-on-surface-variant block mb-2">New signups this week</span>
              <p className="font-display font-bold text-4xl text-primary">124 users</p>
              <p className="font-body text-xs text-secondary font-bold mt-2">↑ 28% increase compared to last week</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // 8. Settings View
  const renderSettings = () => {
    const subTabs = [
      { id: 'general', label: 'Global Configurations' },
      { id: 'team', label: 'Fulfillment Operators' },
      { id: 'api', label: 'APIs & Webhooks' },
    ];

    return (
      <div className="animate-in fade-in duration-300 text-left">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">System Settings</h2>
            <p className="font-body text-sm text-on-surface-variant mt-1 font-medium font-semibold">Global configurations for the Farm Connect platform.</p>
          </div>
          <Button variant="primary" size="md" className="font-bold !px-10 ml-auto md:ml-0 cursor-pointer" onClick={() => showToast('All configuration updates saved.', 'success')}>Save Settings</Button>
        </div>

        {/* Sub-navigation */}
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl mb-8 w-fit overflow-x-auto no-scrollbar">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSettingsTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-body text-sm font-bold transition-all whitespace-nowrap min-h-[44px] cursor-pointer ${
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
                        <select defaultValue="Wednesday 6:00 PM" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all cursor-pointer">
                          <option>Wednesday 6:00 PM</option>
                          <option>Thursday 9:00 AM</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Delivery Window</label>
                        <select defaultValue="Friday & Saturday" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all cursor-pointer">
                          <option>Friday only</option>
                          <option>Friday & Saturday</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Delivery Fees (₦)</h3>
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Standard Delivery Fee</label>
                        <input 
                          type="number" 
                          value={deliveryBaseFee}
                          onChange={(e) => setDeliveryBaseFee(Number(e.target.value))}
                          className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-body font-bold text-sm text-on-surface">Express Delivery Fee</label>
                        <input 
                          type="number" 
                          value={deliveryExpressFee}
                          onChange={(e) => setDeliveryExpressFee(Number(e.target.value))}
                          className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Platform Commissions</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface">Platform Fee (%)</label>
                      <input 
                        type="number" 
                        value={platformFees}
                        onChange={(e) => setPlatformFees(Number(e.target.value))}
                        className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
                      />
                    </div>
                  </div>
                </section>
              </>
            )}

            {settingsTab === 'team' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">System Administrators</h3>
                  <Button variant="ghost" size="sm" className="cursor-pointer" onClick={() => showToast('Invite system active.', 'success')}>+ Invite Admin</Button>
                </div>
                <div className="flex flex-col gap-4">
                  {users.filter(u => u.role === 'admin').map((member) => (
                    <div key={member.email} className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-xs">{member.name.split(' ')[0][0]}{member.name.split(' ').length > 1 ? member.name.split(' ')[1][0] : ''}</div>
                         <div>
                            <p className="font-body font-bold text-sm text-on-surface">{member.name}</p>
                            <p className="font-body text-xs text-on-surface-variant font-medium">{member.email}</p>
                         </div>
                      </div>
                      <span className="font-body text-[10px] font-bold text-on-surface-variant bg-white px-2 py-1 rounded shadow-sm uppercase tracking-widest">{member.permissions}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {settingsTab === 'api' && (
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-8">Gateway Integrations</h3>
                <div className="flex flex-col gap-6">
                  <div className="p-5 border-2 border-primary rounded-2xl bg-primary/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-secondary-container font-display font-bold text-sm shrink-0">PS</div>
                    <div className="flex-1 min-w-0">
                       <p className="font-body font-bold text-on-surface">Paystack Integration Mode</p>
                       <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">Configure transaction gateway parameter endpoints.</p>
                       <div className="mt-3 flex gap-2">
                         {['Sandbox', 'Live Production'].map(mode => (
                           <button 
                             key={mode} 
                             type="button"
                             onClick={() => setGatewayMode(mode)}
                             className={`text-xs px-3 py-1.5 rounded-lg font-bold border transition-colors cursor-pointer ${gatewayMode === mode ? 'bg-primary text-white border-primary' : 'bg-white border-outline-variant/30 text-on-surface-variant'}`}
                           >
                             {mode}
                           </button>
                         ))}
                       </div>
                    </div>
                    <Badge variant={gatewayMode === 'Sandbox' ? 'amber' : 'green'}>{gatewayMode === 'Sandbox' ? 'SANDBOX' : 'LIVE'}</Badge>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <section className="bg-secondary-container text-primary rounded-3xl p-8 shadow-level-2">
               <h4 className="font-display font-bold text-xl tracking-tight leading-tight">System Integrity</h4>
               <p className="font-body text-primary/70 text-sm mt-3 leading-relaxed font-medium">All configuration parameter adjustments are logged and audited in the platform security trails.</p>
               <div className="mt-8 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                  <span className="font-body text-xs font-bold uppercase tracking-widest">Audit Engine Live</span>
               </div>
            </section>
          </div>
        </div>
      </div>
    );
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
            Admin Console
          </p>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-2 overflow-y-auto no-scrollbar">
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
            <nav className="flex flex-col gap-6 overflow-y-auto no-scrollbar">
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
              {TABS.find(t => t.id === activeTab)?.label || 'Console'}
            </h1>
          </div>
          
          <div className="md:hidden flex items-center justify-center flex-1">
            <span className="font-display font-bold text-white text-xl tracking-tighter">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-xl tracking-tighter ml-1">Market</span>
          </div>

          <div className="flex items-center gap-2 md:gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-[10px] shadow-sm">OP</div>
          </div>
        </header>

        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'} px-4 py-8 md:px-8 max-w-container-max mx-auto`}>
          <div className={`transition-opacity duration-150 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'vendors' && renderVendors()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'wallets' && renderWallets()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'reports' && renderReports()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      {/* --- OVERLAY MODALS --- */}
      
      {/* 1. Edit Vendor Modal */}
      {editingVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-level-3 border border-outline-variant/30 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl text-on-surface">Edit Vendor Account</h3>
              <button onClick={() => setEditingVendor(null)} className="text-on-surface-variant hover:text-on-surface p-1"><Icons.X /></button>
            </div>
            <form onSubmit={handleSaveVendorInfo} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Vendor Name</label>
                <input 
                  type="text" 
                  value={editingVendor.name}
                  onChange={(e) => setEditingVendor({ ...editingVendor, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Contact Email</label>
                <input 
                  type="email" 
                  value={editingVendor.contact}
                  onChange={(e) => setEditingVendor({ ...editingVendor, contact: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">State/Location</label>
                <input 
                  type="text" 
                  value={editingVendor.location}
                  onChange={(e) => setEditingVendor({ ...editingVendor, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Performance Score (%)</label>
                <input 
                  type="number" 
                  value={editingVendor.performance}
                  onChange={(e) => setEditingVendor({ ...editingVendor, performance: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold">Save Info</Button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-level-3 border border-outline-variant/30 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl text-on-surface">Edit Product Listing</h3>
              <button onClick={() => setEditingProduct(null)} className="text-on-surface-variant hover:text-on-surface p-1"><Icons.X /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Product Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Price (₦)</label>
                <input 
                  type="number" 
                  value={editingProduct.priceValue}
                  onChange={(e) => setEditingProduct({ ...editingProduct, priceValue: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Available Stock (kg)</label>
                <input 
                  type="number" 
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold">Update Listing</Button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Order Details & Tracker Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-level-3 border border-outline-variant/30 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl text-on-surface">Fulfillment Tracker</h3>
              <button onClick={() => setTrackingOrder(null)} className="text-on-surface-variant hover:text-on-surface p-1"><Icons.X /></button>
            </div>
            
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-body font-bold text-sm text-on-surface">{trackingOrder.id} · {trackingOrder.customer}</p>
                <p className="font-body text-xs text-on-surface-variant font-medium mt-1">Delivery Hub: {trackingOrder.deliveryHub}</p>
              </div>

              {/* Visual Tracker Timeline */}
              <div className="flex flex-col gap-4 border-l-2 border-primary/20 pl-4 ml-2">
                {[
                  { state: 'Placed & Paid', desc: 'Transaction approved on Paystack gateway', date: trackingOrder.date, active: true },
                  { state: 'Processing', desc: 'Vendor packing harvest items', date: 'Same day', active: ['Processing', 'In Transit', 'Delivered'].includes(trackingOrder.status) },
                  { state: 'In Transit', desc: 'Dispatched to regional hub depot', date: 'Nov 18', active: ['In Transit', 'Delivered'].includes(trackingOrder.status) },
                  { state: 'Delivered', desc: 'Rider dropped off cargo package', date: 'Nov 20', active: trackingOrder.status === 'Delivered' },
                ].map(step => (
                  <div key={step.state} className="relative">
                    <span className={`w-3.5 h-3.5 rounded-full absolute -left-[23px] top-1 border-2 border-white ${step.active ? 'bg-primary' : 'bg-outline-variant'}`}></span>
                    <p className={`font-body font-bold text-sm ${step.active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{step.state}</p>
                    <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-outline-variant/20 pt-4 mt-2">
                <span className="font-body text-xs text-on-surface-variant font-bold">Fulfillment Status:</span>
                {renderBadge(trackingOrder.status)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit User Scope Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-level-3 border border-outline-variant/30 text-left">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl text-on-surface">Manage User Scope</h3>
              <button onClick={() => setEditingUser(null)} className="text-on-surface-variant hover:text-on-surface p-1"><Icons.X /></button>
            </div>
            <form onSubmit={handleSaveUser} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">User Name</label>
                <input 
                  type="text" 
                  disabled
                  value={editingUser.name}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline bg-background font-body text-sm font-semibold opacity-70 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">System Role</label>
                <select 
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                >
                  <option value="customer">customer</option>
                  <option value="vendor">vendor</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Permissions Scope / Title</label>
                <input 
                  type="text" 
                  value={editingUser.permissions}
                  onChange={(e) => setEditingUser({ ...editingUser, permissions: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Account Status</label>
                <select 
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant font-body text-sm font-semibold"
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold">Save User Scope</Button>
            </form>
          </div>
        </div>
      )}

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} role="admin" />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default AdminDashboard;