import React from 'react';

const Badge = ({ children, variant = 'green', className = '' }) => {
  const baseClasses = 'text-xs font-medium font-body tracking-widest uppercase rounded-full px-4 py-1.5 inline-block';

  const variants = {
    green: 'bg-secondary text-accent',
    orange: 'bg-orange/10 text-orange',
    muted: 'bg-surface text-muted',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;
