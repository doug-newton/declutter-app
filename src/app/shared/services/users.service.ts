import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../models';
import { UserApiService } from '../api-services/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: UserApiService
  ) { }

  getUserDetails(userId: string): Observable<UserDetails> {
    return this.apiService.getUserDetails(userId)
  }
}
