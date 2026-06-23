import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultRole = location.state?.role || 'buyer';
  const [role, setRole] = useState(defaultRole);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !firstName || !lastName || !password) return;
    // Redirect to OTP verification with user details
    navigate('/otp-verification', { state: { email, role } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[6000px] bg-secondary-container/5 rounded-full blur-3xl pointer-events-none rotate-45"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-level-2 p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display font-bold text-primary text-2xl tracking-tight">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-2xl tracking-tight ml-1">Market</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-on-surface tracking-tight">Start your journey.</h1>
          <p className="font-body text-on-surface-variant mt-2 font-medium">Connecting farms to urban Nigerian tables.</p>
        </div>

        {/* Role Toggle */}
        <div className="grid grid-cols-2 p-1 bg-surface-container rounded-2xl mb-8 relative">
          <div 
            className="absolute top-1 bottom-1 bg-surface-container-lowest rounded-xl shadow-sm transition-transform duration-300 ease-out"
            style={{ 
              width: 'calc(50% - 4px)',
              transform: role === 'buyer' ? 'translateX(0)' : 'translateX(calc(100% + 4px))'
            }}
          ></div>
          <button 
            type="button"
            onClick={() => setRole('buyer')}
            className={`relative z-10 py-3.5 font-body text-sm font-bold transition-colors duration-200 cursor-pointer ${role === 'buyer' ? 'text-on-surface' : 'text-on-surface-variant'}`}
          >
            I want to Buy
          </button>
          <button 
            type="button"
            onClick={() => setRole('farmer')}
            className={`relative z-10 py-3.5 font-body text-sm font-bold transition-colors duration-200 cursor-pointer ${role === 'farmer' ? 'text-on-surface' : 'text-on-surface-variant'}`}
          >
            I am a Farmer
          </button>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">First Name</label>
              <input 
                type="text" 
                required 
                placeholder="Amara" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50" 
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">Last Name</label>
              <input 
                type="text" 
                required 
                placeholder="Bayo" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50" 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Email Address</label>
            <input 
              type="email" 
              required 
              placeholder="amara@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50" 
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Password</label>
            <input 
              type="password" 
              required 
              placeholder="Create a strong password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-white font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all placeholder:text-on-surface-variant/50" 
            />
          </div>

          <p className="font-body text-xs text-on-surface-variant font-medium leading-relaxed mt-2 italic px-2">
            By signing up, you agree to our <span className="text-primary font-bold underline cursor-pointer">Terms</span> and that you are located in Nigeria.
          </p>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold">
            Create Account
          </Button>
        </form>

        <p className="font-body text-sm text-on-surface-variant font-medium text-center mt-10">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
