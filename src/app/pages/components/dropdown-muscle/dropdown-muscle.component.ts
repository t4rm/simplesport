import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { DropdownModule } from "primeng/dropdown";

@Component({
  selector: 'app-dropdown-muscle',
  standalone: true,
  imports: [DropdownModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown-muscle.component.html',
})

export class DropdownMuscleComponent {
  groupedMuscles: SelectItemGroup[];

  selectedMuscle: string | undefined;

  @Output() selectedValue = new EventEmitter<any>();

  onMuscleSelected() {
    this.selectedValue.emit(this.selectedMuscle);
  }

  constructor() {
    this.groupedMuscles = [
      {
        label: 'Abdominals',
        value: 'abdominals',
        items: [
          { label: 'Abdominals', value: 'abdominals' }
        ]
      },
      {
        label: 'Lower Body',
        value: 'lower_body',
        items: [
          { label: 'Abductors', value: 'abductors' },
          { label: 'Adductors', value: 'adductors' },
          { label: 'Quadriceps', value: 'quadriceps' },
          { label: 'Hamstrings', value: 'hamstrings' },
          { label: 'Calves', value: 'calves' },
          { label: 'Glutes', value: 'glutes' }
        ]
      },
      {
        label: 'Upper Body',
        value: 'upper_body',
        items: [
          { label: 'Biceps', value: 'biceps' },
          { label: 'Triceps', value: 'triceps' },
          { label: 'Forearms', value: 'forearms' }
        ]
      },
      {
        label: 'Trunk',
        value: 'trunk',
        items: [
          { label: 'Chest', value: 'chest' },
          { label: 'Traps', value: 'traps' },
          { label: 'Lats', value: 'lats' },
          { label: 'Middle Back', value: 'middle_back' },
          { label: 'Lower Back', value: 'lower_back' },
          { label: 'Neck', value: 'neck' }
        ]
      }
    ];
  }
}