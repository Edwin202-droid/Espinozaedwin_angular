import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HijosComponent } from './pages/hijos/hijos.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonalComponent } from './pages/personal/personal.component';


const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path:'personal/:id', component: PersonalComponent},
  {path: 'hijos/:id', component: HijosComponent},
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
