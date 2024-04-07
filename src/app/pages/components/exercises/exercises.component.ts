import { Component, Input } from '@angular/core';
import { Exercise } from '../../../types/exercise';
import { CommonModule } from '@angular/common';
import { PickListModule } from "primeng/picklist";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, PickListModule],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  @Input() exercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];

}
