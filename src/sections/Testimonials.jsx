import React from 'react';
import { useReveal } from '../hooks/useReveal';
import Badge from '../components/ui/Badge';

const TESTIMONIALS_DATA = [
  {
    quote: "Farmers Market has completely changed how we source food for our family. The quality is unmatched and the prices are actually fair.",
    author: "Amara Adebayo",
    role: "Lekki Resident",
    initials: "AA"
  },
  {
    quote: "As a small-scale farmer, finding a direct route to urban consumers was tough. This platform gives me the visibility I need to grow.",
    author: "Tunde Bakare",
    role: "Oyo State Farmer",
    initials: "TB"
  },
  {
    quote: "I love that I can buy exactly what I need. No fixed boxes, just fresh produce delivered exactly when they say it will be.",
    author: "Chioma Okoro",
    role: "Abuja Household",
    initials: "CO"
  }
];

export const Testimonials = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="testimonials" className="bg-background py-20 md:py-32 px-6">
      <div className="max-w-container-max mx-auto" ref={ref}>
        <div 
          className={`flex flex-col items-center text-center mb-12 md:mb-16 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Badge variant="muted">Social Proof</Badge>
          <h2 className="font-display font-bold text-[clamp(32px,4vw,56px)] text-on-surface mt-3 mb-4 tracking-tight leading-[1.05]">
            Trusted by households<br/>and farmers alike.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <div 
              key={idx}
              className={`bg-surface-container-lowest p-8 rounded-xl shadow-level-1 border border-outline-variant/30 flex flex-col transition-all duration-700 ease-out hover:shadow-level-2 hover:-translate-y-2 hover:scale-[1.01] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 150 + 200}ms` }}
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-5 h-5 text-secondary-container fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="font-body font-medium text-on-surface text-lg leading-relaxed mb-8 flex-1">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/30">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center font-display font-bold text-primary text-sm shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="font-body font-bold text-on-surface text-sm">{t.author}</p>
                  <p className="font-body font-medium text-on-surface-variant text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
