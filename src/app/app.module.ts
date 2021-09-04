import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ResponsiveToolbarComponent } from './common/responsive-toolbar/responsive-toolbar.component';
import { RacesListComponent } from './races/races-list/races-list.component';
import { AddRaceComponent } from './races/add-race/add-race.component';
import { EditRaceComponent } from './races/edit-race/edit-race.component';
import { DeleteRaceComponent } from './races/delete-race/delete-race.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ResponsiveToolbarComponent,
    RacesListComponent,
    AddRaceComponent,
    EditRaceComponent,
    DeleteRaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
