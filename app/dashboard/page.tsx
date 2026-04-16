import { Sidebar } from '@/components/sidebar';
import { MetricCard } from '@/components/metric-card';
import { RiskMap } from '@/components/risk-map';
import { api } from '@/services/api';
import { AlertCircle, Clock, Shield } from 'lucide-react';

export default async function DashboardPage() {
  const metrics = await api.getMetrics();
  const locations = await api.getLocations();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header with Gradient Background */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">
                Operational Command Center
              </h1>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  <span>Last Updated: Just now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-emerald-700 font-semibold">Systems Operational</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 rounded-lg bg-slate-900/5 border border-slate-200">
              <Shield size={32} className="text-slate-700" />
            </div>
          </div>
        </div>

        {/* Critical Alerts Section */}
        <div className="mb-8 bg-gradient-to-r from-destructive/20 via-destructive/10 to-transparent border border-destructive/40 rounded-lg p-6 flex items-start gap-4">
          <div className="p-3 bg-destructive/20 rounded-lg flex-shrink-0">
            <AlertCircle size={24} className="text-destructive" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-destructive text-lg">⚠️ 5 Critical Zones Detected</h3>
            <p className="text-sm text-foreground/80 mt-2">
              High temperature readings detected. Immediate action recommended in North Ridge and Western Valley. Fire brigades are being dispatched.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map(metric => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Maps and Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RiskMap locations={locations} />

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Satellites</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold text-slate-900">3 Online</span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">IoT Devices</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold text-slate-900">5 Active</span>
                  </div>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Drones</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-semibold text-slate-900">2 Patrolling</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-colors">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Response Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Fire Brigades</span>
                  <span className="text-sm font-semibold text-slate-900">3 Deployed</span>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Personnel</span>
                  <span className="text-sm font-semibold text-slate-900">24 Active</span>
                </div>
                <div className="w-full h-px bg-slate-100"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Avg Response</span>
                  <span className="text-sm font-semibold text-slate-900">8.5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
