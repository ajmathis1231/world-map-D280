import { Injectable } from '@angular/core';
import { MapDetailService } from './map-detail.service';
import { BehaviorSubject, catchError, delay, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private queryURL: string = 'https://api.worldbank.org/v2/country/'
  private queryTarget: string = '';
  private queryFormat: string = '?format=json'
  private finalURL: string = this.queryURL + this.queryTarget + this.queryFormat;
  status: number = 0;
  responseData: string = '';
  capitalCitydiff: string = '';

  constructor(private mapDetailService: MapDetailService, private http: HttpClient) {
    this.mapDetailService.selectedCountryID$.subscribe(country => {
      this.queryTarget = country;
      this.finalURL = this.queryURL + this.queryTarget + this.queryFormat;

    })
   }
/*
makeAPICall() {
  this.http.get<any>(this.finalURL).subscribe(
    (response) => {
      this.status = 200;
      console.log("successful API call " + this.queryTarget);
      try {
        this.responseData = response;
        const detailsData = this.extractDetailsData(this.responseData);
        this.responseDataSubject.next(detailsData);
      }
      catch(error){
        console.error("Error parsing API response v2:", error);

      }
    }
  )
}
  */
makeAPICall() {
  this.http.get<any>(this.finalURL)
    .pipe(
      catchError(error => {
        console.error('Error fetching data:', error);
        console.log(".pipe error")
        return throwError(() => error);
      })
    )
    .subscribe(response => {
      const detailsData = this.extractDetailsData(response);
      this.responseDataSubject.next(detailsData);
      console.log(".subscribe works");
    });
}
  

  private extractDetailsData(responseData: any): string {
    if (responseData && responseData[1] && responseData[1][0]) {
      console.log("extractDetailsData return value:" + responseData[1][0]);
      return responseData[1][0];
      
    } else {
      console.error("Invalid response data format, extractDetailsData error");
      return '';
    }

  }
  
   
  private responseDataSubject = new BehaviorSubject<string>('');
  detailsData$: Observable<string> =this.responseDataSubject.asObservable(); //still cant figure out why this wont work.  will try again.

  

  
}
