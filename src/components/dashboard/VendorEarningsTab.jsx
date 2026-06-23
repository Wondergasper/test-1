import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const VendorEarningsTab = ({
  earningsSummary,
  payoutHistory = [],
  formatCurrency,
  onRequestPayout
}) => {
  const canRequest = earningsSummary?.pendingPayout > 0;

  return (
    <div className="animate-in fade-in duration-300 text-left">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Earnings Reports</h2>
        <p className="font-body text-sm text-on-surface-variant mt-1 font-medium font-semibold">Track payouts, check pending balances, and request instant bank settlements.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 border border-outline-variant/15 shadow-soft flex flex-col justify-between h-40 hover:shadow-level-1 transition-all">
          <div>
            <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">Total Revenue</p>
            <p className="font-display font-bold text-3xl text-on-surface mt-3">{formatCurrency(earningsSummary?.totalRevenue || 0)}</p>
          </div>
          <p className="font-body text-[10px] text-primary font-bold uppercase tracking-wider">Accumulated Sales</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-outline-variant/15 shadow-soft flex flex-col justify-between h-40 hover:shadow-level-1 transition-all">
          <div>
            <p className="font-body text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">Paid Earnings</p>
            <p className="font-display font-bold text-3xl text-primary mt-3">{formatCurrency(earningsSummary?.paidEarnings || 0)}</p>
          </div>
          <p className="font-body text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Settled to bank account</p>
        </div>

        {/* Pending Payout / Action Card */}
        <div className="bg-primary text-white rounded-3xl p-6 shadow-level-2 flex flex-col justify-between h-40 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full group-hover:scale-105 transition-transform"></div>
          <div>
            <div className="flex justify-between items-center relative z-10">
              <p className="font-body text-[10px] text-white/50 uppercase tracking-widest font-bold">Pending Payout</p>
              <Badge variant="green" className="!bg-secondary-container !text-primary border-none">Cleared</Badge>
            </div>
            <p className="font-display font-bold text-3xl text-secondary-container mt-3 relative z-10">{formatCurrency(earningsSummary?.pendingPayout || 0)}</p>
          </div>
          <button
            onClick={onRequestPayout}
            disabled={!canRequest}
            className={`w-full py-2 px-4 rounded-xl font-body text-xs font-bold transition-all relative z-10 cursor-pointer ${
              canRequest 
                ? 'bg-secondary-container text-primary hover:bg-secondary-container/90 active:scale-95' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
            }`}
          >
            Request Payout
          </button>
        </div>
      </div>

      {/* Payout History */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
        <h3 className="font-display font-bold text-lg text-on-surface mb-6">Payout History</h3>
        
        <div className="flex flex-col gap-3">
          {payoutHistory.length === 0 ? (
            <p className="font-body text-xs text-on-surface-variant font-medium text-center py-6">No previous payouts completed.</p>
          ) : (
            payoutHistory.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-4 border-b border-outline-variant/10 last:border-0 hover:bg-background/20 px-2 -mx-2 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/10 text-primary flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  </div>
                  <div>
                    <p className="font-body font-bold text-sm text-on-surface">{tx.id} · {tx.bankName}</p>
                    <p className="font-body text-xs text-on-surface-variant mt-0.5 font-medium">{tx.date} · {tx.status}</p>
                  </div>
                </div>
                <p className="font-display font-bold text-base text-primary">
                  {formatCurrency(tx.amount)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default VendorEarningsTab;
