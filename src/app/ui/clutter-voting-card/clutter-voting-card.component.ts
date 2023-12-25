import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { ClutterService } from '../../shared/services/clutter.service';
import { Clutter } from '../../shared/models';

@Component({
  selector: 'app-clutter-voting-card',
  templateUrl: './clutter-voting-card.component.html',
  styleUrl: './clutter-voting-card.component.scss'
})
export class ClutterVotingCardComponent {

  constructor(
    private clutterService: ClutterService,
    private auth: AuthService
  ) { }

  @Input() clutter!: Clutter
  @Output() changeToEditMode = new EventEmitter()

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
        this.clutter.voteCounts.keep = res.keep ?? 0
        this.clutter.voteCounts.discard = res.discard ?? 0
      },
      error: (error) => {
        console.log(error)
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
