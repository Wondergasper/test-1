import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';

const ProductFormModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Grains');
  const [location, setLocation] = useState('Ogun State');
  const [priceValue, setPriceValue] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/product_rice.png');
  const [error, setError] = useState('');

  const categoryOptions = ['Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits', 'Oil'];
  const imageOptions = [
    { label: 'Local Rice', value: '/product_rice.png' },
    { label: 'Fresh Tomatoes', value: '/product_tomatoes.png' },
    { label: 'Catfish', value: '/product_catfish.png' },
    { label: 'Yam Tubers', value: '/product_yam.png' },
  ];

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || 'Grains');
      setLocation(product.location || 'Ogun State');
      setPriceValue(product.priceValue || '');
      setStock(product.stock || product.stockValue || '');
      setDescription(product.description || '');
      setImage(product.image || product.img || '/product_rice.png');
    } else {
      setName('');
      setCategory('Grains');
      setLocation('Ogun State');
      setPriceValue('');
      setStock('');
      setDescription('');
      setImage('/product_rice.png');
    }
    setError('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !priceValue || !stock || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    const submittedProduct = {
      id: product?.id || `prod-${Date.now()}`,
      name,
      category,
      location,
      priceValue: Number(priceValue),
      price: `₦${Number(priceValue).toLocaleString()}`,
      stock: Number(stock),
      description,
      image,
      img: image,
      inSeason: true,
      status: Number(stock) === 0 ? 'Out of Stock' : Number(stock) < 50 ? 'Low Stock' : 'Active',
    };

    onSubmit(submittedProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />

      {/* Form Container */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-level-3 border border-outline-variant/30 z-10 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center px-6 py-5 border-b border-outline-variant bg-primary text-white">
          <h2 className="font-display font-bold text-lg tracking-tight">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close form"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 flex flex-col gap-5 text-left">
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Product Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Yellow Garri" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all cursor-pointer"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">Origin Location</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Edo State" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">Price per kg (₦) *</label>
              <input 
                type="number" 
                required
                placeholder="e.g. 500" 
                value={priceValue} 
                onChange={(e) => setPriceValue(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="font-body font-bold text-sm text-on-surface">Initial Stock (kg) *</label>
              <input 
                type="number" 
                required
                placeholder="e.g. 150" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Product Image</label>
            <select 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all cursor-pointer"
            >
              {imageOptions.map(img => (
                <option key={img.value} value={img.value}>{img.label}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-sm text-on-surface">Product Description *</label>
            <textarea 
              required
              placeholder="Provide a detailed description of the crop quality, harvest date, and soil description..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all min-h-[100px] resize-none"
            />
          </div>

          {error && (
            <p className="text-error font-body text-xs font-bold text-center">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
            <Button 
              type="button" 
              variant="ghost" 
              size="md" 
              onClick={onClose}
              className="font-bold cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              size="md"
              className="font-bold cursor-pointer"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
