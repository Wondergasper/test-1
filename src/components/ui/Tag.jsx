import React from 'react';

const Tag = ({ children, className = '' }) => {
  return (
    <span className={`bg-secondary text-primary text-xs font-body font-medium px-3 py-1 rounded-md inline-block ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
