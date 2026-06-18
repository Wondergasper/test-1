import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { useReveal } from '../hooks/useReveal';

const products = [
  {
    name: 'Fresh Tomatoes',
    category: 'Vegetables',
    price: '₦320',
    location: 'Plateau State',
    image: '/product_tomatoes.png',
    inSeason: true
  },
  {
    name: 'Local Rice',
    category: 'Grains',
    price: '₦480',
    location: 'Kebbi State',
    image: '/product_rice.png',
    inSeason: true
  },
  {
    name: 'Giant Yam',
    category: 'Tubers',
    price: '₦280',
    location: 'Benue State',
    image: '/product_yam.png',
    inSeason: false
  },
  {
    name: 'Live Catfish',
    category: 'Protein',
    price: '₦1,200',
    location: 'Lagos Farm',
    image: '/product_catfish.png',
    inSeason: true
  },
];

const Products = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="products" className="bg-background py-24 md:py-32 px-6 relative z-20">
      <div className="max-w-container-max mx-auto" ref={ref}>
        <div 
          className={`flex justify-between items-end flex-wrap gap-8 mb-16 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="max-w-xl">
            <Badge variant="green" className="font-bold">Fresh Inventory</Badge>
            <h2 className="font-display font-bold text-[clamp(32px,4.5vw,60px)] text-on-surface mt-4 mb-4 leading-[1.02] tracking-tighter">
              What's available<br/>this week.
            </h2>
            <p className="font-body font-medium text-lg text-on-surface-variant">Real-time supply from our partner farms across Nigeria.</p>
          </div>
          <Button variant="ghost" size="md" href="/signup" className="hidden sm:inline-flex">View All Products</Button>
        </div>

        <div 
          className={`flex gap-3 flex-wrap mb-12 transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {['All Items', 'Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits'].map((cat, i) => (
            <button 
              key={cat} 
              className={`font-body text-sm rounded-full px-6 py-2.5 cursor-pointer transition-all duration-300 focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 outline-none min-h-[44px] active:scale-95 ${
                i === 0 
                  ? 'bg-primary text-on-primary font-bold shadow-md' 
                  : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/30 font-bold hover:bg-surface-container-high hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, idx) => (
            <li 
              key={idx} 
              className={`bg-surface-container-lowest rounded-3xl overflow-hidden shadow-level-1 hover:shadow-level-2 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ease-out outline-none focus-within:ring-2 focus-within:ring-secondary-container focus-within:ring-offset-2 cursor-pointer flex flex-col group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 100 + 300}ms` }}
              tabIndex={0}
            >
              <div className="aspect-square w-full bg-surface-container relative overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {product.inSeason && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="green" className="shadow-level-1 backdrop-blur-sm bg-primary-fixed/90 font-bold uppercase tracking-wider !px-3">In Season</Badge>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3"><Tag className="font-bold">{product.category}</Tag></div>
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                <p className="font-body text-xs font-bold text-on-surface-variant mt-1.5 mb-6 opacity-70 uppercase tracking-wider">{product.location}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/20">
                  <span className="font-display font-bold text-2xl text-primary">
                    {product.price}<span className="font-body font-medium text-xs text-on-surface-variant ml-0.5 opacity-60">/kg</span>
                  </span>
                  <div className="flex items-center gap-1.5 bg-surface-container-low rounded-full px-2 py-1.5 shadow-inner border border-outline-variant/10">
                    <button 
                      className="text-on-surface-variant hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-secondary-container outline-none transition-all cursor-pointer hover:bg-white active:scale-75"
                      aria-label={`Decrease quantity of ${product.name}`}
                    >−</button>
                    <span className="font-body text-sm font-bold text-on-surface w-6 text-center leading-none">1</span>
                    <button 
                      className="text-secondary-container hover:text-primary font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-secondary-container outline-none transition-all cursor-pointer hover:bg-white active:scale-75"
                      aria-label={`Increase quantity of ${product.name}`}
                    >+</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <p className="font-body text-sm font-bold text-on-surface-variant mb-6 opacity-80 uppercase tracking-widest">Prices update weekly based on farm supply.</p>
          <Button variant="primary" size="lg" href="/signup" className="!px-12">Browse Full Catalogue</Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
