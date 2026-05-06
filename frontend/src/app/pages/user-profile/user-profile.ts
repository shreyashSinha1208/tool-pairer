import { Component, inject, signal, computed, OnInit } from '@angular/core'; // Make sure OnInit is imported
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ToolCardComponent } from '../../components/tool-card/tool-card';
import { User } from '../../models/models';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ToolCardComponent],
  templateUrl: './user-profile.html',
})

export class UserProfileComponent implements OnInit {
  ds = inject(DataService);
  auth = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  user = signal<User | null>(null);

  // derivation from the user signal
  tools = computed(() => this.user()?.ownedTools || []);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('Fetching profile for ID:', id);
      const data = await this.ds.fetchUserById(id);
      this.user.set(data);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }
}