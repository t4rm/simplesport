// app.routes.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SallesComponent } from './pages/salles/salles.component';
import { SeanceComponent } from './pages/seance/seance.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'salles', component: SallesComponent },
    { path: 'seance', component: SeanceComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }