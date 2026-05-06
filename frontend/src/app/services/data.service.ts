import { inject, Injectable, signal } from '@angular/core';
import { User, Tool, ToolStatus } from '../models/models';
import { Apollo, gql } from 'apollo-angular';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

  private apollo = inject(Apollo);

  async login(email: string, password: string) {

    const LOGIN_QUERY = gql
      `query Login($email: String!, $password: String!) {
      users(where: 
      { 
        email: { eq: $email }, password: { eq: $password } 
      }) 
      {
        id
        name
        email
        hubId
        rating
        ownedTools {
          id
          name
          description
          status
          dailyRate
          ownerId
        }
      }
    }`;

    try {
      const result = await lastValueFrom(
        this.apollo.query<any>({
          query: LOGIN_QUERY,
          variables: { email, password },
          fetchPolicy: 'no-cache'
        })
      );
      return result.data.users[0] || null;
    }
    catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async fetchUserById(id: string): Promise<User | null> {
    const GET_USER_QUERY = gql`
    query GetUser($id: UUID!) {
      userById(id: $id) { 
        id
        name
        email
        rating
        ownedTools {
          id
          name
          description
          status
          dailyRate
        }
      }
    }
  `;

    try {
      const result = await lastValueFrom(
        this.apollo.query<any>({
          query: GET_USER_QUERY,
          variables: { id }
        })
      );
      const data = result.data.userById;
      return Array.isArray(data) ? data[0] : data;
    } catch (e) {
      console.error("Fetch user error", e);
      return null;
    }
  }

  registerUser(fullName: string, email: string, selectedHubId: string) {
    throw new Error('Method not implemented.');
  }
  addHub(arg0: { name: string; latitude: number; longitude: number; address: string; }) {
    throw new Error('Method not implemented.');
  }
  getNearbyHubs(latitude: number, longitude: number) {
    throw new Error('Method not implemented.');
  }
  private users = signal<User[]>([
    { id: '1', name: 'Alex Rivera', email: 'alex@example.com', password: 'password', hubId: '1', ownedTools: [], rating: 4.8 },]);

  private tools = signal<Tool[]>([
    { id: '1', name: 'DeWalt Drill', description: '20V cordless drill, perfect for woodworking and home repairs.', ownerId: '1', status: ToolStatus.Available as const, dailyRate: 5 },]);

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
