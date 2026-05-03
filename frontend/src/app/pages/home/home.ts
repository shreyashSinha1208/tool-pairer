import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class HomeComponent {
  ds = inject(DataService);
  get toolCount() { return this.ds.getTools()().length; }
  get userCount() { return this.ds.getUsers()().length; }
}
