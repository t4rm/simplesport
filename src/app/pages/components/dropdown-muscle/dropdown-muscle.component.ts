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
        label: 'Abdominaux',
        value: 'abdominals',
        items: [
          { label: 'Abdominaux', value: 'abdominals' }
        ]
      },
      {
        label: 'Membres inférieurs',
        value: 'lower_body',
        items: [
          { label: 'Abducteurs', value: 'abductors' },
          { label: 'Adducteurs', value: 'adductors' },
          { label: 'Quadriceps', value: 'quadriceps' },
          { label: 'Ischio-jambiers', value: 'hamstrings' },
          { label: 'Mollets', value: 'calves' },
          { label: 'Fessiers', value: 'glutes' }
        ]
      },
      {
        label: 'Membres supérieurs',
        value: 'upper_body',
        items: [
          { label: 'Biceps', value: 'biceps' },
          { label: 'Triceps', value: 'triceps' },
          { label: 'Avant-bras', value: 'forearms' }
        ]
      },
      {
        label: 'Tronc',
        value: 'trunk',
        items: [
          { label: 'Pectoraux', value: 'chest' },
          { label: 'Trapèzes', value: 'traps' },
          { label: 'Grands dorsaux', value: 'lats' },
          { label: 'Muscles du dos moyen', value: 'middle_back' },
          { label: 'Muscles du bas du dos', value: 'lower_back' },
          { label: 'Cou', value: 'neck' }
        ]
      }
    ];
  }
}