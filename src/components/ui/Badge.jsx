import React from 'react';

const Badge = ({ children, variant = 'green', className = '' }) => {
  const baseClasses = 'text-xs font-semibold font-body tracking-wider uppercase rounded-full px-4 py-1.5 inline-block';

  const variants = {
    green: 'bg-primary-fixed text-on-primary-fixed',
    error: 'bg-error-container text-on-error-container',
    muted: 'bg-surface-variant text-on-surface-variant',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
