import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MapDetailService } from '../map-detail.service';
import { ApiCallService } from '../api-call.service';
import { NgIf } from '@angular/common';

interface CountryData {
  id: string;
  name: string;
  capitalCity: string;
  region: { value: string };
  incomeLevel: { value: string};
  //two other properties of your choice
  lendingType: { value: string};
  longitude: { value: string};
  latitude: {value: string};

}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MapComponent, NgIf],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})

export class DetailsComponent implements OnInit {
  selectedCountry: string = 'selected country';
  selectedCountryID: string = 'id'
  capital: string = '';
  region: string = '';
  incomeLevel: string = '';
  population: number = 0;
  avgAge: number = 0; 
  detailsData: string = '' ;
  countryData: CountryData | null = null;

  constructor(
    private mapDetailService: MapDetailService,
    private apiCallService: ApiCallService
  ) {}

  ngOnInit() {
      
  
    this.mapDetailService.selectedCountry$.subscribe(country => {
      this.selectedCountry = country;
    })
    this.mapDetailService.selectedCountryID$.subscribe(country => {
      this.selectedCountryID = country;
    })

    this.apiCallService.detailsData$.subscribe((data) => {
     
      if (data) {
        this.countryData = data as unknown as CountryData;
      }
      
    });
    
  }

}
