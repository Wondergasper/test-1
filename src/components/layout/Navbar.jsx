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
            ? 'bg-primary/95 backdrop-blur-md shadow-level-1 border-b border-white/10'
            : 'bg-primary'
        }`}
      >
        <div className="max-w-container-max mx-auto flex items-center justify-between w-full h-full py-4">
          <Link to="/" className="flex items-center focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded-md outline-none group active:scale-95 transition-transform duration-200">
            <span className="font-display font-bold text-white text-2xl tracking-tight transition-colors group-hover:text-secondary-container">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-2xl tracking-tight ml-1 group-hover:text-white transition-colors">Market</span>
          </Link>

          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="font-body text-sm font-bold text-white/70 hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded-sm outline-none relative group/link py-1">
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-container transition-all duration-300 group-hover/link:w-full"></span>
            </a>
            <a href="#products" className="font-body text-sm font-bold text-white/70 hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded-sm outline-none relative group/link py-1">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-container transition-all duration-300 group-hover/link:w-full"></span>
            </a>
            <a href="#delivery" className="font-body text-sm font-bold text-white/70 hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded-sm outline-none relative group/link py-1">
              Delivery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-container transition-all duration-300 group-hover/link:w-full"></span>
            </a>
            <a href="#pricing" className="font-body text-sm font-bold text-white/70 hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 rounded-sm outline-none relative group/link py-1">
              Get Started
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary-container transition-all duration-300 group-hover/link:w-full"></span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" href="/login" className="!text-white !border-white/20 hover:!bg-white/10">Log In</Button>
            <Button variant="primary" size="sm" href="/signup">Start Buying</Button>
          </div>

          <button
            className="md:hidden relative flex flex-col gap-1.5 justify-center items-center h-10 w-10 focus-visible:ring-2 focus-visible:ring-secondary-container outline-none rounded-md group z-50"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Simplified Mobile Sidebar Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/60 z-[55] transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div
        className={`md:hidden fixed inset-y-0 right-0 w-[75%] max-w-xs top-0 bg-primary z-[60] flex flex-col px-8 py-12 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center mb-12">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center">
            <span className="font-display font-bold text-white text-xl">Farmers</span>
            <span className="font-display font-bold text-secondary-container text-xl ml-1">Market</span>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-6">
          {[
            { id: 'how-it-works', label: 'How It Works' },
            { id: 'products', label: 'Products' },
            { id: 'delivery', label: 'Logistics' },
            { id: 'pricing', label: 'Get Started' },
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={() => setMenuOpen(false)} 
              className="font-body text-lg text-white/80 font-bold hover:text-secondary-container transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <Button variant="ghost" size="md" href="/login" onClick={() => setMenuOpen(false)} className="!text-white !border-white/20 w-full">Log In</Button>
          <Button variant="primary" size="md" href="/signup" onClick={() => setMenuOpen(false)} className="w-full">Start Buying</Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
