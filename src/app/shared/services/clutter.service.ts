import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, map, switchMap, tap } from 'rxjs';
import { AddClutterData, AddClutterResponse, Clutter } from '../models';
import { ClutterApiService } from '../api-services/clutter-api.service';
import { FamilyService } from './family.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClutterService {

  constructor(
    private apiService: ClutterApiService,
    private familyService: FamilyService,
    private auth: AuthService
  ) { }

  addClutter(data: AddClutterData) : Observable<AddClutterResponse> {
    return this.apiService.addClutter(data)
  }

  private clutter: Clutter[]
  private clutterSubject$: Subject<Clutter[]> = new BehaviorSubject<Clutter[]>([])

  clutter$: Observable<Clutter[]> = this.clutterSubject$

  clutterPending$: Observable<Clutter[]> = combineLatest([
    this.familyService.numMembers$,
    this.auth.userId$,
    this.clutter$
  ]).pipe(
    map(([numMembers, userId, clutterList]) =>
      clutterList.filter(item =>
        item.votes.length < numMembers &&
        item.votes.filter(vote => vote.userId == userId).length != 0)
    )
  )

  clutterVoted$: Observable<Clutter[]> = this.familyService.numMembers$.pipe(
    switchMap(numMembers => 
      this.clutter$.pipe(map(clutterList =>
        clutterList.filter(item => item.votes.length == numMembers)
      ))
    )
  )

  clutterToKeep$: Observable<Clutter[]> = this.clutterVoted$.pipe(
    map(clutterList => clutterList.filter(item => {
      return item.voteCounts.discard == 0
    }))
  )

  clutterToDiscard$: Observable<Clutter[]> = this.clutterVoted$.pipe(
    map(clutterList => clutterList.filter(item => {
      return item.voteCounts.keep == 0
    }))
  )

  clutterMixedResults$: Observable<Clutter[]> = this.clutterVoted$.pipe(
    map(clutterList => clutterList.filter(item => {
      return item.voteCounts.keep != 0 && item.voteCounts.discard != 0
    }))
  )

  clutterYourVotes$: Observable<Clutter[]> = this.auth.userId$.pipe(
    switchMap(userId => 
      this.clutter$.pipe(map(clutterList => {
        return clutterList.filter(item => {
          return item.votes.filter(vote => vote.userId == userId).length != 0
        })
      })))
  )

  clutterYourPendingVotes$: Observable<Clutter[]> = this.auth.userId$.pipe(
    switchMap(userId => 
      this.clutter$.pipe(map(clutterList => {
        return clutterList.filter(item => {
          return item.votes.filter(vote => vote.userId == userId).length == 0
        })
      })))
  )

  clutterAddedByYou$: Observable<Clutter[]> = this.auth.userId$.pipe(
    switchMap(userId => 
      this.clutter$.pipe(map(clutterList => {
        return clutterList.filter(item => item.addedBy._id == userId)
      })))
  )

  getSingleClutterObservable(clutterId: string): Observable<Clutter> {
    return this.clutter$.pipe(
      map(clutterList => {
      return clutterList.filter(c => c._id === clutterId)[0]
    }))
  }

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

  vote(clutterId: string, vote: 'keep' | 'discard') {
    this.apiService.vote(clutterId, vote).pipe(map(result => result.clutter)).subscribe({
      next: (newClutter) => {
        let clutterToUpdate = this.clutter.find(c => c._id === clutterId)
        if (clutterToUpdate == null) {
          return
        }
        clutterToUpdate.voteCounts.keep = newClutter.voteCounts.keep ?? 0
        clutterToUpdate.voteCounts.discard = newClutter.voteCounts.discard ?? 0
        clutterToUpdate.votes = newClutter.votes
        this.clutterSubject$.next(this.clutter)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  update(clutterId: string, clutter: AddClutterData) {
    this.apiService.updateClutter(clutterId, clutter).subscribe({
      next: result => {
        let clutterToUpdate = this.clutter.find(c => c._id === clutterId)
        if (clutterToUpdate == null) {
          return
        }
        clutterToUpdate.name = clutter.name
        clutterToUpdate.description = clutter.description
        this.clutterSubject$.next(this.clutter)
      }
    })
  }

  delete(clutterId: string) {
    this.apiService.delete(clutterId).subscribe({
      next: result => {
        const newClutter = this.clutter.filter(c => c._id != clutterId)
        this.clutter = newClutter
        this.clutterSubject$.next(this.clutter)
      }
    })
  }

  deleteVote(clutterId: string) {
    this.apiService.deleteVote(clutterId).pipe(map(result => result.clutter)).subscribe({
      next: (res) => {
        let clutterToUpdate = this.clutter.find(c => c._id === clutterId)
        if (clutterToUpdate == null) {
          return
        }
        clutterToUpdate.voteCounts.keep = res.voteCounts.keep ?? 0
        clutterToUpdate.voteCounts.discard = res.voteCounts.discard ?? 0
        clutterToUpdate.votes = res.votes
        this.clutterSubject$.next(this.clutter)
      }
    })
  }
}
