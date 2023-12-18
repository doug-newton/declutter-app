import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddClutterComponent } from './clutter/add-clutter/add-clutter.component';
import { authGuard } from './shared/auth.guard';
import { ClutterListComponent } from './clutter/clutter-list/clutter-list.component';
import { CreateFamilyComponent } from './family/create-family/create-family.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'clutter/add', component: AddClutterComponent, canActivate: [authGuard] },
  { path: 'clutter/list', component: ClutterListComponent, canActivate: [authGuard] },
  { path: 'family/create', component: CreateFamilyComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
