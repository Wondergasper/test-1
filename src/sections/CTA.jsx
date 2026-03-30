import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useReveal } from '../hooks/useReveal';

const CTA = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="cta" className="bg-bg py-20 md:py-24 px-6 min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center">
      <div 
        ref={ref}
        className={`max-w-3xl mx-auto text-center w-full transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="flex justify-center flex-col items-center">
          <Badge variant="green">Join Farm Connect</Badge>
          <h2 className="font-display font-bold text-[clamp(36px,5vw,68px)] text-text mt-4 mb-6 leading-[1.08]">
            Stop overpaying<br/>for <span className="text-accent">food.</span>
          </h2>
          <p className="font-body font-light text-lg text-muted leading-relaxed max-w-[440px] mx-auto mb-10">
            Buy fresh farm produce at fair prices, in the quantities that work for you. Delivered anywhere in Nigeria.
          </p>
          <div className="flex justify-center gap-4 flex-wrap w-full">
            <Button variant="primary" size="lg" href="/signup">Create Free Account</Button>
            <Button variant="ghost" size="lg" href="#how-it-works">Learn More</Button>
          </div>
          <p className="font-body font-light text-sm text-muted mt-6">No subscription required. Pay only for what you order.</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
