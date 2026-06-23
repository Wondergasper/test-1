import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const VendorHomeTab = ({
  products = [],
  orders = [],
  formatCurrency,
  handleTabChange,
  earningsSummary
}) => {
  // Compute Stats
  const revenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status === 'Processing' || o.status === 'In Transit').length;
  
  // Find products needing stock attention
  const stockAlerts = products.filter(p => p.stock === 0 || p.stock < 50);

  return (
    <div className="animate-in fade-in duration-300">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Farm Revenue', value: formatCurrency(revenue), trend: 'Processed earnings', color: 'primary' },
          { label: 'Fulfillment Queue', value: `${activeOrders} orders`, trend: 'Need packing/dispatch', color: 'secondary' },
          { label: 'Total Catalog Products', value: `${products.length} items`, trend: 'Listed in marketplace', color: 'neutral' },
          { label: 'Pending Payout', value: formatCurrency(earningsSummary?.pendingPayout || 0), trend: 'Cleared balance', color: 'accent' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-3xl p-5 shadow-soft border border-outline-variant/15 flex flex-col justify-between hover:shadow-level-1 transition-all text-left">
            <div>
              <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">{stat.label}</p>
              <p className="font-display font-bold text-2xl text-on-surface mt-3 tracking-tight">{stat.value}</p>
            </div>
            <p className="font-body text-[10px] text-on-surface-variant font-medium mt-3 uppercase tracking-wider">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Alerts & Ops */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Inventory Alerts Card */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 text-left">
            <h3 className="font-display font-bold text-lg text-on-surface mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-error rounded-full"></span>
              Inventory Stock Alerts
            </h3>
            
            {stockAlerts.length === 0 ? (
              <p className="font-body text-xs text-on-surface-variant font-medium">All products are healthy and well-stocked.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {stockAlerts.map(prod => (
                  <div key={prod.id} className="flex justify-between items-center p-4 border border-outline-variant/20 rounded-2xl bg-surface-container-low hover:bg-background transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-outline-variant/15">
                        <img src={prod.image || prod.img} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-body font-bold text-sm text-on-surface">{prod.name}</p>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-0.5">{prod.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {prod.stock === 0 ? (
                        <Badge variant="red">Out of Stock</Badge>
                      ) : (
                        <Badge variant="amber">Low Stock ({prod.stock}kg)</Badge>
                      )}
                      <button 
                        onClick={() => handleTabChange('catalog')}
                        className="font-body text-xs text-primary font-bold hover:underline cursor-pointer"
                      >
                        Adjust Stock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Operations */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 text-left">
            <h3 className="font-display font-bold text-lg text-on-surface mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-secondary-container rounded-full"></span>
              Fulfillment Log
            </h3>
            <div className="flex flex-col gap-4">
               {orders.slice(0, 3).map(order => (
                 <div key={order.id} className="flex items-center justify-between p-4 border border-surface rounded-2xl hover:bg-background/50 transition-colors">
                   <div className="text-left">
                     <p className="font-body font-bold text-sm text-on-surface">{order.id} · {order.itemsSummary}</p>
                     <p className="font-body text-xs text-on-surface-variant mt-1 font-semibold">{order.date} · {formatCurrency(order.total)}</p>
                   </div>
                   <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                     order.status === 'Delivered' ? 'bg-primary/10 text-primary' : order.status === 'In Transit' ? 'bg-secondary/15 text-secondary' : 'bg-surface-container text-on-surface-variant'
                   }`}>{order.status}</span>
                 </div>
               ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-6 w-full cursor-pointer" onClick={() => handleTabChange('ops')}>View Operations Feed</Button>
          </section>
        </div>

        {/* Right 1 Column: Seasonal spotlight / Quick stats */}
        <div className="flex flex-col gap-6">
          <section className="bg-primary text-white rounded-3xl p-8 shadow-level-2 text-left relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
             <Badge variant="green" className="!bg-secondary-container !text-primary font-bold border-none mb-6">Organic Verified</Badge>
             <h4 className="font-display font-bold text-xl tracking-tight leading-tight">Harvest Season is active.</h4>
             <p className="font-body text-white/60 text-sm mt-4 leading-relaxed font-medium">Keep your inventory levels updated to ensure prompt listings on customer marketplace feeds.</p>
             <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-body text-xs font-bold text-white/50 uppercase tracking-widest">Partner ID</span>
                <span className="font-body text-xs font-bold">#FM-NG-8802</span>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VendorHomeTab;
