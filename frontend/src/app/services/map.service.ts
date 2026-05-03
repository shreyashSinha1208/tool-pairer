import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class MapService {
  destroyMap() {
    throw new Error('Method not implemented.');
  }
  private map: any = null;
  private readonly token = environment.mapboxToken;

  async initMap(elementId: string, lat: number, lng: number, address: string) {
    const L = await import('leaflet');

    if (this.map) { this.map.remove(); }

    this.map = L.map(elementId, { 
      attributionControl: false, 
      zoomControl: false 
    }).setView([lat, lng], 18); 

    L.tileLayer(`https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=${this.token}`, {
      tileSize: 512,
      zoomOffset: -1
    } as any).addTo(this.map);

    const customMarker = L.divIcon({
      className: 'custom-pin',
      html: `<div style="background-color: #4264fb; width: 12px; height: 12px; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });

    L.marker([lat, lng], { icon: customMarker }).addTo(this.map);
  }
}