import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const Login = () => {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:aspect-[16/9] min-h-[600px]"
      >
        {/* Left: Branding & Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <img src="/hero_farm.png" alt="" className="w-full h-full object-cover grayscale brightness-50" />
          </div>
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-1 group">
              <span className="font-display font-bold text-white text-3xl">Farm</span>
              <span className="font-display font-bold text-accent text-3xl">Connect</span>
            </Link>
            <h2 className="font-display font-bold text-4xl text-white mt-12 leading-tight">
              Fresh food<br />
              <span className="text-accent underline decoration-accent/30 underline-offset-8">to your doorstep.</span>
            </h2>
            <p className="font-body text-white/60 mt-6 leading-relaxed max-w-sm">
              Log in to access your dashboard, track your deliveries, and explore the freshest harvest in town.
            </p>
          </div>
          
          <div className="relative z-10">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-secondary flex items-center justify-center font-display font-bold text-primary text-[10px]">
                  {i === 4 ? '+1k' : 'User'}
                </div>
              ))}
            </div>
            <p className="font-body text-white/40 text-sm italic">"The most convenient way I’ve found to buy food this year." — Amara A.</p>
          </div>
        </div>

        {/* Right: Form Area */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="font-display font-bold text-3xl text-text">Welcome back.</h1>
            <p className="font-body text-muted mt-2">Enter your details to sign in.</p>

            <form className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-semibold text-sm text-text">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="w-full px-5 py-3.5 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="font-body font-semibold text-sm text-text">Password</label>
                  <a href="#" className="font-body text-xs text-accent hover:underline">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full px-5 py-3.5 rounded-xl border border-secondary bg-surface font-body text-sm outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted/50"
                />
              </div>

              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" className="w-4 h-4 accent-accent rounded" id="remember" />
                <label htmlFor="remember" className="font-body text-sm text-muted cursor-pointer select-none">Remember for 30 days</label>
              </div>

              <Button variant="primary" size="lg" className="w-full mt-2" href="/dashboard/customer">
                Sign In
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-secondary"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-muted font-body">or continue with</span></div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl border border-secondary bg-white hover:bg-bg transition-colors font-body text-sm font-semibold text-text shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent/20">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>

            <p className="font-body text-sm text-muted text-center mt-10">
              New to Farm Connect? <Link to="/signup" className="text-accent font-semibold hover:underline">Start Buying</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
