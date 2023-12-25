import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { LoginResult, UserCredentials, SignupDetails, SignupResult } from '../models';
import { UserApiService } from '../api-services/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private apiService: UserApiService,
    private router: Router
  ) { }

  private loggedInUser: Subject<LoginResult | null> = new BehaviorSubject<LoginResult | null>(null)
  public isLoggedIn$: Observable<boolean> = this.loggedInUser.pipe(map(user => user != null))
  public token$: Observable<string | null> = this.loggedInUser.pipe(
    map(user => user == null ? null : user.token)
  )
  public familyId$: Observable<string | null> = this.loggedInUser.pipe(map(user => user ? user.familyId : null))
  public userId$: Observable<string | null> = this.loggedInUser.pipe(
    map(user => user == null ? null : user.userId)
  )
  
  isThisUser(userId: string): Observable<boolean> {
    return this.loggedInUser.pipe(map(userDetails => userDetails.userId == userId))
  }

  login(credentials: UserCredentials) {
    this.apiService.login(credentials).subscribe({
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
    return this.apiService.refresh().pipe(
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
    this.apiService.signup(credentials).subscribe({
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
