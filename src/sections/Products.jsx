import React from 'react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { useReveal } from '../hooks/useReveal';

const products = [
  { name: 'Local Rice', category: 'Grains', price: '₦480', location: 'Ogun State', inSeason: true, image: '/product_rice.png' },
  { name: 'Fresh Tomatoes', category: 'Vegetables', price: '₦320', location: 'Kaduna State', inSeason: false, image: '/product_tomatoes.png' },
  { name: 'Catfish', category: 'Protein', price: '₦1,200', location: 'Kogi State', inSeason: false, image: '/product_catfish.png' },
  { name: 'Yam', category: 'Tubers', price: '₦280', location: 'Benue State', inSeason: true, image: '/product_yam.png' }
];

const Products = () => {
  const { ref, isVisible } = useReveal();

  return (
    <section id="products" className="bg-bg py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <div 
          className={`flex justify-between items-end flex-wrap gap-4 mb-8 md:mb-12 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div>
            <Badge variant="green">Fresh From the Farm</Badge>
            <h2 className="font-display font-bold text-[clamp(28px,4vw,52px)] text-text mt-3 leading-[1.1]">
              What's available<br/>this week.
            </h2>
          </div>
          <Button variant="ghost" size="sm" href="/signup">View All Products</Button>
        </div>

        <div 
          className={`flex gap-2 flex-wrap mb-8 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '80ms' }}
        >
          {['All', 'Grains', 'Vegetables', 'Protein', 'Tubers', 'Fruits'].map((cat, i) => (
            <button 
              key={cat} 
              className={`font-body text-sm rounded-full px-5 py-2 cursor-pointer transition-all duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 outline-none min-h-[44px] ${
                i === 0 ? 'bg-primary text-white font-medium' : 'bg-surface text-muted border border-secondary font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <li 
              key={idx} 
              className={`bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-700 ease-out outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 cursor-pointer flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${idx * 80 + 160}ms` }}
              tabIndex={0}
            >
              <div className="aspect-square w-full bg-surface relative overflow-hidden">
                <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover" />
                {product.inSeason && (
                  <Badge variant="green" className="absolute top-3 left-3 shadow-soft">In Season</Badge>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="mb-2"><Tag>{product.category}</Tag></div>
                <h3 className="font-display font-bold text-base text-text">{product.name}</h3>
                <p className="font-body text-xs font-light text-muted mt-0.5 mb-3">{product.location}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-display font-bold text-lg text-primary">
                    {product.price}<span className="font-body font-light text-xs text-muted">/kg</span>
                  </span>
                  <div className="flex items-center gap-1 bg-secondary rounded-full px-1.5 py-1">
                    <button 
                      className="text-muted hover:text-primary font-bold text-lg w-7 h-7 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-accent outline-none"
                      aria-label={`Decrease quantity of ${product.name}`}
                    >−</button>
                    <span className="font-body text-sm font-medium text-text w-5 text-center leading-none">1</span>
                    <button 
                      className="text-accent hover:text-primary font-bold text-lg w-7 h-7 flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-accent outline-none"
                      aria-label={`Increase quantity of ${product.name}`}
                    >+</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div 
          className={`mt-10 text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '480ms' }}
        >
          <p className="font-body text-sm font-light text-muted mb-4">Prices update weekly based on farm supply.</p>
          <Button variant="primary" size="md" href="/signup">Browse Full Catalogue</Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
