'use client';

import { useState } from 'react';
import { IoTDevice } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  Battery,
  WifiOff,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

interface DeviceTableProps {
  devices: IoTDevice[];
}

export function DeviceTable({ devices }: DeviceTableProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline' | 'alert'>('all');

  const filteredDevices = devices.filter(device => {
    const matchesSearch =
      device.name.toLowerCase().includes(search.toLowerCase()) ||
      device.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' || device.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer size={18} className="text-orange-500" />;
      case 'humidity':
        return <Droplets size={18} className="text-blue-500" />;
      case 'smoke':
        return <Wind size={18} className="text-gray-500" />;
      case 'motion':
        return <Activity size={18} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'offline':
        return <WifiOff size={18} className="text-red-500" />;
      case 'alert':
        return <AlertTriangle size={18} className="text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Search Devices
            </label>
            <Input
              placeholder="Search by name or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Filter by Status
            </label>
            <div className="flex gap-2">
              {(['all', 'online', 'offline', 'alert'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? status === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : status === 'online'
                          ? 'bg-green-100 text-green-900'
                          : status === 'offline'
                            ? 'bg-red-100 text-red-900'
                            : 'bg-orange-100 text-orange-900'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Reading</TableHead>
              <TableHead className="text-right">Battery</TableHead>
              <TableHead className="text-right">Last Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map(device => (
              <TableRow key={device.id}>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(device.deviceType)}
                    <span className="text-sm capitalize">{device.deviceType}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {device.location}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(device.status)}
                    <span className="text-sm capitalize">{device.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">
                  {device.lastReading.toFixed(1)}
                  {device.deviceType === 'temperature' && '°C'}
                  {device.deviceType === 'humidity' && '%'}
                  {device.deviceType === 'smoke' && ' ppm'}
                  {device.deviceType === 'motion' && ' events'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Battery size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium">{device.battery}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-sm text-muted-foreground">
                  {device.lastUpdate.toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredDevices.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No devices found matching your criteria.</p>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-1">Total Devices</p>
          <p className="text-2xl font-bold">{devices.length}</p>
        </Card>
        <Card className="p-4 border-green-200">
          <p className="text-sm text-muted-foreground mb-1">Online</p>
          <p className="text-2xl font-bold text-green-600">
            {devices.filter(d => d.status === 'online').length}
          </p>
        </Card>
        <Card className="p-4 border-orange-200">
          <p className="text-sm text-muted-foreground mb-1">Alerts</p>
          <p className="text-2xl font-bold text-orange-600">
            {devices.filter(d => d.status === 'alert').length}
          </p>
        </Card>
        <Card className="p-4 border-red-200">
          <p className="text-sm text-muted-foreground mb-1">Offline</p>
          <p className="text-2xl font-bold text-red-600">
            {devices.filter(d => d.status === 'offline').length}
          </p>
        </Card>
      </div>
    </div>
  );
}
