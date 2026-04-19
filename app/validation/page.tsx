import { Sidebar } from '@/components/sidebar';
import { ValidationLayerCard } from '@/components/validation-layer-card';
import { api } from '@/services/api';
import { AlertCircle, Shield, Flame, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default async function ValidationPage() {
  const layers = await api.getValidationLayers();
  const locations = await api.getLocations();

  // Multi-layer validation logic
  const satelliteLayer = layers.find(l => l.name.toLowerCase().includes('satellite'));
  const iotLayer = layers.find(l => l.name.toLowerCase().includes('iot'));
  const droneLayer = layers.find(l => l.name.toLowerCase().includes('drone'));

  const isSatellitePositive = satelliteLayer && (satelliteLayer.status === 'critical' || satelliteLayer.status === 'alert');
  const isIoTPositive = iotLayer && (iotLayer.status === 'critical' || iotLayer.status === 'alert');
  const isDronePositive = droneLayer && (droneLayer.status === 'critical' || droneLayer.status === 'alert');

  const isFireConfirmed = !!(isSatellitePositive && isIoTPositive && isDronePositive);

  // Calculate aggregate threat level
  const threatCounts = {
    critical: layers.filter(l => l.threatLevel === 'critical').length,
    high: layers.filter(l => l.threatLevel === 'high').length,
    medium: layers.filter(l => l.threatLevel === 'medium').length,
    low: layers.filter(l => l.threatLevel === 'low').length,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Multi-Layer Validation</h1>
          <p className="text-muted-foreground">
            Real-time fire threat assessment through satellite, IoT, and drone data fusion
          </p>
        </div>

        {/* Validation Status Banner */}
        <div className={`mb-8 p-6 rounded-xl border-2 flex items-center justify-between transition-all duration-500 ${
          isFireConfirmed 
          ? 'bg-red-50 border-red-500 shadow-lg shadow-red-200' 
          : 'bg-green-50 border-green-500'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full ${isFireConfirmed ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}>
              {isFireConfirmed ? (
                <Flame className="text-white" size={32} />
              ) : (
                <CheckCircle2 className="text-white" size={32} />
              )}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isFireConfirmed ? 'text-red-700' : 'text-green-700'}`}>
                {isFireConfirmed ? 'FIRE CONFIRMED' : 'Systems Monitoring'}
              </h2>
              <p className={isFireConfirmed ? 'text-red-600 font-medium' : 'text-green-600'}>
                {isFireConfirmed 
                  ? 'All detection layers (Satellite, IoT, Drone) have returned positive flags. Emergency response initiated.' 
                  : 'Detection layers are synchronized. No confirmed fires detected at this time.'}
              </p>
            </div>
          </div>
          {isFireConfirmed && (
            <a 
              href="https://web.whatsapp.com/send?phone=919876543210&text=URGENT%20SOS%20ALERT:%20Fire%20confirmed%20by%20satellite,%20drone,%20and%20IoT%20fusion.%20Immediate%20response%20required." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold animate-bounce cursor-pointer hover:bg-red-700 block text-center"
            >
              🚨 SOS ALERT: DISPATCH VIA WHATSAPP
            </a>
          )}
        </div>

        {/* Threat Level Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-l-4 border-l-red-600">
            <p className="text-sm text-muted-foreground mb-1">Critical Threats</p>
            <p className="text-3xl font-bold text-red-600">{threatCounts.critical}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-orange-500">
            <p className="text-sm text-muted-foreground mb-1">High Alerts</p>
            <p className="text-3xl font-bold text-orange-600">{threatCounts.high}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-yellow-500">
            <p className="text-sm text-muted-foreground mb-1">Medium Warnings</p>
            <p className="text-3xl font-bold text-yellow-600">{threatCounts.medium}</p>
          </Card>
          <Card className="p-4 border-l-4 border-l-green-500">
            <p className="text-sm text-muted-foreground mb-1">Low Risk Zones</p>
            <p className="text-3xl font-bold text-green-600">{threatCounts.low}</p>
          </Card>
        </div>

        {/* Data Fusion Layers */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={24} className="text-primary" />
            <h2 className="text-2xl font-bold">Validation Layers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {layers.map(layer => (
              <ValidationLayerCard key={layer.id} layer={layer} />
            ))}
          </div>
        </div>

        {/* Affected Locations */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start gap-3 mb-6">
            <AlertCircle size={24} className="text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold">Monitored Locations</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {locations.filter(l => l.threatLevel !== 'low').length} of {locations.length} locations with elevated threat levels
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {locations.map(location => {
              const threatColors: Record<string, string> = {
                critical: 'bg-red-50 border-red-200',
                high: 'bg-orange-50 border-orange-200',
                medium: 'bg-yellow-50 border-yellow-200',
                low: 'bg-green-50 border-green-200',
              };

              const textColors: Record<string, string> = {
                critical: 'text-red-900',
                high: 'text-orange-900',
                medium: 'text-yellow-900',
                low: 'text-green-900',
              };

              return (
                <div
                  key={location.id}
                  className={`border rounded-lg p-4 ${threatColors[location.threatLevel]}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-semibold ${textColors[location.threatLevel]}`}>
                        {location.name}
                      </h4>
                      <p className={`text-sm mt-1 ${textColors[location.threatLevel]}/70`}>
                        Temperature: {location.temperature}°C | Humidity: {location.humidity}%
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        location.threatLevel === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : location.threatLevel === 'high'
                            ? 'bg-orange-200 text-orange-800'
                            : location.threatLevel === 'medium'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {location.threatLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Methodology */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <span className="text-blue-700 font-bold text-lg">📡</span>
            </div>
            <h4 className="font-semibold mb-2">Satellite Data</h4>
            <p className="text-sm text-muted-foreground">
              Thermal imaging and vegetation indices from NOAA and Copernicus satellites
            </p>
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <span className="text-green-700 font-bold text-lg">🔌</span>
            </div>
            <h4 className="font-semibold mb-2">IoT Sensors</h4>
            <p className="text-sm text-muted-foreground">
              Ground-based temperature, humidity, and smoke detection sensors
            </p>
          </Card>
          <Card className="p-6">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <span className="text-orange-700 font-bold text-lg">🚁</span>
            </div>
            <h4 className="font-semibold mb-2">Drone Feed</h4>
            <p className="text-sm text-muted-foreground">
              Real-time aerial surveillance with high-resolution thermal imaging
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
