import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const VendorLogin = () => {
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

    // Set mock user session in localStorage for Vendor
    const userSession = {
      isAuthenticated: true,
      role: 'vendor',
      email: email,
    };
    localStorage.setItem('currentUser', JSON.stringify(userSession));

    // Redirect to Vendor dashboard
    navigate('/dashboard/vendor');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-surface-container-lowest rounded-3xl shadow-level-2 grid grid-cols-1 md:grid-cols-2 min-h-[600px] relative z-10"
      >
        {/* Left: Branding & Visual */}
        <div className="hidden md:flex flex-col justify-between p-10 lg:p-12 bg-secondary text-primary relative overflow-hidden rounded-l-3xl">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <img src="/hero_farm.png" alt="" className="w-full h-full object-cover grayscale brightness-50" />
          </div>
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-1 group">
              <span className="font-display font-bold text-primary text-3xl tracking-tight">Farmers</span>
              <span className="font-display font-bold text-primary/80 text-3xl tracking-tight ml-2">Market</span>
            </Link>
            <h2 className="font-display font-bold text-4xl text-primary mt-12 leading-tight tracking-tight">
              Manage your harvest.<br />
              <span className="underline decoration-primary/30 underline-offset-8">Direct to customers.</span>
            </h2>
            <p className="font-body font-medium text-primary/70 mt-6 leading-relaxed max-w-sm">
              Log in to your Vendor Portal to update stock levels, fulfill local orders, track payouts, and connect with urban buyers.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-secondary bg-primary flex items-center justify-center font-display font-bold text-secondary text-[10px]">
                  Farmer
                </div>
              ))}
            </div>
            <p className="font-body text-primary/60 text-sm italic font-medium">"Selling direct has doubled our margins this season." — Baba G., Ogun State</p>
          </div>
        </div>

        {/* Right: Form Area */}
        <div className="p-8 md:p-10 lg:p-14 flex flex-col justify-center overflow-y-auto no-scrollbar">
          <div className="max-w-sm mx-auto w-full py-4">
            <h1 className="font-display font-bold text-3xl text-on-surface tracking-tight">Vendor Login</h1>
            <p className="font-body text-on-surface-variant mt-2 font-medium">Access your Farm operations center.</p>

            <form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Vendor Email</label>
                <input 
                  type="email" 
                  required
                  placeholder="vendor@example.com" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface">Password</label>
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

              <div className="mt-2 text-xs font-bold text-primary bg-primary/5 py-2 px-4 rounded-xl text-center leading-relaxed">
                Demo Credentials: <span className="underline">vendor@example.com</span> / <span className="underline">password</span>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2 font-bold">
                Log In as Vendor
              </Button>
            </form>

            <p className="font-body text-sm text-on-surface-variant font-medium text-center mt-10">
              Want to sell on Farmers Market? <Link to="/signup" state={{ role: 'farmer' }} className="text-primary font-bold hover:underline">Register as Vendor</Link>
            </p>
            <p className="font-body text-sm text-on-surface-variant font-medium text-center mt-2">
              Not a vendor? <Link to="/login" className="text-primary font-bold hover:underline">Customer Login</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorLogin;
