import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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

  @ViewChildren('row', { read: ElementRef }) rowElement!: QueryList<ElementRef>;

  handleAllGyms(gyms: Gym[]) {
    this.gyms = gyms;
  }

  handleSelectedValue(gym: Gym) {
    this.selectedGym = gym;
  }

  handleMarkerSelect(selectedGym: Gym) {
    this.markerSelect = selectedGym;
    this.selectedGym = this.gyms.find((gym) => gym.name === selectedGym.name) || this.gyms[0];
    this.scrollToSelectedOption(this.gyms.indexOf(this.selectedGym));
  };

  scrollToSelectedOption(index: number = 0) {
    const element = document.getElementById('gym-'+index);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
      element.parentElement?.click();
    }
  }

}


  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['markerSelect'] && changes['markerSelect'].currentValue) {
  //     console.log('markerSelect has changed:', changes['markerSelect'].currentValue);
  //     this.selectedGym = this.gyms.find((gym) => gym.name === changes['markerSelect'].currentValue.name) || this.gyms[0];
  //     this.scrollToSelectedOption(this.gyms.indexOf(this.selectedGym));
  //   }
  // }


