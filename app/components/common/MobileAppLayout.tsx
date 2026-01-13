import React from 'react';

/**
 * Mobile-first app layout using Tailwind and glassmorphism, matching the main_player_hub design.
 * Usage: Wrap your page content in <MobileAppLayout>...</MobileAppLayout>
 */
export default function MobileAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24 font-display">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBxm0DC_HC0y6kB_rdUul_DvCqMGnpAZPZlYh_9xgia4eRcM-al3SRxRSp37Juxg2mWo2yqtdBwzs-Iygf_mWrczrUDgZVcxBrplsHaLcFsB8SuAkwRQdLQN1p45297MXBdEvDJUzNs-aSSIfar6G0HfujKAK8Tkr4xL3SPMkn-eh8BmgmsbLuKCm7-Dm_ZcbfDNhK_MjmURk5YG7jYvOKlga5gt0rppt9WtXrflHinXOQWb7c4UIwVAfHyWZMrHRFZ4hWYnz0QFw3q)'}}></div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 size-3 rounded-full border-2 border-background-dark"></div>
            </div>
            <div>
              <h2 className="text-white text-sm font-bold leading-tight">Grandmaster_X</h2>
              <div className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Base Network</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <span className="material-symbols-outlined" style={{fontSize: 20}}>search</span>
            </button>
            <button className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
              <span className="material-symbols-outlined" style={{fontSize: 20}}>notifications</span>
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <main className="px-0 sm:px-4 pt-2">{children}</main>
    </div>
  );
}
