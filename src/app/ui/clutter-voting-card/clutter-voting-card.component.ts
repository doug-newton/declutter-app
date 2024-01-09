import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { ClutterService } from '../../shared/services/clutter.service';
import { Clutter } from '../../shared/models';

@Component({
  selector: 'app-clutter-voting-card',
  templateUrl: './clutter-voting-card.component.html',
  styleUrl: './clutter-voting-card.component.scss'
})
export class ClutterVotingCardComponent implements OnChanges {

  constructor(
    private clutterService: ClutterService,
    private auth: AuthService
  ) { }

  @Input({ required: true }) clutterId: string
  @Input() showVoteCounts: boolean = true
  @Input() showUndoButton: boolean = true
  @Input() showYourVote: boolean = true
  @Input() showEditButtons: boolean = true
  @Input() showWhoVoted: boolean = false

  @Output() changeToEditMode = new EventEmitter()

  clutter$: Observable<Clutter>
  isThisUser$: Observable<boolean>
  userVote$: Observable<string | null>

  vm$: Observable<{
    clutter: Clutter,
    isThisUser: boolean,
    userVote: string | null
  }>

  onEdit() {
    this.changeToEditMode.emit()
  }

  onDelete() {
    this.clutterService.delete(this.clutterId)
  }

  vote(vote: 'keep' | 'discard') {
    this.clutterService.vote(this.clutterId, vote)
  }

  deleteVote() {
    this.clutterService.deleteVote(this.clutterId)
  }

  voteKeep() {
    this.vote('keep')
  }

  voteDiscard() {
    this.vote('discard')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('clutterId')) {
      return
    }

    this.clutter$ = this.clutterService.getSingleClutterObservable(this.clutterId)

    this.isThisUser$ = this.clutter$.pipe(
      switchMap(clutter => this.auth.isThisUser(clutter.addedBy._id))
    )

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
      this.isThisUser$,
      this.userVote$
    ]).pipe(
      map(([
        clutter,
        isThisUser,
        userVote
      ]) => ({ clutter, isThisUser, userVote }))
    )
  }
}
