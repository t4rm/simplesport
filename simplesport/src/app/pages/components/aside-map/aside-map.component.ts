import { Component, OnInit } from '@angular/core';
import { ListboxModule } from 'primeng/listbox';
import { Gym } from '../../../types/exercise';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-aside-map',
  standalone: true,
  imports: [ListboxModule, CommonModule, ButtonModule],
  templateUrl: './aside-map.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-150%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],
})
export class AsideMapComponent implements OnInit {
  menuState: 'in' | 'out' = 'out';
  gyms!: any[];
  selectedGym!: Gym;
  visibleSidebar = false;

  ngOnInit() {
    this.gyms = [
      { name: 'Gym 1', location: 'Location 1' },
      { name: 'Gym 2', location: 'Location 2' },
      { name: 'Gym 3', location: 'Location 3' },
      { name: 'Gym 4', location: 'Location 4' },
      { name: 'Gym 5', location: 'Location 5' },
      { name: 'Gym 6', location: 'Location 6' },
      { name: 'Gym 7', location: 'Location 7' },
      { name: 'Gym 8', location: 'Location 8' },
      { name: 'Gym 9', location: 'Location 9' },
      { name: 'Gym 10', location: 'Location 10' },
    ];
  }

  toggleMenuState() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
