import { Component } from '@angular/core';
import { LandingComponent } from '../components/landing/landing.component';
import { FeaturesComponent } from '../components/features/features.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, FeaturesComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
