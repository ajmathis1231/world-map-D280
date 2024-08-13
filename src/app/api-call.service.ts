import { Injectable } from '@angular/core';
import { MapDetailService } from './map-detail.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private queryURL: string = 'https://api.worldbank.org/v2/country/'
  private queryTarget: string = '';
  private queryFormat: string = '?format=json'
  private finalURL: string = this.queryURL + this.queryTarget + this.queryFormat;
  status: number = 0;
  capital: string = '';
  region: string = '';
  incomeLevel: string = '';
  population: number = 0;
  avgAge: number = 0;  

  
  constructor(private mapDetailService: MapDetailService) {
    this.mapDetailService.selectedCountryID$.subscribe(country => {
      this.queryTarget = country;
      this.finalURL = this.queryURL + this.queryTarget + this.queryFormat;

    })
   }

   makeAPICall() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", this.responseReceivedHandler);
    xhr.responseType = "json";
    xhr.open('GET', this.finalURL);
    xhr.send();
    console.log("api call func " + this.queryTarget + ' '+ this.finalURL)
   }

   responseReceivedHandler(){
    if (this.status === 200) {
      console.log("successful api call " + this.queryTarget);
      

    }
    else {
      console.log("status not 200");
    }

   }
    
}
