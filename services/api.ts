import {
  MetricCardData,
  Location,
  ValidationLayer,
  IoTDevice,
  ImpactData,
  SystemStatus,
  FireAlert,
} from '@/types';
import * as mockData from './mockData';

/**
 * API Service for interacting with the backend.
 * Currently uses mock data with simulated latency.
 */
class ApiService {
  private simulateLatency(ms: number = 800): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getMetrics(): Promise<MetricCardData[]> {
    await this.simulateLatency();
    return mockData.getMockMetrics();
  }

  async getLocations(): Promise<Location[]> {
    await this.simulateLatency();
    return mockData.getMockLocations();
  }

  async getValidationLayers(): Promise<ValidationLayer[]> {
    await this.simulateLatency();
    return mockData.getMockValidationLayers();
  }

  async getIoTDevices(): Promise<IoTDevice[]> {
    await this.simulateLatency();
    return mockData.getMockIoTDevices();
  }

  async getImpactData(): Promise<ImpactData[]> {
    await this.simulateLatency();
    return mockData.getMockImpactData();
  }

  async getSystemStatus(): Promise<SystemStatus> {
    await this.simulateLatency();
    return mockData.getMockSystemStatus();
  }

  async getFireAlerts(): Promise<FireAlert[]> {
    await this.simulateLatency();
    return mockData.getMockFireAlerts();
  }
}

export const api = new ApiService();
