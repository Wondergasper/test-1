import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const Hero = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="hero" className="bg-bg min-h-screen flex items-center pt-18">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center py-20 md:py-24 w-full"
      >
        {/* LEFT */}
        <div 
          className={`flex flex-col items-start transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <Badge variant="green">Farm to Doorstep — No Middlemen</Badge>
          <h1 className="font-display font-bold text-[clamp(42px,6vw,80px)] leading-[1.08] text-text mt-4 mb-6">
            Fresh food,<br/>
            <span className="text-accent">your budget,</span><br/>
            your terms.
          </h1>
          <p className="font-body font-light text-lg text-muted leading-relaxed max-w-[480px] mb-8">
            Farm Connect sources directly from farms and delivers to your door. Buy exactly what you can afford — no fixed boxes, no markups, no middlemen.
          </p>
          <div className="flex gap-4 flex-wrap w-full">
            <Button variant="primary" size="lg" href="/signup">Start Buying Food</Button>
            <Button variant="ghost" size="lg" href="#how-it-works">See How It Works</Button>
          </div>
          <div className="mt-10 flex items-center gap-6 md:gap-8 flex-wrap w-full">
            <div>
              <span className="font-display font-bold text-2xl text-primary">36+</span>
              <p className="font-body text-sm font-medium text-muted mt-0.5">States Covered</p>
            </div>
            <div className="w-px h-10 bg-secondary"/>
            <div>
              <span className="font-display font-bold text-2xl text-primary">500+</span>
              <p className="font-body text-sm font-medium text-muted mt-0.5">Partner Farms</p>
            </div>
            <div className="w-px h-10 bg-secondary"/>
            <div>
              <span className="font-display font-bold text-2xl text-primary">0</span>
              <p className="font-body text-sm font-medium text-muted mt-0.5">Middlemen</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div 
          className={`flex flex-col relative rounded-[32px] bg-surface shadow-card overflow-visible aspect-[4/5] md:aspect-auto md:h-[560px] w-full transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} mt-8 md:mt-0`}
          style={{ transitionDelay: '160ms' }}
        >
          <div className="w-full h-full rounded-[32px] overflow-hidden bg-surface shadow-inner">
            <img src="/hero_farm.png" alt="A vibrant harvest basket full of fresh Nigerian farm produce" className="w-full h-full object-cover" />
          </div>

          {/* Floating card 1 */}
          <div className="hidden min-[380px]:flex absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card px-5 py-4 items-center gap-3 z-10 w-auto">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse flex-shrink-0"/>
            <div>
              <p className="font-body font-medium text-sm text-text">Order Delivered</p>
              <p className="font-body text-xs font-light text-muted">Lagos Island · Just now</p>
            </div>
          </div>

          {/* Floating card 2 */}
          <div className="hidden min-[380px]:block absolute -top-4 -right-4 bg-white rounded-xl shadow-soft px-4 py-3 z-10">
            <p className="font-display font-bold text-lg text-accent">₦2,400</p>
            <p className="font-body text-xs font-light text-muted">5kg Rice — your price</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
