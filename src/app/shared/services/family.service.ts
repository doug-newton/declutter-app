import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddFamilyData, AddFamilyResult, Family, FamilyMember, FamilyMembersResult, GetFamilyResult } from '../models';
import { Observable, map } from 'rxjs';
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

  family$: Observable<Family> = this.http.get<GetFamilyResult>('http://localhost:3000/api/family').pipe(
    map(familyResult => familyResult.family))

  familyMembers$: Observable<FamilyMember[]> = this.http.get<FamilyMembersResult>('http://localhost:3000/api/family/members').pipe(
    map(result => result.familyMembers)
  )

  createFamily(family: AddFamilyData): Observable<AddFamilyResult> {
    return this.http.post<AddFamilyResult>('http://localhost:3000/api/family/create', family)
  }
  
}
