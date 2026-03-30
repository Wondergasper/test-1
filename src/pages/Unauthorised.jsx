import React from 'react';
import Button from '../components/ui/Button';

const Unauthorised = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      </div>
      <h1 className="font-display font-bold text-3xl text-text">Unauthorised Access</h1>
      <p className="font-body text-muted mt-2 max-w-sm">You do not have permission to view the Farm Connect Ops dashboard. Only active farmers and staff can access this area.</p>
      <Button variant="primary" size="md" className="mt-8" href="/dashboard/customer">Go to My Dashboard</Button>
    </div>
  );
};

export default Unauthorised;
