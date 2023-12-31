import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table'
import { MatChipsModule } from '@angular/material/chips'
import { MatTabsModule } from '@angular/material/tabs'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddClutterComponent } from './pages/add-clutter/add-clutter.component';
import { ClutterListComponent } from './pages/clutter-list/clutter-list.component';
import { CreateFamilyComponent } from './pages/create-family/create-family.component';

import { ClutterListItemComponent } from './ui/clutter-list-item/clutter-list-item.component';
import { ClutterFormComponent } from './ui/clutter-form/clutter-form.component';
import { ClutterVotingCardComponent } from './ui/clutter-voting-card/clutter-voting-card.component';
import { FamilyFormComponent } from './ui/family-form/family-form.component';
import { FamilyViewComponent } from './pages/family-view/family-view.component';

import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { FamilyFormAddMemberComponent } from './ui/family-form-add-member/family-form-add-member.component';
import { FamilyEditComponent } from './pages/family-edit/family-edit.component';
import { NoFamilyMessageComponent } from './ui/no-family-message/no-family-message.component';
import { ClutterEditComponent } from './ui/clutter-edit/clutter-edit.component';

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
    FamilyViewComponent,
    FamilyFormAddMemberComponent,
    FamilyEditComponent,
    NoFamilyMessageComponent,
    ClutterEditComponent
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
    MatButtonModule,
    MatTableModule,
    MatChipsModule,
    MatTabsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
