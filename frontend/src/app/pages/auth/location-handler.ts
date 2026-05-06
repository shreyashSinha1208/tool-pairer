import { Injectable, inject, signal } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { MapService } from '../../services/map.service';
import { DataService } from '../../services/data.service';

@Injectable({ providedIn: 'root' })
export class LocationHandler {
  private locService = inject(LocationService);
  private mapService = inject(MapService);
  private ds = inject(DataService);

  locating = signal(false);
  locationDone = signal(false);
  locationError = signal('');
  nearbyHubs = signal<any[]>([]);
  noHubsFound = signal(false);

  async requestGPS() {
    this.locating.set(true);
    this.locationError.set('');

    if (!navigator.geolocation) {
      this.locationError.set('Geolocation not supported.');
      this.locating.set(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        this.locService.coords.set({ lat: latitude, lng: longitude });

        const address = await this.locService.getAddress(latitude, longitude);
        const hubs = await this.ds.getNearbyHubs(latitude, longitude) ?? [];
        this.nearbyHubs.set(hubs);
        this.noHubsFound.set(hubs.length === 0);

        this.locationDone.set(true);
        this.locating.set(false);

        setTimeout(() => {
          this.mapService.initMap('auth-map', latitude, longitude, address);
        }, 150);
      },
      () => {
        this.locationError.set('Access denied. Please allow location.');
        this.locating.set(false);
      }
    );
  }

  resetLocation() {
    this.locating.set(false);
    this.locationDone.set(false);
    this.locationError.set('');
    this.nearbyHubs.set([]);
    this.noHubsFound.set(false);
  }

  destroyMap() {
    this.mapService.destroyMap();
  }

  get address() {
    return this.locService.address;
  }
}
