import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-level-2 p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display font-bold text-primary text-2xl tracking-tight">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-2xl tracking-tight ml-1">Market</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-on-surface tracking-tight">Reset Password</h1>
          <p className="font-body text-on-surface-variant mt-2 font-medium">We'll send you instructions to reset your password.</p>
        </div>

        {!submitted ? (
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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

            <Button type="submit" variant="primary" size="lg" className="w-full mt-4 font-bold">
              Send Reset Link
            </Button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-4"
          >
            <div className="w-16 h-16 bg-secondary-container/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <p className="font-body font-bold text-lg text-on-surface">Check your email</p>
            <p className="font-body text-sm text-on-surface-variant mt-2 mb-8 leading-relaxed">
              We've sent a simulated password reset link to <strong className="text-on-surface">{email}</strong>.
            </p>
            <Button variant="ghost" size="md" href="/login" className="w-full font-bold">
              Back to Sign In
            </Button>
          </motion.div>
        )}

        <p className="font-body text-sm text-on-surface-variant font-medium text-center mt-10">
          Remembered your password? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
