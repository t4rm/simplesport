import { Component } from '@angular/core';
import { AsideMapComponent } from '../components/aside-map/aside-map.component';
import { MapComponent } from '../components/map/map.component';
import { Gym } from '../../types/exercise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salles',
  standalone: true,
  imports: [AsideMapComponent, MapComponent, CommonModule],
  templateUrl: './salles.component.html'
})
export class SallesComponent {
  gyms: Gym[] = [];
  selectedGym!: Gym;
  markerSelect: Gym | null = null;

  handleAllGyms(gyms: Gym[]) {
    this.gyms = gyms;
  }

  handleSelectedValue(gym: Gym) {
    this.selectedGym = gym;
  }

  handleMarkerSelect(gym: Gym) {
    this.markerSelect = gym;
  };
}
