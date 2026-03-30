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
  payments: 'payments',
  track: 'track',
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
    badge: 'bg-accent/10 text-accent',
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
    badge: 'bg-orange/10 text-orange',
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
    badge: 'bg-secondary text-muted',
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
  const activeTab = getTabFromPath(location.pathname);

  useEffect(() => {
    if (!activeTab) {
      navigate(CUSTOMER_DASHBOARD_BASE, { replace: true });
      return undefined;
    }

    setShowContent(false);
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
    if (cartItems.length === 0) {
      showToast('Your cart is empty.', 'warning');
      return;
    }

    setIsCartOpen(false);
    showToast('Checkout is still mocked, but your cart is now fully interactive.', 'success');
  };

  const handleDownloadReceipt = (order) => {
    const receiptText = [
      'Farm Connect Receipt',
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

  const filteredOrders = ORDERS.filter((order) => orderFilter === 'All Orders' || order.status === orderFilter);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  const currentPageTitle = {
    home: 'Dashboard',
    browse: 'Browse Products',
    orders: 'My Orders',
    payments: 'Payments',
    track: 'Track Delivery',
    account: 'My Account',
  }[activeTab || 'home'];

  const renderEmptyState = (title, subtitle) => (
    <div className="flex flex-col items-center justify-center p-12 mt-8 animate-in fade-in zoom-in duration-300">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
        <svg className="w-10 h-10 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <p className="font-display font-semibold text-lg text-text mt-6 text-center">{title}</p>
      <p className="font-body text-muted text-sm text-center mt-2">{subtitle}</p>
      <Button variant="accent" size="sm" className="mx-auto mt-6 active:scale-95 transition-transform duration-100" onClick={() => handleTabChange('browse')}>Browse Products</Button>
    </div>
  );

  const renderHome = () => (
    <div className="animate-in fade-in duration-200">
      <h2 className="font-display font-bold text-2xl text-text">Good morning, Amara</h2>
      <p className="font-body text-muted mt-1">Here&apos;s what&apos;s fresh this week.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-8">
        {[
          { label: 'Total Orders', value: '12', trend: '↑' },
          { label: 'This Month Spend', value: '₦18,400', trend: '-' },
          { label: 'Active Deliveries', value: '1', trend: '↑' },
          { label: 'Saved on Markups', value: '₦4,200', trend: '↑' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-5 shadow-soft flex flex-col justify-between">
            <p className="font-body text-[10px] md:text-xs text-muted uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <p className="font-display font-bold text-2xl text-text leading-none">{stat.value}</p>
              <span className={`text-xs ml-2 ${stat.trend === '↑' ? 'text-accent' : 'text-muted'}`}>{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 mt-8">
        <h3 className="font-display font-semibold text-lg text-text">Recent Orders</h3>
        <button onClick={() => handleTabChange('orders')} className="font-body text-sm text-accent font-medium hover:underline focus-visible:ring-2 focus-visible:ring-accent outline-none min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm">View All</button>
      </div>

      <div className="flex flex-col gap-3">
        {ORDERS.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-4 shadow-soft flex flex-col md:flex-row md:items-center gap-4 cursor-pointer transition-shadow hover:shadow-card focus-within:ring-2 focus-within:ring-accent outline-none" tabIndex={0}>
            <div className="flex items-center gap-4 w-full md:flex-1 min-w-0">
              <div className="w-12 h-12 rounded-lg bg-surface flex-shrink-0 flex items-center justify-center overflow-hidden border border-secondary shadow-sm">
                <img src="/product_rice.png" alt="Product thumbnail" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 min-w-0 pr-2">
                <p className="font-body font-medium text-sm text-text truncate">{order.itemsSummary}</p>
                <p className="font-body text-xs text-muted mt-0.5">Order {order.id} · {order.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-between md:justify-end w-full md:w-auto pl-16 md:pl-0 mt-1 md:mt-0">
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${order.badge}`}>{order.status}</span>
              <p className="font-display font-semibold text-sm text-text whitespace-nowrap">{formatCurrency(order.total)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-secondary px-4 py-3 flex items-center gap-3 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all">
        <svg className="w-5 h-5 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Search rice, tomatoes, yam..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="flex-1 font-body text-sm bg-transparent outline-none text-text placeholder:text-muted w-full min-h-[28px]"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mt-4 mb-4 no-scrollbar snap-x">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-body text-sm rounded-full px-5 py-2 cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent whitespace-nowrap snap-start min-h-[44px] ${
              selectedCategory === cat ? 'bg-primary text-white font-medium' : 'bg-surface text-muted border border-secondary font-medium hover:bg-white hover:text-text'
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
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-soft flex flex-col group hover:shadow-card transition-all outline-none focus-within:ring-2 focus-within:ring-accent">
              <div className="aspect-square w-full bg-surface relative overflow-hidden border-b border-secondary">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.inSeason && (
                  <Badge variant="green" className="absolute top-3 left-3 shadow-soft">In Season</Badge>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2"><Tag>{product.category}</Tag></div>
                <h3 className="font-display font-semibold text-sm md:text-base text-text">{product.name}</h3>
                <p className="font-body text-[11px] md:text-xs font-light text-muted mt-0.5 mb-2">{product.location}</p>

                <span className="font-display font-bold text-base md:text-lg text-primary mb-3 block">
                  {product.price}<span className="font-body font-light text-xs text-muted">/kg</span>
                </span>

                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-surface border border-secondary rounded-xl px-2 py-1 min-h-[44px] w-full">
                    <button onClick={() => adjustProductQuantity(product.id, -1)} className="text-muted hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors leading-none" aria-label={`Decrease quantity of ${product.name}`}>−</button>
                    <span className="font-body text-sm font-medium text-text w-6 text-center leading-none">{productQuantities[product.id] ?? 1}</span>
                    <button onClick={() => adjustProductQuantity(product.id, 1)} className="text-accent hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors leading-none" aria-label={`Increase quantity of ${product.name}`}>+</button>
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

  const renderOrders = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex gap-6 border-b border-secondary mb-6 overflow-x-auto no-scrollbar">
        {ORDER_FILTERS.map((tab) => (
          <button
            key={tab}
            onClick={() => setOrderFilter(tab)}
            className={`pb-3 font-body text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-t-sm transition-colors min-h-[44px] ${
              orderFilter === tab ? 'border-b-2 border-accent text-accent' : 'border-b-2 border-transparent text-muted hover:text-text'
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
                  <p className="font-display font-bold text-lg text-text">Order {order.id}</p>
                  <p className="font-body text-xs text-muted mt-0.5">Placed on {order.date}</p>
                </div>
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${order.badge}`}>{order.status}</span>
              </div>

              <div className="flex flex-col gap-3 py-4 border-t border-b border-secondary/60">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.name}`} className="flex justify-between items-center">
                    <p className="font-body text-sm text-text">
                      <span className="font-medium">{item.qty}</span> × {item.name} <span className="text-muted font-light ml-1">({formatCurrency(item.price)})</span>
                    </p>
                    <p className="font-body font-medium text-sm text-text">{formatCurrency(item.sub)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-1">
                <span className="font-display font-bold text-lg text-primary">{formatCurrency(order.total)}</span>
                <button onClick={() => handleDownloadReceipt(order)} className="font-body text-sm text-accent font-medium hover:underline outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 min-h-[44px] flex items-center">Download Receipt</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTrack = () => (
    <div className="animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft mb-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="font-display font-bold text-lg text-text">Order #FC-2024-0901</p>
            <p className="font-body text-sm font-light text-muted mt-1">Est. Delivery: Tomorrow, Nov 20</p>
          </div>
          <Badge variant="orange">In Transit</Badge>
        </div>

        <div className="flex items-center justify-between relative mb-12 w-full max-w-2xl mx-auto px-2">
          <div className="absolute left-[10%] right-[10%] top-[40%] md:top-[45%] h-1 bg-secondary z-0"></div>
          <div className="absolute left-[10%] top-[40%] md:top-[45%] h-1 bg-accent z-0" style={{ width: '50%' }}></div>

          {[
            { label: 'Order Confirmed', state: 'completed' },
            { label: 'Packed', state: 'completed' },
            { label: 'In Transit', state: 'current' },
            { label: 'Delivered', state: 'pending' },
          ].map((step, index) => (
            <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-colors ${
                  step.state === 'completed'
                    ? 'bg-accent text-white'
                    : step.state === 'current'
                      ? 'bg-orange text-white ring-4 ring-orange/20 animate-pulse'
                      : 'bg-surface border-2 border-secondary text-muted'
                }`}
                aria-current={step.state === 'current' ? 'step' : undefined}
              >
                {step.state === 'completed' ? '✓' : index + 1}
              </div>
              <p className={`absolute -bottom-7 w-max text-[10px] md:text-xs font-medium text-center ${
                step.state === 'completed'
                  ? 'text-text'
                  : step.state === 'current'
                    ? 'text-orange'
                    : 'text-muted'
              }`}>{step.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary/50 rounded-xl p-4 flex gap-3 items-start mt-12 md:mt-8">
          <svg className="w-5 h-5 stroke-accent flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <div>
            <p className="font-body font-medium text-sm text-text">Your order is in transit — Lagos distribution hub</p>
            <p className="font-body text-xs font-light text-muted mt-1">Today, 08:32 AM</p>
          </div>
        </div>
      </div>

      <div className="w-full h-48 md:h-64 rounded-xl bg-surface border border-secondary flex items-center justify-center overflow-hidden relative shadow-inner">
        <img src="/nigeria_map.png" alt="Delivery tracking map" className="absolute w-full h-full object-cover opacity-30 select-none pointer-events-none mix-blend-multiply" />
        <p className="font-body text-sm font-medium text-text z-10 bg-white/90 px-5 py-2.5 rounded-full shadow-sm backdrop-blur-sm">[ Live delivery map ]</p>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text">Payments</h2>
          <p className="font-body text-muted mt-1">Manage saved cards, recent payments, and billing activity.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => showToast('Invoice export is not connected yet.', 'warning')}>Export History</Button>
          <Button variant="primary" size="sm" onClick={() => showToast('New payment methods are not connected yet, but this page is now live.', 'success')}>Add Payment Method</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl p-6 shadow-soft xl:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-text">Saved Methods</h3>
              <p className="font-body text-sm text-muted mt-1">Your preferred ways to pay for weekly orders.</p>
            </div>
            <Badge variant="green">2 Active</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-primary text-white p-5 shadow-soft">
              <p className="font-body text-xs uppercase tracking-[0.24em] text-white/60">Primary Card</p>
              <p className="font-display font-bold text-xl mt-8">Visa ending in 2048</p>
              <div className="flex items-center justify-between mt-6 text-sm text-white/70">
                <span>Expires 08/28</span>
                <span>Lagos NGN</span>
              </div>
            </div>

            <div className="rounded-2xl border border-secondary bg-surface p-5">
              <p className="font-body text-xs uppercase tracking-[0.24em] text-muted">Backup Method</p>
              <p className="font-display font-bold text-xl text-text mt-8">Bank Transfer</p>
              <div className="flex items-center justify-between mt-6 text-sm text-muted">
                <span>FCMB Virtual Account</span>
                <span>Ready</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display font-semibold text-lg text-text">Recent Payments</h3>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { id: 'PMT-204', order: '#FC-2024-0915', amount: 9600, status: 'Pending settlement', date: 'Nov 22' },
                { id: 'PMT-198', order: '#FC-2024-0901', amount: 8500, status: 'Paid successfully', date: 'Nov 18' },
                { id: 'PMT-191', order: '#FC-2024-0892', amount: 4200, status: 'Paid successfully', date: 'Nov 12' },
              ].map((payment) => (
                <div key={payment.id} className="rounded-xl border border-secondary/70 bg-white px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-body font-medium text-sm text-text">{payment.order}</p>
                    <p className="font-body text-xs text-muted mt-1">{payment.id} · {payment.date}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="font-display font-semibold text-text">{formatCurrency(payment.amount)}</p>
                    <p className="font-body text-xs text-muted mt-1">{payment.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Billing Summary</h3>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">This month paid</span>
                <span className="font-display font-semibold text-text">{formatCurrency(18300)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Outstanding</span>
                <span className="font-display font-semibold text-orange">{formatCurrency(9600)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Autopay</span>
                <span className="font-body font-medium text-text">Disabled</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Quick Actions</h3>
            <div className="mt-5 flex flex-col gap-3">
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleTabChange('orders')}>Review Order Payments</Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleTabChange('account')}>Update Billing Profile</Button>
              <Button variant="ghost" size="sm" className="justify-start" onClick={() => showToast('Autopay setup is not connected yet.', 'warning')}>Enable Autopay</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderAccount = () => (
    <div className="animate-in fade-in duration-200">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
        <div>
          <h2 className="font-display font-bold text-2xl text-text">My Account</h2>
          <p className="font-body text-muted mt-1">Manage your profile, delivery setup, and buying preferences.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => showToast('Support chat is not connected yet, but this account area is now live.', 'warning')}>Contact Support</Button>
          <Button variant="primary" size="sm" onClick={() => showToast('Your account preferences have been saved.', 'success')}>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl p-6 shadow-soft xl:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center font-display font-bold text-xl">AO</div>
            <div>
              <h3 className="font-display font-semibold text-lg text-text">Adebayo O.</h3>
              <p className="font-body text-sm text-muted">adebayo@example.com</p>
              <p className="font-body text-xs text-muted mt-1">Buyer account active since February 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Full Name</span>
              <input type="text" defaultValue="Adebayo O." className="w-full px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Phone Number</span>
              <input type="tel" defaultValue="+234 800 123 4567" className="w-full px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20" />
            </label>
            <label className="flex flex-col gap-1.5 md:col-span-2">
              <span className="font-body font-semibold text-sm text-text">Delivery Address</span>
              <input type="text" defaultValue="14 Admiralty Way, Lekki Phase 1, Lagos" className="w-full px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Preferred Delivery Window</span>
              <select defaultValue="Friday morning" className="w-full px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20">
                <option>Friday morning</option>
                <option>Friday afternoon</option>
                <option>Saturday morning</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body font-semibold text-sm text-text">Order Reminder</span>
              <select defaultValue="Email + SMS" className="w-full px-4 py-3 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20">
                <option>Email + SMS</option>
                <option>Email only</option>
                <option>SMS only</option>
              </select>
            </label>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Membership Snapshot</h3>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Orders placed</span>
                <span className="font-display font-semibold text-text">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Saved on markups</span>
                <span className="font-display font-semibold text-accent">{formatCurrency(4200)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-body text-sm text-muted">Primary market</span>
                <span className="font-body font-medium text-text">Lagos</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-lg text-text">Buying Preferences</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>Rice</Tag>
              <Tag>Vegetables</Tag>
              <Tag>Bulk Orders</Tag>
              <Tag>Friday Delivery</Tag>
            </div>
            <Button variant="ghost" size="sm" className="mt-5" onClick={() => handleTabChange('browse')}>Update Preferences</Button>
          </section>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-bg min-h-screen">
      <Sidebar activeTab={activeTab} onChangeTab={handleTabChange} />
      <DashNavbar
        title={currentPageTitle}
        cartCount={cartCount}
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

      <main className="ml-0 md:ml-64 p-6 pb-[calc(4rem+env(safe-area-inset-bottom)+1.5rem)] md:pb-8">
        <div className="md:hidden flex gap-2 mb-6 overflow-x-auto no-scrollbar py-1">
          <span className="font-display text-sm font-bold text-primary flex items-center mr-2">Views:</span>
          {['home', 'browse', 'orders', 'payments', 'track', 'account'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-3 py-1.5 rounded-full font-body text-xs font-medium capitalize outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all whitespace-nowrap min-h-[32px] ${
                activeTab === tab ? 'bg-primary text-white shadow-md' : 'bg-white text-muted border border-secondary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'browse' && renderBrowse()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'track' && renderTrack()}
          {activeTab === 'account' && renderAccount()}
        </div>
      </main>

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerDashboard;
