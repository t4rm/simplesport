import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from "primeng/card";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule],
  templateUrl: './features.component.html',
})
export class FeaturesComponent {

}
