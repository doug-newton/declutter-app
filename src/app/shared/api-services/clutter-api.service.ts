import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddClutterData, AddClutterResponse, Clutter, ClutterVoteResult, GetClutterResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClutterApiService {

  constructor(
    private http: HttpClient
  ) { }

  addClutter(data: AddClutterData) : Observable<AddClutterResponse> {
    return this.http.post<AddClutterResponse>('http://localhost:3000/api/clutter/', data)
  }

  getClutter(): Observable<GetClutterResponse> {
    return this.http.get<GetClutterResponse>('http://localhost:3000/api/clutter')
  }

  vote(clutter: Clutter, vote: 'keep' | 'discard'): Observable<{clutter: Clutter}> {
    return this.http.post<{ clutter: Clutter }>(`http://localhost:3000/api/clutter/${clutter._id}/vote`, { vote: vote })
  }

  updateClutter(clutterId: string, clutter: AddClutterData): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/api/clutter/${clutterId}`, clutter)
  }

  delete(clutter: Clutter): Observable<any> {
    return this.http.delete<any>( `http://localhost:3000/api/clutter/${clutter._id}`)
  }

  deleteVote(clutterId: string): Observable<{clutter: Clutter}> {
    return this.http.delete<{ clutter: Clutter }>(`http://localhost:3000/api/clutter/${clutterId}/vote`)
  }
}
