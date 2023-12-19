import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddClutterComponent } from './pages/add-clutter/add-clutter.component';
import { ClutterListComponent } from './pages/clutter-list/clutter-list.component';
import { CreateFamilyComponent } from './pages/create-family/create-family.component';
import { ManageFamilyComponent } from './pages/manage-family/manage-family.component';

import { ClutterListItemComponent } from './ui/clutter-list-item/clutter-list-item.component';
import { ClutterFormComponent } from './ui/clutter-form/clutter-form.component';
import { ClutterVotingCardComponent } from './ui/clutter-voting-card/clutter-voting-card.component';
import { FamilyFormComponent } from './ui/family-form/family-form.component';

import { AuthInterceptor } from './shared/interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    AddClutterComponent,
    ClutterListComponent,
    ClutterListItemComponent,
    ClutterFormComponent,
    ClutterVotingCardComponent,
    CreateFamilyComponent,
    FamilyFormComponent,
    ManageFamilyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
