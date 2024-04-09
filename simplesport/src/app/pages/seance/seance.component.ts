import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ExercisesComponent } from '../components/exercises/exercises.component';
import { DropdownMuscleComponent } from '../components/dropdown-muscle/dropdown-muscle.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RadioTypeComponent } from '../components/radio-type/radio-type.component';
import { Exercise } from "../../types/exercise";
import { TYPES, MUSCLES } from "../../types/exercises.const";
import { RecapComponent } from '../components/recap/recap.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-seance',
  standalone: true,
  imports: [ExercisesComponent, DropdownMuscleComponent, ButtonModule, CommonModule, RadioTypeComponent, RecapComponent, DialogModule],
  templateUrl: './seance.component.html'
})

export class SeanceComponent {
  @ViewChild('toPdf', { static: false }) toPdf!: ElementRef;

  muscles = MUSCLES;
  types = TYPES;

  private _exercises: Exercise[] = [];
  private _selectedMuscle: string = "";
  private _selectedType: string = "";
  private _selectedExercises: Exercise[] = [];
  private _loading: boolean = false;
  private _firstLoad: boolean = true;

  @Input() visible: boolean = false;

  constructor(private http: HttpClient) { }

  // Getters et setters :
  get exercises(): Exercise[] { return this._exercises; }
  get selectedMuscle(): string { return this._selectedMuscle; }
  get selectedType(): string { return this._selectedType; }
  get selectedExercises(): Exercise[] { return this._selectedExercises; }
  get loading(): boolean { return this._loading; }
  get firstLoad(): boolean { return this._firstLoad; }
  //


  onMuscleSelected(value: string) {
    if (!this.muscles.has(value))
      throw new Error('Muscle inconnu');

    this._selectedMuscle = value;
    if (this.selectedType !== "") this.fetchExercises();
  }

  onTypeSelected(value: string) {
    if (!this.types.has(value))
      throw new Error('Muscle inconnu');

    this._selectedType = value;
    this.fetchExercises();
  }

  onExercisesSelected(value: Exercise[]) {
    this._selectedExercises = [...value];
  }


  public exportPDF(event: Event) {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element: any, renderer: any) {
        return true;
      }
    };

    const exercises = this.selectedExercises.map(exercise => exercise.name).join(", ");
    doc.text(exercises, 15, 15);

    const pdfDataUri = doc.output('datauristring');
    const newTab = window.open();
    if (newTab) {
      newTab.location.href = pdfDataUri;
    }
  }

  fetchExercises(): void {
    this._loading = true;
    const url: string = `${environment.localApiUrl}/query?muscle=${this.selectedMuscle}&type=${this.selectedType}`;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.get<Exercise[]>(url, { headers: headers })
      .pipe(
        tap((result) => {
          console.log('Result:', result)
          this._exercises = [...result];
        }),
        catchError((error) => {
          console.error('Error:', error);
          return of([]);
        }),
        tap(() => {
          this._loading = false;
          this._firstLoad = false;
        })
      )
      .subscribe();
  }


  // ajouterExASeance(exercice: Exercise): void {
  //   if (!this.exercisesChoisis.find(ex => ex[0] === exercice.name)) {
  //     this.exercisesChoisis.push([exercice.name, exercice.series])
  //   }
  // }

  // getTempsSeance(minReposEntreSeries: number): string {
  //   let tempsSeance: number = 0;

  //   this.exercisesChoisis.forEach(ex => {
  //     tempsSeance += (ex[1] - 1) * minReposEntreSeries + 0.5 // 0.5min = tps serie; 
  //   });

  //   tempsSeance += 15 + 3 * this.exercisesChoisis.length - 1;

  //   if (tempsSeance > 60) {
  //     return Math.floor(tempsSeance / 60) + 'h' + tempsSeance % 60 + 'min';
  //   }
  //   return tempsSeance.toString() + 'min';
  // }


}
