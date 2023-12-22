import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddClutterComponent } from './pages/add-clutter/add-clutter.component';
import { ClutterListComponent } from './pages/clutter-list/clutter-list.component';
import { CreateFamilyComponent } from './pages/create-family/create-family.component';
import { FamilyViewComponent } from './pages/family-view/family-view.component';

import { authGuard } from './shared/guards/auth.guard';
import { familyGuard } from './shared/guards/family.guard';
import { FamilyEditComponent } from './pages/family-edit/family-edit.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'clutter/add', component: AddClutterComponent, canActivate: [authGuard, familyGuard] },
  { path: 'clutter/list', component: ClutterListComponent, canActivate: [authGuard, familyGuard] },
  { path: 'family/create', component: CreateFamilyComponent, canActivate: [authGuard] },
  { path: 'family/view', component: FamilyViewComponent, canActivate: [authGuard] },
  { path: 'family/edit', component: FamilyEditComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
