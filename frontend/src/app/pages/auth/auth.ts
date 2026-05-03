import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { LocationService } from '../../services/location.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
})
export class AuthModalComponent implements OnDestroy {

  auth = inject(AuthService);
  ds = inject(DataService);
  locService = inject(LocationService);
  mapService = inject(MapService);

  step = signal(1);
  locating = signal(false);         
  locationDone = signal(false);     
  locationError = signal('');        
  nearbyHubs = signal<string[]>([]); 
  noHubsFound = signal(false);       

  loginForm = { email: '', password: '' };
  signupForm = { fullName: '', email: '', password: '', hub: '', isNewHub: false, newHubName: '' };

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

        const mockNearby = this.ds.getUsers()()
          .map(u => u.name + "'s Hub")
          .slice(0, 2);

        this.nearbyHubs.set(mockNearby);
        this.noHubsFound.set(mockNearby.length === 0);
        
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

  get locationAddress() {
    return this.locService.address;
  }

  switchMode(m: 'login' | 'signup') {
    this.auth.authMode.set(m);
    this.step.set(1);
    this.locationDone.set(false);
    this.signupForm = { fullName: '', email: '', password: '', hub: '', isNewHub: false, newHubName: '' };
  }

  nextStep() { this.step.set(2); }
  prevStep() { this.step.set(1); }
  closeModal() { this.auth.close(); }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).id === 'auth-backdrop') this.closeModal();
  }

  submitLogin() { this.auth.login('1'); }
  submitSignup() { this.auth.login('1'); }

  ngOnDestroy() {
    this.mapService.destroyMap(); 
  }
}