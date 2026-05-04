import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class LocationService {
          coords = signal<{ lat: number; lng: number } | null>(null);
          address = signal('');

          private readonly mapboxToken = environment.mapboxToken;

          async getAddress(lat: number, lng: number): Promise<string> {
                    try {
                              const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.mapboxToken}&limit=1&types=poi,address`;

                              const res = await fetch(url);
                              const data = await res.json();

                              if (data.features && data.features.length > 0) {
                                        return data.features[0].place_name;
                              }
                              return 'Location found';
                    } catch (e) {
                              return 'Location found';
                    }
          }
}