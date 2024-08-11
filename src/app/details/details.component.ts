import { Component,  } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MapDetailService } from '../map-detail.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
 // providers: [MapDetailService]
})

export class DetailsComponent {
  selectedCountry: string = 'selected country';
  selectedCountryID: string = 'id'

  constructor(private mapDetailService: MapDetailService) {
    this.mapDetailService.selectedCountry$.subscribe(country => {
      this.selectedCountry = country;
    })
    this.mapDetailService.selectedCountryID$.subscribe(country => {
      this.selectedCountryID = country;
    })
  }

}
