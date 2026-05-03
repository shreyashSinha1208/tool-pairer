import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User, Tool } from '../../models/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tool-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tool-card.html',
})
export class ToolCardComponent {
  @Input() tool!: Tool;
  private dataService = inject(DataService);

  get ownerName(): string {
    const user = this.dataService.getUserById(this.tool.ownerId);
    return user ? user.name : 'Unknown Owner';
  }
}
