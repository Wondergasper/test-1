import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const HowItWorks = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="how-it-works" className="bg-secondary py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        <div 
          className={`flex flex-col items-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Badge variant="muted">How It Works</Badge>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-text mt-3 mb-4 text-center">
            Simple. Transparent.<br/>Affordable.
          </h2>
          <p className="font-body font-light text-lg text-muted text-center max-w-[500px] mx-auto">
            No complicated memberships. No hidden fees. Just food, delivered your way.
          </p>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div 
            className={`bg-white rounded-2xl p-6 md:p-8 shadow-soft relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '80ms' }}
          >
            <span className="absolute top-4 right-4 md:top-6 md:right-6 font-display font-bold text-[64px] md:text-[80px] leading-none text-secondary select-none text-opacity-50" aria-hidden="true">1</span>
            <svg className="w-8 h-8 stroke-accent mb-4 relative z-10" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <h3 className="font-display font-bold text-xl text-text mt-4 mb-2 relative z-10">Browse & Choose</h3>
            <p className="font-body font-light text-muted text-[15px] leading-relaxed relative z-10">
              Pick from fresh farm produce. Set your own quantity — buy 1kg or 50kg, whatever fits your budget today.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            className={`bg-white rounded-2xl p-6 md:p-8 shadow-soft relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '160ms' }}
          >
            <span className="absolute top-4 right-4 md:top-6 md:right-6 font-display font-bold text-[64px] md:text-[80px] leading-none text-secondary select-none text-opacity-50" aria-hidden="true">2</span>
            <svg className="w-8 h-8 stroke-accent mb-4 relative z-10" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
            <h3 className="font-display font-bold text-xl text-text mt-4 mb-2 relative z-10">Pay Your Way</h3>
            <p className="font-body font-light text-muted text-[15px] leading-relaxed relative z-10">
              Pay for exactly what you order. No subscriptions, no minimum order. Full price transparency before checkout.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            className={`bg-white rounded-2xl p-6 md:p-8 shadow-soft relative overflow-hidden transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '240ms' }}
          >
            <span className="absolute top-4 right-4 md:top-6 md:right-6 font-display font-bold text-[64px] md:text-[80px] leading-none text-secondary select-none text-opacity-50" aria-hidden="true">3</span>
            <svg className="w-8 h-8 stroke-accent mb-4 relative z-10" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <h3 className="font-display font-bold text-xl text-text mt-4 mb-2 relative z-10">Delivered Nationwide</h3>
            <p className="font-body font-light text-muted text-[15px] leading-relaxed relative z-10">
              We handle the supply chain end to end. Your order goes from farm to your door — anywhere in Nigeria.
            </p>
          </div>
        </div>

        <div 
          className={`mt-12 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '320ms' }}
        >
          <Button variant="accent" size="md">Start Your First Order</Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
