export type ThreatLevel = 'low' | 'medium' | 'high' | 'critical';

export interface MetricCardData {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  threatLevel?: ThreatLevel;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Location extends LocationCoordinates {
  id: string;
  name: string;
  threatLevel: ThreatLevel;
  temperature: number;
  humidity: number;
}

export interface ValidationLayer {
  id: string;
  name: string;
  status: 'active' | 'alert' | 'critical' | 'online' | 'offline';
  dataPoints: number;
  lastUpdate: Date;
  threatLevel: ThreatLevel;
}

export type DeviceType = 'temperature' | 'humidity' | 'smoke' | 'motion' | 'flame' | 'camera';

export interface IoTDevice {
  id: string;
  name: string;
  location: string;
  deviceType: DeviceType;
  status: 'online' | 'offline' | 'alert';
  lastReading: number;
  battery: number;
  lastUpdate: Date;
  coordinates?: LocationCoordinates;
}

export interface ImpactData {
  date: string;
  incidents: number;
  area: number;
  severity: number;
}

export interface SystemStatus {
  satellites: number;
  iotDevices: {
    total: number;
    active: number;
  };
  drones: {
    total: number;
    active: number;
  };
}

export interface FireAlert {
  id: string;
  locationId: string;
  locationName: string;
  severity: ThreatLevel;
  timestamp: Date;
  description: string;
  layersConfirmed: string[]; // e.g., ['satellite', 'iot', 'drone']
}
