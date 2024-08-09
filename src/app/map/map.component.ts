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


export class MapComponent  implements AfterViewInit{
  constructor(private mapDetailService: MapDetailService) {}

  @ViewChild('map') mapElement!: ElementRef;

  selectedCountry: string = '';

  
/* commented out to try a different approach
  onClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    if (target.tagName === 'path') {
      const countryName = target.id;
      this.selectedCountry = countryName;
    }
*/

  ngAfterViewInit() {
    
    if (this.mapElement){

    
    const svg = this.mapElement.nativeElement as SVGElement;
    const paths = svg.querySelectorAll('path');

    paths.forEach(path => {
      path.addEventListener('click', (event: MouseEvent) => {
        const target = event.target as SVGPathElement;
        const countryID = target.id;
        this.mapDetailService.setSelectedCountry(countryID);
        console.log('Click happened');
        
      })
    })
  }
    
  }
 /* commented out while testing above code.
  shareData(this.selectedCountry) {
    this.mapDetailService.setSelectedCountry(this.selectedCountry);
  }
    */
    //const selectedCountry = event ? (event.target as SVGPathElement)
      
  }



