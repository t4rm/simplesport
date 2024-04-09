import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { convertMinutesToTimeString } from '../../../utils/time';
import { Exercise } from '../../../types/exercise';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recap.component.html'
})
export class RecapComponent implements OnChanges {
  @Input() exercises: Exercise[] = [];
  sessionDuration!: number;
  @Output() sessionDurationStrChange = new EventEmitter<string>();
  sessionDurationString!: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['exercises']) {
      this.updateSessionDuration();
    }
  }

  updateSessionDuration() {
    this.sessionDuration = 3 * (this.exercises.length * 0.5 + this.exercises.length * 3);
    this.sessionDurationString = convertMinutesToTimeString(this.sessionDuration);
    this.sessionDurationStrChange.emit(this.sessionDurationString);
  }

}
