import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FamilyService } from '../shared/services/family.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(
    private auth: AuthService,
    private familyService: FamilyService
  ) {}

  isLoggedIn$ = this.auth.isLoggedIn$
  hasFamily$ = this.familyService.hasFamily$

  logOut() {
    this.auth.logout()
  }
}
