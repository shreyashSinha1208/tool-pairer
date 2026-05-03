import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class NavbarComponent {
  auth = inject(AuthService);
  router = inject(Router);

  goToProfile() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/user', this.auth.currentUserId()]);
    } else {
      this.auth.openLogin();
    }
  }
}