import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const Hero = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="hero" className="bg-background min-h-screen flex flex-col justify-center pt-18 relative overflow-hidden">
      {/* Background Organic Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-container/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[10s]"></div>
      <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none animate-pulse duration-[8s]"></div>

      <div 
        ref={ref}
        className="max-w-container-max mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-12 pb-24 md:pt-20 md:pb-32 w-full relative z-20 flex-1"
      >
        {/* LEFT CONTENT */}
        <div 
          className={`flex flex-col items-start transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="flex items-center gap-2 mb-4">
             <div className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-pulse"></div>
             <Badge variant="green" className="!tracking-normal !normal-case text-[13px] font-bold">Direct from 500+ Nigerian farms</Badge>
          </div>
          
          <h1 className="font-display font-bold text-[clamp(42px,6.5vw,84px)] leading-[1.02] tracking-tighter text-primary mt-2 mb-6">
            Fresh food,<br/>
            <span className="text-secondary-container bg-primary px-4 py-1.5 rounded-2xl inline-block -rotate-1 shadow-level-1 transform transition-transform hover:rotate-0 cursor-default">your budget,</span><br/>
            your terms.
          </h1>
          
          <p className="font-body font-medium text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-[520px] mb-10">
            Farmers Market brings the harvest directly to your doorstep. Buy what you need, at prices you can afford — no markups, no middlemen.
          </p>

          <div className="flex gap-4 flex-wrap w-full sm:w-auto mb-12">
            <Button variant="primary" size="lg" href="/signup" className="group !px-10">
              Start Buying Food
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Button>
            <Button variant="ghost" size="lg" href="#how-it-works">See How It Works</Button>
          </div>

          <div className="flex items-center gap-6 md:gap-10 flex-wrap w-full">
            <div className="group cursor-default">
              <span className="font-display font-bold text-3xl text-primary group-hover:text-secondary-container transition-colors">36+</span>
              <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mt-1">States Covered</p>
            </div>
            <div className="w-px h-10 bg-outline-variant/30 rotate-12"/>
            <div className="group cursor-default">
              <span className="font-display font-bold text-3xl text-primary group-hover:text-secondary-container transition-colors">500+</span>
              <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mt-1">Partner Farms</p>
            </div>
            <div className="w-px h-10 bg-outline-variant/30 -rotate-12"/>
            <div className="group cursor-default">
              <span className="font-display font-bold text-3xl text-primary group-hover:text-secondary-container transition-colors">0</span>
              <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mt-1">Middlemen</p>
            </div>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div 
          className={`flex flex-col relative w-full transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mt-12 lg:mt-0 max-w-lg mx-auto lg:max-w-none`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Main Card Container */}
          <div className="relative rounded-[2.5rem] bg-surface-container-highest p-3 shadow-level-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-white shadow-inner aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
              <img src="/hero_farm.png" alt="A vibrant harvest basket full of fresh Nigerian farm produce" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[2s]" />
            </div>

            {/* Floating UI 1: Order Pulse */}
            <div className="absolute -bottom-8 -left-4 md:-left-12 bg-surface-container-lowest rounded-2xl shadow-level-2 px-6 py-5 flex items-center gap-4 z-10 border border-outline-variant/30 animate-in fade-in slide-in-from-left-4 duration-1000 delay-700 fill-mode-both">
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-secondary-container animate-ping"></div>
              </div>
              <div>
                <p className="font-body font-bold text-sm text-on-surface">Order Delivered</p>
                <p className="font-body text-xs font-semibold text-on-surface-variant">Lagos Island · Just now</p>
              </div>
            </div>

            {/* Floating UI 2: Price Tag */}
            <div className="absolute -top-6 -right-4 md:-right-8 bg-primary rounded-2xl shadow-level-2 px-5 py-4 z-10 border border-white/10 rotate-3 animate-bounce-slow">
              <p className="font-display font-bold text-xl text-secondary-container">₦2,400</p>
              <p className="font-body text-xs font-bold text-white/60 mt-0.5">5kg Rice — your price</p>
            </div>
            
            {/* Floating UI 3: Trust Badge */}
            <div className="absolute bottom-1/2 -right-6 hidden md:flex w-14 h-14 rounded-full bg-secondary-container items-center justify-center shadow-level-2 border-4 border-background rotate-12 group/badge cursor-help">
               <svg className="w-7 h-7 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
               <div className="absolute opacity-0 group-hover/badge:opacity-100 transition-opacity bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md -top-8 whitespace-nowrap">Verified Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge Strip - Integrated smoother */}
      <div 
        className={`max-w-container-max mx-auto px-6 mb-20 relative z-30 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <div className="bg-surface-container-low/40 backdrop-blur-md rounded-[2.5rem] py-8 px-10 flex flex-wrap justify-center lg:justify-between items-center gap-y-10 gap-x-12 border border-outline-variant/20">
          <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.25em] w-full text-center lg:w-auto lg:text-left mb-2 lg:mb-0 opacity-60">Farmers Market Standard</p>
          
          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-secondary-container group-hover:text-primary transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
            <span className="font-display font-bold text-[13px] text-on-surface tracking-tight">Pesticide Free</span>
          </div>

          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-secondary-container group-hover:text-primary transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
            <span className="font-display font-bold text-[13px] text-on-surface tracking-tight">Daily Harvest</span>
          </div>

          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-secondary-container group-hover:text-primary transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div>
            <span className="font-display font-bold text-[13px] text-on-surface tracking-tight">Verified Farmers</span>
          </div>

          <div className="flex items-center gap-3.5 group cursor-default">
            <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:bg-secondary-container group-hover:text-primary transition-all duration-300"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg></div>
            <span className="font-display font-bold text-[13px] text-on-surface tracking-tight">NG Certified</span>
          </div>
        </div>
      </div>
      
      {/* Organic Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none translate-y-[1px]">
        <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-primary opacity-10"></path>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
