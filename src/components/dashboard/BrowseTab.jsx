import React, { useState } from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Tag from '../ui/Tag';
import { CATEGORY_FILTERS } from '../../data/mockData';
import { useCustomer } from '../../context/CustomerContext';

const BrowseTab = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortType,
    setSortType,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedLocation,
    setSelectedLocation,
    filteredProducts,
    productQuantities,
    adjustProductQuantity,
    handleAddToCart,
    handleTabChange,
    wishlistItems,
    handleToggleWishlist: onToggleWishlist,
    handleOpenProductDetails: onSelectProduct,
    handleBuyNow: onBuyNow,
  } = useCustomer();
  const [showFilters, setShowFilters] = useState(false);

  // Derive unique locations from filtered products or static list
  const locationsList = ['All', 'Ogun State', 'Kaduna State', 'Kogi State', 'Benue State', 'Oyo State', 'Plateau State', 'Edo State'];

  const isSaved = (productId) => wishlistItems.some(item => item.id === productId);

  const handleClearFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setSelectedLocation('All');
    setSortType('default');
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="animate-in fade-in duration-200">
      <div className="md:hidden mb-4">
        {/* Mobile Spacer */}
      </div>

      {/* Search & Filter Trigger Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 bg-white rounded-2xl border border-surface px-4 py-3 flex items-center gap-3 focus-within:border-secondary-container focus-within:ring-1 focus-within:ring-secondary-container transition-all">
          <svg className="w-5 h-5 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search rice, tomatoes, yam, palm oil..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="flex-1 font-body text-sm bg-transparent outline-none text-on-surface placeholder:text-on-surface-variant w-full min-h-[28px]"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className={`px-6 py-3 rounded-2xl border font-body text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
            showFilters || minPrice || maxPrice || selectedLocation !== 'All' || sortType !== 'default'
              ? 'bg-secondary-container border-secondary-container text-primary'
              : 'bg-white border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters {showFilters ? 'Hide' : 'Show'}
          {(minPrice || maxPrice || selectedLocation !== 'All' || sortType !== 'default') && (
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="bg-white rounded-3xl p-6 border border-outline-variant/30 mt-3 shadow-level-1 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in slide-in-from-top-2 duration-300">
          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-wider px-1">Farm Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 cursor-pointer"
            >
              {locationsList.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-wider px-1">Min Price (₦)</label>
            <input
              type="number"
              placeholder="e.g. 200"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20"
            />
          </div>

          {/* Max Price */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-wider px-1">Max Price (₦)</label>
            <input
              type="number"
              placeholder="e.g. 1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20"
            />
          </div>

          {/* Sort */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-xs text-on-surface-variant uppercase tracking-wider px-1">Sort By</label>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </div>

          <div className="md:col-span-4 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 font-body text-xs font-bold text-error hover:bg-error/5 rounded-lg transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mt-4 mb-4 no-scrollbar snap-x">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`font-body text-sm rounded-full px-5 py-2 cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-secondary-container whitespace-nowrap snap-start min-h-[44px] ${
              selectedCategory === cat ? 'bg-primary text-secondary-container font-medium' : 'bg-white text-on-surface-variant border border-surface font-medium hover:bg-background hover:text-on-surface'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center">
            <svg className="w-10 h-10 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="font-display font-semibold text-lg text-on-surface mt-6 text-center">No products match your filters</p>
          <p className="font-body text-on-surface-variant text-sm text-center mt-2">Try clearing search parameters or adjusting price range bounds.</p>
          <Button variant="accent" size="sm" className="mx-auto mt-6 active:scale-95 transition-transform duration-100" onClick={handleClearFilters}>Clear Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-soft flex flex-col group hover:shadow-card transition-all outline-none focus-within:ring-2 focus-within:ring-secondary-container relative">
              
              {/* Wishlist Toggle Button */}
              <button 
                type="button"
                onClick={() => onToggleWishlist(product)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md border border-outline-variant/10 z-10 transition-all active:scale-90 cursor-pointer text-on-surface-variant"
                aria-label={isSaved(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
              >
                <svg className={`w-5 h-5 transition-colors ${isSaved(product.id) ? 'fill-error text-error' : 'text-on-surface-variant/75 hover:text-error'}`} viewBox="0 0 24 24" fill={isSaved(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </button>

              {/* Product Card Click to open details */}
              <div 
                className="aspect-square w-full bg-white relative overflow-hidden border-b border-surface cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.inSeason && (
                  <Badge variant="green" className="absolute top-3 left-3 shadow-soft">In Season</Badge>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2 cursor-pointer" onClick={() => onSelectProduct(product)}><Tag>{product.category}</Tag></div>
                <h3 className="font-display font-semibold text-sm md:text-base text-on-surface cursor-pointer hover:text-primary transition-colors" onClick={() => onSelectProduct(product)}>{product.name}</h3>
                <p className="font-body text-[11px] md:text-xs font-light text-on-surface-variant mt-0.5 mb-2">{product.location}</p>

                <span className="font-display font-bold text-base md:text-lg text-primary mb-3 block">
                  {product.price || `₦${product.priceValue}`}<span className="font-body font-light text-xs text-on-surface-variant">/kg</span>
                </span>

                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex items-center justify-between bg-surface border border-surface rounded-xl px-2 py-1 min-h-[44px] w-full">
                    <button type="button" onClick={() => adjustProductQuantity(product.id, -1)} className="text-on-surface-variant hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none cursor-pointer" aria-label={`Decrease quantity of ${product.name}`}>−</button>
                    <span className="font-body text-sm font-medium text-on-surface w-6 text-center leading-none">{productQuantities[product.id] ?? 1}</span>
                    <button type="button" onClick={() => adjustProductQuantity(product.id, 1)} className="text-secondary-container hover:text-primary font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-secondary-container transition-colors leading-none cursor-pointer" aria-label={`Increase quantity of ${product.name}`}>+</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button variant="ghost" size="sm" className="w-full !px-1 text-xs font-bold" onClick={() => handleAddToCart(product)}>Add</Button>
                    <Button variant="accent" size="sm" className="w-full !px-1 text-xs font-bold" onClick={() => onBuyNow(product, productQuantities[product.id] ?? 1)}>Buy Now</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseTab;
