import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DBRoomService } from 'src/app/service/db-server';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  hotelForm!: FormGroup;
  hotelId!: string;
  amenitiesList = ['Free Wi-Fi', 'Swimming Pool', 'Gym', 'Spa', 'Restaurant'];
  selectedImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private hotelService: DBRoomService,
  ) {}

  
  ngOnInit(): void {
    this.hotelId = this.route.snapshot.paramMap.get('id')!;
    console.log(" this.hotelId", this.hotelId)
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      pricePerNight: [0, Validators.required],
      amenities: [[]],
      images: [[]],
    });
    this.loadHotelData();
  }

  loadHotelData(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe((hotel) => {
      this.hotelForm.patchValue(hotel);
      this.selectedImages = hotel.images || [];
    });
  }

  onAmenitiesChange(amenity: string, event: any): void {
    const amenities = this.hotelForm.get('amenities')?.value || [];
    if (event.target.checked) {
      amenities.push(amenity);
    } else {
      const index = amenities.indexOf(amenity);
      if (index > -1) amenities.splice(index, 1);
    }
    this.hotelForm.get('amenities')?.setValue(amenities);
  }

  onImageSelected(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.selectedImages.push(e.target.result);
      reader.readAsDataURL(files[i]);
    }
    this.hotelForm.get('images')?.setValue(this.selectedImages);
  }

  onSubmit(): void {
    this.hotelService.updateHotel(this.hotelId, this.hotelForm.value).subscribe(() => {
      alert('Hotel updated successfully!');
    });
  }
}
