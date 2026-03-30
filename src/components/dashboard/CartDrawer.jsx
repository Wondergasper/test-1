import React from 'react';
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
        className={`fixed top-0 right-0 w-full max-w-sm h-screen bg-white z-50 shadow-card transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-secondary shrink-0">
          <h2 className="font-display font-semibold text-lg text-text">My Cart</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors p-2 -mr-2 rounded-full focus-visible:ring-2 focus-visible:ring-accent outline-none min-h-[44px] min-w-[44px] flex justify-center items-center"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                <svg className="w-8 h-8 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <p className="font-display font-semibold text-lg text-text mt-5">Your cart is empty</p>
              <p className="font-body text-sm text-muted mt-2 max-w-[240px]">Add produce from the browse page and it will appear here instantly.</p>
              <Button variant="accent" size="sm" className="mt-6" onClick={onBrowseProducts}>Browse Products</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-secondary flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-sm text-text truncate">{item.name}</p>
                  <p className="font-body text-xs text-muted mt-0.5">{formatCurrency(item.priceValue)} / kg</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 bg-surface border border-secondary rounded-xl px-1.5 py-1">
                    <button onClick={() => onDecreaseQuantity(item.id)} className="text-muted hover:text-primary font-bold text-sm w-7 h-7 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent leading-none" aria-label={`Decrease quantity of ${item.name}`}>−</button>
                    <span className="font-body text-xs font-medium text-text min-w-[1.5rem] text-center leading-none transition-all duration-300">{item.quantity}</span>
                    <button onClick={() => onIncreaseQuantity(item.id)} className="text-accent hover:text-primary font-bold text-sm w-7 h-7 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent leading-none" aria-label={`Increase quantity of ${item.name}`}>+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} aria-label={`Remove ${item.name}`} className="text-muted hover:text-red-500 text-xs font-body transition-colors mt-0.5 flex items-center gap-1 focus-visible:ring-2 rounded-sm outline-none px-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-6 border-t border-secondary shrink-0 bg-white">
          <div className="flex justify-between items-center font-body font-medium text-text">
            <span>Subtotal</span>
            <span className="font-display font-semibold text-lg text-primary">{formatCurrency(subtotal)}</span>
          </div>
          <Button variant="primary" size="lg" className="w-full mt-4 active:scale-95 transition-transform duration-100" onClick={onCheckout} disabled={items.length === 0}>
            {items.length === 0 ? 'Checkout' : `Checkout · ${formatCurrency(subtotal)}`}
          </Button>
          <p className="font-body text-xs text-muted text-center mt-3">Delivery calculated at checkout</p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
