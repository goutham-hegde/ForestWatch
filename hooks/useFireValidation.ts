import { ValidationLayer } from '@/types';
import { useMemo } from 'react';

/**
 * Hook to calculate fire confirmation status based on multiple data layers.
 * 
 * Rules for confirmation:
 * - A fire is "Confirmed" if all three primary layers (Satellite, IoT, Drone) 
 *   report 'critical' or 'alert' status.
 * - Otherwise, it remains in "Monitoring" or "Potential Threat" status.
 */
export function useFireValidation(layers: ValidationLayer[]) {
  const validationState = useMemo(() => {
    if (!layers || layers.length === 0) {
      return {
        isConfirmed: false,
        confidenceScore: 0,
        confirmedLayers: [],
        status: 'Insufficient Data' as const,
      };
    }

    const satelliteLayer = layers.find(l => l.name.toLowerCase().includes('satellite'));
    const iotLayer = layers.find(l => l.name.toLowerCase().includes('iot'));
    const droneLayer = layers.find(l => l.name.toLowerCase().includes('drone'));

    const confirmedLayers = layers.filter(l => 
      l.status === 'critical' || l.status === 'alert'
    );

    const isSatellitePositive = satelliteLayer && (satelliteLayer.status === 'critical' || satelliteLayer.status === 'alert');
    const isIoTPositive = iotLayer && (iotLayer.status === 'critical' || iotLayer.status === 'alert');
    const isDronePositive = droneLayer && (droneLayer.status === 'critical' || droneLayer.status === 'alert');

    const isConfirmed = !!(isSatellitePositive && isIoTPositive && isDronePositive);
    
    // Confidence score calculation (0 to 100)
    let score = 0;
    if (isSatellitePositive) score += 30;
    if (isIoTPositive) score += 40;
    if (isDronePositive) score += 30;

    return {
      isConfirmed,
      confidenceScore: score,
      confirmedLayers: confirmedLayers.map(l => l.name),
      status: isConfirmed ? 'Confirmed Fire' : confirmedLayers.length > 0 ? 'Potential Threat' : 'Safe',
    };
  }, [layers]);

  return validationState;
}
