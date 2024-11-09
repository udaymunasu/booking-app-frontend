import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.scss'],
})
export class CreateHotelComponent implements OnInit {
  hotelForm: FormGroup;
  amenitiesList: string[] = [
    'WiFi',
    'Pool',
    'Gym',
    'Spa',
    'Parking',
    'Restaurant',
    'Bar',
    'Room Service',
    'Air Conditioning',
    'Pet Friendly',
  ];

  selectedFiles: File[] = []; // Store file objects
  selectedImages: string[] = []; // Store Base64 strings for previews

  constructor(
    private fb: FormBuilder,
    private hotelService: RoomService,
    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      name: [''],
      description: [''],
      location: [''],
      pricePerNight: [0, [Validators.min(0)]],
      amenities: [[]], // This will hold the selected amenities
      images: [[]],
      rating: [0],
      roomTypes: this.fb.array([]), // Initialize room types array
    });
  }

  ngOnInit(): void {}

  get roomTypes(): FormArray {
    return this.hotelForm.get('roomTypes') as FormArray;
  }

  addRoomType() {
    const roomTypes = this.hotelForm.get('roomTypes') as FormArray;
    roomTypes.push(
      this.fb.group({
        type: [''],
        price: [0, [Validators.min(0)]],
        capacity: [1, [Validators.min(1)]],
      })
    );
  }

  onAmenitiesChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const amenities: string[] = this.hotelForm.get('amenities')?.value || [];

    if (checkbox.checked) {
      // Add the selected amenity if checked
      amenities.push(checkbox.value);
    } else {
      // Remove the unselected amenity if unchecked
      const index = amenities.indexOf(checkbox.value);
      if (index > -1) {
        amenities.splice(index, 1);
      }
    }

    console.log('amenities', amenities);

    // Update the form control with the selected amenities
    this.hotelForm.patchValue({ amenities });
  }

  onImageSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      // Convert FileList to array and append new files to the existing array
      const newFiles = Array.from(files);
      this.selectedFiles.push(...newFiles);

      // Create Base64 previews for the new files
      this.createImagePreviews(newFiles);
      this.hotelForm.patchValue({ images: this.selectedFiles }); // Update the form with file array
    }
  }

  createImagePreviews(files: File[]) {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImages.push(e.target.result); // Push Base64 string into array
      };
      reader.readAsDataURL(file); // Read file as Data URL (Base64)
    });
  }

  ngOnDestroy() {
    this.selectedFiles = []; // Clear files when component is destroyed
    this.selectedImages = []; // Clear previews
  }

  onSubmit() {
    const userRole = localStorage.getItem('userRole');

    // Check if the user role is 'admin'
    if (userRole !== 'admin') {
      alert('You do not have permission to create a hotel.');
      return;
    }

    if (this.hotelForm.valid) {
      const hotelData = {
        ...this.hotelForm.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('Form Value:', this.hotelForm.value);

      this.hotelService.createHotel(hotelData).subscribe({
        next: () => {
          alert('Hotel created successfully!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error creating hotel:', error);
          alert('Failed to create hotel. Please try again.');
        },
      });
    } else {
      alert('Please fill in the form correctly.');
    }
  }
}
