import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const HowItWorks = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="how-it-works" className="bg-surface-container-low py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-container-max mx-auto w-full" ref={ref}>
        <div 
          className={`flex flex-col items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Badge variant="muted" className="font-bold">Simple Process</Badge>
          <h2 className="font-display font-bold text-[clamp(32px,4.5vw,60px)] text-on-surface mt-4 mb-6 text-center tracking-tighter leading-[1.02]">
            Simple. Transparent.<br/>Affordable.
          </h2>
          <p className="font-body font-medium text-lg md:text-xl text-on-surface-variant text-center max-w-[540px] mx-auto mb-16 md:mb-20">
            No complicated memberships. No hidden fees. Just fresh food, delivered your way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {/* Step 1 */}
          <div 
            className={`bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-level-1 relative overflow-hidden transition-all duration-1000 ease-out group hover:shadow-level-2 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] transition-all duration-500 group-hover:bg-primary/10"></div>
            <span className="absolute top-6 right-8 font-display font-bold text-7xl md:text-8xl leading-none text-primary/10 select-none group-hover:text-primary/20 transition-colors" aria-hidden="true">1</span>
            
            <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-primary mb-8 group-hover:bg-secondary-container group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            
            <h3 className="font-display font-bold text-2xl text-on-surface mb-4 tracking-tight">Browse &amp; Choose</h3>
            <p className="font-body font-medium text-on-surface-variant text-base leading-relaxed">
              Pick from fresh farm produce. Set your own quantity — buy 1kg or 50kg, whatever fits your budget today.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            className={`bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-level-1 relative overflow-hidden transition-all duration-1000 ease-out group hover:shadow-level-2 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] transition-all duration-500 group-hover:bg-primary/10"></div>
            <span className="absolute top-6 right-8 font-display font-bold text-7xl md:text-8xl leading-none text-primary/10 select-none group-hover:text-primary/20 transition-colors" aria-hidden="true">2</span>
            
            <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-primary mb-8 group-hover:bg-secondary-container group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            
            <h3 className="font-display font-bold text-2xl text-on-surface mb-4 tracking-tight">Pay Your Way</h3>
            <p className="font-body font-medium text-on-surface-variant text-base leading-relaxed">
              Pay for exactly what you order. No subscriptions, no minimum order. Full price transparency before checkout.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            className={`bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-level-1 relative overflow-hidden transition-all duration-1000 ease-out group hover:shadow-level-2 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '450ms' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] transition-all duration-500 group-hover:bg-primary/10"></div>
            <span className="absolute top-6 right-8 font-display font-bold text-7xl md:text-8xl leading-none text-primary/10 select-none group-hover:text-primary/20 transition-colors" aria-hidden="true">3</span>
            
            <div className="w-14 h-14 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-primary mb-8 group-hover:bg-secondary-container group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            
            <h3 className="font-display font-bold text-2xl text-on-surface mb-4 tracking-tight">Delivered Nationwide</h3>
            <p className="font-body font-medium text-on-surface-variant text-base leading-relaxed">
              We handle the supply chain end to end. Your order goes from farm to your door — anywhere in Nigeria.
            </p>
          </div>
        </div>

        <div 
          className={`mt-16 md:mt-20 text-center transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Button variant="primary" size="lg" href="/signup" className="!px-12">Start Your First Order</Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
