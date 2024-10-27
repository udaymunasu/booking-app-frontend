import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  apiUrl: string = 'http://localhost:5000/api/';
  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}auth/register`, user);
  }

  login(obj: any) {
    console.log('obj', obj); // Log the object to the console for debugging
    return this.http.post(`${this.apiUrl}auth/login`, obj);
  }

  getAllRooms() {
    return this.http.get(this.apiUrl + 'GetAllRooms');
  }

  GetBookingsByMonth(month: number) {
    return this.http.get(this.apiUrl + 'GetBookingsByMonth?month=' + month);
  }

  saveUpdateRoom(obj: any) {
    return this.http.post(this.apiUrl + 'room', obj);
  }

  deletRoom(id: any) {
    return this.http.delete(this.apiUrl + 'DeleteRoomByRoomId?roomId=' + id);
  }

  getAllCustomers() {
    return this.http.get(this.apiUrl + 'GetAllCustomers');
  }
  getAllUsers() {
    return this.http.get(`${this.apiUrl}auth/users`);
  }
  addUpdateUser(obj: any) {
    return this.http.post(this.apiUrl + 'AddUpdateUser', obj);
  }
  deleteUser(id: any) {
    return this.http.delete(this.apiUrl + 'DeleteUserByUserId?userId=' + id);
  }

  createBooking(obj: any) {
    return this.http.post(this.apiUrl + 'bookroom', obj);
  }
}
