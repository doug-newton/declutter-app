import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AddFamilyData, AddFamilyResult, Family, FamilyMember, FamilyMembersResult, GetFamilyResult } from '../models';
import { BehaviorSubject, Observable, Subject, filter, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FamilyApiService } from '../api-services/family-api.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private apiService: FamilyApiService,
    private router: Router
  ) { }

  loadFamily(): void {
    this.auth.familyId$.pipe(
      filter((familyId) => familyId != null),
      switchMap(familyId => this.apiService.getFamily(familyId).pipe(
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
    return this.apiService.createFamily(family)
  }

  updateFamily(family: AddFamilyData) {
    this.apiService.updateFamily(this.family._id, family).subscribe({
      next: result => {
        this.family.name = family.name
        this.familySubject$.next(this.family)
        this.router.navigate(['/family/view'])
      }
    })
  }

  removeMember(member: FamilyMember) {
    this.apiService.removeMember(this.family._id, member._id).subscribe({
      next: response => {
        this.family = response.family
        this.familySubject$.next(this.family)
      }
    })
  }

  addMember(email: string) {
    this.apiService.addMember(this.family._id, email).subscribe({
      next: response => {
        this.family = response.family
        this.familySubject$.next(this.family)
      }
    })
  }

}
