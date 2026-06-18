import React from 'react';

const Tag = ({ children, className = '' }) => {
  return (
    <span className={`bg-surface-container text-on-surface-variant border border-outline-variant text-[10px] font-body font-semibold px-2 py-0.5 rounded-sm inline-block uppercase tracking-tight ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
