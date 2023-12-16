import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  isLoggedIn$ = this.auth.isLoggedIn$

  logOut() {
    this.auth.logout()
  }

  logIn() {
    this.router.navigate(['/auth/login'])
  }

  register() {
    this.router.navigate(['/auth/register'])
  }
}
