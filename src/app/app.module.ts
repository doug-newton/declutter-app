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

import { ManageClutterItemComponent } from './ui/manage-clutter-item/manage-clutter-item.component';
import { ClutterFormComponent } from './ui/clutter-form/clutter-form.component';
import { ClutterVotingCardComponent } from './ui/clutter-voting-card/clutter-voting-card.component';
import { FamilyFormComponent } from './ui/family-form/family-form.component';
import { FamilyViewComponent } from './pages/family-view/family-view.component';

import { AuthInterceptor } from './shared/interceptors/auth-interceptor';
import { FamilyFormAddMemberComponent } from './ui/family-form-add-member/family-form-add-member.component';
import { FamilyEditComponent } from './pages/family-edit/family-edit.component';
import { NoFamilyMessageComponent } from './ui/no-family-message/no-family-message.component';
import { ClutterEditComponent } from './ui/clutter-edit/clutter-edit.component';
import { ClutterVoteCardComponent } from './ui/clutter-cards/clutter-vote-card/clutter-vote-card.component';
import { FamilyToVoteCardComponent } from './ui/clutter-cards/family-to-vote-card/family-to-vote-card.component';
import { FinalisedVoteCardComponent } from './ui/clutter-cards/finalised-vote-card/finalised-vote-card.component';
import { MixedVoteCardComponent } from './ui/clutter-cards/mixed-vote-card/mixed-vote-card.component';
import { YourVoteCardComponent } from './ui/clutter-cards/your-vote-card/your-vote-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
    AddClutterComponent,
    ClutterListComponent,
    ManageClutterItemComponent,
    ClutterFormComponent,
    ClutterVotingCardComponent,
    CreateFamilyComponent,
    FamilyFormComponent,
    FamilyViewComponent,
    FamilyFormAddMemberComponent,
    FamilyEditComponent,
    NoFamilyMessageComponent,
    ClutterEditComponent,
    ClutterVoteCardComponent,
    FamilyToVoteCardComponent,
    FinalisedVoteCardComponent,
    MixedVoteCardComponent,
    YourVoteCardComponent
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
