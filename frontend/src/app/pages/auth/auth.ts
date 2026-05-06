import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { LocationHandler } from './location-handler';
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
  locationHandler = inject(LocationHandler);
  step = signal(1);

  loginForm = { email: '', password: '' };
  signupForm = { fullName: '', email: '', password: '', hub: '', isNewHub: false, newHubName: '' };

  get locating() { return this.locationHandler.locating(); }
  get locationDone() { return this.locationHandler.locationDone(); }
  get locationError() { return this.locationHandler.locationError(); }
  get nearbyHubs() { return this.locationHandler.nearbyHubs(); }
  get noHubsFound() { return this.locationHandler.noHubsFound(); }
  get locationAddress() { return this.locationHandler.address; }

  async requestGPS() {
    await this.locationHandler.requestGPS();
  }

  async submitLogin() {
    try {
      const user = await this.ds.login(this.loginForm.email, this.loginForm.password) ?? {} as User;
      this.auth.login(user.id);
    } catch (e: any) {
      console.error('Login failed', e);
    }
  }

  async submitSignup() {
    try {
      let selectedHubId = this.signupForm.hub;
      if (this.signupForm.isNewHub) {

      }

      const user: User = await this.ds.registerUser(
        this.signupForm.fullName,
        this.signupForm.email,
        selectedHubId
      ) ?? {} as User;

      this.auth.login(user.id);
    } catch (e: any) {
      console.error('Signup failed', e);
    }
  }

  switchMode(m: 'login' | 'signup') {
    this.auth.authMode.set(m);
    this.step.set(1);
    this.locationHandler.resetLocation();
    this.signupForm = { fullName: '', email: '', password: '', hub: '', isNewHub: false, newHubName: '' };
  }

  nextStep() { this.step.set(2); }
  prevStep() { this.step.set(1); }
  closeModal() { this.auth.close(); }

  onBackdropClick(e: MouseEvent) {
    if ((e.target as HTMLElement).id === 'auth-backdrop') this.closeModal();
  }

  ngOnDestroy() {
    this.locationHandler.destroyMap();
  }
}