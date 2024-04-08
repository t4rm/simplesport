import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '../../../types/exercise';
import { EQUIPMENT } from '../../../types/exercises.const';
import { CommonModule } from '@angular/common';
import { PickListModule } from "primeng/picklist";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from 'primeng/messages';
import { DialogModule } from 'primeng/dialog';
import { sanitizeText } from "../../../utils/sanitize";

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [CommonModule, PickListModule, MessagesModule, ButtonModule, DialogModule],
  templateUrl: './exercises.component.html',
})
export class ExercisesComponent {
  @Input() exercises: Exercise[] = [];
  @Output() selectedExercisesChange = new EventEmitter<Exercise[]>();
  selectedExercises: Exercise[] = [];
  equipment = EQUIPMENT;
  visible: boolean = false;
  selectedExo!: Exercise;

  updateSelectedExercises() {
    this.selectedExercisesChange.emit(this.selectedExercises);
  }


  showDialog(exercise: Exercise) {
    this.visible = true;
    this.selectedExo = exercise;
  }

  closeDialog() {
    this.visible = false;
  }

  sanitizeText = sanitizeText;
}
