import { Component } from '@angular/core';
import { LandingComponent } from '../components/landing/landing.component';
import { FeaturesComponent } from '../components/features/features.component';
import { LandingAnimationComponent } from '../../layout/landing/landing.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LandingComponent, FeaturesComponent, LandingAnimationComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
