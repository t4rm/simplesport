import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../../../types/exercise';
import { EQUIPMENT } from '../../../types/exercises.const';
import { CommonModule } from '@angular/common';
import { PickListModule } from "primeng/picklist";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";


@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, PickListModule, DialogModule, ButtonModule],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  @Input() exercises: Exercise[] = [];
  @Output() selectedExercisesChange = new EventEmitter<Exercise[]>();
  selectedExercises: Exercise[] = [];
  equipment = EQUIPMENT;
  visible: boolean = false;

  updateSelectedExercises() {
    this.selectedExercisesChange.emit(this.selectedExercises);
  }


  showDialog() {
    this.visible = true;
  }

}
