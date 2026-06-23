import React, { useState } from 'react';
import Button from '../ui/Button';

const VendorSettingsTab = ({
  vendorProfile,
  businessInfo,
  bankDetails,
  onSaveSettings,
  showToast
}) => {
  // Local states
  const [farmName, setFarmName] = useState(businessInfo?.farmName || 'Green Field Farms');
  const [hub, setHub] = useState(businessInfo?.hub || 'Lagos Central Hub, Ikeja');
  const [cutoff, setCutoff] = useState(businessInfo?.cutoff || 'Wednesday 6:00 PM');
  
  const [bankName, setBankName] = useState(bankDetails?.bankName || 'FCMB');
  const [accountNumber, setAccountNumber] = useState(bankDetails?.accountNumber || '1029384756');
  const [accountName, setAccountName] = useState(bankDetails?.accountName || 'ADEBAYO OKOYE');

  const [fullName, setFullName] = useState(vendorProfile?.fullName || 'Adebayo Okoye');
  const [displayName, setDisplayName] = useState(vendorProfile?.displayName || 'Farmer Adebayo');
  const [bio, setBio] = useState(vendorProfile?.bio || 'Harvesting fresh crops since 2012. Supporting urban families with healthy organic grains and tubers.');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSettings = {
      vendorProfile: { fullName, displayName, bio },
      businessInfo: { farmName, hub, cutoff },
      bankDetails: { bankName, accountNumber, accountName }
    };
    onSaveSettings(updatedSettings);
  };

  return (
    <div className="animate-in fade-in duration-300 text-left">
      <div className="mb-8">
        <h2 className="font-display font-bold text-2xl text-on-surface tracking-tight">Farm Settings</h2>
        <p className="font-body text-sm text-on-surface-variant mt-1 font-medium font-semibold">Manage your business profile, hub cutoffs, and payout banking credentials.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Profile Management */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
            <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Profile Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-body font-bold text-sm text-on-surface px-1">Farmer Bio</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all min-h-[100px] resize-none" 
                />
              </div>
            </div>
          </section>

          {/* Business Information */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
            <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Farm Name</label>
                <input 
                  type="text" 
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Primary Fulfillment Hub</label>
                <input 
                  type="text" 
                  value={hub}
                  onChange={(e) => setHub(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="font-body font-bold text-sm text-on-surface px-1">Weekly Order Cutoff</label>
                <select 
                  value={cutoff}
                  onChange={(e) => setCutoff(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all cursor-pointer"
                >
                  <option>Wednesday 6:00 PM</option>
                  <option>Thursday 9:00 AM</option>
                  <option>Friday 12:00 PM</option>
                </select>
              </div>
            </div>
          </section>

          {/* Bank Details */}
          <section className="bg-white rounded-3xl p-6 md:p-8 shadow-level-1 border border-outline-variant/30">
            <h3 className="font-display font-bold text-xl text-on-surface tracking-tight mb-6">Settlement Bank Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Bank Name</label>
                <input 
                  type="text" 
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Account Number</label>
                <input 
                  type="text" 
                  pattern="[0-9]*"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-body font-bold text-sm text-on-surface px-1">Account Name</label>
                <input 
                  type="text" 
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl border border-outline-variant bg-background/50 font-body text-sm font-semibold outline-none focus:ring-2 focus:ring-secondary-container/20 transition-all" 
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right side: Save button & info */}
        <div className="flex flex-col gap-6">
          <section className="bg-white rounded-3xl p-6 shadow-level-1 border border-outline-variant/30 flex flex-col gap-4">
            <h4 className="font-display font-bold text-lg text-on-surface tracking-tight">Save Configurations</h4>
            <p className="font-body text-xs text-on-surface-variant leading-relaxed">Save your updated farm cutoff times, payouts routing, and bio preferences instantly.</p>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              className="w-full font-bold cursor-pointer"
            >
              Save Settings
            </Button>
          </section>
        </div>
      </form>
    </div>
  );
};

export default VendorSettingsTab;
