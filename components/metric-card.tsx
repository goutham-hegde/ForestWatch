import { ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MetricCardData } from '@/types';
import { getThreatColor } from '@/services/mockData';

interface MetricCardProps {
  metric: MetricCardData;
}

export function MetricCard({ metric }: MetricCardProps) {
  const threatColor = metric.threatLevel ? getThreatColor(metric.threatLevel) : undefined;
  const bgClass = metric.threatLevel === 'critical' 
    ? 'bg-red-50 border-red-200 hover:border-red-400 shadow-red-100'
    : metric.threatLevel === 'high'
    ? 'bg-orange-50 border-orange-200 hover:border-orange-400'
    : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/50';

  return (
    <Card className={`p-6 transition-all duration-300 ${bgClass} border-2`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{metric.title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
              {metric.value}
            </h3>
            {metric.unit && <span className="text-sm font-bold text-slate-400">{metric.unit}</span>}
          </div>
        </div>
        {metric.threatLevel === 'critical' && (
          <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
            <AlertCircle size={24} className="text-red-600 animate-pulse" />
          </div>
        )}
      </div>

      {metric.change !== undefined && (
        <div className="mt-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 w-fit">
          {metric.changeType === 'increase' ? (
            <ArrowUp size={14} className="text-red-600" />
          ) : (
            <ArrowDown size={14} className="text-emerald-600" />
          )}
          <span
            className={`text-xs font-bold ${
              metric.changeType === 'increase' ? 'text-red-600' : 'text-emerald-600'
            }`}
          >
            {Math.abs(metric.change)}% {metric.changeType === 'increase' ? 'increase' : 'decrease'}
          </span>
        </div>
      )}
    </Card>
  );
}
