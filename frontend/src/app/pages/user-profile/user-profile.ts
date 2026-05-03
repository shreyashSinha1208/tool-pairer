import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ToolCardComponent } from '../../components/tool-card/tool-card';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ToolCardComponent],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {
  ds = inject(DataService);
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  userId = toSignal(this.route.params.pipe(map(p => p['id'] as string)), { initialValue: '' });
  user = computed(() => this.ds.getUserById(this.userId()));
  tools = computed(() => this.ds.getToolsByOwner(this.userId()));

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}