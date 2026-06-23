import React from 'react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const AccountTab = ({
  settingsTab,
  setSettingsTab,
  walletBalance,
  handleTopUp,
  walletTransactions,
  formatCurrency,
  showToast,
}) => {
  const subTabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'payments', label: 'Payments' },
  ];

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8 hidden md:block">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Settings</h2>
        <p className="font-body text-on-surface-variant mt-1 font-medium">Control your account preferences and secure your data.</p>
      </div>

      {/* Settings Sub-navigation */}
      <div className="flex gap-1 bg-surface-container-low p-1 rounded-2xl mb-8 w-full max-w-md overflow-x-auto no-scrollbar snap-x">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSettingsTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-xl font-body text-sm font-bold transition-all whitespace-nowrap snap-start min-h-[44px] cursor-pointer ${
              settingsTab === tab.id 
                ? 'bg-white text-primary shadow-level-1' 
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          {settingsTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-secondary-container text-primary flex items-center justify-center font-display font-bold text-3xl shadow-sm border-4 border-white transition-transform group-hover:scale-105">AO</div>
                    <button type="button" className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white shadow-sm hover:bg-primary/90 transition-colors cursor-pointer" aria-label="Change photo">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Public Profile</h3>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1">Manage your identity on the marketplace.</p>
                  </div>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Full Name</label>
                    <input type="text" defaultValue="Adebayo O." className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Display Name</label>
                    <input type="text" defaultValue="Adebayo" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Bio</label>
                    <textarea placeholder="Tell us about yourself..." className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all min-h-[100px] resize-none" defaultValue="Passionate about local farming and high-quality organic produce. Cooking is my therapy."></textarea>
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <Button variant="primary" size="md" className="font-bold !px-10" onClick={() => showToast('Profile updated successfully!', 'success')}>Save Changes</Button>
                  </div>
                </form>
              </section>

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-6">Delivery Address</h3>
                <div className="flex flex-col gap-4">
                  <div className="bg-surface-container-low rounded-2xl p-5 flex items-start gap-4 border border-outline-variant/20 relative group">
                     <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shrink-0 shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg></div>
                     <div className="flex-1 min-w-0 pr-10">
                        <p className="font-body font-bold text-on-surface">Home · Primary</p>
                        <p className="font-body text-sm text-on-surface-variant mt-1 leading-relaxed">14 Admiralty Way, Lekki Phase 1, Lagos State, Nigeria</p>
                     </div>
                     <button type="button" className="absolute top-4 right-4 text-on-surface-variant hover:text-primary p-2 transition-colors cursor-pointer"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></button>
                  </div>
                  <button type="button" className="w-full py-4 rounded-2xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant font-body font-bold text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add New Address
                  </button>
                </div>
              </section>
              
              {/* Fixed Phone Input */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-lg text-on-surface tracking-tight mb-6">Contact Information</h3>
                <div className="flex flex-col gap-1.5 max-w-sm">
                  <label className="font-body font-bold text-sm text-on-surface px-1">Phone Number</label>
                  <input type="tel" defaultValue="+234 800 123 4567" inputMode="tel" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                </div>
              </section>
            </div>
          )}

          {settingsTab === 'notifications' && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Market Alerts</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { title: 'New Harvest Arrivals', desc: 'Get notified when new seasonal products hit the store.', default: true },
                    { title: 'Weekly Price Drops', desc: 'Never miss a discount on your favorite grains.', default: true },
                    { title: 'Farmer Stories', desc: 'Read highlights from our partner farms across the country.', default: false },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0">
                      <div className="max-w-[80%]">
                        <p className="font-body font-bold text-on-surface">{item.title}</p>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Account Activity</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { title: 'Order Status Updates', desc: 'Critical updates on your delivery progress.', default: true },
                    { title: 'Payment Confirmations', desc: 'Receipts and transaction alerts.', default: true },
                    { title: 'Security Alerts', desc: 'Notified of new logins or profile changes.', default: true },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0">
                      <div className="max-w-[80%]">
                        <p className="font-body font-bold text-on-surface">{item.title}</p>
                        <p className="font-body text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                        <div className="w-11 h-6 bg-surface-container rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {settingsTab === 'security' && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-2">Change Password</h3>
                <p className="font-body text-sm text-on-surface-variant font-medium mb-8">Choose a strong password to protect your account.</p>
                
                <form className="flex flex-col gap-5 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-bold text-sm text-on-surface px-1">New Password</label>
                    <input type="password" placeholder="Min. 8 characters" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body font-bold text-sm text-on-surface px-1">Confirm New Password</label>
                    <input type="password" placeholder="Repeat new password" className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" />
                  </div>
                  <div className="pt-4">
                    <Button variant="primary" size="md" className="font-bold !px-10" onClick={() => showToast('Password updated successfully!', 'success')}>Update Password</Button>
                  </div>
                </form>
              </section>

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 border-red-500/10">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-2">Danger Zone</h3>
                <p className="font-body text-sm text-on-surface-variant font-medium mb-8">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="ghost" className="!text-error !border-error/20 hover:!bg-error/5" onClick={() => showToast('Account deletion protection active.', 'warning')}>Delete My Account</Button>
              </section>
            </div>
          )}

          {settingsTab === 'payments' && (
            <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-2 duration-300">
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/5 rounded-bl-full pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 relative z-10">
                  <div>
                    <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Market Wallet</h3>
                    <p className="font-body text-sm text-on-surface-variant font-medium mt-1">Stored funds for instant, one-click shopping.</p>
                  </div>
                  <div className="text-right">
                     <p className="font-body text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Balance</p>
                     <p className="font-display font-bold text-3xl text-primary tracking-tighter">{formatCurrency(walletBalance)}</p>
                  </div>
                </div>

                <div className="flex gap-3 flex-wrap relative z-10">
                   <Button variant="primary" size="sm" className="font-bold !px-8" onClick={() => handleTopUp(5000)}>Top Up ₦5,000</Button>
                   <Button variant="ghost" size="sm" className="font-bold !px-8" onClick={() => handleTopUp(10000)}>Top Up ₦10,000</Button>
                   <Button variant="ghost" size="sm" className="font-bold !px-8" onClick={() => showToast('Enter custom amount flow coming soon.', 'success')}>Custom Amount</Button>
                </div>
              </section>

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <h3 className="font-display font-bold text-xl text-on-surface tracking-tight">Saved Methods</h3>
                  <Badge variant="green">2 Active</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="rounded-3xl bg-primary text-white p-6 shadow-level-2 relative overflow-hidden group h-[200px] flex flex-col justify-between border-b-4 border-secondary-container">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 flex justify-between items-start">
                       <div className="w-10 h-6 bg-white/20 rounded-md"></div>
                       <p className="font-body text-[10px] font-bold tracking-[0.2em] opacity-60">CARD · PRIMARY</p>
                    </div>
                    <div className="relative z-10">
                      <p className="font-display font-bold text-2xl tracking-tighter">•••• •••• •••• 2048</p>
                      <div className="flex justify-between items-center mt-6 text-[11px] font-bold uppercase tracking-widest opacity-80">
                        <span>EXP 08/28</span>
                        <span className="bg-white/20 px-2 py-1 rounded">ADEBAYO O.</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-low p-6 flex flex-col justify-between h-[200px]">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21v-4m18 4v-4M3 10h18M5 10V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3m0 11H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2z"></path></svg></div>
                        <p className="font-body text-[10px] font-bold tracking-[0.2em] text-on-surface-variant opacity-60 uppercase">READY</p>
                      </div>
                      <h4 className="font-display font-bold text-xl text-on-surface mt-6 tracking-tight">Bank Transfer</h4>
                      <p className="font-body text-xs text-on-surface-variant font-medium mt-1">FCMB Virtual Account</p>
                    </div>
                    <button type="button" className="font-body text-xs text-primary font-bold hover:underline self-start cursor-pointer">Update Details</button>
                  </div>
                </div>

                <button type="button" className="w-full py-4 rounded-2xl border-2 border-dashed border-outline-variant/50 text-on-surface-variant font-body font-bold text-sm hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Link New Method
                </button>
              </section>

              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
                <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Wallet Activity</h3>
                <div className="flex flex-col gap-1">
                  {walletTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between py-4 border-b border-outline-variant/10 last:border-0 hover:bg-background/30 px-2 -mx-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-secondary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                            {tx.amount > 0 ? (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                            ) : (
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                            )}
                         </div>
                         <div>
                          <p className="font-body font-bold text-on-surface">{tx.type} · {tx.id}</p>
                          <p className="font-body text-[11px] text-on-surface-variant font-medium mt-0.5">{tx.date} · {tx.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-display font-bold ${tx.amount > 0 ? 'text-primary' : 'text-on-surface'}`}>
                          {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Right: Membership Snapshot (Visible across all settings) */}
        <div className="flex flex-col gap-6">
          <section className="bg-primary text-white rounded-3xl p-8 shadow-level-2 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full"></div>
             <Badge variant="green" className="!bg-secondary-container !text-primary font-bold border-none mb-6">Silver Member</Badge>
             <h4 className="font-display font-bold text-xl tracking-tight leading-tight">You've saved {formatCurrency(4200)} this year.</h4>
             <p className="font-body text-white/60 text-sm mt-4 leading-relaxed font-medium">Keep shopping direct to reach **Gold Member** status and unlock free delivery on all orders.</p>
             <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-body text-xs font-bold text-white/50 uppercase tracking-widest">Active since</span>
                <span className="font-body text-xs font-bold">FEB 2025</span>
             </div>
          </section>

          <section className="bg-white rounded-3xl p-6 shadow-level-1 border border-outline-variant/30">
             <h4 className="font-display font-bold text-lg text-on-surface tracking-tight mb-5">Quick Preferences</h4>
             <div className="flex flex-wrap gap-2">
               {['Organic only', 'Local delivery', 'Bulk orders', 'Glass packaging'].map(p => (
                 <button key={p} type="button" className="px-3 py-1.5 rounded-xl border border-outline-variant/40 font-body text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all cursor-pointer">{p}</button>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
