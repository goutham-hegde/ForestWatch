import {
  MetricCardData,
  Location,
  ValidationLayer,
  IoTDevice,
  ImpactData,
  SystemStatus,
  FireAlert,
  ThreatLevel,
} from '@/types';

export function getMockMetrics(): MetricCardData[] {
  return [
    {
      id: '1',
      title: 'Active Zones',
      value: 12,
      threatLevel: 'high',
      change: 2,
      changeType: 'increase',
    },
    {
      id: '2',
      title: 'Avg Temperature',
      value: 38,
      unit: '°C',
      threatLevel: 'medium',
      change: -2,
      changeType: 'decrease',
    },
    {
      id: '3',
      title: 'Alert Status',
      value: 5,
      threatLevel: 'critical',
      change: 1,
      changeType: 'increase',
    },
    {
      id: '4',
      title: 'Air Quality',
      value: 'Moderate',
      threatLevel: 'medium',
    },
  ];
}

export function getMockLocations(): Location[] {
  return [
    {
      id: 'loc-1',
      name: 'Corbett National Park',
      lat: 29.5300,
      lng: 78.7747,
      threatLevel: 'critical',
      temperature: 42,
      humidity: 15,
    },
    {
      id: 'loc-2',
      name: 'Mussoorie Hills',
      lat: 30.4599,
      lng: 78.0664,
      threatLevel: 'high',
      temperature: 39,
      humidity: 22,
    },
    {
      id: 'loc-3',
      name: 'Rishikesh Forest',
      lat: 30.0741,
      lng: 78.2983,
      threatLevel: 'medium',
      temperature: 35,
      humidity: 28,
    },
    {
      id: 'loc-4',
      name: 'Nainital Range',
      lat: 29.3803,
      lng: 79.4636,
      threatLevel: 'low',
      temperature: 32,
      humidity: 35,
    },
  ];
}

export function getMockValidationLayers(): ValidationLayer[] {
  return [
    {
      id: 'sat-1',
      name: 'Satellite Heat Maps',
      status: 'critical',
      dataPoints: 2456,
      lastUpdate: new Date(Date.now() - 5 * 60000),
      threatLevel: 'critical',
    },
    {
      id: 'iot-1',
      name: 'IoT Sensor Network',
      status: 'alert',
      dataPoints: 342,
      lastUpdate: new Date(Date.now() - 2 * 60000),
      threatLevel: 'high',
    },
    {
      id: 'drone-1',
      name: 'Drone Feed Analysis',
      status: 'alert',
      dataPoints: 89,
      lastUpdate: new Date(Date.now() - 3 * 60000),
      threatLevel: 'high',
    },
  ];
}

export function getMockIoTDevices(): IoTDevice[] {
  return [
    {
      id: 'device-1',
      name: 'Temperature Sensor A1',
      location: 'Corbett National Park',
      deviceType: 'temperature',
      status: 'alert',
      lastReading: 42.5,
      battery: 85,
      lastUpdate: new Date(Date.now() - 2 * 60000),
      coordinates: { lat: 29.531, lng: 78.775 },
    },
    {
      id: 'device-2',
      name: 'Humidity Sensor B2',
      location: 'Mussoorie Hills',
      deviceType: 'humidity',
      status: 'online',
      lastReading: 22.1,
      battery: 92,
      lastUpdate: new Date(Date.now() - 1 * 60000),
      coordinates: { lat: 30.460, lng: 78.067 },
    },
    {
      id: 'device-3',
      name: 'Smoke Detector C1',
      location: 'Rishikesh Forest',
      deviceType: 'smoke',
      status: 'alert',
      lastReading: 185,
      battery: 78,
      lastUpdate: new Date(Date.now() - 3 * 60000),
      coordinates: { lat: 30.075, lng: 78.299 },
    },
    {
      id: 'device-4',
      name: 'Motion Sensor D3',
      location: 'Nainital Range',
      deviceType: 'motion',
      status: 'online',
      lastReading: 3,
      battery: 88,
      lastUpdate: new Date(Date.now() - 1 * 60000),
      coordinates: { lat: 29.381, lng: 79.464 },
    },
  ];
}

export function getMockImpactData(): ImpactData[] {
  const data: ImpactData[] = [];
  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    data.push({
      date: months[d.getMonth()],
      incidents: Math.floor(Math.random() * 15) + 8,
      area: Math.floor(Math.random() * 500) + 245,
      severity: Math.floor(Math.random() * 40) + 50,
    });
  }
  return data;
}

export function getMockSystemStatus(): SystemStatus {
  return {
    satellites: 3,
    iotDevices: {
      total: 6,
      active: 5,
    },
    drones: {
      total: 3,
      active: 2,
    },
  };
}

export function getMockFireAlerts(): FireAlert[] {
  return [
    {
      id: 'alert-1',
      locationId: 'loc-1',
      locationName: 'North Ridge',
      severity: 'critical',
      timestamp: new Date(),
      description: 'High temperature readings and smoke detected. Fire confirmation in progress.',
      layersConfirmed: ['satellite', 'iot'],
    },
  ];
}

export function getThreatColor(level: ThreatLevel): string {
  const colors: Record<ThreatLevel, string> = {
    low: '#22c55e',
    medium: '#eab308',
    high: '#f97316',
    critical: '#dc2626',
  };
  return colors[level] || '#94a3b8';
}
