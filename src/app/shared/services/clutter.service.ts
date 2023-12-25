import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { AddClutterData, AddClutterResponse, Clutter, GetClutterResponse, ClutterVoteCount, ClutterVoteResult } from '../models';
import { ClutterApiService } from '../api-services/clutter-api.service';

@Injectable({
  providedIn: 'root'
})
export class ClutterService {

  constructor(
    private apiService: ClutterApiService
  ) { }

  addClutter(data: AddClutterData) : Observable<AddClutterResponse> {
    return this.apiService.addClutter(data)
  }

  private clutter: Clutter[]
  private clutterSubject$: Subject<Clutter[]> = new BehaviorSubject<Clutter[]>([])
  clutter$: Observable<Clutter[]> = this.clutterSubject$

  getClutter() {
    this.apiService.getClutter().pipe(
      map(response => response.clutter)
    ).subscribe({
      next: clutter => {
        this.clutter = clutter
        this.clutterSubject$.next(clutter)
      }
    })
  }

  vote(clutter: Clutter, vote: 'keep' | 'discard'): Observable<ClutterVoteCount | null> {
    return this.apiService.vote(clutter, vote).pipe(map(result => result.votes))
  }

  update(clutter: Clutter): Observable<any> {
    return this.apiService.updateClutter(clutter)
  }

  delete(clutter: Clutter) {
    this.apiService.delete(clutter).subscribe({
      next: result => {
        const newClutter = this.clutter.filter(c => c._id != clutter._id)
        this.clutter = newClutter
        this.clutterSubject$.next(this.clutter)
      }
    })
  }
}
