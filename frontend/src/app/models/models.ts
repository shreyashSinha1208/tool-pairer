export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rating: number;
  hubId: string;
  ownedTools?: Tool[];
}

export interface Hub {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  residents?: User[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  status: ToolStatus;
  dailyRate: number;
  ownerId: string;
  owner?: User;
  currentBorrowerId?: string;
}

export enum ToolStatus {
  Available = "AVAILABLE",
  Requested = "REQUESTED",
  Borrowed = "BORROWED"
}