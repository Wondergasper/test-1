import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ORDER_FILTERS } from '../../data/mockData';
import { useCustomer, formatCurrency } from '../../context/CustomerContext';

const OrdersTab = () => {
  const {
    selectedOrderForTracking,
    setSelectedOrderForTracking,
    orderFilter,
    setOrderFilter,
    filteredOrders,
    handleDownloadReceipt,
    handleTabChange,
    handleCancelOrder: onCancelOrder,
  } = useCustomer();

  if (selectedOrderForTracking) {
    return (
      <div className="animate-in slide-in-from-right duration-300">
        <button 
          onClick={() => setSelectedOrderForTracking(null)}
          type="button"
          className="flex items-center gap-2 text-primary font-bold mb-6 hover:underline outline-none focus-visible:ring-2 rounded-sm cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to All Orders
        </button>

        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-soft mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="font-display font-bold text-lg text-on-surface">Tracking {selectedOrderForTracking.id}</p>
              <p className="font-body text-sm font-light text-on-surface-variant mt-1">Est. Delivery: Tomorrow, Nov 20</p>
            </div>
            <Badge variant="green">{selectedOrderForTracking.status}</Badge>
          </div>

          <div className="flex items-center justify-between relative mb-12 w-full max-w-2xl mx-auto px-2">
            <div className="absolute left-[10%] right-[10%] top-[40%] md:top-[45%] h-1 bg-surface z-0"></div>
            <div className="absolute left-[10%] top-[40%] md:top-[45%] h-1 bg-secondary-container z-0" style={{ width: selectedOrderForTracking.status === 'In Transit' ? '50%' : selectedOrderForTracking.status === 'Delivered' ? '100%' : '10%' }}></div>

            {[
              { label: 'Confirmed', state: 'completed' },
              { label: 'Packed', state: 'completed' },
              { label: 'In Transit', state: selectedOrderForTracking.status === 'In Transit' ? 'current' : selectedOrderForTracking.status === 'Delivered' ? 'completed' : 'pending' },
              { label: 'Delivered', state: selectedOrderForTracking.status === 'Delivered' ? 'current' : 'pending' },
            ].map((step, index) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-[10px] md:text-xs transition-colors ${
                    step.state === 'completed'
                      ? 'bg-secondary-container text-primary'
                      : step.state === 'current'
                        ? 'bg-secondary text-white ring-4 ring-secondary/20 animate-pulse'
                        : 'bg-surface border-2 border-surface text-on-surface-variant'
                  }`}
                >
                  {step.state === 'completed' ? '✓' : index + 1}
                </div>
                <p className={`absolute -bottom-7 w-max text-[10px] md:text-xs font-medium text-center ${
                  step.state === 'completed'
                    ? 'text-on-surface'
                    : step.state === 'current'
                      ? 'text-secondary'
                      : 'text-on-surface-variant'
                }`}>{step.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface/50 rounded-xl p-4 flex gap-3 items-start mt-12 md:mt-8">
            <svg className="w-5 h-5 stroke-primary flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <div>
              <p className="font-body font-medium text-sm text-on-surface">Your order is {selectedOrderForTracking.status.toLowerCase()} — distribution hub</p>
              <p className="font-body text-xs font-light text-on-surface-variant mt-1">Status update: Just now</p>
            </div>
          </div>
        </div>

        <div className="w-full h-48 md:h-64 rounded-xl bg-white border border-surface flex items-center justify-center overflow-hidden relative shadow-inner">
          <img src="/nigeria_map.png" alt="Delivery tracking map" className="absolute w-full h-full object-cover opacity-30 select-none pointer-events-none mix-blend-multiply" />
          <p className="font-body text-sm font-medium text-on-surface z-10 bg-white/90 px-5 py-2.5 rounded-full shadow-sm backdrop-blur-sm">[ Live tracking map ]</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-200">
      <div className="flex gap-6 border-b border-surface mb-6 overflow-x-auto no-scrollbar">
        {ORDER_FILTERS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setOrderFilter(tab)}
            className={`pb-3 font-body text-sm font-medium whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-t-sm transition-colors min-h-[44px] cursor-pointer ${
              orderFilter === tab ? 'border-b-2 border-primary text-primary' : 'border-b-2 border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 mt-8 animate-in fade-in zoom-in duration-300">
          <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center">
            <svg className="w-10 h-10 text-on-surface-variant" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="font-display font-semibold text-lg text-on-surface mt-6 text-center">No orders in this status</p>
          <p className="font-body text-on-surface-variant text-sm text-center mt-2">Switch filters or place a fresh order from the browse page.</p>
          <Button variant="accent" size="sm" className="mx-auto mt-6 active:scale-95 transition-transform duration-100" onClick={() => handleTabChange('browse')}>Browse Products</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-soft transition-shadow hover:shadow-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-display font-bold text-lg text-on-surface">Order {order.id}</p>
                  <p className="font-body text-xs text-on-surface-variant mt-0.5">Placed on {order.date}</p>
                </div>
                <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider ${order.badge}`}>{order.status}</span>
              </div>

              <div className="flex flex-col gap-3 py-4 border-t border-b border-surface/60">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.name}`} className="flex justify-between items-center">
                    <p className="font-body text-sm text-on-surface">
                      <span className="font-medium">{item.qty}</span> × {item.name} <span className="text-on-surface-variant font-light ml-1">({formatCurrency(item.price)})</span>
                    </p>
                    <p className="font-body font-medium text-sm text-on-surface">{formatCurrency(item.sub)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-1">
                <span className="font-display font-bold text-lg text-primary">{formatCurrency(order.total)}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDownloadReceipt(order)} 
                    type="button"
                    className="font-body text-sm text-on-surface-variant font-medium hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-sm px-2 min-h-[44px] flex items-center cursor-pointer"
                  >
                    Receipt
                  </button>
                  {order.status === 'Processing' && (
                    <button 
                      onClick={() => onCancelOrder(order)}
                      type="button"
                      className="font-body text-sm text-error font-bold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-sm px-2 min-h-[44px] flex items-center cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status !== 'Delivered' && (
                    <button 
                      onClick={() => setSelectedOrderForTracking(order)}
                      type="button"
                      className="font-body text-sm text-primary font-bold hover:underline outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded-sm px-2 min-h-[44px] flex items-center cursor-pointer"
                    >
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
