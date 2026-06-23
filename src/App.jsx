import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Products from './sections/Products';
import Delivery from './sections/Delivery';
import Testimonials from './sections/Testimonials.jsx';
import CTA from './sections/CTA';

import CustomerDashboard from './pages/CustomerDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import VendorLogin from './pages/VendorLogin';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import Unauthorised from './pages/Unauthorised';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';

// Check currentUser session dynamically
const getSession = () => {
  const sessionStr = localStorage.getItem('currentUser');
  if (!sessionStr) {
    return { isAuthenticated: false, role: null, email: '' };
  }
  try {
    return JSON.parse(sessionStr);
  } catch (e) {
    return { isAuthenticated: false, role: null, email: '' };
  }
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AdminRoute = ({ children }) => {
  const session = getSession();
  if (!session.isAuthenticated) return <Navigate to="/admin-login" />;
  if (session.role !== 'admin') return <Unauthorised />;
  return children;
};

const VendorRoute = ({ children }) => {
  const session = getSession();
  if (!session.isAuthenticated) return <Navigate to="/vendor-login" />;
  if (session.role !== 'vendor') return <Unauthorised />;
  return children;
};

const CustomerRoute = ({ children }) => {
  const session = getSession();
  if (!session.isAuthenticated) return <Navigate to="/login" />;
  if (session.role !== 'customer') return <Unauthorised />;
  return children;
};

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <HowItWorks />
      <Products />
      <Delivery />
      <Testimonials />
      <CTA />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route
          path="/dashboard/customer/*"
          element={
            <CustomerRoute>
              <CustomerDashboard />
            </CustomerRoute>
          }
        />
        <Route
          path="/dashboard/vendor/*"
          element={
            <VendorRoute>
              <VendorDashboard />
            </VendorRoute>
          }
        />
        <Route
          path="/dashboard/admin/*"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/unauthorised" element={<Unauthorised />} />
      </Routes>
    </Router>
  );
}

export default App;
