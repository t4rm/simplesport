import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ExercisesComponent } from '../components/exercises/exercises.component';
import { DropdownMuscleComponent } from '../components/dropdown-muscle/dropdown-muscle.component';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { catchError, min, tap } from 'rxjs/operators';
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
  @Input() durationString: string = "";

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

  handleSessionDurationString(durationStr: string) {
    this.durationString = durationStr;
  }


  public exportPDF(event: Event) {
    const doc = new jsPDF();

    doc.addImage('../../../assets/layout/images/logo.png', 'PNG', 60, 10, 50, 50);
    doc.setFontSize(22); // set the font size
    doc.text('SimpleSport', 110, 35);

    doc.setFontSize(20);
    doc.text('Your sesion :', 15, 70);

    doc.setFontSize(16);
    this.selectedExercises.forEach((exercise, index) => {
      doc.text(`${index + 1}. ${exercise.name}`, 15, 80 + index * 10);
    });

    const minY = 80 + this.selectedExercises.length * 10;
    doc.text('Rest time between sets: 1min', 15, minY + 20);
    doc.text('Rest time between exercises: 3min', 15, minY + 30);
    doc.text('Total estimated time: ' + this.durationString, 15, minY + 40);

    doc.setFontSize(12);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const signatureX = pageWidth - 70;
    const signatureY = pageHeight - 10;
    doc.text("SimpleSport generated document", signatureX, signatureY);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newTab = window.open();
    if (newTab) {
      newTab.location.href = pdfUrl;
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
