import { Injectable } from '@angular/core';
import { AddFamilyData, AddFamilyResult, Family, GetFamilyResult } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/*
router.post('/', auth, FamilyController.create)
router.get('/:familyId', auth, FamilyController.get)
router.put('/:familyId', auth, FamilyController.update)
router.post('/:familyId/members', auth, FamilyController.addMember)
router.delete('/:familyId/members/:memberId', auth, FamilyController.removeMember)
*/

@Injectable({
  providedIn: 'root'
})
export class FamilyApiService {

  constructor(
    private http: HttpClient
  ) { }

  createFamily(family: AddFamilyData): Observable<AddFamilyResult> {
    return this.http.post<AddFamilyResult>('http://localhost:3000/api/family', family)
  }

  getFamily(familyId: string): Observable<GetFamilyResult> {
    return this.http.get<GetFamilyResult>(`http://localhost:3000/api/family/${familyId}`)
  }

  updateFamily(familyId: string, familyData: AddFamilyData): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/family/${familyId}`, familyData)
  }

  removeMember(familyId: string, memberId: string): Observable<{ family: Family }> {
    return this.http.delete<{ family: Family }>(`http://localhost:3000/api/family/${familyId}/members/${memberId}`)
  }

  addMember(familyId: string, memberEmail: string): Observable<{ family: Family }> {
    return this.http.post<{ family: Family }>(`http://localhost:3000/api/family/${familyId}/members`, { email: memberEmail })
  }
}
