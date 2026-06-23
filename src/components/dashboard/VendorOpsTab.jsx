import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const VendorOpsTab = ({
  orders = [],
  formatCurrency,
  onAcceptOrder,
  onRejectOrder,
  onFulfillOrder
}) => {
  const renderBadge = (status) => {
    let classes = '';
    if (status === 'Delivered') classes = 'bg-primary/10 text-primary';
    else if (status === 'In Transit') classes = 'bg-secondary/15 text-secondary';
    else if (status === 'Cancelled' || status === 'Rejected') classes = 'bg-error/10 text-error';
    else classes = 'bg-surface-container text-on-surface-variant';
    return <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${classes}`}>{status}</span>;
  };

  return (
    <div className="animate-in fade-in duration-200 text-left">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Market Operations</h2>
        <p className="font-body text-sm text-on-surface-variant mt-1 font-medium font-semibold">Track and process incoming consumer harvest requests.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
        <div className="flex justify-between items-center mb-6">
           <h3 className="font-display font-bold text-lg text-on-surface">Active Operations Queue</h3>
        </div>

        <div className="flex flex-col gap-4">
          {orders.length === 0 ? (
            <div className="text-center py-10 font-body text-sm text-on-surface-variant">No orders in queue.</div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="p-5 rounded-3xl bg-surface-container-low border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-white hover:shadow-soft transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-on-surface">{order.id} · {order.itemsSummary}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-1 font-semibold">{order.date} · Est: Tomorrow</p>
                    <p className="font-body text-[10px] text-on-surface-variant font-medium mt-1 uppercase tracking-wider">Recipient: Lekki Hub Dropoff</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 self-end md:self-auto w-full sm:w-auto justify-end">
                  <div className="text-right">
                    <p className="font-display font-bold text-sm text-on-surface">{formatCurrency(order.total)}</p>
                    <div className="mt-1">{renderBadge(order.status)}</div>
                  </div>
                  
                  {/* Fulfillment Action Buttons */}
                  <div className="flex gap-2 shrink-0">
                    {order.status === 'Processing' && (
                      <>
                        <button
                          onClick={() => onRejectOrder(order)}
                          className="px-4 py-2 text-xs font-bold text-error border border-error/20 hover:bg-error/5 rounded-xl cursor-pointer transition-all"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => onAcceptOrder(order)}
                          className="px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary/90 rounded-xl cursor-pointer transition-all shadow-sm"
                        >
                          Accept Order
                        </button>
                      </>
                    )}
                    {order.status === 'In Transit' && (
                      <button
                        onClick={() => onFulfillOrder(order)}
                        className="px-4 py-2 text-xs font-bold text-primary bg-secondary-container hover:bg-secondary-container/90 rounded-xl cursor-pointer transition-all shadow-sm"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorOpsTab;
