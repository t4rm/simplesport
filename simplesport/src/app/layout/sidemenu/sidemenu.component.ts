import { Component, Input } from '@angular/core';
import { MenuitemComponent } from '../menuitem/menuitem.component';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MenuitemComponent, CommonModule],
  templateUrl: './sidemenu.component.html',
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(10%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-150%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class SidemenuComponent {
  @Input() menuState: 'in' | 'out' = 'out';

  model: any[] = [];

  ngOnInit() {
    this.model = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
      { label: 'Session\'omatic', icon: 'pi pi-fw pi-calendar', routerLink: ['/session'] },
      { label: 'Gyms', icon: 'pi pi-fw pi-map-marker', routerLink: ['/gyms'] },
    ]
  }
}
