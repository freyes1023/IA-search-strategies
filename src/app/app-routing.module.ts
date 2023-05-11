import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertSystemComponent } from './pages/expertSystem/expert-system/expert-system.component';

const routes: Routes = [
  { path: 'home', component: ExpertSystemComponent },
  
  { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
];
//Generate routes for each component here.
//For example:
//routes.push({ path: 'home', component: HomeComponent } 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
