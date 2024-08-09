import { Injectable } from '@angular/core';
import { BehaviorSubject, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapDetailService {
  private selectedCountrySubject = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySubject.next(country);
  }
  constructor() { }
}
