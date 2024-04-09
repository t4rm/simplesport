import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menuitem',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menuitem.component.html',
})
export class MenuitemComponent {
  @Input() item!: { label: string, icon: string, routerLink: string[] };

  constructor() { }
}
