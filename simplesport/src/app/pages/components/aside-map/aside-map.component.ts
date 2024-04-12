import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ListboxChangeEvent, ListboxModule } from 'primeng/listbox';
import { Gym } from '../../../types/exercise';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-aside-map',
  standalone: true,
  imports: [ListboxModule, CommonModule, ButtonModule, FormsModule, DialogModule],
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
  gyms: Gym[] = [];
  selectedGym!: Gym;
  visibleSidebar = false;
  dialogIsVisible = false;

  // Gestion de la modale d'ajout :
  lat: number | string = '';
  lng: number | string = '';
  name: string = '';

  @Input() markerSelect: Gym | null = null;
  @Output() allGyms = new EventEmitter<Gym[]>();
  @Output() selectedValue = new EventEmitter<Gym>();

  // @ViewChildren('row', { read: ElementRef }) rowElement!: QueryList<ElementRef>;

  constructor(private http: HttpClient) { }

  handleChange(event: ListboxChangeEvent) {
    this.selectedGym = event.value as Gym;
    this.selectedValue.emit(this.selectedGym);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['markerSelect'] && changes['markerSelect'].currentValue) {
  //     console.log('markerSelect has changed:', changes['markerSelect'].currentValue);
  //     this.selectedGym = this.gyms.find((gym) => gym.name === changes['markerSelect'].currentValue.name) || this.gyms[0];
  //     this.scrollToSelectedOption(this.gyms.indexOf(this.selectedGym));
  //   }
  // }

  // scrollToSelectedOption(index: number = 0) {
  //   const el = this.rowElement.find(r => r.nativeElement.id === `gym-${index}`);
  //   if (!el) return;
  //   el.nativeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  // }

  ngOnInit() {
    this.gyms = [
      {
          "lat": 49.117292,
          "lng": 6.175446,
          "name": "Basic-Fit Metz Rue Serpenoise",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.148907,
          "lng": 6.174825,
          "name": "Basic-Fit Woippy C.Cial Auchan Metz Woippy",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.09721,
          "lng": 6.18009,
          "name": "Basic-Fit Metz Sablon Rue des Plantes",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.10665,
          "lng": 6.23352,
          "name": "Basic-Fit Metz - Bd Solidarité",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.07604,
          "lng": 6.10536,
          "name": "Basic-Fit Augny Rue du Bois d’Orly",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.19143,
          "lng": 6.14313,
          "name": "Basic-Fit Semecourt Voie Romaine",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.13440,
          "lng": 6.19869,
          "name": "Keepcool Metz Saint-Julien",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.10659,
          "lng": 6.17603,
          "name": "Keepcool Metz Gare",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.07829,
          "lng": 6.14482,
          "name": "Keepcool Metz Sud",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.08204903723952,
          "lng": 6.153847475943475,
          "name": "Salle de sport Marly - Fitness Park",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.12481437950358,
          "lng": 6.19963652192203,
          "name": "Salle de sport Metz - Fitness Park",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.263062308195174,
          "lng": 6.17909813358762,
          "name": "Salle de sport Mondelange - Fitness Park",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.11738550574956,
          "lng": 6.178929867409817,
          "name": "MyFitMetz",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.115278817298694,
          "lng": 6.176183285283577,
          "name": "Le Complexe Sportif - par Elodie & Damien Metallo",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.11810175943032,
          "lng": 6.173930229834258,
          "name": "Authentic Pilates Metz",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.10859225172478,
          "lng": 6.169110573493457,
          "name": "CITY FITNESS METZ",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.110706646311016,
          "lng": 6.174411914172632,
          "name": "CrossFit Hiringa Metz Gare",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.111717961138226,
          "lng": 6.166515490559697,
          "name": "CrossFit Metz Centre",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.1045821327878,
          "lng": 6.163253924284789,
          "name": "Montigny Fitness Gym",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.10371115423175,
          "lng": 6.1602713080272,
          "name": "La Salle De Sport Du Botanique | PRIVATE SPORT LE 33",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      },
      {
          "lat": 49.10470856378761,
          "lng": 6.155336043399723,
          "name": "CrossFit Graoully - Metz",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.11510290652867,
          "lng": 6.160400054194975,
          "name": "BODYHIT METZ SAINT SYMPHORIEN",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.15721982688907,
          "lng": 6.160314223191838,
          "name": "Forme'o",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.112293840049766,
          "lng": 6.131990095216856,
          "name": "POWER ONE",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.22399835579316,
          "lng": 6.193172634657027,
          "name": "ODYSSEE Fitness & Spa",
          "category": [
              "fitness"
          ]
      },
      {
          "lat": 49.08478307968267,
          "lng": 6.065456566926815,
          "name": "Salle de sport Metz - Intensity 57",
          "category": [
              "bodybuilding",
              "fitness"
          ]
      }
  ];
    // this.fetchGyms();
    this.allGyms.emit(this.gyms)

  }

  toggleMenuState() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  fetchGyms(): void {
    const url: string = `${environment.localApiUrl}/gyms`;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.get<Gym[]>(url, { headers: headers })
      .pipe(
        tap((result) => {
          this.gyms = [...result];
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of([]);
        }),
        tap(() => {
          this.allGyms.emit(this.gyms)
        })
      )
      .subscribe();
  }

  // Gestion de la modale d'ajout :
  toggleDialog() {
    this.dialogIsVisible = !this.dialogIsVisible;
  }

  addGym() {
    const url: string = `${environment.localApiUrl}/gyms`;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<Gym>(url, { lat: this.lat, lng: this.lng, name: this.name }, { headers: headers })
      .pipe(
        tap((result) => {
          this.gyms.push(result);
          this.allGyms.emit(this.gyms);
          this.toggleDialog();
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of([]);
        }),
      )
      .subscribe();
  }

}
