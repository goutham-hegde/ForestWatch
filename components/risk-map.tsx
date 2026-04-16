'use client';

import { Card } from '@/components/ui/card';
import { Location } from '@/types';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamic import for the map to avoid SSR issues with Leaflet
const MapInner = dynamic(() => import('./map-inner'), {
  ssr: false,
  loading: () => <Skeleton className="h-[400px] w-full rounded-lg" />,
});

interface RiskMapProps {
  locations: Location[];
}

export function RiskMap({ locations }: RiskMapProps) {
  const groupByThreat = {
    critical: locations.filter(l => l.threatLevel === 'critical'),
    high: locations.filter(l => l.threatLevel === 'high'),
    medium: locations.filter(l => l.threatLevel === 'medium'),
    low: locations.filter(l => l.threatLevel === 'low'),
  };

  return (
    <Card className="p-6 col-span-2 bg-gradient-to-br from-card to-card/50 border border-border hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          🗺️ Interactive Risk Map
        </h3>
        <div className="flex gap-2">
          {Object.keys(groupByThreat).map((level) => (
            <div key={level} className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                level === 'critical' ? 'bg-destructive' : 
                level === 'high' ? 'bg-orange-500' : 
                level === 'medium' ? 'bg-yellow-500' : 'bg-primary'
              }`}></div>
              <span className="text-[10px] capitalize text-muted-foreground font-medium">{level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* The Interactive Map */}
        <MapInner locations={locations} />

        {/* Legend/Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {locations.map(loc => (
            <div 
              key={loc.id} 
              className={`p-3 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                loc.threatLevel === 'critical' ? 'bg-red-50 border-red-200' :
                loc.threatLevel === 'high' ? 'bg-orange-50 border-orange-200' :
                loc.threatLevel === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}
            >
              <p className={`font-bold text-sm ${
                loc.threatLevel === 'critical' ? 'text-red-700' :
                loc.threatLevel === 'high' ? 'text-orange-700' :
                loc.threatLevel === 'medium' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>{loc.name}</p>
              <p className="text-[10px] opacity-80 font-medium">{loc.temperature}°C • {loc.humidity}% RH</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
