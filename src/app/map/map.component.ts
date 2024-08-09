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
  constructor(private mapDetailService: MapDetailService) {}

  @ViewChild('map') mapElement!: ElementRef;

  selectedCountry: string = '';

  
  onClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    if (target.tagName === 'path') {
      const countryName = target.id;
      this.selectedCountry = countryName;
    }
  }

  
  
    
    //const selectedCountry = event ? (event.target as SVGPathElement)
      
  }



