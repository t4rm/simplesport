import { Component } from '@angular/core';
import { SidemenuComponent } from './layout/sidemenu/sidemenu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    SidemenuComponent,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    HttpClientModule
  ],
})
export class AppComponent {
  title = 'simplesport';
}