import { Card } from '@/components/ui/card';
import { ValidationLayer } from '@/types';
import { getThreatColor } from '@/services/mockData';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface ValidationLayerCardProps {
  layer: ValidationLayer;
}

export function ValidationLayerCard({ layer }: ValidationLayerCardProps) {
  const threatColor = getThreatColor(layer.threatLevel);
  const statusIcon =
    layer.status === 'critical'
      ? AlertTriangle
      : layer.status === 'alert'
        ? Activity
        : CheckCircle;
  const StatusIcon = statusIcon;

  const statusColor =
    layer.status === 'critical'
      ? 'text-red-600'
      : layer.status === 'alert'
        ? 'text-orange-600'
        : 'text-green-600';

  return (
    <Card className="p-6 border-l-4" style={{ borderLeftColor: threatColor }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{layer.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {layer.lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <StatusIcon className={`${statusColor} flex-shrink-0`} size={24} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Data Points</p>
          <p className="text-2xl font-bold">{layer.dataPoints.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: threatColor }}
            ></div>
            <span className="text-sm font-semibold capitalize">{layer.status}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full transition-all"
          style={{
            width: `${Math.min((layer.dataPoints / 3000) * 100, 100)}%`,
            backgroundColor: threatColor,
          }}
        ></div>
      </div>
    </Card>
  );
}
