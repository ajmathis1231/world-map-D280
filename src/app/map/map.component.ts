import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { count } from 'rxjs';
import { MapDetailService } from '../map-detail.service';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})


export class MapComponent {
  constructor(private mapDetailService: MapDetailService) {
    this.selectedCountry
  }

  @ViewChild('map') mapElement!: ElementRef;

  selectedCountry: string = 'selected country';
  selectedCountryID: string = 'id';

  
  onClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    if (target.tagName === 'path') {
      this.selectedCountryID = target.id;
      const countryName = target.getAttribute('name');
     // const countryName = target.id;
     if (countryName){
      this.selectedCountry = countryName;
      this.mapDetailService.setSelectedCountry(this.selectedCountry);
      this.mapDetailService.setSelectedCountryID(this.selectedCountryID);
    }
  }

   }      
  }



