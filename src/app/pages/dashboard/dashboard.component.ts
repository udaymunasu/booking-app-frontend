import { Component, OnInit } from '@angular/core';
import { DummyDataService } from './dashboardservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rooms: any[] = [];
  carouselImages: any[] = [];  // Ensure this property is declared
  searchTerm: string = '';

  constructor(private dummyDataService: DummyDataService) {}

  ngOnInit() {
    this.rooms = this.dummyDataService.getDummyRooms(); // Add this method in your service
    this.carouselImages = this.getCarouselImages();
  }

  private getCarouselImages() {
    return [
      {
        title: 'Welcome to Our Hotel',
        description: 'Experience luxury and comfort like never before.',
        image: 'https://via.placeholder.com/800x300?text=Hotel+1'
      },
      {
        title: 'Relax and Unwind',
        description: 'Discover the ultimate relaxation at our spa.',
        image: 'https://via.placeholder.com/800x300?text=Hotel+2'
      },
      {
        title: 'Dine in Style',
        description: 'Enjoy exquisite cuisine at our restaurant.',
        image: 'https://via.placeholder.com/800x300?text=Hotel+3'
      }
    ];
  }

}
