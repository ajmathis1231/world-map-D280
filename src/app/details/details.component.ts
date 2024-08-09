import { Component,  } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MapDetailService } from '../map-detail.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent {
  selectedCountry: string = '';

  constructor(private mapDetailService: MapDetailService) {
    this.mapDetailService.selectedCountry$.subscribe(country => {
      this.selectedCountry = country;
    })
  }

}
