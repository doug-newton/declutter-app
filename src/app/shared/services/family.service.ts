import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddFamilyData, AddFamilyResult, Family, FamilyMember, FamilyMembersResult, GetFamilyResult } from '../models';
import { Observable, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  hasFamily$: Observable<boolean> = this.auth.familyId$.pipe(map(id => id ? true : false))

  family$: Observable<Family> = this.auth.familyId$.pipe(
    switchMap(familyId => this.http.get<GetFamilyResult>(`http://localhost:3000/api/family/${familyId}`).pipe(
      map(familyResult => familyResult.family)))
  )

  createFamily(family: AddFamilyData): Observable<AddFamilyResult> {
    return this.http.post<AddFamilyResult>('http://localhost:3000/api/family/create', family)
  }
  
}
