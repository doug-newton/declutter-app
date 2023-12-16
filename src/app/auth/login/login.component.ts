import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService) { }

  isLoggedIn$: Observable<boolean> = this.auth.isLoggedIn$

  email: string = ''
  password: string = ''

  logIn() {
    this.auth.login({
      email: this.email,
      password: this.password
    })
  }

  detailsEntered(): boolean {
    if (this.email == '') return false
    if (this.password == '') return false
    return true
  }
}
