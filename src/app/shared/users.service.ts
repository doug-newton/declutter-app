import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDetails {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(`http://localhost:3000/api/user/${userId}/details`)
  }
}
