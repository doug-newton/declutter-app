import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, Subscription, map, of, switchMap } from 'rxjs';
import { ClutterService } from '../../shared/services/clutter.service';
import { Clutter } from '../../shared/models';

@Component({
  selector: 'app-clutter-voting-card',
  templateUrl: './clutter-voting-card.component.html',
  styleUrl: './clutter-voting-card.component.scss'
})
export class ClutterVotingCardComponent implements OnInit, OnDestroy {

  constructor(
    private clutterService: ClutterService,
    private auth: AuthService
  ) { }
  
  ngOnInit(): void {
    this.userIdSub = this.auth.userId$.subscribe({
      next: id => {
        this.userId = id
        this.userVote = this.findUserVote()
      }
    })
  }

  ngOnDestroy(): void {
    this.userIdSub.unsubscribe()
  }

  @Input() clutter!: Clutter
  @Output() changeToEditMode = new EventEmitter()
  userIdSub: Subscription
  userId: string
  userVote: string | null

  findUserVote(): string | null {
    for (let vote of this.clutter.votes) {
      if (vote.userId == this.userId) {
        return vote.vote
      }
    }
    return null
  }

  isThisUser$: Observable<boolean> = of(this.clutter).pipe(
    switchMap(clutter => this.auth.isThisUser(this.clutter.addedBy._id))
  )

  onEdit() {
    this.changeToEditMode.emit()
  }

  onDelete() {
    this.clutterService.delete(this.clutter)
  }

  hasDescription() {
    if (this.clutter.description == null) return false
    if (this.clutter.description === '') return false
    return true
  }

  vote(vote: 'keep' | 'discard') {
    this.clutterService.vote(this.clutter, vote).subscribe({
      next: (res) => {
        this.clutter.voteCounts.keep = res.voteCounts.keep ?? 0
        this.clutter.voteCounts.discard = res.voteCounts.discard ?? 0
        this.clutter.votes = res.votes
        this.userVote = this.findUserVote()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteVote() {
    this.clutterService.deleteVote(this.clutter._id).subscribe({
      next: (res) => {
        this.clutter.voteCounts.keep = res.voteCounts.keep ?? 0
        this.clutter.voteCounts.discard = res.voteCounts.discard ?? 0
        this.clutter.votes = res.votes
        this.userVote = this.findUserVote()
      }
    })
  }

  voteKeep() {
    this.vote('keep')
  }

  voteDiscard() {
    this.vote('discard')
  }
}
