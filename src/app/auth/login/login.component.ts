import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', { validators: [Validators.required] })
  })

  logIn() {
    if (this.loginForm.invalid) {
      return
    }

    this.auth.login({
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    })
  }

}
