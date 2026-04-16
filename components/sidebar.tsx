'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Map,
  Zap,
  Network,
  TrendingUp,
  Activity,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Command Map',
    href: '/map',
    icon: Map,
  },
  {
    name: 'Multi-Layer Validation',
    href: '/validation',
    icon: Zap,
  },
  {
    name: 'IoT Network',
    href: '/devices',
    icon: Network,
  },
  {
    name: 'Impact Analytics',
    href: '/analytics',
    icon: TrendingUp,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 text-slate-50 border-r border-slate-800 flex flex-col font-sans">
      {/* Header with Professional Style */}
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-slate-800 rounded-lg">
            <Activity size={24} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">ForestWatch</h1>
        </div>
        <p className="text-xs text-slate-400 ml-11 uppercase tracking-widest font-semibold">Surveillance System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-emerald-500' : ''} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-xs font-semibold text-sidebar-foreground">Operational</p>
        </div>
        <p className="text-xs text-sidebar-foreground/60">Last sync: 2 min ago</p>
      </div>
    </aside>
  );
}
