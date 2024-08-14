import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})

export class MapDetailService {
  
  private selectedCountrySubject = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }

  private selectedCountryIDSubject = new BehaviorSubject<string>('');
  selectedCountryID$ = this.selectedCountryIDSubject.asObservable(); 

  setSelectedCountryID(country: string) {
    this.selectedCountryIDSubject.next(country);
  }
  constructor() { }
}
