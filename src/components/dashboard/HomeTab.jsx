import React from 'react';
import Badge from '../ui/Badge';
import { useCustomer, formatCurrency } from '../../context/CustomerContext';

const HomeTab = () => {
  const {
    orders,
    walletBalance,
    handleTabChange,
    setSelectedOrderForTracking,
    setSettingsTab,
  } = useCustomer();
  return (
    <div className="animate-in fade-in duration-500 relative">
      {/* Aesthetic Background Decorations */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        {/* Welcome & Seasonal Spotlight */}
        <div className="flex-1 min-w-0">
          <div className="relative rounded-[2.5rem] bg-primary overflow-hidden min-h-[220px] md:min-h-[260px] flex flex-col justify-end p-8 md:p-10 shadow-level-2 group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img src="/hero_farm.png" alt="Fresh farm harvest" className="w-full h-full object-cover grayscale brightness-[0.3] group-hover:scale-105 transition-transform duration-[4s]" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
            </div>
            
            <div className="relative z-10">
              <Badge variant="green" className="!bg-secondary-container/20 !text-secondary-container border border-secondary-container/30 mb-4 !normal-case !tracking-normal font-bold">Seasonal Spotlight</Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white tracking-tighter leading-tight">
                Fresh <span className="text-secondary-container underline decoration-secondary-container/30 underline-offset-8">Sweet Corn</span><br/>is back in season!
              </h2>
              <p className="font-body text-white/60 mt-4 font-medium max-w-sm">Directly harvested from our partner farms in Benue. Limited stock available this week.</p>
              <button onClick={() => handleTabChange('browse')} className="mt-8 flex items-center gap-2 text-secondary-container font-display font-bold text-sm hover:translate-x-1 transition-transform group/btn cursor-pointer">
                 Shop the Harvest
                 <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Wallet Balance Hero Card */}
        <div className="bg-primary rounded-[2.5rem] p-8 flex flex-col justify-between shadow-level-2 border-b-8 border-secondary-container w-full lg:w-[340px] group relative overflow-hidden active:scale-[0.98] transition-all cursor-pointer" onClick={() => { setSettingsTab('payments'); handleTabChange('account'); }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <p className="font-body text-[10px] text-white/40 uppercase tracking-[0.25em] font-bold">Market Wallet</p>
              <div className="w-8 h-5 bg-white/10 rounded border border-white/5"></div>
            </div>
            <p className="font-display font-bold text-4xl text-secondary-container mt-6 tracking-tighter">{formatCurrency(walletBalance)}</p>
            <div className="mt-2 flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse"></div>
               <span className="font-body text-[11px] text-white/50 font-bold uppercase tracking-wider">Funds Secured</span>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-3 mt-10">
             <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-secondary-container shadow-inner border border-white/5 group-hover:bg-secondary-container group-hover:text-primary transition-all">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
             </div>
             <span className="font-display text-sm text-white font-bold tracking-tight">Top Up Balance</span>
          </div>
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-on-surface mb-6 tracking-tight flex items-center gap-2">
         <div className="w-1.5 h-6 bg-secondary-container rounded-full"></div>
         Quick Insights
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {[
          { label: 'Total Orders', value: orders.length.toString(), trend: '↑', color: 'primary' },
          { label: 'Monthly Spend', value: formatCurrency(orders.reduce((s,o)=>s+o.total,0)), trend: '-', color: 'on-surface' },
          { label: 'Saved', value: '₦4,200', trend: '↑', color: 'primary' },
          { label: 'Deliveries', value: '1', trend: '↑', color: 'secondary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-level-1 border border-white flex flex-col justify-between group hover:shadow-level-2 transition-all">
            <p className="font-body text-[11px] text-on-surface-variant font-bold uppercase tracking-widest opacity-60">{stat.label}</p>
            <div className="flex items-end justify-between mt-4">
              <p className="font-display font-bold text-2xl text-on-surface leading-none tracking-tight">{stat.value}</p>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${stat.trend === '↑' ? 'bg-secondary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant opacity-30'}`}>
                 <span className="text-xs font-black">{stat.trend === '↑' ? '↗' : '—'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 mt-12">
        <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Recent Activity</h3>
        <button onClick={() => handleTabChange('orders')} className="font-body text-sm text-primary font-bold hover:underline py-2 px-4 rounded-full hover:bg-primary/5 transition-all cursor-pointer">View All Activity</button>
      </div>

      <div className="flex flex-col gap-4">
        {orders.slice(0, 3).map((order) => (
          <div key={order.id} className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-5 shadow-level-1 flex flex-col md:flex-row md:items-center gap-5 cursor-pointer transition-all hover:shadow-level-2 hover:-translate-y-0.5 border border-white group" onClick={() => { setSelectedOrderForTracking(order); handleTabChange('orders'); }}>
            <div className="flex items-center gap-5 w-full md:flex-1 min-w-0">
              <div className="w-16 h-16 rounded-2xl bg-surface-container flex-shrink-0 flex items-center justify-center overflow-hidden border border-outline-variant shadow-inner relative">
                <img src="/product_rice.png" alt="Product thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body font-bold text-base text-on-surface truncate group-hover:text-primary transition-colors">{order.itemsSummary}</p>
                <p className="font-body text-xs text-on-surface-variant mt-1 font-medium uppercase tracking-wider">{order.id} · {order.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-between md:justify-end w-full md:w-auto pl-[84px] md:pl-0 mt-1 md:mt-0">
              <span className={`text-[10px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-[0.1em] whitespace-nowrap shadow-sm ${order.badge}`}>{order.status}</span>
              <div className="text-right">
                 <p className="font-display font-bold text-lg text-primary whitespace-nowrap tracking-tight">{formatCurrency(order.total)}</p>
                 <p className="font-body text-[10px] text-on-surface-variant font-bold uppercase opacity-40">Total Amount</p>
              </div>
              <svg className="hidden md:block w-5 h-5 text-on-surface-variant opacity-0 group-hover:opacity-40 transition-all translate-x-[-10px] group-hover:translate-x-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTab;
