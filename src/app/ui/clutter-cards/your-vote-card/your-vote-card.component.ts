import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { ClutterService } from '../../../shared/services/clutter.service';
import { Clutter } from '../../../shared/models';

@Component({
  selector: 'app-your-vote-card',
  templateUrl: './your-vote-card.component.html',
  styleUrl: './your-vote-card.component.scss'
})
export class YourVoteCardComponent implements OnChanges {

  constructor(
    private clutterService: ClutterService,
    private auth: AuthService
  ) { }

  @Input({ required: true }) clutterId: string

  clutter$: Observable<Clutter>
  userVote$: Observable<string | null>

  vm$: Observable<{
    clutter: Clutter,
    userVote: string | null
  }>

  deleteVote() {
    this.clutterService.deleteVote(this.clutterId)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('clutterId')) {
      return
    }

    this.clutter$ = this.clutterService.getSingleClutterObservable(this.clutterId)

    this.userVote$ = this.clutter$.pipe(
      switchMap(clutter => this.auth.userId$.pipe(
        map(userId => {
          for (let vote of clutter.votes) {
            if (vote.userId === userId) {
              return vote.vote
            }
          }
          return null
        })
      ))
    )

    this.vm$ = combineLatest([
      this.clutter$,
      this.userVote$
    ]).pipe(
      map(([
        clutter,
        userVote
      ]) => ({ clutter, userVote }))
    )
  }

}
