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

  @ViewChildren('row', { read: ElementRef }) rowElement!: QueryList<ElementRef>;

  constructor(private http: HttpClient) { }

  handleChange(event: ListboxChangeEvent) {
    this.selectedGym = event.value as Gym;
    this.selectedValue.emit(this.selectedGym);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['markerSelect'] && changes['markerSelect'].currentValue) {
      console.log('markerSelect has changed:', changes['markerSelect'].currentValue);
      this.selectedGym = this.gyms.find((gym) => gym.name === changes['markerSelect'].currentValue.name) || this.gyms[0];
      this.scrollToSelectedOption(this.gyms.indexOf(this.selectedGym));
    }
  }

  scrollToSelectedOption(index: number = 0) {
    const el = this.rowElement.find(r => r.nativeElement.id === `gym-${index}`);
    if (!el) return;
    el.nativeElement.scrollIntoView({ behavior: "smooth", inline: "center", block: "center" });
  }

  ngOnInit() {
    this.fetchGyms();
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
