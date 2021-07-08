import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Paginas
import { PersonalComponent } from './pages/personal/personal.component';
import { HijosComponent } from './pages/hijos/hijos.component';
import { HomeComponent } from './pages/home/home.component';
//Material
import { MaterialModule } from './material/material.module';
//FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizaHijoComponent } from './components/actualiza-hijo/actualiza-hijo.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonalComponent,
    HijosComponent,
    HomeComponent,
    ActualizaHijoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    ActualizaHijoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
