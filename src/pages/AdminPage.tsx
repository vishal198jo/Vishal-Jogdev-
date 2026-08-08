import React, { useEffect } from 'react';

export const AdminPage: React.FC = () => {
  useEffect(() => {
    window.location.href = '/admin.html';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-6 text-stone-100">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mb-4"></div>
      <p className="text-sm font-semibold text-stone-300">Redirecting to Admin Portal...</p>
    </div>
  );
};
