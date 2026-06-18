import React, { useEffect } from 'react';

const ToastNotification = ({ message, variant = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const variants = {
    success: 'bg-primary border-secondary-container',
    error: 'bg-error border-error-container',
    warning: 'bg-secondary text-white border-secondary-fixed-dim'
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[200] px-4 py-3 shadow-card rounded-xl border-l-4 text-white font-body text-sm flex justify-between items-start gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 ${variants[variant] || variants.success}`}>
      <p className="flex-1 mt-0.5 leading-snug">{message}</p>
      <button onClick={onClose} className="text-white/60 hover:text-white mt-0.5 outline-none focus-visible:ring-2 rounded-sm shrink-0">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  );
};

export default ToastNotification;
