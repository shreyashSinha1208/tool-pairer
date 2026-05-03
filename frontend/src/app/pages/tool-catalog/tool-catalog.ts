import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToolCardComponent } from '../../components/tool-card/tool-card';

@Component({
  selector: 'app-tool-catalog',
  standalone: true,
  imports: [FormsModule, ToolCardComponent],
  templateUrl: './tool-catalog.html',
})
export class ToolCatalogComponent {
  ds = inject(DataService);
  query = signal('');

  tools = computed(() => {
    const q = this.query();
    return q ? this.ds.searchTools(q) : this.ds.getTools()();
  });

  onSearch(val: string) {
    this.query.set(val);
  }
}
