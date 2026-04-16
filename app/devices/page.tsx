import { Sidebar } from '@/components/sidebar';
import { DeviceTable } from '@/components/device-table';
import { api } from '@/services/api';
import { Network, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default async function DevicesPage() {
  const devices = await api.getIoTDevices();

  if (!devices || devices.length === 0) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="ml-64 flex-1 p-8">
          <p>No devices found.</p>
        </main>
      </div>
    );
  }

  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const alertDevices = devices.filter(d => d.status === 'alert').length;
  const avgBattery = Math.round(
    devices.reduce((sum, d) => sum + d.battery, 0) / devices.length
  );

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">IoT Device Network</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and management of all deployed sensors
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-l-4 border-l-primary">
            <p className="text-sm text-muted-foreground mb-2">Total Devices</p>
            <p className="text-3xl font-bold">{devices.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Active network</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-green-500">
            <p className="text-sm text-muted-foreground mb-2">Online</p>
            <p className="text-3xl font-bold text-green-600">{onlineDevices}</p>
            <p className="text-xs text-green-600 mt-2">{Math.round((onlineDevices / devices.length) * 100)}% operational</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-orange-500">
            <p className="text-sm text-muted-foreground mb-2">Alerts</p>
            <p className="text-3xl font-bold text-orange-600">{alertDevices}</p>
            <p className="text-xs text-orange-600 mt-2">Requiring attention</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-blue-500">
            <p className="text-sm text-muted-foreground mb-2">Avg Battery</p>
            <p className="text-3xl font-bold text-blue-600">{avgBattery}%</p>
            <p className="text-xs text-muted-foreground mt-2">Fleet average</p>
          </Card>
        </div>

        {/* Device Table */}
        <DeviceTable devices={devices} />

        {/* Network Topology */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-6">
            <Network size={24} className="text-primary" />
            <h2 className="text-2xl font-bold">Network Architecture</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <span className="text-lg">🌡️</span>
                </div>
                <h3 className="font-semibold">Temperature Sensors</h3>
              </div>
              <p className="text-2xl font-bold mb-2">
                {devices.filter(d => d.deviceType === 'temperature').length}
              </p>
              <p className="text-sm text-muted-foreground">
                Monitors ambient temperature and heat anomalies
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-lg">💧</span>
                </div>
                <h3 className="font-semibold">Humidity Sensors</h3>
              </div>
              <p className="text-2xl font-bold mb-2">
                {devices.filter(d => d.deviceType === 'humidity').length}
              </p>
              <p className="text-sm text-muted-foreground">
                Tracks moisture levels and dryness indicators
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-lg">💨</span>
                </div>
                <h3 className="font-semibold">Detection Devices</h3>
              </div>
              <p className="text-2xl font-bold mb-2">
                {devices.filter(d => ['smoke', 'motion'].includes(d.deviceType)).length}
              </p>
              <p className="text-sm text-muted-foreground">
                Smoke and motion detection for early warning
              </p>
            </Card>
          </div>
        </div>

        {/* Connectivity Info */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <Zap size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Network Status</h3>
              <p className="text-sm text-blue-800 mb-3">
                All devices are connected through a secure LoRaWAN network with hourly sync intervals. Battery levels are monitored automatically with low-battery alerts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">Signal Quality</p>
                  <p className="text-blue-600">-85 dBm (Good)</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Last Sync</p>
                  <p className="text-blue-600">2 minutes ago</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Network Range</p>
                  <p className="text-blue-600">45 km radius</p>
                </div>
                <div>
                  <p className="text-blue-700 font-medium">Data Frequency</p>
                  <p className="text-blue-600">Every 5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
