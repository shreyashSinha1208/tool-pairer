import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { LocationService } from '../../services/location.service';
import { MapService } from '../../services/map.service';
import { User } from '../../models/models';

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

  submitLogin() { this.auth.login('1'); }
  async submitSignup() {
    try {
      let selectedHubId = this.signupForm.hub;
      if (this.signupForm.isNewHub) {
        const newHub = await this.ds.addHub(
          {
            name: this.signupForm.newHubName,
            latitude: 0,
            longitude: 0,
            address: ''
          });

        const user: User = await this.ds.registerUser(
          this.signupForm.fullName,
          this.signupForm.email,
          selectedHubId
        ) ?? {} as User;

        this.auth.login(user.id);
      }
    } catch (e: any) {
      console.error('Signup failed', e);
    }
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

  ngOnDestroy() {
    this.mapService.destroyMap();
  }
}