import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ToastNotification from '../components/dashboard/ToastNotification';

const Icons = {
  Chart: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Package: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
  List: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
  Truck: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>,
  Users: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Card: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><line x1="6" y1="15" x2="10" y2="15"></line></svg>,
  Settings: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Search: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Bell: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  X: () => <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Pencil: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>,
  Trash: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>,
  Menu: () => <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  Sort: () => <svg className="w-3 h-3 text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15l5 5 5-5"></path><path d="M7 9l5-5 5 5"></path></svg>,
  Download: () => <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
};

const ADMIN_DASHBOARD_BASE = '/dashboard/admin';
const TABS = [
  { id: 'home', label: 'Dashboard', slug: '', icon: Icons.Chart },
  { id: 'products', label: 'Products', slug: 'products', icon: Icons.Package },
  { id: 'orders', label: 'Orders', slug: 'orders', icon: Icons.List },
  { id: 'payments', label: 'Payments', slug: 'payments', icon: Icons.Card },
  { id: 'deliveries', label: 'Deliveries', slug: 'deliveries', icon: Icons.Truck },
  { id: 'customers', label: 'Customers', slug: 'customers', icon: Icons.Users },
  { id: 'analytics', label: 'Analytics', slug: 'analytics', icon: Icons.Chart },
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
  {
    id: '#FC-0915',
    customer: 'Kemi Lawal',
    items: '20kg Local Rice',
    totalValue: 9600,
    status: 'Processing',
    date: 'Nov 22',
    deliveryHub: 'Awaiting dispatch',
    lineItems: [
      { name: 'Local Rice', qty: 20, price: 480, sub: 9600 },
    ],
  },
];

const INITIAL_DELIVERIES = [
  { id: 'DLV-201', orderId: '#FC-0901', customer: 'Chinedu Okeke', riderId: 'DRV-01', rider: 'Ibrahim S.', eta: 'Today, 5:30 PM', zone: 'Lagos Island', status: 'In Transit' },
  { id: 'DLV-198', orderId: '#FC-0892', customer: 'Amara Adebayo', riderId: 'DRV-02', rider: 'Musa K.', eta: 'Delivered', zone: 'Lekki', status: 'Delivered' },
  { id: 'DLV-224', orderId: '#FC-0915', customer: 'Kemi Lawal', riderId: 'DRV-03', rider: 'Tola B.', eta: 'Tomorrow, 10:00 AM', zone: 'Surulere', status: 'Queued' },
];

const INITIAL_CUSTOMERS = [
  { id: 'CUS-001', name: 'Amara Adebayo', email: 'amara@example.com', city: 'Lagos', orders: 12, spendValue: 18400, status: 'Active' },
  { id: 'CUS-002', name: 'Chinedu Okeke', email: 'chinedu@example.com', city: 'Abuja', orders: 8, spendValue: 12600, status: 'Active' },
  { id: 'CUS-003', name: 'Kemi Lawal', email: 'kemi@example.com', city: 'Ibadan', orders: 3, spendValue: 9600, status: 'New' },
];

const INITIAL_DRIVERS = [
  { id: 'DRV-01', name: 'Ibrahim S.', phone: '+234 803 114 2290', vehicle: 'TVS Cargo Bike', hub: 'Lagos Island Hub', status: 'On Route', onTimeRate: '96%', completedToday: 7, assignedNow: 2, zone: 'Island Corridor' },
  { id: 'DRV-02', name: 'Musa K.', phone: '+234 805 201 7718', vehicle: 'Mini Van', hub: 'Lekki Hub', status: 'Available', onTimeRate: '93%', completedToday: 5, assignedNow: 0, zone: 'Lekki-Ajah Corridor' },
  { id: 'DRV-03', name: 'Tola B.', phone: '+234 809 662 1180', vehicle: 'Dispatch Bike', hub: 'Mainland Hub', status: 'Queued', onTimeRate: '91%', completedToday: 4, assignedNow: 1, zone: 'Mainland Central' },
];

const INITIAL_PAYMENTS = [
  { id: 'PMT-204', orderId: '#FC-0915', customer: 'Kemi Lawal', amountValue: 9600, method: 'Bank Transfer', status: 'Pending settlement', reference: 'TRX-2281', paidAt: 'Nov 22, 8:42 AM', reviewed: false, notes: 'Transfer received, reconciliation still pending.' },
  { id: 'PMT-198', orderId: '#FC-0901', customer: 'Chinedu Okeke', amountValue: 8500, method: 'Card', status: 'Paid', reference: 'TRX-2244', paidAt: 'Nov 18, 7:14 AM', reviewed: true, notes: 'Payment verified and matched to dispatch batch.' },
  { id: 'PMT-191', orderId: '#FC-0892', customer: 'Amara Adebayo', amountValue: 4200, method: 'Wallet', status: 'Paid', reference: 'TRX-2207', paidAt: 'Nov 12, 9:03 AM', reviewed: true, notes: 'Auto-captured through saved wallet balance.' },
  { id: 'PMT-207', orderId: '#FC-0921', customer: 'Bola Yusuf', amountValue: 5300, method: 'Card', status: 'Failed', reference: 'TRX-2296', paidAt: 'Nov 23, 3:16 PM', reviewed: false, notes: 'Card authorization failed. Customer has not retried yet.' },
];

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const getTabFromPath = (pathname) => {
  if (pathname === ADMIN_DASHBOARD_BASE || pathname === `${ADMIN_DASHBOARD_BASE}/`) {
    return 'home';
  }

  const prefix = `${ADMIN_DASHBOARD_BASE}/`;
  if (!pathname.startsWith(prefix)) {
    return null;
  }

  const slug = pathname.slice(prefix.length);
  return TABS.find((tab) => tab.slug === slug)?.id ?? null;
};

