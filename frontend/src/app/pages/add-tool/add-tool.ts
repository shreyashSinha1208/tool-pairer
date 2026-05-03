import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToolStatus } from '../../models/models';

@Component({
  selector: 'app-add-tool',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-tool.html',
})
export class AddToolComponent {
  ds = inject(DataService);
  router = inject(Router);

  users = this.ds.getUsers();
  submitted = signal(false);

  form = {
    name: '',
    description: '',
    ownerId: '',
    status: ToolStatus.Available as const,
    dailyRate: 0,
  };

  statuses = ['AVAILABLE', 'REQUESTED', 'BORROWED'];

  submit() {
    if (!this.form.name || !this.form.ownerId) return;
    this.ds.addTool(this.form);
    this.submitted.set(true);
    setTimeout(() => this.router.navigate(['/tools']), 1500);
  }
}
