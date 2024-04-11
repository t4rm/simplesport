import { Component } from '@angular/core';
import { AsideMapComponent } from '../components/aside-map/aside-map.component';
import { MapComponent } from '../components/map/map.component';

@Component({
  selector: 'app-salles',
  standalone: true,
  imports: [AsideMapComponent, MapComponent],
  templateUrl: './salles.component.html'
})
export class SallesComponent {

}
