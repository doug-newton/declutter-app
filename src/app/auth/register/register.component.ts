import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private auth: AuthService
  ) { }

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onRegister() {
    if (!this.registerForm.valid) {
      return
    }
    
    this.auth.register({
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!
    })
  }

}
