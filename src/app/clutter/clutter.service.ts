import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface AddClutterData {
  name: string
  description: string | null
}

export interface AddClutterResponse {
  message: string
  clutterId: string
}

export interface Clutter {
  _id: string
  name: string
  description: string | null
}

export interface GetClutterResponse {
  message: string,
  clutter: Clutter[]
}

export interface ClutterVoteCount {
  keep: number
  discard: number
}

@Injectable({
  providedIn: 'root'
})
export class ClutterService {

  constructor(
    private http: HttpClient
  ) { }

  addClutter(data: AddClutterData) {
    this.http.post<AddClutterResponse>('http://localhost:3000/api/clutter/create', data).subscribe()
  }

  getClutter(): Observable<Clutter[]> {
    return this.http.get<GetClutterResponse>('http://localhost:3000/api/clutter').pipe(
      map(response => response.clutter)
    )
  }

  vote(clutter: Clutter, vote: 'keep' | 'discard'): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/api/clutter/vote',
      {
        clutterId: clutter._id,
        vote: vote
      }
    )
  }
}
