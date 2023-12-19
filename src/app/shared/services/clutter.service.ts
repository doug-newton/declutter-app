import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AddClutterData, AddClutterResponse, Clutter, GetClutterResponse, ClutterVoteCount, ClutterVoteResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ClutterService {

  constructor(
    private http: HttpClient
  ) { }

  addClutter(data: AddClutterData) : Observable<AddClutterResponse> {
    return this.http.post<AddClutterResponse>('http://localhost:3000/api/clutter/create', data)
  }

  private clutter: Clutter[]
  private clutterSubject$: Subject<Clutter[]> = new BehaviorSubject<Clutter[]>([])
  clutter$: Observable<Clutter[]> = this.clutterSubject$

  getClutter() {
    this.http.get<GetClutterResponse>('http://localhost:3000/api/clutter').pipe(
      map(response => response.clutter)
    ).subscribe({
      next: clutter => {
        this.clutter = clutter
        this.clutterSubject$.next(clutter)
      }
    })
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

  delete(clutter: Clutter) {
    this.http.delete<any>(
      `http://localhost:3000/api/clutter/${clutter._id}/delete`,
    ).subscribe({
      next: result => {
        const newClutter = this.clutter.filter(c => c._id != clutter._id)
        this.clutter = newClutter
        this.clutterSubject$.next(this.clutter)
      }
    })
  }
}
