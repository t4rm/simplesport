import { Component } from '@angular/core';
import { ExercisesComponent } from '../components/exercises/exercises.component';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [ExercisesComponent],
  templateUrl: './seance.component.html'
})
export class SeanceComponent {

}
