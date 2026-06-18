import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashNavbar from '../components/dashboard/DashNavbar';
import BottomNav from '../components/dashboard/BottomNav';
import CartDrawer from '../components/dashboard/CartDrawer';
import ToastNotification from '../components/dashboard/ToastNotification';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';

const CUSTOMER_DASHBOARD_BASE = '/dashboard/customer';
const CUSTOMER_DASHBOARD_TABS = {
  home: '',
  browse: 'browse',
  orders: 'orders',
  account: 'account',
};

const PRODUCT_CATALOG = [
  { id: 'rice', name: 'Local Rice', category: 'Grains', price: '₦480', priceValue: 480, location: 'Ogun State', inSeason: true, image: '/product_rice.png' },
  { id: 'tomatoes', name: 'Fresh Tomatoes', category: 'Vegetables', price: '₦320', priceValue: 320, location: 'Kaduna State', inSeason: false, image: '/product_tomatoes.png' },
  { id: 'catfish', name: 'Catfish', category: 'Protein', price: '₦1,200', priceValue: 1200, location: 'Kogi State', inSeason: false, image: '/product_catfish.png' },
  { id: 'yam', name: 'Yam', category: 'Tubers', price: '₦280', priceValue: 280, location: 'Benue State', inSeason: true, image: '/product_yam.png' },
];

const ORDERS = [
  {
    id: '#FC-2024-0892',
    date: 'Nov 12',
    status: 'Delivered',
    badge: 'bg-secondary-container text-primary',
    total: 4200,
    itemsSummary: '5kg Local Rice + 3kg Tomatoes',
    items: [
      { name: 'Local Rice', qty: 5, price: 480, sub: 2400 },
      { name: 'Fresh Tomatoes', qty: 3, price: 320, sub: 960 },
      { name: 'Delivery', qty: 1, price: 840, sub: 840 },
    ],
  },
  {
    id: '#FC-2024-0901',
    date: 'Nov 18',
    status: 'In Transit',
    badge: 'bg-secondary/10 text-secondary font-medium',
    total: 8500,
    itemsSummary: '10kg Yam + 2kg Catfish',
    items: [
      { name: 'Yam', qty: 10, price: 280, sub: 2800 },
      { name: 'Catfish', qty: 2, price: 1200, sub: 2400 },
      { name: 'Delivery', qty: 1, price: 3300, sub: 3300 },
    ],
  },
  {
    id: '#FC-2024-0915',
    date: 'Nov 22',
    status: 'Processing',
    badge: 'bg-surface text-on-surface-variant',
    total: 9600,
    itemsSummary: '20kg Local Rice',
    items: [
      { name: 'Local Rice', qty: 20, price: 480, sub: 9600 },
    ],
  },
];

const CATEGORY_FILTERS = ['All', 'Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits'];
const ORDER_FILTERS = ['All Orders', 'Processing', 'In Transit', 'Delivered'];

const getTabFromPath = (pathname) => {
  if (pathname === CUSTOMER_DASHBOARD_BASE || pathname === `${CUSTOMER_DASHBOARD_BASE}/`) {
    return 'home';
  }

  const prefix = `${CUSTOMER_DASHBOARD_BASE}/`;
  if (!pathname.startsWith(prefix)) {
    return null;
  }

  const slug = pathname.slice(prefix.length);
  return Object.entries(CUSTOMER_DASHBOARD_TABS).find(([, value]) => value === slug)?.[0] ?? null;
};

