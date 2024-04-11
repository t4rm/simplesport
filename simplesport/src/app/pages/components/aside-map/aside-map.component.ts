import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
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
  menuState: 'in' | 'out' = 'in';
  gyms!: Gym[];
  selectedGym!: Gym;
  visibleSidebar = false;

  @Output() allGyms = new EventEmitter<Gym[]>();
  @Output() selectedValue = new EventEmitter<Gym>();

  handleChange(event: ListboxChangeEvent) {
    this.selectedGym = event.value as Gym;
    this.selectedValue.emit(this.selectedGym);
  }

  ngOnInit() {
    this.gyms = [
      { lat: 49.11759616966997, lng: 6.175947250959281, name: 'Basic-Fit Metz Rue Serpenoise', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.15137340530089, lng: 6.189404072659347, name: 'Basic-Fit Woippy C.Cial Auchan Metz Woippy', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.09746282590867, lng: 6.179967761028302, name: 'Basic-Fit Metz Sablon Rue des Plantes', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.10948977513363, lng: 6.232423607780842, name: 'Basic-Fit Metz - Bd Solidarité', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.07996609539981, lng: 6.111724371131897, name: 'Basic-Fit Augny Rue du Bois d’Orly', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.194858092006314, lng: 6.193950170630111, name: 'Basic-Fit Semecourt Voie Romaine', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.137290931498846, lng: 6.205191058561906, name: 'Keepcool Metz Saint-Julien', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.1065853, lng: 6.1759941, name: 'Keepcool Metz Gare', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.079604948425384, lng: 6.144518802572241, name: 'Keepcool Metz Sud', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.08204903723952, lng: 6.153847475943475, name: 'Salle de sport Marly - Fitness Park', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.12481437950358, lng: 6.19963652192203, name: 'Salle de sport Metz - Fitness Park', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.263062308195174, lng: 6.17909813358762, name: 'Salle de sport Mondelange - Fitness Park', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.11738550574956, lng: 6.178929867409817, name: 'MyFitMetz', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.115278817298694, lng: 6.176183285283577, name: 'Le Complexe Sportif - par Elodie & Damien Metallo', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.11810175943032, lng: 6.173930229834258, name: 'Authentic Pilates Metz', categorie: ['remise en forme'] },
      { lat: 49.10859225172478, lng: 6.169110573493457, name: 'CITY FITNESS METZ', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.110706646311016, lng: 6.174411914172632, name: 'CrossFit Hiringa Metz Gare', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.111717961138226, lng: 6.166515490559697, name: 'CrossFit Metz Centre', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.1045821327878, lng: 6.163253924284789, name: 'Montigny Fitness Gym', categorie: ['remise en forme'] },
      { lat: 49.10371115423175, lng: 6.1602713080272, name: 'La Salle De Sport Du Botanique | PRIVATE SPORT LE 33', categorie: ['musculation', 'remise en forme', 'fitness'] },
      { lat: 49.10470856378761, lng: 6.155336043399723, name: 'CrossFit Graoully - Metz', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.11510290652867, lng: 6.160400054194975, name: 'BODYHIT METZ SAINT SYMPHORIEN', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.15721982688907, lng: 6.160314223191838, name: "Forme'o", categorie: ['remise en forme', 'fitness'] },
      { lat: 49.112293840049766, lng: 6.131990095216856, name: 'POWER ONE', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.22399835579316, lng: 6.193172634657027, name: 'ODYSSEE Fitness & Spa', categorie: ['remise en forme', 'fitness'] },
      { lat: 49.08478307968267, lng: 6.065456566926815, name: 'Salle de sport Metz - Intensity 57', categorie: ['musculation', 'remise en forme', 'fitness'] },
    ];

    this.allGyms.emit(this.gyms);
  }

  toggleMenuState() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
