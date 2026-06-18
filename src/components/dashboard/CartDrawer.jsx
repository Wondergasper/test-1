import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const formatCurrency = (amount) => `₦${amount.toLocaleString()}`;

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  subtotal,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveItem,
  onCheckout,
  onBrowseProducts,
}) => {
  const [step, setStep] = useState('cart'); // 'cart' or 'payment'

  // Reset to cart step when drawer closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setStep('cart'), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCheckoutClick = () => {
    if (step === 'cart') {
      setStep('payment');
    } else {
      onCheckout();
      setStep('cart');
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 w-full max-w-sm h-screen bg-surface-container-lowest z-[60] shadow-level-2 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-outline-variant bg-primary shrink-0">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button onClick={() => setStep('cart')} className="text-white/60 hover:text-white transition-colors p-1 -ml-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
            )}
            <h2 className="font-display font-bold text-lg text-white tracking-tight">
              {step === 'cart' ? 'My Cart' : 'Checkout'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-2 -mr-2 rounded-full focus-visible:ring-2 focus-visible:ring-secondary-container outline-none min-h-[44px] min-w-[44px] flex justify-center items-center cursor-pointer"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4 bg-background">
          {step === 'cart' ? (
            items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
                  <svg className="w-8 h-8 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <p className="font-display font-bold text-lg text-on-surface mt-5 tracking-tight">Your cart is empty</p>
                <p className="font-body text-sm text-on-surface-variant mt-2 max-w-[240px] font-medium">Add produce from the browse page and it will appear here instantly.</p>
                <Button variant="primary" size="sm" className="mt-6" onClick={onBrowseProducts}>Browse Products</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-200">
                  <div className="w-14 h-14 rounded-lg bg-surface-container flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-bold text-sm text-on-surface truncate">{item.name}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-0.5 font-semibold">{formatCurrency(item.priceValue)} / kg</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 bg-surface-container border border-outline-variant rounded-xl px-1.5 py-1">
                      <button onClick={() => onDecreaseQuantity(item.id)} className="text-on-surface-variant hover:text-primary font-bold text-sm w-7 h-7 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container leading-none cursor-pointer" aria-label={`Decrease quantity of ${item.name}`}>−</button>
                      <span className="font-body text-xs font-bold text-on-surface min-w-[1.5rem] text-center leading-none transition-all duration-300">{item.quantity}</span>
                      <button onClick={() => onIncreaseQuantity(item.id)} className="text-secondary-container hover:text-primary font-bold text-sm w-7 h-7 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container leading-none cursor-pointer" aria-label={`Increase quantity of ${item.name}`}>+</button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.name}`} className="text-on-surface-variant hover:text-error text-xs font-body font-bold transition-colors mt-0.5 flex items-center gap-1 focus-visible:ring-2 rounded-sm outline-none px-1 cursor-pointer">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <section>
                <h3 className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-3">Delivery Address</h3>
                <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30 flex items-start gap-3">
                  <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <div>
                    <p className="font-body font-bold text-sm text-on-surface">Home Address</p>
                    <p className="font-body text-xs text-on-surface-variant mt-1 leading-relaxed">14 Admiralty Way, Lekki Phase 1, Lagos State</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-widest mb-3">Payment Method</h3>
                <div className="flex flex-col gap-3">
                   <button className="bg-primary text-white p-4 rounded-xl flex items-center justify-between border-2 border-primary shadow-level-1">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div>
                        <p className="font-body font-bold text-sm tracking-tight">Visa ending in 2048</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-4 border-secondary-container bg-primary"></div>
                   </button>
                   <button className="bg-white border border-outline-variant/50 p-4 rounded-xl flex items-center justify-between hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center"><svg className="w-5 h-5 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21v-4m18 4v-4M3 10h18M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3m0 11H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path></svg></div>
                        <p className="font-body font-bold text-sm text-on-surface tracking-tight">Bank Transfer</p>
                      </div>
                      <div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
                   </button>
                </div>
              </section>

              <section className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/30">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-xs text-on-surface-variant font-medium">Order Subtotal</span>
                    <span className="font-body text-xs text-on-surface font-bold">{formatCurrency(subtotal)}</span>
                 </div>
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-xs text-on-surface-variant font-medium">Delivery Fee</span>
                    <span className="font-body text-xs text-on-surface font-bold">{formatCurrency(850)}</span>
                 </div>
                 <div className="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/30">
                    <span className="font-body text-sm text-on-surface font-bold">Total to Pay</span>
                    <span className="font-display text-lg text-primary font-bold">{formatCurrency(subtotal + 850)}</span>
                 </div>
              </section>
            </div>
          )}
        </div>

        <div className="px-6 py-6 border-t border-outline-variant shrink-0 bg-surface-container-lowest">
          <div className="flex justify-between items-center font-body font-bold text-on-surface mb-4">
            <span>{step === 'cart' ? 'Subtotal' : 'Grand Total'}</span>
            <span className="font-display font-bold text-lg text-primary tracking-tight">
              {formatCurrency(step === 'cart' ? subtotal : subtotal + 850)}
            </span>
          </div>
          <Button variant="primary" size="lg" className="w-full active:scale-95 transition-transform duration-100 font-bold" onClick={handleCheckoutClick} disabled={items.length === 0}>
            {step === 'cart' ? `Checkout · ${formatCurrency(subtotal)}` : `Confirm & Pay · ${formatCurrency(subtotal + 850)}`}
          </Button>
          <p className="font-body text-xs text-on-surface-variant font-medium text-center mt-3">
            {step === 'cart' ? 'Delivery calculated at next step' : 'Secure payment via Paystack'}
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
