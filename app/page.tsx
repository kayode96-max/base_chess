'use client';

import MobileAppLayout from './components/common/MobileAppLayout';
import Link from 'next/link';

export default function Home() {
  const user = {
    name: 'ChessKing_2024',
    rating: 2450,
    eth: 0.428,
    usdc: 1250.0,
    gwei: 5420.50,
  };

  const quickStats = [
    { label: 'Games Played', value: '47', icon: 'sports_esports', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Win Rate', value: '68%', icon: 'trending_up', color: 'text-green-600 dark:text-green-400' },
    { label: 'Rating', value: '2450', icon: 'star', color: 'text-amber-600 dark:text-amber-400' },
  ];

  const recentActivity = [
    { type: 'Won', opponent: 'Master_Player', time: '2h ago', result: 'Won by resignation' },
    { type: 'Draw', opponent: 'LuckyChess', time: '1d ago', result: 'Draw by agreement' },
    { type: 'Lost', opponent: 'GrandmasterX', time: '2d ago', result: 'Lost in time' },
  ];

  return (
    <MobileAppLayout>
      <div className="relative flex h-screen max-w-md mx-auto flex-col overflow-hidden">
        {/* Header */}
        <header className="flex flex-col px-4 pt-4 pb-6 bg-background-light dark:bg-background-dark z-20 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full border-2 border-primary/30 p-0.5">
                <div className="h-full w-full rounded-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuB7i18cJ6pXr1uOnL49FTETulcMFOV9XIsxkYjjiLhyw7BULd3wmcKcH_ENXsiwS6yZAq3U1AhDVCa0o3ztA8SYWZv7G1Dl5Xs3ew8zwMiqnMb6KbVgbYvWG7n4sUaoELbtMUBqoqFaX0JYs-jty_R90WgSs3K0nIR-6AWQnZD9l4Oxwp7xsKjobR6qklZMccd20umhBawaOfTGQbSo4lrWsb3uLy2MrrgRql_fUmM9OCdznFZL-ZwCNgMS1dwZF_ETKhLUCTBYNneo)'}}></div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary tracking-widest uppercase">Welcome Back</p>
                <p className="text-lg font-bold leading-tight">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-full px-3 py-1.5 gap-1">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{user.gwei.toFixed(2)}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Gwei</span>
            </div>
          </div>

          {/* Main Stats Card */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-blue-400/20 border border-primary/30 dark:border-primary/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-1">Rating</p>
                <p className="text-3xl font-black text-primary">{user.rating}</p>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl opacity-30" style={{fontVariationSettings: '"FILL" 1'}}>emoji_events</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/20">
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">ETH Balance</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{user.eth}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] text-slate-600 dark:text-slate-400 font-bold uppercase">USDC</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{user.usdc.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-24">
          {/* Quick Stats */}
          <div className="px-4 py-6 space-y-3">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Quick Stats</h2>
            <div className="grid grid-cols-3 gap-2">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white dark:bg-[#1c2433] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <span className={`material-symbols-outlined block text-3xl mb-2 ${stat.color}`}>{stat.icon}</span>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">{stat.label}</p>
                  <p className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="px-4 py-4 space-y-2">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/(pages)/play" className="flex items-center justify-center h-12 rounded-lg bg-primary text-white font-bold hover:opacity-90 transition-opacity shadow-md shadow-primary/20">
                <span className="material-symbols-outlined mr-1">sports_esports</span>
                Play Now
              </Link>
              <Link href="/(pages)/training" className="flex items-center justify-center h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined mr-1">school</span>
                Learn
              </Link>
              <Link href="/(pages)/puzzles" className="flex items-center justify-center h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined mr-1">puzzle</span>
                Puzzles
              </Link>
              <Link href="/(pages)/coaches" className="flex items-center justify-center h-12 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined mr-1">person</span>
                Coaches
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="px-4 py-6 space-y-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Recent Activity</h2>
              <Link href="/(pages)/leaderboards" className="text-xs font-bold text-primary hover:opacity-80 transition-opacity">View all →</Link>
            </div>
            <div className="space-y-2">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1c2433] border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`flex items-center justify-center size-10 rounded-lg ${
                      activity.type === 'Won' ? 'bg-green-100 dark:bg-green-900/30' :
                      activity.type === 'Draw' ? 'bg-slate-200 dark:bg-slate-700' :
                      'bg-red-100 dark:bg-red-900/30'
                    }`}>
                      <span className={`material-symbols-outlined ${
                        activity.type === 'Won' ? 'text-green-600 dark:text-green-400' :
                        activity.type === 'Draw' ? 'text-slate-600 dark:text-slate-300' :
                        'text-red-600 dark:text-red-400'
                      }`}>
                        {activity.type === 'Won' ? 'check_circle' : activity.type === 'Draw' ? 'equal' : 'cancel'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold">{activity.opponent}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{activity.result}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="px-4 py-6 space-y-3 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-xs font-bold text-primary uppercase tracking-widest">Explore</h2>
            <div className="space-y-2">
              <Link href="/(pages)/online" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1c2433] border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">public</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Tournaments</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Join global competitions</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </Link>
              <Link href="/(pages)/wallet" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1c2433] border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">account_balance_wallet</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Wallet & Assets</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage crypto & NFTs</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </Link>
              <Link href="/(pages)/leaderboards" className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#1c2433] border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <span className="material-symbols-outlined text-amber-600 dark:text-amber-400" style={{fontVariationSettings: '"FILL" 1'}}>emoji_events</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Leaderboards</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Climb the global rankings</p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400">arrow_forward</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </MobileAppLayout>
  );
}
