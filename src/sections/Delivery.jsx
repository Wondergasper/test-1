import React from 'react';
import Badge from '../components/ui/Badge';
import { useReveal } from '../hooks/useReveal';

const Delivery = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="delivery" className="bg-primary py-24 md:py-32 px-6 text-white overflow-hidden relative z-20">
      <div 
        ref={ref}
        className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
      >
        {/* LEFT CONTENT */}
        <div 
          className={`flex flex-col items-start transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <Badge variant="green" className="font-bold border border-white/10">Nationwide Supply Chain</Badge>
          <h2 className="font-display font-bold text-[clamp(32px,4.5vw,60px)] text-white mt-6 mb-8 leading-[1.02] tracking-tighter">
            We deliver to<br/>
            <span className="text-secondary-container">every state</span><br/>
            in Nigeria.
          </h2>
          <p className="font-body font-medium text-white/70 text-lg md:text-xl leading-relaxed max-w-[480px] mb-10">
            From Lagos to Maiduguri, Abuja to Calabar — Farmers Market's supply chain reaches you. Order by Wednesday, delivered by Friday.
          </p>

          <ul className="flex flex-col gap-6 w-full">
            <li className="flex items-start gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-container group-hover:text-primary transition-all">
                <svg className="w-5 h-5 text-secondary-container group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-body font-bold text-white text-lg tracking-tight">36 States Covered</p>
                <p className="font-body font-medium text-white/50 text-sm mt-1 leading-relaxed">Including FCT and all major urban centres across the country.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-container group-hover:text-primary transition-all">
                <svg className="w-5 h-5 text-secondary-container group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-body font-bold text-white text-lg tracking-tight">Farm-Fresh, Not Warehouse-Stored</p>
                <p className="font-body font-medium text-white/50 text-sm mt-1 leading-relaxed">Orders are packed and dispatched the same week they're harvested.</p>
              </div>
            </li>

            <li className="flex items-start gap-4 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary-container group-hover:text-primary transition-all">
                <svg className="w-5 h-5 text-secondary-container group-hover:text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <p className="font-body font-bold text-white text-lg tracking-tight">Real-Time Tracking</p>
                <p className="font-body font-medium text-white/50 text-sm mt-1 leading-relaxed">Know exactly where your order is from dispatch to your doorstep.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT VISUAL */}
        <div 
          className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mt-12 lg:mt-0`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="rounded-[2.5rem] bg-white/5 border border-white/10 p-4 md:p-6 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            <div className="w-full aspect-[4/3] md:aspect-square rounded-[2rem] bg-black/20 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
              <img src="/nigeria_map.png" alt="Map of Nigeria showing modern delivery supply chain network" loading="lazy" className="w-full h-full object-cover opacity-80 mix-blend-screen scale-110 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group/stat">
                <p className="font-display font-bold text-3xl text-secondary-container transition-transform group-hover/stat:scale-110 origin-left">36+</p>
                <p className="font-body text-xs font-bold text-white/40 uppercase tracking-widest mt-2">Delivery States</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group/stat">
                <p className="font-display font-bold text-3xl text-secondary-container transition-transform group-hover/stat:scale-110 origin-left">48hr</p>
                <p className="font-body text-xs font-bold text-white/40 uppercase tracking-widest mt-2">Max Wait Time</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group/stat">
                <p className="font-display font-bold text-3xl text-secondary-container transition-transform group-hover/stat:scale-110 origin-left">500+</p>
                <p className="font-body text-xs font-bold text-white/40 uppercase tracking-widest mt-2">Farms Connected</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group/stat">
                <p className="font-display font-bold text-3xl text-secondary-container transition-transform group-hover/stat:scale-110 origin-left">₦0</p>
                <p className="font-body text-xs font-bold text-white/40 uppercase tracking-widest mt-2">Signup Fees</p>
              </div>
            </div>
          </div>
          
          {/* Floating badge */}
          <div className="absolute -top-6 -left-6 hidden md:flex bg-secondary-container text-primary rounded-full px-5 py-2.5 font-display font-bold text-sm shadow-xl items-center gap-2 animate-bounce-slow border-4 border-primary">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             Active Logistics
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
