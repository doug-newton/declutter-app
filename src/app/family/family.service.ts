import { Injectable } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AddFamilyData, Family } from './family.models';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface AddFamilyResult {
  message: string
  familyId: string | null
}

export interface GetFamilyResult {
  message: string
  family: Family
}

export interface FamilyMember {
  _id: string
  name: string
  familyId: string
}

export interface FamilyMembersResult {
  message: string
  familyMembers: FamilyMember[]
}

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
