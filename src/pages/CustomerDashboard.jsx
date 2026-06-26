import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashNavbar from '../components/dashboard/DashNavbar';
import BottomNav from '../components/dashboard/BottomNav';
import CartDrawer from '../components/dashboard/CartDrawer';
import ToastNotification from '../components/dashboard/ToastNotification';
import ProductDetailsModal from '../components/dashboard/ProductDetailsModal';
import HomeTab from '../components/dashboard/HomeTab';
import BrowseTab from '../components/dashboard/BrowseTab';
import OrdersTab from '../components/dashboard/OrdersTab';
import WishlistTab from '../components/dashboard/WishlistTab';
import AccountTab from '../components/dashboard/AccountTab';
import { useCustomer } from '../context/CustomerContext';

const CustomerDashboard = () => {
  const {
    activeTab,
    isCollapsed,
    setIsCollapsed,
    isCartOpen,
    setIsCartOpen,
    toast,
    setToast,
    showContent,
    cartCount,
    notifications,
    handleMarkNotificationsAllRead,
    handleTabChange,
  } = useCustomer();

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
        }}
      />
      
      <CartDrawer />

      <main className={`transition-all duration-300 ${isCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'} px-4 py-6 md:px-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-8`}>
        <div className={`transition-opacity duration-200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'browse' && <BrowseTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'wishlist' && <WishlistTab />}
          {activeTab === 'account' && <AccountTab />}
        </div>
      </main>

      <ProductDetailsModal />
      <BottomNav activeTab={activeTab || 'home'} onChangeTab={handleTabChange} role="customer" />
      {toast && <ToastNotification message={toast.message} variant={toast.variant} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CustomerDashboard;
