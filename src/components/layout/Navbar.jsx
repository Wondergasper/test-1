import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 w-full h-18 px-6 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-soft border-b border-secondary'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full h-full py-4">
          <Link to="/" className="flex items-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md outline-none">
            <span className="font-display font-bold text-primary text-2xl tracking-tight">Farm</span>
            <span className="font-display font-bold text-accent text-2xl tracking-tight">Connect</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="font-body text-sm font-medium text-muted hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm outline-none">How It Works</a>
            <a href="#products" className="font-body text-sm font-medium text-muted hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm outline-none">Products</a>
            <a href="#delivery" className="font-body text-sm font-medium text-muted hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm outline-none">Delivery</a>
            <a href="#pricing" className="font-body text-sm font-medium text-muted hover:text-primary transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm outline-none">Get Started</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="/login">Log In</Button>
            <Button variant="primary" size="sm" href="/signup">Start Buying</Button>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] justify-center items-center h-11 w-11 focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-md"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-[22px] h-[1.5px] bg-primary block"></span>
            <span className="w-[22px] h-[1.5px] bg-primary block"></span>
            <span className="w-[22px] h-[1.5px] bg-primary block"></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`md:hidden fixed inset-y-0 right-0 w-4/5 max-w-sm top-0 bg-white z-40 flex flex-col gap-6 px-6 py-10 transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <span className="font-display font-bold text-primary text-xl">Farm</span>
            <span className="font-display font-bold text-accent text-xl">Connect</span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="text-muted p-2 rounded-md" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="font-body text-lg text-primary font-medium focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-sm">How It Works</a>
        <a href="#products" onClick={() => setMenuOpen(false)} className="font-body text-lg text-primary font-medium focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-sm">Products</a>
        <a href="#delivery" onClick={() => setMenuOpen(false)} className="font-body text-lg text-primary font-medium focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-sm">Delivery</a>
        <a href="#pricing" onClick={() => setMenuOpen(false)} className="font-body text-lg text-primary font-medium focus-visible:ring-2 focus-visible:ring-accent outline-none rounded-sm">Get Started</a>
        <div className="mt-4 flex flex-col gap-4">
          <Button variant="ghost" size="md" href="/login" onClick={() => setMenuOpen(false)}>Log In</Button>
          <Button variant="primary" size="md" href="/signup" onClick={() => setMenuOpen(false)}>Start Buying</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
