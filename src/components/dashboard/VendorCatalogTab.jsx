import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const VendorCatalogTab = ({
  products = [],
  formatCurrency,
  onCreateProductClick,
  onEditProductClick,
  onDeleteProductClick
}) => {
  const renderStatusBadge = (status) => {
    let classes = '';
    if (status === 'Active') classes = 'bg-primary/10 text-primary';
    else if (status === 'Low Stock') classes = 'bg-secondary/15 text-secondary';
    else if (status === 'Out of Stock') classes = 'bg-error/10 text-error';
    else classes = 'bg-surface-container text-on-surface-variant';
    return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${classes}`}>{status}</span>;
  };

  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex justify-between items-center mb-8">
        <div className="text-left">
          <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Farm Inventory</h2>
          <p className="font-body text-sm text-on-surface-variant mt-1 font-medium">Manage listed products and update real-time stock levels.</p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          className="font-bold cursor-pointer !px-6" 
          onClick={onCreateProductClick}
        >
          + Add New Item
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="p-12 border-2 border-dashed border-outline-variant/30 rounded-3xl flex flex-col items-center justify-center text-center bg-white">
          <p className="font-body text-sm font-bold text-on-surface-variant">No items listed</p>
          <p className="font-body text-xs text-on-surface-variant mt-1 max-w-[240px]">Get started by listing your first fresh harvest on the marketplace catalog.</p>
          <Button variant="ghost" size="sm" className="mt-4 font-bold" onClick={onCreateProductClick}>List Product</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(prod => (
            <div key={prod.id} className="bg-white rounded-3xl p-5 shadow-level-1 border border-outline-variant/30 flex items-center gap-4 group hover:shadow-level-2 transition-all relative overflow-hidden text-left">
              {/* Product Thumbnail */}
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface flex-shrink-0 border border-outline-variant/20 shadow-inner">
                <img src={prod.image || prod.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={prod.name} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-sm text-on-surface truncate pr-8">{prod.name}</p>
                <p className="font-body text-xs font-bold text-on-surface-variant mt-1">
                  {prod.stock}kg available · {formatCurrency(prod.priceValue)}/kg
                </p>
                <div className="mt-3">{renderStatusBadge(prod.status)}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 shrink-0 border-l border-outline-variant/10 pl-3">
                <button 
                  onClick={() => onEditProductClick(prod)} 
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer rounded-full hover:bg-background"
                  title="Edit product"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                </button>
                <button 
                  onClick={() => onDeleteProductClick(prod.id)} 
                  className="p-2 text-on-surface-variant hover:text-error transition-colors cursor-pointer rounded-full hover:bg-error/5"
                  title="Delete product"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorCatalogTab;
