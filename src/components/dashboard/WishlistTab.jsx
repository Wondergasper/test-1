import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

const WishlistTab = ({
  wishlistItems = [],
  onMoveToCart,
  onRemoveFromWishlist,
  formatCurrency,
  handleTabChange
}) => {
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8 hidden md:block">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Saved Items</h2>
        <p className="font-body text-on-surface-variant mt-1 font-medium">Items you want to keep an eye on or buy later.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/80 shadow-level-1 text-center max-w-lg mx-auto animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-secondary-container/10 text-primary flex items-center justify-center mb-6">
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 className="font-display font-bold text-xl text-on-surface">Your Wishlist is Empty</h3>
          <p className="font-body text-sm text-on-surface-variant mt-2 mb-8 leading-relaxed font-medium">
            Save fresh produce from the marketplace here to review their pricing, seasonality, and order them later.
          </p>
          <Button 
            variant="primary" 
            size="md" 
            className="font-bold cursor-pointer"
            onClick={() => handleTabChange('browse')}
          >
            Explore Marketplace
          </Button>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-body text-sm text-on-surface-variant font-bold uppercase tracking-widest opacity-60">Items saved:</span>
            <Badge variant="green">{wishlistItems.length}</Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-soft flex flex-col group hover:shadow-card transition-all outline-none focus-within:ring-2 focus-within:ring-secondary-container relative">
                
                {/* Remove Quick Trigger */}
                <button 
                  type="button"
                  onClick={() => onRemoveFromWishlist(product)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-error hover:bg-white flex items-center justify-center shadow-md border border-outline-variant/10 z-10 transition-all active:scale-90 cursor-pointer"
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>
                </button>

                <div className="aspect-square w-full bg-white relative overflow-hidden border-b border-surface">
                  <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.inSeason && (
                    <Badge variant="green" className="absolute top-3 left-3 shadow-soft">In Season</Badge>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="mb-2"><Tag>{product.category}</Tag></div>
                  <h3 className="font-display font-semibold text-sm md:text-base text-on-surface">{product.name}</h3>
                  <p className="font-body text-[11px] md:text-xs font-light text-on-surface-variant mt-0.5 mb-2">{product.location}</p>

                  <span className="font-display font-bold text-base md:text-lg text-primary mb-4 block">
                    {product.price || `₦${product.priceValue}`}<span className="font-body font-light text-xs text-on-surface-variant">/kg</span>
                  </span>

                  <div className="mt-auto flex flex-col gap-2">
                    <Button 
                      variant="accent" 
                      size="sm" 
                      className="w-full font-bold active:scale-95 transition-transform duration-100 cursor-pointer" 
                      onClick={() => onMoveToCart(product)}
                    >
                      Move to Cart
                    </Button>
                    <button 
                      type="button" 
                      onClick={() => onRemoveFromWishlist(product)} 
                      className="w-full py-2.5 rounded-xl border border-outline-variant/30 text-on-surface-variant font-body font-semibold text-xs hover:bg-error/5 hover:text-error hover:border-error/20 transition-all cursor-pointer text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistTab;
