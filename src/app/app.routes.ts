import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
    {
    path: 'home',
    title: 'Home Page',
    component: MapComponent,
},
{
    path: '', redirectTo: '/home', pathMatch: 'full'
}
];

