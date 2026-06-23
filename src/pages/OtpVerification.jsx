import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Get email and role from location state or fallback
  const email = location.state?.email || 'your email address';
  const role = location.state?.role || 'buyer';

  const simulatedCode = '1234';

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    // Move to next input if filled
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (event) => {
    event.preventDefault();
    const code = otp.join('');
    
    if (code.length < 4) {
      setError('Please enter all 4 digits.');
      return;
    }

    if (code !== simulatedCode) {
      setError('Incorrect verification code. Use simulated code 1234.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      // Set session in localStorage
      const sessionRole = role === 'farmer' ? 'vendor' : 'customer';
      const userSession = {
        isAuthenticated: true,
        role: sessionRole,
        email: email,
      };
      localStorage.setItem('currentUser', JSON.stringify(userSession));

      // Navigate based on role
      if (sessionRole === 'vendor') {
        navigate('/dashboard/vendor', { replace: true });
      } else {
        navigate('/dashboard/customer', { replace: true });
      }
    }, 1000);
  };

  const handleResend = () => {
    setOtp(['', '', '', '']);
    setError('');
    inputRefs[0].current?.focus();
    alert('Simulated verification code resent! Use code: 1234');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-secondary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-level-2 p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1 mb-6">
            <span className="font-display font-bold text-primary text-2xl tracking-tight">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-2xl tracking-tight ml-1">Market</span>
          </Link>
          <h1 className="font-display font-bold text-3xl text-on-surface tracking-tight">Verify Account</h1>
          <p className="font-body text-on-surface-variant mt-2 font-medium">
            We've sent a 4-digit code to <span className="text-on-surface font-semibold">{email}</span>.
          </p>
          <div className="mt-2 text-xs font-bold text-primary bg-primary/5 py-1 px-3 rounded-full inline-block">
            Simulated Verification Code: <span className="underline">{simulatedCode}</span>
          </div>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-16 text-center font-display font-bold text-2xl border border-outline-variant bg-white rounded-2xl outline-none focus:ring-2 focus:ring-secondary-container/20 focus:border-primary transition-all text-on-surface"
              />
            ))}
          </div>

          {error && (
            <p className="text-error font-body text-xs font-bold text-center mt-2 animate-pulse">{error}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2 font-bold"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify & Continue'}
          </Button>
        </form>

        <div className="text-center mt-8">
          <p className="font-body text-sm text-on-surface-variant font-semibold">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              type="button"
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Resend Code
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
