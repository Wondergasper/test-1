import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-text py-16 md:py-20 px-6 min-h-[280px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Col 1 */}
          <div>
            <div className="flex items-center">
              <span className="font-display font-bold text-white text-2xl">Farm</span>
              <span className="font-display font-bold text-accent text-2xl">Connect</span>
            </div>
            <p className="font-body font-light text-white/50 text-sm leading-relaxed mt-3 max-w-[220px]">
              Direct from Nigerian farms to your household. Fair prices, flexible quantities, no middlemen.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className="focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none">
                <svg className="w-5 h-5 text-white/40 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none">
                <svg className="w-5 h-5 text-white/40 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none">
                <svg className="w-5 h-5 text-white/40 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="#" aria-label="WhatsApp" className="focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none">
                <svg className="w-5 h-5 text-white/40 hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.974 2.057c-5.503 0-10.026 4.417-10.026 9.94 0 1.85.5 3.614 1.436 5.155L2 22l4.81-1.396c1.472.84 3.167 1.282 4.908 1.282 5.503 0 10.026-4.417 10.026-9.94a9.982 9.982 0 0 0-2.92-7.072 9.976 9.976 0 0 0-6.85-2.817zM6.92 18.067l-.21-.34c-1.07-1.68-1.58-3.49-1.58-5.32 0-4.66 3.74-8.4 8.4-8.4 2.26 0 4.39.87 5.96 2.44 1.57 1.57 2.44 3.7 2.44 5.96 0 4.66-3.74 8.4-8.4 8.4-1.74 0-3.32-.47-4.81-1.32l-.33-.21-3.23.93.98-3.14z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-body font-bold text-xs text-accent tracking-widest uppercase mb-5">Shop</h4>
            <ul className="flex flex-col gap-2">
              {['All Products', 'Grains & Rice', 'Vegetables', 'Protein', 'Tubers & Roots', 'Seasonal Picks'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body font-light text-sm text-white/50 hover:text-white transition-colors py-1 block focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none w-fit">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-body font-bold text-xs text-accent tracking-widest uppercase mb-5">Company</h4>
            <ul className="flex flex-col gap-2">
              {['About Farm Connect', 'How It Works', 'Partner Farms', 'Careers', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body font-light text-sm text-white/50 hover:text-white transition-colors py-1 block focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none w-fit">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-body font-bold text-xs text-accent tracking-widest uppercase mb-5">Support</h4>
            <ul className="flex flex-col gap-2">
              {['Help Centre', 'Track Order', 'Contact Us', 'Delivery Info', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="font-body font-light text-sm text-white/50 hover:text-white transition-colors py-1 block focus-visible:ring-2 focus-visible:ring-accent rounded-sm outline-none w-fit">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="font-body font-light text-xs text-white/30">© 2025 Farm Connect. All rights reserved.</p>
          <p className="font-body font-light text-xs text-white/30">Made for Nigerian households.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
