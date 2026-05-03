import { Injectable, signal } from '@angular/core';
import { User, Tool, ToolStatus } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DataService {
  private users = signal<User[]>([
    { id: '1', name: 'Alex Rivera', email: 'alex@example.com', hubId: '1', rating: 4.8 },
    { id: '2', name: 'Jordan Kim', email: 'jordan@example.com', hubId: '1', rating: 4.6 },
    { id: '3', name: 'Sam Patel', email: 'sam@example.com', hubId: '2', rating: 4.9 },
  ]);

  private tools = signal<Tool[]>([
    { id: '1', name: 'DeWalt Drill', description: '20V cordless drill, perfect for woodworking and home repairs.', ownerId: '1', status: ToolStatus.Available as const, dailyRate: 5 },
    { id: '2', name: 'Circular Saw', description: 'Makita 7-1/4" circular saw. Great for lumber cuts.', ownerId: '1', status: ToolStatus.Available as const, dailyRate: 8 },
    { id: '3', name: 'Pressure Washer', description: 'Sun Joe 2030 PSI electric pressure washer.', ownerId: '2', status: ToolStatus.Available as const, dailyRate: 12 },
    { id: '4', name: 'Ladder 8ft', description: 'Werner aluminum step ladder, 250 lb capacity.', ownerId: '2', status: ToolStatus.Available as const, dailyRate: 3 },
    { id: '5', name: 'Angle Grinder', description: 'Bosch 4.5" angle grinder for metal and tile work.', ownerId: '3', status: ToolStatus.Available as const, dailyRate: 6 },
    { id: '6', name: 'Tile Saw', description: 'SKIL 7" wet tile saw with laser guide.', ownerId: '3', status: ToolStatus.Available as const, dailyRate: 10 },
  ]);

  getTools() { return this.tools; }
  getUsers() { return this.users; }

  getUserById(id: string) {
    return this.users().find(u => u.id === id);
  }

  getToolsByOwner(ownerId: string) {
    return this.tools().filter(t => t.ownerId === ownerId);
  }

  searchTools(query: string) {
    const q = query.toLowerCase();
    return this.tools().filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q)
    );
  }

  addTool(tool: Omit<Tool, 'id'>) {
    const newTool: Tool = {
      ...tool,
      id: Date.now().toString(),
    };
    this.tools.update(tools => [...tools, newTool]);
    return newTool;
  }
}
