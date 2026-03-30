import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-body focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none';
  
  const variants = {
    primary: 'bg-primary text-white font-medium rounded-full border-none hover:bg-[#162d1e] hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200',
    ghost: 'bg-transparent border-2 border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-200',
    accent: 'bg-accent text-white rounded-full font-medium hover:bg-[#2d9458] hover:-translate-y-0.5 hover:shadow-soft transition-all duration-200',
  };

  const sizes = {
    sm: 'px-5 py-2 min-h-[44px] text-sm',
    md: 'px-7 py-3 min-h-[44px] text-base',
    lg: 'px-9 py-4 min-h-[44px] text-lg',
  };
  
  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} className={classes} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
