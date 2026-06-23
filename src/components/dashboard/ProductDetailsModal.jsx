import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

const ProductDetailsModal = ({
  isOpen,
  onClose,
  product,
  quantity = 1,
  onAdjustQuantity,
  onAddToCart,
  onBuyNow
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Blur Overlay */}
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-level-3 border border-outline-variant/30 flex flex-col md:flex-row z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] md:max-h-[600px]">
        {/* Left Side: Product Image */}
        <div className="w-full md:w-1/2 bg-surface relative min-h-[240px] md:min-h-full">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
          <button 
            type="button"
            onClick={onClose} 
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-on-surface hover:bg-white shadow-sm border border-outline-variant/20 transition-all cursor-pointer md:hidden"
            aria-label="Close details"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          {product.inSeason && (
            <Badge variant="green" className="absolute top-4 right-4 shadow-soft">In Season</Badge>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar">
          {/* Header */}
          <div>
            <div className="flex justify-between items-start mb-2">
              <Tag>{product.category}</Tag>
              <button 
                type="button"
                onClick={onClose} 
                className="hidden md:flex w-8 h-8 rounded-full hover:bg-background items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">{product.name}</h2>
            <p className="font-body text-xs font-semibold text-on-surface-variant mt-1">{product.location}</p>

            <span className="font-display font-bold text-2xl text-primary mt-4 mb-5 block">
              {product.price || `₦${product.priceValue}`}<span className="font-body font-light text-sm text-on-surface-variant">/kg</span>
            </span>

            <div className="w-full h-px bg-outline-variant/30 my-4" />

            <h4 className="font-display font-bold text-sm text-on-surface mb-2">Description</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed font-medium mb-6">
              {product.description || 'No description available for this farm product.'}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status:</span>
              <span className="text-xs font-bold text-secondary">Available (direct harvest)</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center justify-between bg-surface border border-surface rounded-xl px-3 py-1.5 min-h-[44px]">
              <button 
                type="button" 
                onClick={() => onAdjustQuantity(product.id, -1)} 
                className="text-on-surface-variant hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none cursor-pointer"
                aria-label={`Decrease quantity`}
              >
                −
              </button>
              <span className="font-body text-sm font-semibold text-on-surface w-6 text-center leading-none">
                {quantity}
              </span>
              <button 
                type="button" 
                onClick={() => onAdjustQuantity(product.id, 1)} 
                className="text-secondary-container hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none cursor-pointer"
                aria-label={`Increase quantity`}
              >
                +
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="ghost" 
                size="md" 
                className="w-full font-bold active:scale-95 transition-transform"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                Add to Cart
              </Button>
              <Button 
                variant="accent" 
                size="md" 
                className="w-full font-bold active:scale-95 transition-transform"
                onClick={() => {
                  onBuyNow(product, quantity);
                  onClose();
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
