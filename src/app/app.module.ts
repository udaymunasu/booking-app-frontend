import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BookingCalenderComponent } from './pages/booking-calender/booking-calender.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { UsersComponent } from './pages/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingCalenderComponent,
    BookingListComponent,
    CustomerComponent,
    DashboardComponent,
    LayoutComponent,
    NewBookingComponent,
    RoomsComponent,
    UsersComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
