import { Component, Input } from '@angular/core';
import { ClutterService, ClutterVoteCount } from '../../clutter.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent {

  constructor(private clutterService: ClutterService) { }

  @Input() clutter

  votes$: Subject<ClutterVoteCount | null> = new BehaviorSubject<ClutterVoteCount | null>(null)

  hasDescription() {
    if (this.clutter.description == null) return false
    if (this.clutter.description === '') return false
    return true
  }

  vote(vote: 'keep' | 'discard') {
    this.clutterService.vote(this.clutter, vote).subscribe({
      next: (res) => {
        this.votes$.next(res)
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
