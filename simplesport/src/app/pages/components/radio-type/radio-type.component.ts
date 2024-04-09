import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from "primeng/radiobutton";
import { TYPES } from '../../../types/exercises.const';

@Component({
  selector: 'app-radio-type',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './radio-type.component.html'
})
export class RadioTypeComponent {
  exerciseTypes = TYPES;
  type!: string;

  @Output() selectedTypeEvent = new EventEmitter<string>();

  onTypeSelected() {
    this.selectedTypeEvent.emit(this.type);
  }

}
