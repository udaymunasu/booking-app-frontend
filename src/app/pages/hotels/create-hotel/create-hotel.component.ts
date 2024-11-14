import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';
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

  imagePreviews: string[] = [];

  constructor(
    private fb: FormBuilder,
    // private hotelService: RoomService,
    private hotelService: DBRoomService,

    private router: Router
  ) {
    this.hotelForm = this.fb.group({
      name: [''],
      description: [''],
      location: [''],
      pricePerNight: [0, [Validators.min(0)]],
      amenities: [[]], // This will hold the selected amenities
      images: this.fb.array([]),
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
  selectedFile: File | null = null;

  onImageSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0]; // Only handle the first image
    } else {
      this.selectedFile = null;
    }
  }


  ngOnDestroy() {
    this.selectedFiles = []; // Clear files when component is destroyed
    this.selectedImages = []; // Clear previews
  }

  onSubmit() {
    if (this.selectedFile) {
      // Upload the image using the service
      console.log("image",this.selectedFile )

      this.hotelService.uploadImage(this.selectedFile).subscribe(
        (response: any) => {
          console.log('Image uploaded successfully:', response);

          // Access the images FormArray in the form
          const imagesArray: any = this.hotelForm.get('images') as FormArray;
          console.log("image",imagesArray,this.selectedFile )

          // Push the uploaded image path into the images array
          imagesArray.push(this.fb.control(response.path)); // Add image path to the array

          // Now send the complete hotel form (with image paths) to the JSON server
          this.hotelService.createHotel(this.hotelForm.value).subscribe(
            (metadataResponse) => {
              console.log('Hotel metadata saved:', metadataResponse);
            },
            (error) => {
              console.error('Error saving hotel metadata:', error);
            }
          );
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      console.error('No image selected for upload');
    }
  }
}
