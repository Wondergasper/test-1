import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashNavbar from '../components/dashboard/DashNavbar';
import BottomNav from '../components/dashboard/BottomNav';
import CartDrawer from '../components/dashboard/CartDrawer';
import ToastNotification from '../components/dashboard/ToastNotification';
import ProductDetailsModal from '../components/dashboard/ProductDetailsModal';
import { PRODUCT_CATALOG, ORDERS } from '../data/mockData';
import HomeTab from '../components/dashboard/HomeTab';
import BrowseTab from '../components/dashboard/BrowseTab';
import OrdersTab from '../components/dashboard/OrdersTab';
import WishlistTab from '../components/dashboard/WishlistTab';
import AccountTab from '../components/dashboard/AccountTab';

const CUSTOMER_DASHBOARD_BASE = '/dashboard/customer';
const CUSTOMER_DASHBOARD_TABS = {
  home: '',
  browse: 'browse',
  orders: 'orders',
  wishlist: 'wishlist',
  account: 'account',
};

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
  
  // Browsing, Search, Filters & Sort State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  // Product Details Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  // Wishlist State
  const [wishlistItems, setWishlistItems] = useState([
    PRODUCT_CATALOG[2], // Catfish preloaded
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 'notif-01', message: 'Welcome to Farmers Market! Your account is verified.', time: '1h ago', read: false },
    { id: 'notif-02', message: 'Benue Sweet Corn is back in season. Shop now!', time: '2h ago', read: true },
  ]);

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
  const [settingsTab, setSettingsTab] = useState('profile');
  const activeTab = getTabFromPath(location.pathname);

  const handleTopUp = (amount) => {
    setWalletBalance(prev => prev + amount);
    setWalletTransactions(prev => [
      { id: `WTX-${Date.now()}`, type: 'Top-up', amount, date: 'Just now', status: 'Success' },
      ...prev
    ]);
    
    // Add notification
    setNotifications(prev => [
      { id: `notif-${Date.now()}`, message: `Successfully topped up ${formatCurrency(amount)} using card.`, time: 'Just now', read: false },
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

  const adjustModalQuantity = (productId, delta) => {
    setModalQuantity((prev) => Math.max(1, prev + delta));
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

  const handleAddToCartFromModal = (product) => {
    setCartItems((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + modalQuantity } : item
        );
      }
      return [...current, { ...product, quantity: modalQuantity }];
    });

    setIsCartOpen(true);
    showToast(`${modalQuantity}kg ${product.name} added to your cart.`, 'success');
  };

  const handleBuyNow = (product, quantity) => {
    const unitPrice = product.priceValue;
    const sub = unitPrice * quantity;
    const deliveryFee = 850; // standard default
    const total = sub + deliveryFee;

    if (walletBalance < total) {
      showToast('Insufficient wallet balance to Buy Now. Please top up.', 'error');
      return;
    }

    setWalletBalance((prev) => prev - total);
    setWalletTransactions((prev) => [
      { id: `WTX-${Math.floor(Math.random() * 10000)}`, type: 'Payment', amount: -total, date: 'Just now', status: 'Success' },
      ...prev
    ]);

    const newOrder = {
      id: `#FM-${Math.floor(Math.random() * 9000) + 1000}`,
      date: 'Just now',
      status: 'Processing',
      badge: 'bg-surface text-on-surface-variant',
      total,
      itemsSummary: `${quantity}kg ${product.name}`,
      items: [
        { name: product.name, qty: quantity, price: unitPrice, sub },
        { name: 'Delivery', qty: 1, price: deliveryFee, sub: deliveryFee }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Purchase complete! Order placed for ${product.name}.`, 'success');

    // Add notification
    setNotifications((prev) => [
      { id: `notif-${Date.now()}`, message: `Order placed successfully for ${quantity}kg ${product.name}.`, time: 'Just now', read: false },
      ...prev
    ]);

    handleTabChange('orders');
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

  const handleCheckout = (deliveryFee) => {
    const grandTotal = cartSubtotal + deliveryFee;
    
    if (walletBalance < grandTotal) {
      showToast('Insufficient wallet balance. Please top up to complete your purchase.', 'error');
      return;
    }

    setWalletBalance(prev => prev - grandTotal);
    
    setWalletTransactions(prev => [
      { id: `WTX-${Math.floor(Math.random() * 10000)}`, type: 'Payment', amount: -grandTotal, date: 'Just now', status: 'Success' },
      ...prev
    ]);

    const newOrder = {
      id: `#FM-${Math.floor(Math.random() * 9000) + 1000}`,
      date: 'Just now',
      status: 'Processing',
      badge: 'bg-surface text-on-surface-variant',
      total: grandTotal,
      itemsSummary: cartItems.map(item => `${item.quantity}kg ${item.name}`).join(' + '),
      items: [
        ...cartItems.map(item => ({ name: item.name, qty: item.quantity, price: item.priceValue, sub: item.priceValue * item.quantity })),
        { name: 'Delivery', qty: 1, price: deliveryFee, sub: deliveryFee }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    showToast('Order placed successfully! Funds deducted from your wallet.', 'success');

    // Add notification
    setNotifications((prev) => [
      { id: `notif-${Date.now()}`, message: `Order placed successfully. Total: ${formatCurrency(grandTotal)}`, time: 'Just now', read: false },
      ...prev
    ]);

    handleTabChange('orders');
  };

  const handleCancelOrder = (order) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: 'Cancelled', badge: 'bg-error/10 text-error' } : o))
    );

    // Revert wallet balance
    setWalletBalance((prev) => prev + order.total);
    setWalletTransactions((prev) => [
      { id: `WTX-${Math.floor(Math.random() * 10000)}`, type: 'Refund', amount: order.total, date: 'Just now', status: 'Success' },
      ...prev
    ]);

    // Send notification
    setNotifications((prev) => [
      { id: `notif-${Date.now()}`, message: `Order ${order.id} cancelled. Refund of ${formatCurrency(order.total)} completed.`, time: 'Just now', read: false },
      ...prev
    ]);

    showToast(`Order ${order.id} cancelled. ${formatCurrency(order.total)} refunded.`, 'warning');
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from saved items.`, 'warning');
        return current.filter((item) => item.id !== product.id);
      } else {
        showToast(`${product.name} saved to Wishlist!`, 'success');
        return [...current, product];
      }
    });
  };

  const handleMoveToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    
    setWishlistItems((current) => current.filter((item) => item.id !== product.id));
    setIsCartOpen(true);
    showToast(`${product.name} moved to cart.`, 'success');
  };

  const handleMarkNotificationsAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.', 'success');
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

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product);
    setModalQuantity(productQuantities[product.id] ?? 1);
  };

  const filteredProducts = PRODUCT_CATALOG.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = `${product.name} ${product.location}`.toLowerCase().includes(searchQuery.trim().toLowerCase());
    
    // Price Range Filter
    const matchesMinPrice = minPrice === '' || product.priceValue >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.priceValue <= Number(maxPrice);
    
    // Location Filter
    const matchesLocation = selectedLocation === 'All' || product.location === selectedLocation;

    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice && matchesLocation;
  }).sort((a, b) => {
    if (sortType === 'price-asc') return a.priceValue - b.priceValue;
    if (sortType === 'price-desc') return b.priceValue - a.priceValue;
    if (sortType === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // default (original order)
  });

  const filteredOrders = orders.filter((order) => orderFilter === 'All Orders' || order.status === orderFilter);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);
  
  const currentPageTitle = {
    home: 'Home',
    browse: 'Marketplace',
    orders: 'My Orders',
    wishlist: 'Saved Items',
    account: 'Settings',
  }[activeTab || 'home'];

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
        notifications={notifications}
        onMarkAllRead={handleMarkNotificationsAllRead}
        onSearch={() => {
          handleTabChange('browse');
          showToast('Search filters are now active in the browse view.', 'success');
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
          {activeTab === 'home' && (
            <HomeTab
              orders={orders}
              walletBalance={walletBalance}
              formatCurrency={formatCurrency}
              handleTabChange={handleTabChange}
              setSelectedOrderForTracking={setSelectedOrderForTracking}
              setSettingsTab={setSettingsTab}
            />
          )}
          {activeTab === 'browse' && (
            <BrowseTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortType={sortType}
              setSortType={setSortType}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              filteredProducts={filteredProducts}
              productQuantities={productQuantities}
              adjustProductQuantity={adjustProductQuantity}
              handleAddToCart={handleAddToCart}
              handleTabChange={handleTabChange}
              wishlistItems={wishlistItems}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={handleOpenProductDetails}
              onBuyNow={handleBuyNow}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersTab
              selectedOrderForTracking={selectedOrderForTracking}
              setSelectedOrderForTracking={setSelectedOrderForTracking}
              orderFilter={orderFilter}
              setOrderFilter={setOrderFilter}
              filteredOrders={filteredOrders}
              formatCurrency={formatCurrency}
              handleDownloadReceipt={handleDownloadReceipt}
              handleTabChange={handleTabChange}
              onCancelOrder={handleCancelOrder}
            />
          )}
          {activeTab === 'wishlist' && (
            <WishlistTab
              wishlistItems={wishlistItems}
              onMoveToCart={handleMoveToCart}
              onRemoveFromWishlist={handleToggleWishlist}
              formatCurrency={formatCurrency}
              handleTabChange={handleTabChange}
            />
          )}
          {activeTab === 'account' && (
            <AccountTab
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
              walletBalance={walletBalance}
              handleTopUp={handleTopUp}
              walletTransactions={walletTransactions}
              formatCurrency={formatCurrency}
              showToast={showToast}
            />
          )}
        </div>
      </main>

      {/* Details Overlay Modal */}
      <ProductDetailsModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        quantity={modalQuantity}
        onAdjustQuantity={adjustModalQuantity}
        onAddToCart={handleAddToCartFromModal}
        onBuyNow={handleBuyNow}
      />

      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} role="customer" />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerDashboard;
