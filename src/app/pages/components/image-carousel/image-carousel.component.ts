import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
})
export class ImageCarouselComponent implements OnInit {
  @Input() images: string[] = []; // Array of image URLs
  @Input() autoSlideInterval: number = 3000; // Interval for auto-sliding (default is 3 seconds)

  currentIndex: number = 0; // Current index for image tracking
  private slideInterval: any; // Interval for auto-sliding
  isHovered: boolean = false; // Hover state to stop auto-slide

  ngOnInit(): void {
    // Ensure there are images to slide
    if (this.images.length > 0) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    // Cleanup the auto-slide interval when component is destroyed
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Navigate to the previous image with smooth transition
  prevImage(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
  }

  // Navigate to the next image with smooth transition
  nextImage(): void {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
  }

  // Start auto-sliding of images
  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      if (!this.isHovered) {
        this.nextImage();
      }
    }, this.autoSlideInterval);
  }

  // Stop auto-sliding when hovering over the carousel
  onHover(): void {
    this.isHovered = true;
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  // Resume auto-sliding when mouse leaves the carousel
  onMouseLeave(): void {
    this.isHovered = false;
    this.startAutoSlide();
  }
}
