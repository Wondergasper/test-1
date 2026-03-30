import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Products from './sections/Products';
import Delivery from './sections/Delivery';
import CTA from './sections/CTA';

import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorised from './pages/Unauthorised';

// Fake auth state for demonstration
// Change role to 'customer' to test the Unauthorised guard
const mockUser = {
  isAuthenticated: true,
  role: 'admin',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AdminRoute = ({ children }) => {
  if (!mockUser.isAuthenticated) return <Navigate to="/login" />;
  if (mockUser.role !== 'admin') return <Unauthorised />;
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
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
