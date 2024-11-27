import { Component, OnInit } from '@angular/core';
import { DBRoomService } from 'src/app/service/db-server';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels: any[] = [];
  editingHotel: any = null;


  constructor(private hotelService: DBRoomService) { }

  ngOnInit(): void {
    this.fetchHotels();
  }

  fetchHotels(): void {
    this.hotelService.getAllHotels().subscribe((data) => {
      this.hotels = data;
      console.log("this.hotels", this.hotels)
    });
  }

  startEditing(hotel: any): void {
    this.editingHotel = { ...hotel };
  }

  saveChanges(): void {
    if (this.editingHotel) {
      this.hotelService
        .updateHotel(this.editingHotel.id, this.editingHotel)
        .subscribe(() => {
          this.fetchHotels();
          this.editingHotel = null;
        });
    }
  }

}
