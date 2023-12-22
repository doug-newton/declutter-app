import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddFamilyData, AddFamilyResult, Family, FamilyMember, FamilyMembersResult, GetFamilyResult } from '../models';
import { BehaviorSubject, Observable, Subject, filter, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  loadFamily(): void {
    this.auth.familyId$.pipe(
      filter((familyId) => familyId != null),
      switchMap(familyId => this.http.get<GetFamilyResult>(`http://localhost:3000/api/family/${familyId}`).pipe(
        map(familyResult => familyResult.family)))
    ).subscribe({
      next: (family) => {
        this.family = family
        this.familySubject$.next(this.family)
      }
    })
  }

  private family: Family | null = null
  private familySubject$: Subject<Family | null> = new BehaviorSubject(null)

  hasFamily$: Observable<boolean> = this.auth.familyId$.pipe(map(id => id ? true : false))
  family$: Observable<Family> = this.familySubject$

  createFamily(family: AddFamilyData): Observable<AddFamilyResult> {
    return this.http.post<AddFamilyResult>('http://localhost:3000/api/family', family)
  }

  updateFamily(family: AddFamilyData) {
    this.http.put<any>(`http://localhost:3000/api/family/${this.family._id}`, family).subscribe({
      next: result => {
        this.family.name = family.name
        this.familySubject$.next(this.family)
      }
    })
  }

  removeMember(member: FamilyMember) {
    this.http.delete<{family: Family}>(`http://localhost:3000/api/family/${this.family._id}/members/${member._id}`).subscribe({
      next: response => {
        this.family = response.family
        this.familySubject$.next(this.family)
      }
    })
  }

  addMember(email: string) {
    this.http.post<{ family: Family }>(`http://localhost:3000/api/family/${this.family._id}/members`, { email: email }).subscribe({
      next: response => {
        console.log(response)
        this.family = response.family
        this.familySubject$.next(this.family)
      }
    })
  }

}
