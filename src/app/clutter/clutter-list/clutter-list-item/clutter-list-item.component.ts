import { Component, Input, OnInit } from '@angular/core';
import { Clutter, ClutterService, ClutterVoteCount } from '../../clutter.service';
import { BehaviorSubject, Observable, Subject, map, of, switchMap } from 'rxjs';
import { UsersService } from '../../../shared/users.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-clutter-list-item',
  templateUrl: './clutter-list-item.component.html',
  styleUrl: './clutter-list-item.component.scss'
})
export class ClutterListItemComponent implements OnInit {

  constructor(
    private clutterService: ClutterService,
    private usersService: UsersService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.clutterService.getVotes(this.clutter).subscribe({
      next: votes => {
        this.votes$.next(votes)
      }
    })
  }

  @Input() clutter!: Clutter

  votes$: Subject<ClutterVoteCount | null> = new BehaviorSubject<ClutterVoteCount | null>(null)
  addedBy$: Observable<string> = of(this.clutter).pipe(
    switchMap(clutter => this.usersService.getUserDetails(this.clutter.addedBy).pipe(
      map(details => details.name))))
  isThisUser$: Observable<boolean> = of(this.clutter).pipe(
    switchMap(clutter => this.auth.isThisUser(this.clutter.addedBy))
  )

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
