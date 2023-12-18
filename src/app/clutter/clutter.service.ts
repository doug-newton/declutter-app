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

export interface Clutter extends AddClutterData {
  _id: string
  addedBy: string
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

export interface ClutterVoteResult {
  message: string
  votes: ClutterVoteCount
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

  vote(clutter: Clutter, vote: 'keep' | 'discard'): Observable<ClutterVoteCount | null> {
    return this.http.post<ClutterVoteResult>(
      'http://localhost:3000/api/clutter/vote',
      {
        clutterId: clutter._id,
        vote: vote
      }
    ).pipe(map(result => result.votes))
  }

  getVotes(clutter: Clutter): Observable<ClutterVoteCount> {
    return this.http.get<ClutterVoteResult>(
      `http://localhost:3000/api/clutter/${clutter._id}/votes`,
    ).pipe(map(result => result.votes))
  }

  update(clutter: Clutter): Observable<any> {
    return this.http.put<any>(
      `http://localhost:3000/api/clutter/${clutter._id}/update`,
      clutter
   )
  }
}
