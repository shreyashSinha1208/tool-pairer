export interface User {
  id: string;
  name: string;
  email: string;
  hubId: string;       // Needed to filter tools by building
  rating: number;      // To show the 5-star trust score
}

export interface Hub {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  dailyRate: number;   // Added this in backend
  status: ToolStatus;  // 'Available', 'Borrowed', etc.
  ownerId: string;
  owner?: User;        // Nested object instead of ownerName
}

// Keep your Enums in sync with the backend
export enum ToolStatus {
  Available = "AVAILABLE",
  Requested = "REQUESTED",
  Borrowed = "BORROWED"
}