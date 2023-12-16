import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

export interface UserCredentials {
  email: string
  password: string
}

export interface LoginResult {
  message: string
  token: string | null
  userId: string | null
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  private loggedInUser: Subject<LoginResult | null> = new BehaviorSubject<LoginResult | null>(null)
  public isLoggedIn$: Observable<boolean> = this.loggedInUser.pipe(map(user => user != null))

  login(credentials: UserCredentials) {
    this.http.post<LoginResult>('http://localhost:3000/api/user/login', credentials).subscribe({
      next: ((result: LoginResult) => {
        this.loggedInUser.next(result)
      }),
      error: () => {
        this.loggedInUser.next(null)
      }
    })
  }

  logout() {
    this.loggedInUser.next(null)
  }

}
