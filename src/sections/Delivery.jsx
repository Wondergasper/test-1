import React from 'react';
import Badge from '../components/ui/Badge';
import { useReveal } from '../hooks/useReveal';

const Delivery = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="delivery" className="bg-primary py-20 md:py-32 px-6 text-white overflow-hidden">
      <div 
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
      >
        {/* LEFT */}
        <div 
          className={`flex flex-col items-start transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <Badge variant="orange">Nationwide Delivery</Badge>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-white mt-4 mb-6 leading-[1.1]">
            We deliver to<br/>
            <span className="text-accent">every state</span><br/>
            in Nigeria.
          </h2>
          <p className="font-body font-light text-white/70 text-lg leading-relaxed max-w-[440px] mb-8">
            From Lagos to Maiduguri, Abuja to Calabar — Farm Connect's supply chain reaches you. Order by Wednesday, delivered by Friday.
          </p>

          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-accent" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>
                <p className="font-body font-medium text-white text-[15px]">36 States Covered</p>
                <p className="font-body font-light text-white/60 text-sm mt-0.5">Including FCT and all major urban centres</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-accent" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>
                <p className="font-body font-medium text-white text-[15px]">Farm-fresh, not warehouse-stored</p>
                <p className="font-body font-light text-white/60 text-sm mt-0.5">Orders packed same week they're harvested</p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5 stroke-accent" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <div>
                <p className="font-body font-medium text-white text-[15px]">Real-time tracking</p>
                <p className="font-body font-light text-white/60 text-sm mt-0.5">Know where your order is from dispatch to doorstep</p>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT */}
        <div 
          className={`rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8 backdrop-blur-sm transition-all duration-700 ease-out w-full max-w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '160ms' }}
        >
          <div className="w-full aspect-[4/3] md:aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src="/nigeria_map.png" alt="Map of Nigeria showing modern delivery supply chain network" loading="lazy" className="w-full h-full object-cover opacity-90 mix-blend-screen" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/8 rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-accent">36+</p>
              <p className="font-body text-sm font-light text-white/60 mt-1">Delivery States</p>
            </div>
            <div className="bg-white/8 rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-accent">48hr</p>
              <p className="font-body text-sm font-light text-white/60 mt-1">Delivery Time</p>
            </div>
            <div className="bg-white/8 rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-accent">500+</p>
              <p className="font-body text-sm font-light text-white/60 mt-1">Partner Farms</p>
            </div>
            <div className="bg-white/8 rounded-xl p-4">
              <p className="font-display font-bold text-2xl text-accent">₦0</p>
              <p className="font-body text-sm font-light text-white/60 mt-1">Hidden Fees</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
