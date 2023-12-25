import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResult, SignupDetails, SignupResult, UserCredentials, UserDetails } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(
    private http: HttpClient
  ) { }

  signup(credentials: SignupDetails) {
    return this.http.post<SignupResult>('http://localhost:3000/api/user/signup', credentials)
  }

  login(credentials: UserCredentials): Observable<LoginResult> {
    return this.http.post<LoginResult>('http://localhost:3000/api/user/login', credentials)
  }

  refresh(): Observable<LoginResult> {
    return this.http.get<LoginResult>('http://localhost:3000/api/user/refresh')
  }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`http://localhost:3000/api/user/${userId}/details`)
  }

}
