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

  logIn(){
  }
}
