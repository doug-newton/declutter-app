import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AddFamilyData } from './family.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface AddFamilyResult {
  message: string
  familyId: string | null
}

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  createFamily(family: AddFamilyData): Observable<AddFamilyResult> {
    return this.http.post<AddFamilyResult>('http://localhost:3000/api/family/create', family)
  }
}