const getPathForTab = (tabId) => {
  const tab = TABS.find((item) => item.id === tabId);
  if (!tab) {
    return null;
  }

  return tab.slug ? `${ADMIN_DASHBOARD_BASE}/${tab.slug}` : ADMIN_DASHBOARD_BASE;
};

const AdminSidebar = ({ activeTab, onChangeTab }) => (
  <aside className="fixed left-0 top-0 h-screen bg-[#0F1F0F] pt-6 hidden md:flex flex-col z-50 transition-all duration-300 w-16 lg:w-48 xl:w-64">
    <div className="px-5 mb-8 flex items-center overflow-hidden">
      <span className="font-display font-bold text-white text-xl tracking-tight hidden lg:inline">Farm</span>
      <span className="font-display font-bold text-accent text-xl tracking-tight hidden lg:inline">Connect</span>
      <span className="font-display font-medium text-white/50 text-xs ml-2 px-1.5 py-0.5 bg-white/10 rounded hidden lg:inline">Ops</span>
      <div className="w-6 h-6 rounded bg-accent lg:hidden flex-shrink-0"></div>
    </div>

    <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto no-scrollbar pb-4">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg font-body text-sm transition-colors duration-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent group relative ${
              isActive
                ? 'bg-white/12 text-white border-l-2 border-accent pl-[calc(0.75rem-2px)]'
                : 'text-white/50 hover:bg-white/6 hover:text-white/80'
            }`}
          >
            <tab.icon />
            <span className="hidden lg:inline whitespace-nowrap">{tab.label}</span>
            <div className="absolute left-full ml-3 px-2 py-1 bg-text text-white text-xs rounded opacity-0 invisible lg:hidden group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
              {tab.label}
            </div>
          </button>
        );
      })}
    </nav>
  </aside>
);

const AdminNavbar = ({ title, setMobileMenuOpen, onSearch, onNotifications }) => (
  <header className="h-16 bg-white border-b border-secondary px-6 flex items-center justify-between sticky top-0 z-30 ml-0 md:ml-16 lg:ml-48 xl:ml-64">
    <div className="flex items-center gap-4">
      <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-text p-1 -ml-2 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"><Icons.Menu /></button>
      <h1 className="font-display font-semibold text-lg md:text-xl text-text hidden sm:block">{title}</h1>
    </div>
    <div className="md:hidden flex items-center">
      <span className="font-display font-bold text-primary text-xl">Farm</span>
      <span className="font-display font-bold text-accent text-xl">Connect</span>
    </div>
    <div className="flex items-center gap-4">
      <button onClick={onSearch} className="text-muted hover:text-primary transition-colors focus-visible:ring-2 p-2 rounded-full outline-none"><Icons.Search /></button>
      <button onClick={onNotifications} className="text-muted hover:text-primary transition-colors relative focus-visible:ring-2 p-2 rounded-full outline-none">
        <Icons.Bell />
        <span className="bg-accent w-2 h-2 rounded-full absolute top-[6px] right-[6px] border border-white"></span>
      </button>
    </div>
  </header>
);

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [deliveries, setDeliveries] = useState(INITIAL_DELIVERIES);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [drivers] = useState(INITIAL_DRIVERS);
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'Grains',
    price: '',
    stock: '',
    origin: '',
  });
  const activeTab = getTabFromPath(location.pathname);

  const showToast = (msg, variant = 'success') => setToast({ msg, variant });

  useEffect(() => {
    if (!activeTab) {
      navigate(ADMIN_DASHBOARD_BASE, { replace: true });
      return undefined;
    }

    setShowContent(false);
    setIsLoading(true);
    setMobileMenuOpen(false);
    const timer = setTimeout(() => {
      setShowContent(true);
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [activeTab, navigate]);

  const handleTabChange = (tabId) => {
    const nextPath = getPathForTab(tabId);
    if (!nextPath || nextPath === location.pathname) {
      return;
    }

    navigate(nextPath);
  };

  const renderBadge = (status) => {
    let classes = '';
    if (['Delivered', 'Active', 'Paid', 'In Stock'].includes(status)) classes = 'bg-accent/10 text-accent';
    else if (['In Transit', 'Low Stock', 'Pending settlement', 'Queued'].includes(status)) classes = 'bg-orange/10 text-orange';
    else classes = 'bg-secondary text-muted';
    return <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${classes}`}>{status}</span>;
  };

  const TableHeader = ({ text }) => (
    <th className="px-6 py-3 font-medium cursor-pointer hover:text-primary select-none group">
      <div className="flex items-center gap-1">
        {text} <span className="opacity-0 group-hover:opacity-100 transition-opacity"><Icons.Sort /></span>
      </div>
    </th>
  );

  const Pagination = ({ total }) => (
    <div className="flex justify-between items-center mt-6 pt-6 border-t border-secondary">
      <p className="font-body text-sm text-muted">Showing 1–{Math.min(total, 20)} of {total}</p>
      <div className="flex gap-2">
        <button className="bg-white border border-secondary rounded-lg px-4 py-2 font-body text-sm opacity-40 cursor-not-allowed">Prev</button>
        <button className="bg-white border border-secondary rounded-lg px-4 py-2 font-body text-sm hover:border-accent hover:text-accent transition-colors">Next</button>
      </div>
    </div>
  );

  const SkeletonKPI = () => <div className="w-full h-24 rounded-2xl bg-secondary/60 animate-pulse"></div>;
  const SkeletonRow = () => <div className="w-full h-12 rounded-lg bg-secondary/40 animate-pulse mb-2"></div>;

  const handleUploadProduct = () => {
    if (!uploadForm.name || !uploadForm.price || !uploadForm.stock || !uploadForm.origin) {
      showToast('Fill in all product fields before uploading.', 'warning');
      return;
    }

    const nextProduct = {
      id: `prod-${Date.now()}`,
      name: uploadForm.name,
      category: uploadForm.category,
      priceValue: Number(uploadForm.price),
      stock: Number(uploadForm.stock),
      status: Number(uploadForm.stock) > 0 ? 'Active' : 'Out of Stock',
      img: '/product_rice.png',
      origin: uploadForm.origin,
    };

    setProducts((current) => [nextProduct, ...current]);
    setUploadForm({ name: '', category: 'Grains', price: '', stock: '', origin: '' });
    setIsUploadModalOpen(false);
    showToast('Product uploaded successfully.', 'success');
  };

  const handleDeleteProduct = (productId) => {
    setProducts((current) => current.filter((product) => product.id !== productId));
    showToast('Product removed from inventory.', 'warning');
  };

  const handleOrderStatusUpdate = (orderId, nextStatus) => {
    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status: nextStatus } : order)));
    setDeliveries((current) => current.map((delivery) => (delivery.orderId === orderId ? { ...delivery, status: nextStatus === 'Packed' ? 'Queued' : delivery.status } : delivery)));
    showToast(`Order ${orderId} updated to ${nextStatus}.`, 'success');
  };

  const handleDeliveryStatusUpdate = (deliveryId, nextStatus) => {
    const selectedDelivery = deliveries.find((delivery) => delivery.id === deliveryId);
    setDeliveries((current) => current.map((delivery) => (delivery.id === deliveryId ? { ...delivery, status: nextStatus } : delivery)));
    if (selectedDelivery) {
      setOrders((current) => current.map((order) => (order.id === selectedDelivery.orderId ? { ...order, status: nextStatus === 'Delivered' ? 'Delivered' : order.status } : order)));
    }
    showToast(`Delivery ${deliveryId} marked as ${nextStatus}.`, 'success');
  };

  const handlePaymentStatusUpdate = (paymentId, updates) => {
    setPayments((current) => current.map((payment) => (payment.id === paymentId ? { ...payment, ...updates } : payment)));
    showToast(`Payment ${paymentId} updated.`, 'success');
  };

  const currentPageTitle = TABS.find((tab) => tab.id === activeTab)?.label || 'Command Centre';
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalValue, 0);
  const activeDeliveries = deliveries.filter((delivery) => delivery.status !== 'Delivered').length;
  const collectedPayments = payments.filter((payment) => payment.status === 'Paid' || payment.status === 'Pending settlement').reduce((sum, payment) => sum + payment.amountValue, 0);
  const pendingPaymentReview = payments.filter((payment) => !payment.reviewed).length;
  const settlementQueueValue = payments.filter((payment) => payment.status === 'Pending settlement').reduce((sum, payment) => sum + payment.amountValue, 0);
  const getPaymentForOrder = (orderId) => payments.find((payment) => payment.orderId === orderId);
  const avgOrderValue = Math.round(totalRevenue / orders.length);
  const deliveryCompletionRate = `${Math.round((deliveries.filter((delivery) => delivery.status === 'Delivered').length / deliveries.length) * 100)}%`;
  const paidOrderRate = `${Math.round((payments.filter((payment) => payment.status === 'Paid').length / payments.length) * 100)}%`;
  const topDrivers = drivers.map((driver) => ({
    ...driver,
    activeDeliveries: deliveries.filter((delivery) => delivery.riderId === driver.id && delivery.status !== 'Delivered').length,
    deliveredOrders: deliveries.filter((delivery) => delivery.riderId === driver.id && delivery.status === 'Delivered').length,
  }));

  const renderHome = () => (
    <div className="animate-in fade-in duration-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {isLoading ? [...Array(4)].map((_, index) => <SkeletonKPI key={index} />) : [
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), diff: '+12%' },
          { label: 'Orders Today', value: `${orders.length * 47}`, diff: '+5%' },
          { label: 'Active Deliveries', value: `${activeDeliveries}`, diff: '+2%' },
          { label: 'Total Customers', value: `${customers.length * 401}`, diff: '+8%' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-soft">
            <div className="flex justify-between items-start">
              <p className="font-body text-xs text-muted uppercase tracking-wider">{stat.label}</p>
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center text-accent"><Icons.Chart /></div>
            </div>
            <p className="font-display font-bold text-2xl md:text-3xl text-text mt-2">{stat.value}</p>
            <p className="font-body text-xs mt-2"><span className="text-accent">{stat.diff}</span><span className="text-muted"> vs last week</span></p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-soft lg:col-span-2">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h3 className="font-display font-semibold text-lg text-text">Payment Review Queue</h3>
              <p className="font-body text-sm text-muted mt-1">Keep settlement, failed charges, and reconciliation visible to ops.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleTabChange('payments')}>Open Payments</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-surface p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted">Collected</p>
              <p className="font-display font-bold text-2xl text-text mt-2">{formatCurrency(collectedPayments)}</p>
            </div>
            <div className="rounded-xl bg-surface p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted">Pending Review</p>
              <p className="font-display font-bold text-2xl text-orange mt-2">{pendingPaymentReview}</p>
            </div>
            <div className="rounded-xl bg-surface p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted">Settlement Queue</p>
              <p className="font-display font-bold text-2xl text-text mt-2">{formatCurrency(settlementQueueValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-display font-semibold text-lg text-text">Attention Needed</h3>
          <div className="mt-5 flex flex-col gap-4">
            {payments.filter((payment) => !payment.reviewed).slice(0, 3).map((payment) => (
              <button key={payment.id} onClick={() => setSelectedPayment(payment)} className="text-left rounded-xl border border-secondary px-4 py-3 hover:border-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                <div className="flex justify-between items-center gap-3">
                  <span className="font-body font-medium text-sm text-text">{payment.orderId}</span>
                  {renderBadge(payment.status)}
                </div>
                <p className="font-body text-xs text-muted mt-2">{payment.customer} · {payment.reference}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-0 shadow-soft col-span-1 md:col-span-2 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-secondary/50">
            <h3 className="font-display font-semibold text-lg text-text">Recent Orders</h3>
            <button onClick={() => handleTabChange('orders')} className="font-body text-sm text-accent hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[640px] text-left whitespace-nowrap">
              <thead className="font-body text-xs text-muted uppercase tracking-wider border-b border-secondary bg-surface/50">
                <tr><TableHeader text="Order ID" /><TableHeader text="Customer" /><TableHeader text="Amount" /><TableHeader text="Status" /><th className="px-6 py-3 font-medium">Action</th></tr>
              </thead>
              <tbody className="font-body text-sm text-text">
                {isLoading ? [...Array(4)].map((_, index) => <tr key={index}><td colSpan="5" className="p-4"><SkeletonRow /></td></tr>) :
                  orders.slice(0, 3).map((order) => (
                    <tr key={order.id} className="border-b border-secondary/50 last:border-0 hover:bg-bg/50 transition-colors duration-150">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 font-display font-semibold">{formatCurrency(order.totalValue)}</td>
                      <td className="px-6 py-4">{renderBadge(order.status)}</td>
                      <td className="px-6 py-4"><button className="text-accent text-sm hover:underline" onClick={() => setSelectedOrder(order)}>View</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft col-span-1">
          <h3 className="font-display font-semibold text-lg text-text mb-4">Top Selling</h3>
          <div className="flex flex-col">
            {isLoading ? [...Array(5)].map((_, index) => <SkeletonRow key={index} />) :
              products.slice(0, 3).map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 py-3 border-b border-secondary/50 last:border-0 hover:bg-bg/50 px-2 -mx-2 rounded-lg transition-colors cursor-default">
                  <span className="font-display font-bold text-muted text-sm w-4 text-center">{index + 1}</span>
                  <div className="w-10 h-10 rounded-lg bg-secondary flex-shrink-0 overflow-hidden"><img src={product.img} alt={product.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-text truncate">{product.name}</p>
                    <p className="font-body text-xs text-muted truncate">{product.category}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div>
          <h2 className="font-display font-semibold text-xl text-text">Products</h2>
          <p className="font-body text-sm text-muted mt-1">Manage stock, prices, and what appears in the customer catalog.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setIsUploadModalOpen(true)}>+ Upload Product</Button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[640px] text-left whitespace-nowrap">
            <thead className="bg-secondary/50 font-body text-xs text-muted uppercase tracking-wider">
              <tr><TableHeader text="Product" /><TableHeader text="Category" /><TableHeader text="Price/kg" /><TableHeader text="Stock" /><TableHeader text="Status" /><th className="px-6 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody className="font-body border-b border-secondary/50">
              {isLoading ? [...Array(4)].map((_, index) => <tr key={index}><td colSpan="6" className="p-4"><SkeletonRow /></td></tr>) :
                products.map((product) => (
                  <tr key={product.id} className="py-4 border-b border-secondary/50 hover:bg-bg/50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-secondary overflow-hidden shrink-0"><img src={product.img} alt={product.name} className="w-full h-full object-cover" /></div>
                        <div><p className="font-medium text-sm text-text">{product.name}</p><p className="text-xs text-muted">{product.origin}</p></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text">{product.category}</td>
                    <td className="px-6 py-4 font-display font-semibold text-sm text-text">{formatCurrency(product.priceValue)}</td>
                    <td className="px-6 py-4 text-sm text-text">{product.stock} kg</td>
                    <td className="px-6 py-4">{renderBadge(product.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => showToast(`Edit flow for ${product.name} is not connected yet.`, 'warning')} className="text-muted hover:text-primary outline-none"><Icons.Pencil /></button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="text-muted hover:text-red-500 outline-none"><Icons.Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination total={products.length} />
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-xl text-text">Orders</h2>
          <p className="font-body text-sm text-muted mt-1">Track what is processing, in transit, and delivered.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => showToast('CSV export is not connected yet.', 'warning')}>Export Orders</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {['Processing', 'In Transit', 'Delivered'].map((status) => (
          <div key={status} className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">{status}</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{orders.filter((order) => order.status === status).length}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px] text-left whitespace-nowrap">
              <thead className="bg-secondary/50 font-body text-xs text-muted uppercase tracking-wider">
              <tr><TableHeader text="Order ID" /><TableHeader text="Customer" /><TableHeader text="Items" /><TableHeader text="Hub" /><TableHeader text="Payment" /><TableHeader text="Status" /><th className="px-6 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody className="font-body text-sm text-text">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-secondary/50 hover:bg-bg/50 transition-colors duration-150">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.items}</td>
                  <td className="px-6 py-4">{order.deliveryHub}</td>
                  <td className="px-6 py-4">{renderBadge(getPaymentForOrder(order.id)?.status || 'Awaiting payment')}</td>
                  <td className="px-6 py-4">{renderBadge(order.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => setSelectedOrder(order)} className="text-accent hover:underline">View</button>
                      {getPaymentForOrder(order.id) && <button onClick={() => setSelectedPayment(getPaymentForOrder(order.id))} className="text-muted hover:text-primary">Payment</button>}
                      {order.status === 'Processing' && <button onClick={() => handleOrderStatusUpdate(order.id, 'Packed')} className="text-muted hover:text-primary">Mark Packed</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={orders.length} />
        </div>
      </div>
    </div>
  );

  const renderPayments = () => {
    const paymentFilters = ['All', 'Paid', 'Pending settlement', 'Failed'];
    const visiblePayments = payments.filter((payment) => paymentFilter === 'All' || payment.status === paymentFilter);

    return (
      <div className="animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="font-display font-semibold text-xl text-text">Payments</h2>
            <p className="font-body text-sm text-muted mt-1">Review transaction status, reconcile orders, and track settlement handoff.</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button variant="ghost" size="sm" onClick={() => showToast('Settlement export is not connected yet.', 'warning')}>Export Settlements</Button>
            <Button variant="primary" size="sm" onClick={() => showToast('Manual payment entry is not connected yet.', 'success')}>Record Manual Payment</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Collected</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{formatCurrency(collectedPayments)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Pending Review</p>
            <p className="font-display font-bold text-3xl text-orange mt-2">{pendingPaymentReview}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Settlement Queue</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{formatCurrency(settlementQueueValue)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Failed Attempts</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{payments.filter((payment) => payment.status === 'Failed').length}</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {paymentFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setPaymentFilter(filter)}
              className={`px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-colors ${
                paymentFilter === filter ? 'bg-primary text-white' : 'bg-white border border-secondary text-muted hover:text-text'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[860px] text-left whitespace-nowrap">
              <thead className="bg-secondary/50 font-body text-xs text-muted uppercase tracking-wider">
                <tr><TableHeader text="Payment ID" /><TableHeader text="Order" /><TableHeader text="Customer" /><TableHeader text="Method" /><TableHeader text="Amount" /><TableHeader text="Status" /><TableHeader text="Reviewed" /><th className="px-6 py-3 font-medium">Actions</th></tr>
              </thead>
              <tbody className="font-body text-sm text-text">
                {visiblePayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-secondary/50 hover:bg-bg/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium">{payment.id}</td>
                    <td className="px-6 py-4">{payment.orderId}</td>
                    <td className="px-6 py-4">{payment.customer}</td>
                    <td className="px-6 py-4">{payment.method}</td>
                    <td className="px-6 py-4 font-display font-semibold">{formatCurrency(payment.amountValue)}</td>
                    <td className="px-6 py-4">{renderBadge(payment.status)}</td>
                    <td className="px-6 py-4">{payment.reviewed ? 'Reviewed' : 'Pending'}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => setSelectedPayment(payment)} className="text-accent hover:underline">Review</button>
                        {!payment.reviewed && <button onClick={() => handlePaymentStatusUpdate(payment.id, { reviewed: true })} className="text-muted hover:text-primary">Mark Reviewed</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination total={visiblePayments.length} />
          </div>
        </div>
      </div>
    );
  };

  const renderDeliveries = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-xl text-text">Deliveries</h2>
          <p className="font-body text-sm text-muted mt-1">Assign riders, track ETA, compare driver performance, and close out dispatched orders.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => showToast('Routing optimization is not connected yet.', 'warning')}>Optimize Routes</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {topDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-display font-semibold text-lg text-text">{driver.name}</p>
                <p className="font-body text-sm text-muted mt-1">{driver.vehicle} · {driver.zone}</p>
              </div>
              {renderBadge(driver.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="rounded-xl bg-surface p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Assigned now</p>
                <p className="font-display font-bold text-2xl text-text mt-2">{driver.activeDeliveries}</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">On-time rate</p>
                <p className="font-display font-bold text-2xl text-text mt-2">{driver.onTimeRate}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-between items-center text-sm">
              <span className="font-body text-muted">Completed today</span>
              <span className="font-display font-semibold text-text">{driver.completedToday}</span>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => setSelectedDriver(driver)}>View Profile</Button>
              <Button variant="primary" size="sm" className="flex-1" onClick={() => showToast(`Assignment board opened for ${driver.name}.`, 'success')}>Assign Stop</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-2xl p-6 shadow-soft">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="font-display font-semibold text-lg text-text">{delivery.orderId}</p>
                <p className="font-body text-sm text-muted mt-1">{delivery.customer} · {delivery.zone}</p>
              </div>
              {renderBadge(delivery.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-muted">Rider</p>
                <p className="font-body text-sm text-text mt-1">{delivery.rider}</p>
              </div>
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-muted">ETA</p>
                <p className="font-body text-sm text-text mt-1">{delivery.eta}</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap mt-6">
              <Button variant="ghost" size="sm" onClick={() => setSelectedDriver(drivers.find((driver) => driver.id === delivery.riderId))}>Driver Profile</Button>
              <Button variant="ghost" size="sm" onClick={() => showToast(`Dispatch note opened for ${delivery.id}.`, 'success')}>View Dispatch Note</Button>
              {delivery.status !== 'Delivered' && <Button variant="primary" size="sm" onClick={() => handleDeliveryStatusUpdate(delivery.id, 'Delivered')}>Mark Delivered</Button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-xl text-text">Customers</h2>
          <p className="font-body text-sm text-muted mt-1">See who is ordering, where they are located, and how much they spend.</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => showToast('Customer broadcast is not connected yet.', 'warning')}>Send Campaign</Button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[700px] text-left whitespace-nowrap">
            <thead className="bg-secondary/50 font-body text-xs text-muted uppercase tracking-wider">
              <tr><TableHeader text="Customer" /><TableHeader text="City" /><TableHeader text="Orders" /><TableHeader text="Spend" /><TableHeader text="Status" /><th className="px-6 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody className="font-body text-sm text-text">
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-secondary/50 hover:bg-bg/50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-muted mt-1">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">{customer.city}</td>
                  <td className="px-6 py-4">{customer.orders}</td>
                  <td className="px-6 py-4 font-display font-semibold">{formatCurrency(customer.spendValue)}</td>
                  <td className="px-6 py-4">{renderBadge(customer.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => setSelectedCustomer(customer)} className="text-accent hover:underline">View</button>
                      <button onClick={() => showToast(`Email drafted for ${customer.name}.`, 'success')} className="text-muted hover:text-primary">Email</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination total={customers.length} />
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const categoryBreakdown = ['Grains', 'Vegetables', 'Protein'].map((category) => ({
      category,
      count: products.filter((product) => product.category === category).length,
    }));

    return (
      <div className="animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="font-display font-semibold text-xl text-text">Analytics</h2>
            <p className="font-body text-sm text-muted mt-1">A quick operational view of sales, stock, and customer movement.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => showToast('Custom reports are not connected yet.', 'warning')}>Generate Report</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft lg:col-span-2">
            <h3 className="font-display font-semibold text-lg text-text">Weekly Revenue</h3>
            <div className="mt-6 grid grid-cols-7 gap-3 items-end h-56">
              {[32, 48, 39, 62, 56, 71, 64].map((value, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="w-full rounded-t-xl bg-primary/90" style={{ height: `${value * 2}px` }}></div>
                  <span className="font-body text-xs text-muted">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Category Mix</h3>
            <div className="mt-6 flex flex-col gap-4">
              {categoryBreakdown.map((item) => (
                <div key={item.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-sm text-text">{item.category}</span>
                    <span className="font-body text-xs text-muted">{item.count} live SKUs</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: `${Math.max(20, item.count * 25)}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Avg Order Value</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{formatCurrency(avgOrderValue)}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Delivery Completion</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{deliveryCompletionRate}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Paid Order Rate</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{paidOrderRate}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-soft">
            <p className="font-body text-xs uppercase tracking-wider text-muted">Active Drivers</p>
            <p className="font-display font-bold text-3xl text-text mt-2">{drivers.filter((driver) => driver.status !== 'Available').length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Settlement Health</h3>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Reviewed payments</span>
                <span className="font-display font-semibold text-text">{payments.filter((payment) => payment.reviewed).length}/{payments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Pending settlement value</span>
                <span className="font-display font-semibold text-orange">{formatCurrency(settlementQueueValue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Failed payment attempts</span>
                <span className="font-display font-semibold text-text">{payments.filter((payment) => payment.status === 'Failed').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Ops Notes</h3>
            <div className="mt-5 flex flex-col gap-3">
              <div className="rounded-xl border border-secondary px-4 py-3">
                <p className="font-body font-medium text-sm text-text">Delivery throughput improved</p>
                <p className="font-body text-xs text-muted mt-1">Delivered orders closed 18% faster than last week.</p>
              </div>
              <div className="rounded-xl border border-secondary px-4 py-3">
                <p className="font-body font-medium text-sm text-text">Failed payments need follow-up</p>
                <p className="font-body text-xs text-muted mt-1">Two failed transactions are still waiting for customer retry or manual outreach.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Regional Demand</h3>
            <div className="mt-5 flex flex-col gap-4">
              {[
                { zone: 'Lagos Island', orders: 18, growth: '+11%' },
                { zone: 'Lekki / Ajah', orders: 14, growth: '+7%' },
                { zone: 'Mainland Central', orders: 10, growth: '+4%' },
              ].map((zone) => (
                <div key={zone.zone} className="rounded-xl border border-secondary px-4 py-4">
                  <div className="flex justify-between items-center">
                    <span className="font-body font-medium text-sm text-text">{zone.zone}</span>
                    <span className="font-body text-xs text-accent">{zone.growth}</span>
                  </div>
                  <p className="font-display font-semibold text-text mt-2">{zone.orders} active orders this week</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Driver Performance</h3>
            <div className="mt-5 flex flex-col gap-4">
              {topDrivers.map((driver) => (
                <button key={driver.id} onClick={() => setSelectedDriver(driver)} className="text-left rounded-xl border border-secondary px-4 py-4 hover:border-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <div className="flex justify-between items-center gap-3">
                    <span className="font-body font-medium text-sm text-text">{driver.name}</span>
                    <span className="font-body text-xs text-muted">{driver.onTimeRate} on-time</span>
                  </div>
                  <p className="font-body text-xs text-muted mt-2">{driver.completedToday} completed today · {driver.activeDeliveries} active now</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h2 className="font-display font-semibold text-xl text-text">Settings</h2>
          <p className="font-body text-sm text-muted mt-1">Control operational defaults for dispatch, alerts, and reporting.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => showToast('Settings saved successfully.', 'success')}>Save Settings</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-display font-semibold text-lg text-text">Dispatch Rules</h3>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Default Order Cutoff</span>
              <select defaultValue="Wednesday 6:00 PM" className="px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20">
                <option>Wednesday 6:00 PM</option>
                <option>Thursday 9:00 AM</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Primary Dispatch Hub</span>
              <input type="text" defaultValue="Lagos Distribution Hub" className="px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20" />
            </label>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-display font-semibold text-lg text-text">Notifications</h3>
          <div className="mt-5 flex flex-col gap-4">
            {['Order placed alerts', 'Low stock warnings', 'Delivery completion digests'].map((label) => (
              <label key={label} className="flex items-center justify-between gap-4 border border-secondary rounded-xl px-4 py-3">
                <span className="font-body text-sm text-text">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-accent" />
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-display font-semibold text-lg text-text">Finance Controls</h3>
          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Settlement cadence</span>
              <select defaultValue="Every 24 hours" className="px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20">
                <option>Every 24 hours</option>
                <option>Twice daily</option>
                <option>Manual review only</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Escalate failed payments after</span>
              <select defaultValue="6 hours" className="px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20">
                <option>6 hours</option>
                <option>12 hours</option>
                <option>24 hours</option>
              </select>
            </label>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-soft">
          <h3 className="font-display font-semibold text-lg text-text">Data Quality</h3>
          <div className="mt-5 flex flex-col gap-3">
            <div className="rounded-xl border border-secondary px-4 py-3">
              <p className="font-body font-medium text-sm text-text">Payments linked to orders</p>
              <p className="font-body text-xs text-muted mt-1">{payments.length} tracked records currently mapped in the admin queue.</p>
            </div>
            <div className="rounded-xl border border-secondary px-4 py-3">
              <p className="font-body font-medium text-sm text-text">Review discipline</p>
              <p className="font-body text-xs text-muted mt-1">{pendingPaymentReview} payment items still need manual review before closeout.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="bg-bg min-h-screen">
      <AdminSidebar activeTab={activeTab} onChangeTab={handleTabChange} />

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-[#0F1F0F] p-6 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-10">
              <div><span className="font-display font-bold text-white text-xl">Farm</span><span className="font-display font-bold text-accent text-xl">Connect</span></div>
              <button className="text-white/50" onClick={() => setMobileMenuOpen(false)}><Icons.X /></button>
            </div>
            <nav className="flex flex-col gap-2">
              {TABS.map((tab) => (
                <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={`flex items-center gap-3 px-3 py-3 rounded-lg font-body text-sm text-left ${activeTab === tab.id ? 'bg-white/12 text-white border-l-2 border-accent pl-[calc(0.75rem-2px)]' : 'text-white/50'}`}>
                  <tab.icon /> {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar
          title={currentPageTitle}
          setMobileMenuOpen={setMobileMenuOpen}
          onSearch={() => {
            handleTabChange('products');
            showToast('Search opens the products view so you can inspect catalog items.', 'success');
          }}
          onNotifications={() => {
            handleTabChange('payments');
            showToast('Notifications now point you to the payment review queue.', 'warning');
          }}
        />

        <main className="flex-1 ml-0 md:ml-16 lg:ml-48 xl:ml-64 p-6 pb-12 relative transition-all duration-300">
          <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {activeTab === 'home' && renderHome()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'payments' && renderPayments()}
            {activeTab === 'deliveries' && renderDeliveries()}
            {activeTab === 'customers' && renderCustomers()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      {toast && <ToastNotification message={toast.msg} variant={toast.variant} onClose={() => setToast(null)} />}

      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-card">
            <h2 className="font-display font-bold text-xl text-text mb-6">Upload Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-body">
              <input type="text" placeholder="Product Name" value={uploadForm.name} onChange={(event) => setUploadForm((current) => ({ ...current, name: event.target.value }))} className="border border-secondary rounded-xl px-4 py-2 w-full outline-none focus:ring-2 focus:ring-accent md:col-span-2" />
              <select value={uploadForm.category} onChange={(event) => setUploadForm((current) => ({ ...current, category: event.target.value }))} className="border border-secondary rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent">
                <option>Grains</option>
                <option>Vegetables</option>
                <option>Protein</option>
                <option>Tubers</option>
              </select>
              <input type="number" placeholder="Price per kg (₦)" value={uploadForm.price} onChange={(event) => setUploadForm((current) => ({ ...current, price: event.target.value }))} className="border border-secondary rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent" />
              <input type="number" placeholder="Stock (kg)" value={uploadForm.stock} onChange={(event) => setUploadForm((current) => ({ ...current, stock: event.target.value }))} className="border border-secondary rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent" />
              <input type="text" placeholder="Origin State" value={uploadForm.origin} onChange={(event) => setUploadForm((current) => ({ ...current, origin: event.target.value }))} className="border border-secondary rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <Button variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={handleUploadProduct}>Upload Product</Button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedOrder(null)}></div>
          <div className="fixed right-0 top-0 w-full max-w-md bg-white h-screen z-50 shadow-card p-6 md:p-8 slide-in-from-right animate-in overflow-y-auto">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">Order {selectedOrder.id}</h2>
                <p className="font-body text-sm text-muted mt-1">{selectedOrder.customer} · {selectedOrder.date}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)}><Icons.X /></button>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Status</span>
                {renderBadge(selectedOrder.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Payment Status</span>
                {renderBadge(getPaymentForOrder(selectedOrder.id)?.status || 'Awaiting payment')}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Total Paid</span>
                <span className="font-display font-semibold text-lg text-text">{formatCurrency(selectedOrder.totalValue)}</span>
              </div>
              <div>
                <p className="font-body text-sm text-muted mb-3">Line Items</p>
                <div className="flex flex-col gap-3">
                  {selectedOrder.lineItems.map((item) => (
                    <div key={`${selectedOrder.id}-${item.name}`} className="flex justify-between items-center text-sm">
                      <span className="font-body text-text">{item.qty} × {item.name}</span>
                      <span className="font-body font-medium text-text">{formatCurrency(item.sub)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => showToast(`Receipt export queued for ${selectedOrder.id}.`, 'success')}><Icons.Download /> Export</Button>
              {getPaymentForOrder(selectedOrder.id) && (
                <Button variant="ghost" size="sm" className="flex-1" onClick={() => setSelectedPayment(getPaymentForOrder(selectedOrder.id))}>Open Payment</Button>
              )}
              {selectedOrder.status === 'Processing' && <Button variant="primary" size="sm" className="flex-1" onClick={() => { handleOrderStatusUpdate(selectedOrder.id, 'Packed'); setSelectedOrder(null); }}>Mark as Packed</Button>}
            </div>
          </div>
        </>
      )}

      {selectedPayment && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedPayment(null)}></div>
          <div className="fixed right-0 top-0 w-full max-w-md bg-white h-screen z-50 shadow-card p-6 md:p-8 slide-in-from-right animate-in overflow-y-auto">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">{selectedPayment.id}</h2>
                <p className="font-body text-sm text-muted mt-1">{selectedPayment.orderId} · {selectedPayment.customer}</p>
              </div>
              <button onClick={() => setSelectedPayment(null)}><Icons.X /></button>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Status</span>
                {renderBadge(selectedPayment.status)}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Amount</span>
                <span className="font-display font-semibold text-lg text-text">{formatCurrency(selectedPayment.amountValue)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Method</span>
                <span className="font-body text-sm text-text">{selectedPayment.method}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Reference</span>
                <span className="font-body text-sm text-text">{selectedPayment.reference}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Captured</span>
                <span className="font-body text-sm text-text">{selectedPayment.paidAt}</span>
              </div>

              <div className="rounded-2xl bg-surface p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Review Notes</p>
                <p className="font-body text-sm text-text mt-3 leading-relaxed">{selectedPayment.notes}</p>
              </div>

              <div className="rounded-2xl border border-secondary p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Process</p>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">1</div>
                    <p className="font-body text-sm text-text">Capture payment event and attach order reference.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">2</div>
                    <p className="font-body text-sm text-text">Review bank/card confirmation against the order total.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">3</div>
                    <p className="font-body text-sm text-text">Mark reviewed or escalate failed / unsettled payments.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8 flex-wrap">
              {!selectedPayment.reviewed && (
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    handlePaymentStatusUpdate(selectedPayment.id, { reviewed: true });
                    setSelectedPayment((current) => current ? { ...current, reviewed: true } : current);
                  }}
                >
                  Mark Reviewed
                </Button>
              )}
              {selectedPayment.status === 'Pending settlement' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    handlePaymentStatusUpdate(selectedPayment.id, { status: 'Paid', reviewed: true, notes: 'Settlement confirmed and reconciled by ops.' });
                    setSelectedPayment((current) => current ? { ...current, status: 'Paid', reviewed: true, notes: 'Settlement confirmed and reconciled by ops.' } : current);
                  }}
                >
                  Confirm Settlement
                </Button>
              )}
              {selectedPayment.status === 'Failed' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => showToast(`Customer follow-up drafted for ${selectedPayment.customer}.`, 'warning')}
                >
                  Escalate Issue
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {selectedDriver && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedDriver(null)}></div>
          <div className="fixed right-0 top-0 w-full max-w-md bg-white h-screen z-50 shadow-card p-6 md:p-8 slide-in-from-right animate-in overflow-y-auto">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">{selectedDriver.name}</h2>
                <p className="font-body text-sm text-muted mt-1">{selectedDriver.vehicle} · {selectedDriver.hub}</p>
              </div>
              <button onClick={() => setSelectedDriver(null)}><Icons.X /></button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Status</p>
                <p className="font-display font-semibold text-text mt-2">{selectedDriver.status}</p>
              </div>
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">On-Time Rate</p>
                <p className="font-display font-semibold text-text mt-2">{selectedDriver.onTimeRate}</p>
              </div>
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Assigned Now</p>
                <p className="font-display font-semibold text-text mt-2">{selectedDriver.activeDeliveries}</p>
              </div>
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Completed Today</p>
                <p className="font-display font-semibold text-text mt-2">{selectedDriver.completedToday}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-secondary p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted">Driver Profile</p>
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted">Phone</span>
                  <span className="font-body text-sm text-text">{selectedDriver.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted">Coverage Zone</span>
                  <span className="font-body text-sm text-text">{selectedDriver.zone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-muted">Delivered Orders</span>
                  <span className="font-body text-sm text-text">{selectedDriver.deliveredOrders}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-secondary p-4">
              <p className="font-body text-xs uppercase tracking-wider text-muted">Assigned Deliveries</p>
              <div className="mt-4 flex flex-col gap-3">
                {deliveries.filter((delivery) => delivery.riderId === selectedDriver.id).map((delivery) => (
                  <div key={delivery.id} className="rounded-xl bg-surface px-4 py-3">
                    <div className="flex justify-between items-center gap-3">
                      <span className="font-body font-medium text-sm text-text">{delivery.orderId}</span>
                      {renderBadge(delivery.status)}
                    </div>
                    <p className="font-body text-xs text-muted mt-2">{delivery.customer} · {delivery.zone} · {delivery.eta}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => showToast(`Call script prepared for ${selectedDriver.name}.`, 'success')}>Contact Driver</Button>
              <Button variant="primary" size="sm" className="flex-1" onClick={() => showToast(`Reassignment board opened for ${selectedDriver.name}.`, 'warning')}>Reassign Orders</Button>
            </div>
          </div>
        </>
      )}

      {selectedCustomer && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setSelectedCustomer(null)}></div>
          <div className="fixed right-0 top-0 w-full max-w-md bg-white h-screen z-50 shadow-card p-6 md:p-8 slide-in-from-right animate-in overflow-y-auto">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-display font-bold text-xl">{selectedCustomer.name}</h2>
                <p className="font-body text-sm text-muted mt-1">{selectedCustomer.email}</p>
              </div>
              <button onClick={() => setSelectedCustomer(null)}><Icons.X /></button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">City</p>
                <p className="font-display font-semibold text-text mt-2">{selectedCustomer.city}</p>
              </div>
              <div className="bg-surface rounded-xl p-4">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Orders</p>
                <p className="font-display font-semibold text-text mt-2">{selectedCustomer.orders}</p>
              </div>
              <div className="bg-surface rounded-xl p-4 col-span-2">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Total Spend</p>
                <p className="font-display font-semibold text-text mt-2">{formatCurrency(selectedCustomer.spendValue)}</p>
              </div>
              <div className="bg-surface rounded-xl p-4 col-span-2">
                <p className="font-body text-xs uppercase tracking-wider text-muted">Latest Payment</p>
                <p className="font-body text-sm text-text mt-2">
                  {payments.find((payment) => payment.customer === selectedCustomer.name)?.status || 'No payment record yet'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="ghost" size="sm" className="flex-1" onClick={() => showToast(`Retention note opened for ${selectedCustomer.name}.`, 'success')}>Add Note</Button>
              <Button variant="primary" size="sm" className="flex-1" onClick={() => { setSelectedCustomer(null); handleTabChange('orders'); }}>View Orders</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
