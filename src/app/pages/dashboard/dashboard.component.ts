import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DummyDataService } from './dashboardservice';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  rooms: any[] = [];
  carouselImages: any[] = []; // Ensure this property is declared
  searchTerm: string = '';
  hotels: any[] = [];
  selectedDate: string = '';
  filteredHotels: any[] = [];
  headerHeight: number = 0;  // Variable to store header height
  private parallaxElement: HTMLElement | null = null;

  topDestinationsInHyderabad: any[] = [];
  gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '16px',
  };

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
    this.dummyDataService.getTopDestinations().subscribe((destinations) => {
      this.topDestinationsInHyderabad = destinations;
    });
    this.loadHotels();
    this.startAutoPlay();
    this.topDestinationsInHyderabad.forEach(destination => {
      destination.styles = this.getDynamicImageStyles();  // Store precomputed styles in the destination object
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['topDestinationsInHyderabad']) {
      this.getDynamicImageStyles()
    }
  }

  getDynamicImageStyles() {
    // Dynamic styles for height and width
    const randomHeight = Math.floor(Math.random() * 250) + 200; // Height between 200px and 450px
    const randomWidth = Math.floor(Math.random() * 200) + 200; // Width between 200px and 400px

    return {
      height: `${randomHeight}px`,
      width: `${randomWidth}px`,
      objectFit: 'cover',
    };
  }

  private applyParallaxEffect(): void {
    const parallaxElement = document.querySelector('.custom-bg-parallax') as HTMLElement;
    const headerHeight = 80; // Header height in pixels
    const scrollPosition = window.scrollY;
  
    // Parallax speed factor (higher for more visible effect)
    const speed = 0.3;
  
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
        image: '/assets/image/carousel/carousel_1.jpg',
      },
      {
        title: 'Relax and Unwind',
        description: 'Discover the ultimate relaxation at our spa.',
        image: '/assets/image/carousel/carousel_2.jpg',
      },
      {
        title: 'Dine in Style',
        description: 'Enjoy exquisite cuisine at our restaurant.',
        image: '/assets/image/carousel/carousel_3.jpg',
      },
    ];
  }
  
}
