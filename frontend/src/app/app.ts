import { Component } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { AuthModalComponent } from './pages/auth/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AuthModalComponent],
  template: `
    <router-outlet />
    <app-navbar />
    <app-auth-modal />
  `,
})
export class App {}