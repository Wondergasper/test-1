import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const CTA = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="cta" className="bg-primary py-24 md:py-32 px-6 min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div 
        ref={ref}
        className={`max-w-4xl mx-auto text-center w-full relative z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex justify-center flex-col items-center">
          <Badge variant="green" className="font-bold border border-white/10 mb-6">Get Started Today</Badge>
          <h2 className="font-display font-bold text-[clamp(36px,5.5vw,72px)] text-white mt-4 mb-8 leading-[1.02] tracking-tighter">
            Stop overpaying<br/>for <span className="text-secondary-container underline decoration-secondary-container/20 underline-offset-8">fresh food.</span>
          </h2>
          <p className="font-body font-medium text-lg md:text-xl text-white/80 leading-relaxed max-w-[540px] mx-auto mb-12">
            Join thousands of Nigerian households buying fresh farm produce at fair prices. Delivered exactly when you need it.
          </p>
          <div className="flex justify-center gap-4 flex-wrap w-full">
            <Button variant="primary" size="lg" href="/signup" className="!px-12 font-bold shadow-xl hover:shadow-secondary-container/20">Create Free Account</Button>
            <button className="inline-flex items-center justify-center font-body border-2 border-white/20 text-white font-bold rounded-full px-10 py-4 min-h-[44px] text-lg hover:bg-white/10 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 cursor-pointer group">
              Learn More
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          <p className="font-body font-bold text-xs text-white/40 mt-10 uppercase tracking-[0.2em]">No subscription required · Pay on demand</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
