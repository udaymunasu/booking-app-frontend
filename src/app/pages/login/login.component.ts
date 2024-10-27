import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {}

  user: any = {
    username: '',
    password: '',
  };

  constructor(private authService: RoomService, private router: Router) {}

  onLogin() {
    console.log('Logging in with:', this.user); // For debugging
    this.authService.login(this.user).subscribe(
      (res: any) => {
        if (res?.user) {
          // Adjust according to your API response
          localStorage.setItem('hotelUser', JSON.stringify(res.user));
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Check User Credentials');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }
}
