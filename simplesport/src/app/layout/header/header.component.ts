import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidemenuComponent } from '../sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, SidemenuComponent, CommonModule, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public menuState: 'in' | 'out' = 'out';

  load() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  refresh() {
    window.location.reload();
  }
}