const getPathForTab = (tab) => {
  const slug = CUSTOMER_DASHBOARD_TABS[tab];
  if (slug === undefined) {
    return null;
  }

  return slug ? `${CUSTOMER_DASHBOARD_BASE}/${slug}` : CUSTOMER_DASHBOARD_BASE;
};

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const CustomerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderFilter, setOrderFilter] = useState('All Orders');
  const [productQuantities, setProductQuantities] = useState(() =>
    PRODUCT_CATALOG.reduce((acc, product) => ({ ...acc, [product.id]: 1 }), {})
  );
  const [cartItems, setCartItems] = useState([
    { ...PRODUCT_CATALOG[0], quantity: 2 },
    { ...PRODUCT_CATALOG[1], quantity: 1 },
  ]);
  const [orders, setOrders] = useState(ORDERS);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState(null);
  const [walletBalance, setWalletBalance] = useState(15200);
  const [walletTransactions, setWalletTransactions] = useState([
    { id: 'WTX-01', type: 'Top-up', amount: 5000, date: 'Nov 20, 2024', status: 'Success' },
    { id: 'WTX-02', type: 'Payment', amount: -2400, date: 'Nov 12, 2024', status: 'Success' },
  ]);
  const activeTab = getTabFromPath(location.pathname);

  const handleTopUp = (amount) => {
    setWalletBalance(prev => prev + amount);
    setWalletTransactions(prev => [
      { id: `WTX-${Date.now()}`, type: 'Top-up', amount, date: 'Just now', status: 'Success' },
      ...prev
    ]);
    showToast(`Successfully topped up ${formatCurrency(amount)}.`, 'success');
  };

  useEffect(() => {
    if (!activeTab) {
      navigate(CUSTOMER_DASHBOARD_BASE, { replace: true });
      return undefined;
    }

    setShowContent(false);
    setSelectedOrderForTracking(null);
    const timer = setTimeout(() => setShowContent(true), 50);
    return () => clearTimeout(timer);
  }, [activeTab, navigate]);

  const handleTabChange = (tab) => {
    const nextPath = getPathForTab(tab);

    if (!nextPath || nextPath === location.pathname) {
      return;
    }

    navigate(nextPath);
  };

  const showToast = (message, variant = 'success') => {
    setToast({ message, variant });
  };

  const adjustProductQuantity = (productId, delta) => {
    setProductQuantities((current) => ({
      ...current,
      [productId]: Math.max(1, (current[productId] ?? 1) + delta),
    }));
  };

  const handleAddToCart = (product) => {
    const quantityToAdd = productQuantities[product.id] ?? 1;

    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantityToAdd } : item
        );
      }

      return [...current, { ...product, quantity: quantityToAdd }];
    });

    setIsCartOpen(true);
    showToast(`${product.name} added to your cart.`, 'success');
  };

  const updateCartQuantity = (productId, delta) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId) => {
    const removedItem = cartItems.find((item) => item.id === productId);
    setCartItems((current) => current.filter((item) => item.id !== productId));

    if (removedItem) {
      showToast(`${removedItem.name} removed from your cart.`, 'warning');
    }
  };

  const handleCheckout = () => {
    const grandTotal = cartSubtotal + 850;
    
    if (walletBalance < grandTotal) {
      showToast('Insufficient wallet balance. Please top up to complete your purchase.', 'error');
      return;
    }

    // Deduct from wallet
    setWalletBalance(prev => prev - grandTotal);
    
    // Add wallet transaction
    setWalletTransactions(prev => [
      { id: `WTX-${Math.floor(Math.random() * 10000)}`, type: 'Payment', amount: -grandTotal, date: 'Just now', status: 'Success' },
      ...prev
    ]);

    // Create new order
    const newOrder = {
      id: `#FM-${Math.floor(Math.random() * 9000) + 1000}`,
      date: 'Just now',
      status: 'Processing',
      badge: 'bg-surface text-on-surface-variant',
      total: grandTotal,
      itemsSummary: cartItems.map(item => `${item.quantity}kg ${item.name}`).join(' + '),
      items: [
        ...cartItems.map(item => ({ name: item.name, qty: item.quantity, price: item.priceValue, sub: item.priceValue * item.quantity })),
        { name: 'Delivery', qty: 1, price: 850, sub: 850 }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    showToast('Order placed successfully! Funds deducted from your wallet.', 'success');
    handleTabChange('orders');
  };

  const handleDownloadReceipt = (order) => {
    const receiptText = [
      'Farmers Market Receipt',
      `Order: ${order.id}`,
      `Status: ${order.status}`,
      `Placed on: ${order.date}`,
      '',
      ...order.items.map((item) => `${item.qty} x ${item.name} @ ${formatCurrency(item.price)} = ${formatCurrency(item.sub)}`),
      '',
      `Total: ${formatCurrency(order.total)}`,
    ].join('\n');

    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${order.id.replace(/#/g, '').toLowerCase()}-receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    showToast(`Receipt downloaded for ${order.id}.`, 'success');
  };

  const filteredProducts = PRODUCT_CATALOG.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.location}`.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredOrders = orders.filter((order) => orderFilter === 'All Orders' || order.status === orderFilter);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const currentPageTitle = {
    home: 'Home',
    browse: 'Marketplace',
    orders: 'My Orders',
    account: 'Settings',
  }[activeTab || 'home'];

  const renderEmptyState = (title, subtitle) => (
    <div className="flex flex-col items-center justify-center p-12 mt-8 animate-in fade-in zoom-in duration-300">
      <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center">
        <svg className="w-10 h-10 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p className="font-display font-semibold text-lg text-on-surface mt-6 text-center">{title}</p>
      <p className="font-body text-on-surface-variant text-sm text-center mt-2">{subtitle}</p>
      <Button variant="accent" size="sm" className="mx-auto mt-6 active:scale-95 transition-transform duration-100" onClick={() => handleTabChange('browse')}>Browse Products</Button>
    </div>
  );

  const renderHome = () => (
    <div className="animate-in fade-in duration-500 relative">
      {/* Aesthetic Background Decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Welcome & Seasonal Spotlight */}
        <div className="flex-1 min-w-0">
          <div className="relative rounded-[2.5rem] bg-primary overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col justify-end p-8 md:p-10 shadow-level-2 group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/hero_farm.png" alt="Fresh farm harvest" className="w-full h-full object-cover grayscale brightness-[0.3] group-hover:scale-105 transition-transform duration-[4s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              <Badge variant="green" className="!bg-secondary-container/20 !text-secondary-container border border-secondary-container/30 mb-4 !normal-case !tracking-normal font-bold">Seasonal Spotlight</Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tighter leading-tight">
                Fresh <span className="text-secondary-container underline decoration-secondary-container/30 underline-offset-8">Sweet Corn</span><br/>is back in season!
              </h2>
              <p className="font-body text-white/60 mt-4 font-medium max-w-sm">Directly harvested from our partner farms in Benue. Limited stock available this week.</p>
              <button className="mt-8 flex items-center gap-2 text-secondary-container font-display font-bold text-sm hover:translate-x-1 transition-transform group/btn">
                 Shop the Harvest
                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Wallet Balance Hero Card */}
        <div className="bg-primary rounded-[2.5rem] p-8 flex flex-col justify-between shadow-level-2 border-b-8 border-secondary-container w-full lg:w-[340px] group relative overflow-hidden active:scale-[0.98] transition-all cursor-pointer" onClick={() => { setSettingsTab('payments'); handleTabChange('account'); }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="font-body text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold">Market Wallet</p>
              <div className="w-8 h-5 bg-white/10 rounded border border-white/5"></div>
            </div>
            <p className="font-display font-bold text-4xl text-secondary-container mt-6 tracking-tighter">{formatCurrency(walletBalance)}</p>
            <div className="mt-2 flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></div>
               <span className="font-body text-[11px] text-white/50 font-bold uppercase tracking-wider">Funds Secured</span>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-3 mt-10">
             <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-secondary-container shadow-inner border border-white/5 group-hover:bg-secondary-container group-hover:text-primary transition-all">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             </div>
             <span className="font-display text-sm text-white font-bold tracking-tight">Top Up Balance</span>
          </div>
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-on-surface mb-6 tracking-tight flex items-center gap-2">
         <div className="w-1.5 h-6 bg-secondary-container rounded-full"></div>
         Quick Insights
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {[
          { label: 'Total Orders', value: orders.length.toString(), trend: '↑', color: 'primary' },
          { label: 'Monthly Spend', value: formatCurrency(orders.reduce((s,o)=>s+o.total,0)), trend: '-', color: 'on-surface' },
          { label: 'Saved', value: '₦4,200', trend: '↑', color: 'primary' },
          { label: 'Deliveries', value: '1', trend: '↑', color: 'secondary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-level-1 border border-white flex flex-col justify-between group hover:shadow-level-2 transition-all">
            <p className="font-body text-[11px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">{stat.label}</p>
            <div className="flex items-end justify-between mt-4">
              <p className="font-display font-bold text-2xl text-on-surface leading-none tracking-tight">{stat.value}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.trend === '↑' ? 'bg-secondary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant opacity-30'}`}>
                 <span className="text-xs font-black">{stat.trend === '↑' ? '↗' : '—'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 mt-12">
        <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Recent Activity</h3>
        <button onClick={() => handleTabChange('orders')} className="font-body text-sm text-primary font-bold hover:underline py-2 px-4 rounded-full hover:bg-primary/5 transition-all">View All Activity</button>
      </div>

      <div className="flex flex-col gap-4">
        {orders.slice(0, 3).map((order) => (
          <div key={order.id} className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-5 shadow-level-1 flex flex-col md:flex-row md:items-center gap-5 cursor-pointer transition-all hover:shadow-level-2 hover:-translate-y-0.5 border border-white group" onClick={() => { setSelectedOrderForTracking(order); handleTabChange('orders'); }}>
            <div className="flex items-center gap-5 w-full md:flex-1 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant shadow-inner relative">
                <img src="/product_rice.png" alt="Product thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-base text-on-surface truncate group-hover:text-primary transition-colors">{order.itemsSummary}</p>
                <p className="font-body text-xs text-on-surface-variant mt-1 font-medium uppercase tracking-wider">{order.id} · {order.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto pl-[84px] md:pl-0 mt-1 md:mt-0">
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-[0.1em] whitespace-nowrap shadow-sm ${order.badge}`}>{order.status}</span>
              <div className="text-right">
                 <p className="font-display font-bold text-lg text-primary whitespace-nowrap tracking-tight">{formatCurrency(order.total)}</p>
                 <p className="font-body text-[10px] text-on-surface-variant font-bold uppercase opacity-40">Total Amount</p>
              </div>
              <svg className="hidden md:block w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-40 transition-all translate-x-[-10px] group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="animate-in fade-in duration-200">
      <div className="md:hidden mb-4">
        {/* Mobile Spacer to match native app padding below header */}
      </div>
      <div className="bg-white rounded-xl border border-surface px-4 py-3 flex items-center gap-3 focus-within:border-secondary-container focus-within:ring-1 focus-within:ring-secondary-container transition-all">
        <svg className="w-5 h-5 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search rice, tomatoes, yam..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="flex-1 font-body text-sm bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant w-full min-h-[28px]"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mt-4 mb-4 no-scrollbar snap-x">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-body text-sm rounded-full px-5 py-2 cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container whitespace-nowrap snap-start min-h-[44px] ${
              selectedCategory === cat ? 'bg-primary text-secondary-container font-medium' : 'bg-white text-on-surface-variant border border-surface font-medium hover:bg-background hover:text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        renderEmptyState('No products match this filter', 'Try another category or clear your search.')
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-soft flex flex-col group hover:shadow-card transition-all outline-none focus-within:ring-2 focus-within:ring-secondary-container">
              <div className="aspect-square w-full bg-white relative overflow-hidden border-b border-surface">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.inSeason && (
                  <Badge variant="green" className="absolute top-3 left-3 shadow-soft">In Season</Badge>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2"><Tag>{product.category}</Tag></div>
                <h3 className="font-display font-semibold text-sm md:text-base text-on-surface">{product.name}</h3>
                <p className="font-body text-[11px] md:text-xs font-light text-on-surface-variant mt-0.5 mb-2">{product.location}</p>

                <span className="font-display font-bold text-base md:text-lg text-primary mb-3 block">
                  {product.price}<span className="font-body font-light text-xs text-on-surface-variant">/kg</span>
                </span>

                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-surface border border-surface rounded-xl px-2 py-1 min-h-[44px] w-full">
                    <button onClick={() => adjustProductQuantity(product.id, -1)} className="text-on-surface-variant hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none" aria-label={`Decrease quantity of ${product.name}`}>−</button>
                    <span className="font-body text-sm font-medium text-on-surface w-6 text-center leading-none">{productQuantities[product.id] ?? 1}</span>
                    <button onClick={() => adjustProductQuantity(product.id, 1)} className="text-secondary-container hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none" aria-label={`Increase quantity of ${product.name}`}>+</button>
                  </div>
                  <Button variant="accent" size="sm" className="w-full mt-1 active:scale-95 transition-transform duration-100" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrders = () => {
    if (selectedOrderForTracking) {
      return (
        <div className="animate-in slide-in-from-right duration-300">
          <button 
            onClick={() => setSelectedOrderForTracking(null)}
            className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline outline-none focus-visible:ring-2 rounded-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to All Orders
          </button>

          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft mb-6">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="font-display font-bold text-lg text-on-surface">Tracking {selectedOrderForTracking.id}</p>
                <p className="font-body text-sm font-light text-on-surface-variant mt-1">Est. Delivery: Tomorrow, Nov 20</p>
              </div>
              <Badge variant="green">{selectedOrderForTracking.status}</Badge>
            </div>

            <div className="flex items-center justify-between relative mb-12 w-full max-w-2xl mx-auto px-2">
              <div className="absolute left-[10%] right-[10%] top-[40%] md:top-[45%] h-1 bg-surface z-0"></div>
              <div className="absolute left-[10%] top-[40%] md:top-[45%] h-1 bg-secondary-container z-0" style={{ width: selectedOrderForTracking.status === 'In Transit' ? '50%' : selectedOrderForTracking.status === 'Delivered' ? '100%' : '10%' }}></div>

              {[
                { label: 'Confirmed', state: 'completed' },
                { label: 'Packed', state: 'completed' },
                { label: 'In Transit', state: selectedOrderForTracking.status === 'In Transit' ? 'current' : selectedOrderForTracking.status === 'Delivered' ? 'completed' : 'pending' },
                { label: 'Delivered', state: selectedOrderForTracking.status === 'Delivered' ? 'current' : 'pending' },
              ].map((step, index) => (
                <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-colors ${
                      step.state === 'completed'
                        ? 'bg-secondary-container text-primary'
                        : step.state === 'current'
                          ? 'bg-secondary text-white ring-4 ring-secondary/20 animate-pulse'
                          : 'bg-surface border-2 border-surface text-on-surface-variant'
                    }`}
                  >
                    {step.state === 'completed' ? '✓' : index + 1}
                  </div>
                  <p className={`absolute -bottom-7 w-max text-[10px] md:text-xs font-medium text-center ${
                    step.state === 'completed'
                      ? 'text-on-surface'
                      : step.state === 'current'
                        ? 'text-secondary'
                        : 'text-on-surface-variant'
                  }`}>{step.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-surface/50 rounded-xl p-4 flex gap-3 items-start mt-12 md:mt-8">
              <svg className="w-5 h-5 stroke-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <div>
                <p className="font-body font-medium text-sm text-on-surface">Your order is {selectedOrderForTracking.status.toLowerCase()} — distribution hub</p>
                <p className="font-body text-xs font-light text-on-surface-variant mt-1">Status update: Just now</p>
              </div>
            </div>
          </div>

          <div className="w-full h-48 md:h-64 rounded-xl bg-white border border-surface flex items-center justify-center overflow-hidden relative shadow-inner">
            <img src="/nigeria_map.png" alt="Delivery tracking map" className="absolute w-full h-full object-cover opacity-30 select-none pointer-events-none mix-blend-multiply" />
            <p className="font-body text-sm font-medium text-on-surface z-10 bg-white/90 px-5 py-2.5 rounded-full shadow-sm backdrop-blur-sm">[ Live tracking map ]</p>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in duration-200">
        <div className="flex gap-6 border-b border-surface mb-6 overflow-x-auto no-scrollbar">
          {ORDER_FILTERS.map((tab) => (
            <button
              key={tab}
              onClick={() => setOrderFilter(tab)}
              className={`pb-3 font-body text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-t-sm transition-colors min-h-[44px] ${
                orderFilter === tab ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          renderEmptyState('No orders in this status', 'Switch filters or place a fresh order from the browse page.')
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-soft transition-shadow hover:shadow-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-display font-bold text-lg text-on-surface">Order {order.id}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-0.5">Placed on {order.date}</p>
                  </div>
                  <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${order.badge}`}>{order.status}</span>
                </div>

                <div className="flex flex-col gap-3 py-4 border-t border-b border-surface/60">
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.name}`} className="flex justify-between items-center">
                      <p className="font-body text-sm text-on-surface">
                        <span className="font-medium">{item.qty}</span> × {item.name} <span className="text-on-surface-variant font-light ml-1">({formatCurrency(item.price)})</span>
                      </p>
                      <p className="font-body font-medium text-sm text-on-surface">{formatCurrency(item.sub)}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4 pt-1">
                  <span className="font-display font-bold text-lg text-primary">{formatCurrency(order.total)}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDownloadReceipt(order)} 
                      className="font-body text-sm text-on-surface-variant font-medium hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-sm px-2 min-h-[44px] flex items-center"
                    >
                      Receipt
                    </button>
                    {order.status !== 'Delivered' && (
                      <button 
                        onClick={() => setSelectedOrderForTracking(order)}
                        className="font-body text-sm text-primary font-bold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-sm px-2 min-h-[44px] flex items-center"
                      >
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const [settingsTab, setSettingsTab] = useState('profile');

  const renderAccount = () => {
    const subTabs = [
      { id: 'profile', label: 'Profile' },
      { id: 'notifications', label: 'Notifications' },
      { id: 'security', label: 'Security' },
      { id: 'payments', label: 'Payments' },
    ];

    return (
      <div className="animate-in fade-in duration-300">
        <div className="mb-8 hidden md:block">
          <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Settings</h2>
          <p className="font-body text-on-surface-variant mt-1 font-medium">Control your account preferences and secure your data.</p>
        </div>

        {/* Settings Sub-navigation */}
        <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl mb-8 w-full max-w-md overflow-x-auto no-scrollbar snap-x">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSettingsTab(tab.id)}
              className={`flex-1 px-4 py-2.5 rounded-xl font-body text-sm font-bold transition-all whitespace-nowrap snap-start min-h-[44px] ${
                settingsTab === tab.id 
                  ? 'bg-white text-primary shadow-level-1' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            {settingsTab === 'profile' && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-3xl shadow-sm border-4 border-white transition-transform group-hover:scale-105">AO</div>
                      <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white shadow-sm hover:bg-primary/90 transition-colors cursor-pointer" aria-label="Change photo">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Public Profile</h3>
                      <p className="font-body text-sm text-on-surface-variant font-medium mt-1">Manage your identity on the marketplace.</p>
                    </div>
                  </div>

                  <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface px-1">Full Name</label>
                      <input type="text" defaultValue="Adebayo O." className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface px-1">Display Name</label>
                      <input type="text" defaultValue="Adebayo" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="font-body font-bold text-sm text-on-surface px-1">Bio</label>
                      <textarea placeholder="Tell us about yourself..." className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all min-h-[100px] resize-none" defaultValue="Passionate about local farming and high-quality organic produce. Cooking is my therapy."></textarea>
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <Button variant="primary" size="md" className="font-bold !px-10" onClick={() => showToast('Profile updated successfully!', 'success')}>Save Changes</Button>
                    </div>
                  </form>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-6">Delivery Address</h3>
                  <div className="flex flex-col gap-4">
                    <div className="bg-surface-container-low rounded-2xl p-5 flex items-start gap-4 border border-outline-variant/20 relative group">
                       <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg></div>
                       <div className="flex-1 min-w-0 pr-10">
                          <p className="font-body font-bold text-on-surface">Home · Primary</p>
                          <p className="font-body text-sm text-on-surface-variant mt-1 leading-relaxed">14 Admiralty Way, Lekki Phase 1, Lagos State, Nigeria</p>
                       </div>
                       <button className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 transition-colors cursor-pointer"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button>
                    </div>
                    <button className="w-full py-4 rounded-2xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant font-body font-bold text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Add New Address
                    </button>
                  </div>
                </section>
                
                {/* Fixed Phone Input */}
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-6">Contact Information</h3>
                  <div className="flex flex-col gap-1.5 max-w-sm">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Phone Number</label>
                    <input type="tel" defaultValue="+234 800 123 4567" inputMode="tel" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                </section>
              </div>
            )}

            {settingsTab === 'notifications' && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Market Alerts</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { title: 'New Harvest Arrivals', desc: 'Get notified when new seasonal products hit the store.', default: true },
                      { title: 'Weekly Price Drops', desc: 'Never miss a discount on your favorite grains.', default: true },
                      { title: 'Farmer Stories', desc: 'Read highlights from our partner farms across the country.', default: false },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0">
                        <div className="max-w-[80%]">
                          <p className="font-body font-bold text-on-surface">{item.title}</p>
                          <p className="font-body text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                          <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Account Activity</h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { title: 'Order Status Updates', desc: 'Critical updates on your delivery progress.', default: true },
                      { title: 'Payment Confirmations', desc: 'Receipts and transaction alerts.', default: true },
                      { title: 'Security Alerts', desc: 'Notified of new logins or profile changes.', default: true },
                    ].map((item) => (
                      <div key={item.title} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0">
                        <div className="max-w-[80%]">
                          <p className="font-body font-bold text-on-surface">{item.title}</p>
                          <p className="font-body text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                          <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {settingsTab === 'security' && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-2">Change Password</h3>
                  <p className="font-body text-sm text-on-surface-variant font-medium mb-8">Choose a strong password to protect your account.</p>
                  
                  <form className="flex flex-col gap-5 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface px-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface px-1">New Password</label>
                      <input type="password" placeholder="Min. 8 characters" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-body font-bold text-sm text-on-surface px-1">Confirm New Password</label>
                      <input type="password" placeholder="Repeat new password" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                    </div>
                    <div className="pt-4">
                      <Button variant="primary" size="md" className="font-bold !px-10" onClick={() => showToast('Password updated successfully!', 'success')}>Update Password</Button>
                    </div>
                  </form>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 border-red-500/10">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-2">Danger Zone</h3>
                  <p className="font-body text-sm text-on-surface-variant font-medium mb-8">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="ghost" className="!text-error !border-error/20 hover:!bg-error/5" onClick={() => showToast('Account deletion protection active.', 'warning')}>Delete My Account</Button>
                </section>
              </div>
            )}

            {settingsTab === 'payments' && (
              <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/5 rounded-bl-full pointer-events-none"></div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                    <div>
                      <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Market Wallet</h3>
                      <p className="font-body text-sm text-on-surface-variant font-medium mt-1">Stored funds for instant, one-click shopping.</p>
                    </div>
                    <div className="text-right">
                       <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Balance</p>
                       <p className="font-display font-bold text-3xl text-primary tracking-tighter">{formatCurrency(walletBalance)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap relative z-10">
                     <Button variant="primary" size="sm" className="font-bold !px-8" onClick={() => handleTopUp(5000)}>Top Up ₦5,000</Button>
                     <Button variant="ghost" size="sm" className="font-bold !px-8" onClick={() => handleTopUp(10000)}>Top Up ₦10,000</Button>
                     <Button variant="ghost" size="sm" className="font-bold !px-8" onClick={() => showToast('Enter custom amount flow coming soon.', 'success')}>Custom Amount</Button>
                  </div>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Saved Methods</h3>
                    <Badge variant="green">2 Active</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    <div className="rounded-3xl bg-primary text-white p-6 shadow-level-2 relative overflow-hidden group h-[200px] flex flex-col justify-between border-b-4 border-secondary-container">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
                      <div className="relative z-10 flex justify-between items-start">
                         <div className="w-10 h-6 bg-white/20 rounded-md"></div>
                         <p className="font-body text-[10px] font-bold tracking-[0.2em] opacity-60">CARD · PRIMARY</p>
                      </div>
                      <div className="relative z-10">
                        <p className="font-display font-bold text-2xl tracking-tighter">•••• •••• •••• 2048</p>
                        <div className="flex justify-between items-center mt-6 text-[11px] font-bold uppercase tracking-widest opacity-80">
                          <span>EXP 08/28</span>
                          <span className="bg-white/20 px-2 py-1 rounded">ADEBAYO O.</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-low p-6 flex flex-col justify-between h-[200px]">
                      <div>
                        <div className="flex justify-between items-start">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21v-4m18 4v-4M3 10h18M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3m0 11H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path></svg></div>
                          <p className="font-body text-[10px] font-bold tracking-[0.2em] text-on-surface-variant opacity-60 uppercase">READY</p>
                        </div>
                        <h4 className="font-display font-bold text-xl text-on-surface mt-6 tracking-tight">Bank Transfer</h4>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-1">FCMB Virtual Account</p>
                      </div>
                      <button className="font-body text-xs text-primary font-bold hover:underline self-start">Update Details</button>
                    </div>
                  </div>

                  <button className="w-full py-4 rounded-2xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant font-body font-bold text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Link New Method
                  </button>
                </section>

                <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Wallet Activity</h3>
                  <div className="flex flex-col gap-1">
                    {walletTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0 hover:bg-background/30 px-2 -mx-2 rounded-xl transition-colors">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-secondary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                              {tx.amount > 0 ? (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                              ) : (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                              )}
                           </div>
                           <div>
                            <p className="font-body font-bold text-on-surface">{tx.type} · {tx.id}</p>
                            <p className="font-body text-[11px] text-on-surface-variant font-medium mt-0.5">{tx.date} · {tx.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-display font-bold ${tx.amount > 0 ? 'text-primary' : 'text-on-surface'}`}>
                            {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Right: Membership Snapshot (Visible across all settings) */}
          <div className="flex flex-col gap-6">
            <section className="bg-primary text-white rounded-3xl p-8 shadow-level-2 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
               <Badge variant="green" className="!bg-secondary-container !text-primary font-bold border-none mb-6">Silver Member</Badge>
               <h4 className="font-display font-bold text-xl tracking-tight leading-tight">You've saved {formatCurrency(4200)} this year.</h4>
               <p className="font-body text-white/60 text-sm mt-4 leading-relaxed font-medium">Keep shopping direct to reach **Gold Member** status and unlock free delivery on all orders.</p>
               <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="font-body text-xs font-bold text-white/50 uppercase tracking-widest">Active since</span>
                  <span className="font-body text-xs font-bold">FEB 2025</span>
               </div>
            </section>

            <section className="bg-white rounded-3xl p-6 shadow-level-1 border border-outline-variant/30">
               <h4 className="font-display font-bold text-lg text-on-surface tracking-tight mb-5">Quick Preferences</h4>
               <div className="flex flex-wrap gap-2">
                 {['Organic only', 'Local delivery', 'Bulk orders', 'Glass packaging'].map(p => (
                   <button key={p} className="px-3 py-1.5 rounded-xl border border-outline-variant/40 font-body text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer">{p}</button>
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
      <Sidebar 
        activeTab={activeTab} 
        onChangeTab={handleTabChange} 
        isCollapsed={isCollapsed} 
        onToggle={() => setIsCollapsed(!isCollapsed)} 
      />
      <DashNavbar
        title={currentPageTitle}
        cartCount={cartCount}
        isCollapsed={isCollapsed}
        onOpenCart={() => setIsCartOpen(true)}
        onSearch={() => {
          handleTabChange('browse');
          showToast('Search opens the browse view so you can filter products.', 'success');
        }}
        onNotifications={() => {
          handleTabChange('orders');
          showToast('Notifications will land here once order alerts are connected.', 'warning');
        }}
      />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        onDecreaseQuantity={(productId) => updateCartQuantity(productId, -1)}
        onIncreaseQuantity={(productId) => updateCartQuantity(productId, 1)}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        onBrowseProducts={() => {
          setIsCartOpen(false);
          handleTabChange('browse');
        }}
      />

      <main className={`transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'} px-4 py-6 md:px-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-8`}>
        <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'browse' && renderBrowse()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'account' && renderAccount()}
        </div>
      </main>

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerDashboard;
