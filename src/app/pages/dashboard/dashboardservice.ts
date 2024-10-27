import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DummyDataService {
  constructor() {}

  getDummyData() {
    return {
      users: this.generateUsers(),
      sales: this.generateSales(),
      tasks: this.generateTasks(),
      rooms: this.generateRooms(), // Add this line
    };
  }

  private generateUsers() {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      status: index % 2 === 0 ? 'Active' : 'Inactive',
    }));
  }

  private generateSales() {
    return Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      product: `Product ${index + 1}`,
      amount: (Math.random() * 100).toFixed(2),
      date: new Date(
        Date.now() - index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    }));
  }

  private generateTasks() {
    return Array.from({ length: 8 }, (_, index) => ({
      id: index + 1,
      title: `Task ${index + 1}`,
      assignedTo: `User ${Math.floor(Math.random() * 10) + 1}`,
      dueDate: new Date(
        Date.now() + index * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      completed: Math.random() > 0.5,
    }));
  }

  private generateRooms() {
    return Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      name: `Room ${index + 1}`,
      description: `Description for Room ${
        index + 1
      }. A beautiful room with all amenities.`,
      price: (Math.random() * 200).toFixed(2),
      image: `https://via.placeholder.com/300x150?text=Room+${index + 1}`,
    }));
  }

  getDummyRooms() {
    return this.generateRooms();
  }
}
