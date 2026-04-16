'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location } from '@/types';
import { getThreatColor } from '@/services/mockData';

// Fix for Leaflet icon issues in Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapInnerProps {
  locations: Location[];
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function MapInner({ locations }: MapInnerProps) {
  const defaultCenter: [number, number] = locations.length > 0 
    ? [locations[0].lat, locations[0].lng] 
    : [30.0668, 79.0193]; // Uttarakhand fallback

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border border-border">
      <MapContainer 
        center={defaultCenter} 
        zoom={8} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((loc) => (
          <div key={loc.id}>
            <Marker position={[loc.lat, loc.lng]}>
              <Popup>
                <div className="p-1">
                  <h4 className="font-bold text-sm mb-1">{loc.name}</h4>
                  <p className="text-xs mb-1">Status: <span className="capitalize font-semibold" style={{ color: getThreatColor(loc.threatLevel) }}>{loc.threatLevel}</span></p>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">{loc.temperature}°C</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold">{loc.humidity}% RH</span>
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Threat Zone Circle */}
            <Circle 
              center={[loc.lat, loc.lng]}
              radius={loc.threatLevel === 'critical' ? 2000 : loc.threatLevel === 'high' ? 1500 : 800}
              pathOptions={{ 
                fillColor: getThreatColor(loc.threatLevel),
                color: getThreatColor(loc.threatLevel),
                fillOpacity: 0.2,
                weight: 1
              }}
            />
          </div>
        ))}
        
        <ChangeView center={defaultCenter} />
      </MapContainer>
    </div>
  );
}
