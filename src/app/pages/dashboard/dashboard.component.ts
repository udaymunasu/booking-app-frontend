import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { DummyDataService } from './dashboardservice';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  rooms: any[] = [];
  carouselImages: any[] = []; // Ensure this property is declared
  searchTerm: string = '';
  hotels: any[] = [];
  selectedDate: string = '';
  filteredHotels: any[] = [];
  headerHeight: number = 0;  // Variable to store header height
  private parallaxElement: HTMLElement | null = null;


  constructor(
    // private hotelService: RoomService,
    private hotelService: DBRoomService,
    private dummyDataService: DummyDataService,
    private router: Router
  ) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.applyParallaxEffect();
  }


  ngOnInit() {
    this.calculateHeaderHeight();  // Call it once on component initialization
    this.applyParallaxEffect();    this.rooms = this.dummyDataService.getDummyRooms(); // Add this method in your service
    this.carouselImages = this.getCarouselImages();
    this.loadHotels();
    this.startAutoPlay();
  }

  private applyParallaxEffect(): void {
    const parallaxElement = document.querySelector('.custom-bg-parallax') as HTMLElement;
    const headerHeight = 80; // Header height in pixels
    const scrollPosition = window.scrollY;
  
    // Parallax speed factor (higher for more visible effect)
    const speed = 0.5;
  
    if (parallaxElement) {
      // Ensure the element doesn't overlap the header
      const adjustedScroll = Math.max(0, scrollPosition - headerHeight);
  
      // Apply parallax effect
      parallaxElement.style.transform = `translateY(${adjustedScroll * speed}px)`;
    }
  }

   // Use AfterViewInit to add event listeners after the component view is initialized
   ngAfterViewInit(): void {
    // Add scroll and resize event listeners
    window.addEventListener('scroll', this.applyParallaxEffect);
    window.addEventListener('resize', this.applyParallaxEffect);
  }

  currentIndex = 0;
  autoPlayInterval: any;

  // Go to the next slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    this.updateCarouselPosition();
  }

  // Go to the previous slide
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
    this.updateCarouselPosition();
  }

  // Update carousel position by adjusting transform style
  updateCarouselPosition() {
    const carouselInner = document.querySelector('.custom-carousel-inner') as HTMLElement;
    if (carouselInner) {
      carouselInner.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }
  }

   // Start auto-play
   startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide(); // Automatically go to the next slide
    }, 3000); // Change every 3 seconds
  }

  // Stop auto-play
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
  

  // Listen for window resize to recalculate header height dynamically
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calculateHeaderHeight();
  }

  calculateHeaderHeight() {
    const header = document.querySelector('.header_area') as HTMLElement;
    if (header) {
      this.headerHeight = header.offsetHeight;  // Get height of header
    }
  }

  goToHotelDetails(hotelId: number): void {
    // Navigate to the hotel details page
    
    this.router.navigate(['/', hotelId]);
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    window.removeEventListener('scroll', this.applyParallaxEffect);
    window.removeEventListener('resize', this.applyParallaxEffect);
  }

  

  loadHotels(): void {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data; // Assign the fetched hotels to the local array
        console.log('this.hotels', this.hotels);
        this.filteredHotels = this.hotels; // Initialize filteredHotels
      },
      error: (error) => {
        console.error('Error fetching hotels:', error);
      },
    });
  }

  filterHotels(): void {
    this.filteredHotels = this.hotels.filter((hotel) => {
      const matchesLocation = hotel.location
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      // For demonstration, you might want to implement actual date filtering logic
      // For now, let's just check if a date is selected
      const matchesDate = this.selectedDate ? true : true; // Replace with actual logic if needed
      return matchesLocation && matchesDate;
    });
  }

  private getCarouselImages() {
    return [
      {
        title: 'Welcome to Our Hotel',
        description: 'Experience luxury and comfort like never before.',
        image:
          'https://pix8.agoda.net/hotelImages/900/90085/90085_121013231939630.jpg?ca=0&ce=1&s=375x',
      },
      {
        title: 'Relax and Unwind',
        description: 'Discover the ultimate relaxation at our spa.',
        image:
          'https://pix8.agoda.net/hotelImages/90085/-1/02b63308213c05ddafea555b70c86906.jpg?ca=13&ce=1&s=375x',
      },
      {
        title: 'Dine in Style',
        description: 'Enjoy exquisite cuisine at our restaurant.',
        image:
          'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/146688256.jpg?k=76751a7079f3c88baa3296f75b43da89dddea2debb474464dc30a26d2a1a7647&o=&s=375x',
      },
    ];
  }
}
