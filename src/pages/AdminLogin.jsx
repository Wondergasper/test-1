import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Set mock user session in localStorage for Admin
    const userSession = {
      isAuthenticated: true,
      role: 'admin',
      email: email,
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));

    // Redirect to Admin dashboard
    navigate('/dashboard/admin');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-outline-variant/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-level-2 p-10 relative z-10 border border-outline-variant/30"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display font-bold text-primary text-2xl tracking-tight">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-2xl tracking-tight ml-1">Market</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-on-surface tracking-tight">Admin Console</h1>
          <p className="font-body text-on-surface-variant mt-2 font-medium">System Operator Access Link.</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Operator Email</label>
            <input 
              type="email" 
              required
              placeholder="admin@farmersmarket.ng" 
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Security Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          {error && (
            <p className="text-error font-body text-xs font-bold text-center mt-1">{error}</p>
          )}

          <div className="text-xs font-bold text-on-surface-variant bg-surface-container p-3 rounded-xl text-center leading-relaxed border border-outline-variant/30">
            Operator Credentials: <span className="underline">admin@example.com</span> / <span className="underline">password</span>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-2 font-bold !bg-primary !text-white hover:!bg-primary/95">
            Authenticate Operator
          </Button>
        </form>

        <p className="font-body text-sm text-on-surface-variant font-medium text-center mt-10">
          Not an admin? <Link to="/login" className="text-primary font-bold hover:underline">Customer Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
