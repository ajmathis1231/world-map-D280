import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener, Host, viewChild } from '@angular/core';
import { MapDetailService } from '../map-detail.service';
import { ApiCallService } from '../api-call.service';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { delay } from 'rxjs';


@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})


export class MapComponent implements OnInit {
  constructor(private mapDetailService: MapDetailService,
              private apiClassService: ApiCallService,
              private fb: FormBuilder
  ) {}


  selectedCountry: string = 'selected country';
  selectedCountryID: string = 'id';
  searchTerm: string = '';
  svgArray: string[] = [];
  searchForm = new FormGroup({
    searchTerm: new FormControl,
  })


  
  onClick(event: MouseEvent) {
    const target = event.target as SVGPathElement;
    if (target.tagName === 'path') {
      this.selectedCountryID = target.id;
      const countryName = target.getAttribute('name');
     if (countryName){
      this.selectedCountry = countryName;
      this.mapDetailService.setSelectedCountry(this.selectedCountry);
      this.mapDetailService.setSelectedCountryID(this.selectedCountryID);
      console.log(`country: ${this.selectedCountry} id: ${this.selectedCountryID}`)

      }
    }
    //create api call here, after selection is made, api will be called
    this.apiClassService.makeAPICall();
   }   

  

   ngOnInit() {
       this.searchForm = this.fb.group({
        searchTerm: new FormControl('')
       })
   }
   ngAfterInit() {
   // this.searchButton.nativeElement.addEventListener('click', this.searchOnClick());
   }

   ngAfterViewInit() {
    if (this.mapElement) {
      this.searchSVGPaths(this.searchTerm);
    }
   }
   searchOnClick(){
    
    const searchTerm = this.searchForm.get('searchTerm')?.value; //gets the value being searched for
    console.log("search button clicked! " + searchTerm + " = search term should be here <--.");
    const countryId = this.searchSVGPaths(searchTerm);
    
   // const countryName = this.searchTerm;
   if (countryId){
    this.selectedCountryID = countryId;
    const countryName = searchTerm;
    this.selectedCountry = countryName;
    this.mapDetailService.setSelectedCountry(this.selectedCountry);
    console.log(`country ${this.selectedCountry} id ${this.selectedCountryID}`)
    this.mapDetailService.setSelectedCountryID(this.selectedCountryID);
    }
    //this.apiClassService.makeAPICall();

  }
   @ViewChild('searchButton') searchButton!: ElementRef;
   @ViewChild('searchedCountry') searchedCountry!: ElementRef;
   @ViewChild('map') mapElement!: ElementRef;

   
  searchSVGPaths(searchTerm: string): string | undefined {
    if (!this.mapElement) {
      console.error("map element not yet available.")
      return undefined;
    }
    const svgElement = this.mapElement.nativeElement as SVGElement;
    console.log("svgElemet = " );
    const paths = Array.from(svgElement.querySelectorAll('path'));

    for (const path of paths) {
      const countryName = path.getAttribute('name');
      //console.log(countryName);
      if (countryName && countryName.toLowerCase() === searchTerm.toLowerCase()) {
        console.log("SVG Path searched, path.id: " + path.id);
        console.log('searchTerm = ' + searchTerm);
        this.selectedCountryID = path.id;
        console.log("id= " + this.selectedCountryID);
        this.mapDetailService.setSelectedCountryID(this.selectedCountryID);
      this.apiClassService.makeAPICall();
      }
      // moving the api call and setup code to outside of the for and if loop
      /*
        this.selectedCountryID = path.id;
        this.mapDetailService.setSelectedCountryID(this.selectedCountryID);
        this.apiClassService.makeAPICall;
        //return path.id;
        */
    }
    
    return undefined;
    
    
  }
   }

   
     
  



