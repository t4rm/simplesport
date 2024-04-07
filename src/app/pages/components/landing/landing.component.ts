import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './landing.component.html'
})
export class LandingComponent {

}
