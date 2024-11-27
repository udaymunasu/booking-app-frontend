import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalenderComponent } from './pages/booking-calender/booking-calender.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NewBookingComponent } from './pages/new-booking/new-booking.component';
import { UsersComponent } from './pages/users/users.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateHotelComponent } from './pages/hotels/create-hotel/create-hotel.component';
import { HotelDetailsComponent } from './pages/hotels/hotel-details/hotel-details.component';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { HotelsComponent } from './pages/hotels/hotels/hotels.component';
import { EditHotelComponent } from './pages/hotels/edit-hotel/edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'all-hotels',
        component: HotelsComponent,
      },
      { path: 'edit-hotel/:id', component: EditHotelComponent },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'createHotel',
        component: CreateHotelComponent,
      },
      { path: 'bookings', component: BookingDetailsComponent },
      { path: ':id', component: HotelDetailsComponent },
      {
        path: 'newBooking',
        component: NewBookingComponent,
      },
      {
        path: 'bookings',
        component: BookingListComponent,
      },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
