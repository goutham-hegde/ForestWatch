import { Sidebar } from '@/components/sidebar';
import { api } from '@/services/api';
import { RiskMap } from '@/components/risk-map';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default async function MapPage() {
  const locations = await api.getLocations();

  const threatByLevel = {
    critical: locations.filter(l => l.threatLevel === 'critical'),
    high: locations.filter(l => l.threatLevel === 'high'),
    medium: locations.filter(l => l.threatLevel === 'medium'),
    low: locations.filter(l => l.threatLevel === 'low'),
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8 font-sans">
          <h1 className="text-4xl font-bold text-foreground mb-2">Command Map</h1>
          <p className="text-muted-foreground">
            Operational command center with real-time geospatial threat assessment
          </p>
        </div>

        {/* Interactive Map and Legend */}
        <div className="mb-8">
          <RiskMap locations={locations} />
        </div>

        {/* Threat Zones Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-l-4 border-l-red-600">
            <p className="text-sm text-muted-foreground mb-1">Critical Zones</p>
            <p className="text-3xl font-bold text-red-600">{threatByLevel.critical.length}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-orange-500">
            <p className="text-sm text-muted-foreground mb-1">High Threat</p>
            <p className="text-3xl font-bold text-orange-600">{threatByLevel.high.length}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <p className="text-sm text-muted-foreground mb-1">Medium</p>
            <p className="text-3xl font-bold text-yellow-600">{threatByLevel.medium.length}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-muted-foreground mb-1">Low Risk</p>
            <p className="text-3xl font-bold text-green-600">{threatByLevel.low.length}</p>
          </Card>
        </div>

        {/* Locations Grid */}
        <div className="space-y-6">
          {/* Critical */}
          {threatByLevel.critical.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-red-600" />
                <h2 className="text-xl font-bold text-red-900">Critical Zones</h2>
                <span className="ml-auto text-sm text-red-600 font-medium">
                  {threatByLevel.critical.length} location(s)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {threatByLevel.critical.map(location => (
                  <Card
                    key={location.id}
                    className="p-4 bg-red-50 border-red-200 border-2"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-red-900">{location.name}</h3>
                        <p className="text-xs text-red-700 mt-1">
                          {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                        CRITICAL
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-red-600 font-semibold text-lg">{location.temperature}°C</p>
                        <p className="text-xs text-red-600">Temperature</p>
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-red-600 font-semibold text-lg">{location.humidity}%</p>
                        <p className="text-xs text-red-600">Humidity</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* High */}
          {threatByLevel.high.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                High Threat Zones
                <span className="ml-auto text-sm text-orange-600 font-medium">
                  {threatByLevel.high.length} location(s)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {threatByLevel.high.map(location => (
                  <Card
                    key={location.id}
                    className="p-4 bg-orange-50 border-orange-200 border-2"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-orange-900">{location.name}</h3>
                        <p className="text-xs text-orange-700 mt-1">
                          {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                        HIGH
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-orange-600 font-semibold text-lg">{location.temperature}°C</p>
                        <p className="text-xs text-orange-600">Temperature</p>
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-orange-600 font-semibold text-lg">{location.humidity}%</p>
                        <p className="text-xs text-orange-600">Humidity</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Medium */}
          {threatByLevel.medium.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Medium Zones
                <span className="ml-auto text-sm text-yellow-600 font-medium">
                  {threatByLevel.medium.length} location(s)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {threatByLevel.medium.map(location => (
                  <Card
                    key={location.id}
                    className="p-4 bg-yellow-50 border-yellow-200 border-2"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-yellow-900">{location.name}</h3>
                        <p className="text-xs text-yellow-700 mt-1">
                          {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded">
                        MEDIUM
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-yellow-600 font-semibold text-lg">{location.temperature}°C</p>
                        <p className="text-xs text-yellow-600">Temperature</p>
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-yellow-600 font-semibold text-lg">{location.humidity}%</p>
                        <p className="text-xs text-yellow-600">Humidity</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Low */}
          {threatByLevel.low.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Low Risk Zones
                <span className="ml-auto text-sm text-green-600 font-medium">
                  {threatByLevel.low.length} location(s)
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {threatByLevel.low.map(location => (
                  <Card
                    key={location.id}
                    className="p-4 bg-green-50 border-green-200 border-2"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-green-900">{location.name}</h3>
                        <p className="text-xs text-green-700 mt-1">
                          {location.lat.toFixed(4)}°, {location.lng.toFixed(4)}°
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded">
                        LOW
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-green-600 font-semibold text-lg">{location.temperature}°C</p>
                        <p className="text-xs text-green-600">Temperature</p>
                      </div>
                      <div className="bg-white/60 p-2 rounded">
                        <p className="text-green-600 font-semibold text-lg">{location.humidity}%</p>
                        <p className="text-xs text-green-600">Humidity</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
