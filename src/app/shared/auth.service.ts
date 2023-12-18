import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';

export interface SignupDetails {
  name: string
  email: string
  password: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface LoginResult {
  token: string | null
  userId: string | null
  familyId?: string
}

export interface SignupResult {
  message: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private loggedInUser: Subject<LoginResult | null> = new BehaviorSubject<LoginResult | null>(null)
  public isLoggedIn$: Observable<boolean> = this.loggedInUser.pipe(map(user => user != null))
  public token$: Observable<string | null> = this.loggedInUser.pipe(
    map(user => user == null ? null : user.token)
  )
  public familyId$: Observable<string | null> = this.loggedInUser.pipe(map(user => user ? user.familyId : null))
  
  isThisUser(userId: string): Observable<boolean> {
    return this.loggedInUser.pipe(map(userDetails => userDetails.userId == userId))
  }

  login(credentials: UserCredentials) {
    this.http.post<LoginResult>('http://localhost:3000/api/user/login', credentials).subscribe({
      next: ((result: LoginResult) => {
        this.saveUserCredentials(result)
        this.loggedInUser.next(result)
      }),
      error: () => {
        this.logout()
      }
    })
  }

  refreshToken(): Observable<any> {
    return this.http.get<LoginResult>('http://localhost:3000/api/user/refresh').pipe(
      tap((result: LoginResult) => {
        this.deleteUserCredentials()
        this.saveUserCredentials(result)
        this.loggedInUser.next(result)
      }))
  }

  logout() {
    this.deleteUserCredentials()
    this.loggedInUser.next(null)
    this.router.navigate(['/'])
  }

  register(credentials: SignupDetails) {
    this.http.post<SignupResult>('http://localhost:3000/api/user/signup', credentials).subscribe({
      next: ((result: SignupResult) => {
        this.router.navigate(['/auth/login'])
      })
    })
  }

  logInFromLocalStorage() {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const familyId = localStorage.getItem('familyId')

    if (token == null || userId == null) {
      return
    }

    this.loggedInUser.next({
      token: token,
      userId: userId,
      familyId: familyId
    })
  }

  saveUserCredentials(user: LoginResult) {
    localStorage.setItem('token', user.token!)
    localStorage.setItem('userId', user.userId!)
    if (user.familyId)
      localStorage.setItem('familyId', user.familyId)
  }

  deleteUserCredentials() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('familyId')
  }

}
