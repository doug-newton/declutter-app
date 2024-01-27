import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ClutterService } from '../../../shared/services/clutter.service';
import { Clutter } from '../../../shared/models';


@Component({
  selector: 'app-clutter-vote-card',
  templateUrl: './clutter-vote-card.component.html',
  styleUrl: './clutter-vote-card.component.scss'
})
export class ClutterVoteCardComponent implements OnChanges {

  constructor(
    private clutterService: ClutterService
  ) { }

  @Input({ required: true }) clutterId: string

  clutter$: Observable<Clutter>

  vm$: Observable<{
    clutter: Clutter
  }>

  voteKeep() {
    this.vote('keep')
  }

  voteDiscard() {
    this.vote('discard')
  }

  vote(vote: 'keep' | 'discard') {
    this.clutterService.vote(this.clutterId, vote)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.hasOwnProperty('clutterId')) {
      return
    }

    this.clutter$ = this.clutterService.getSingleClutterObservable(this.clutterId)

    this.vm$ = combineLatest([
      this.clutter$,
    ]).pipe(
      map(([
        clutter,
      ]) => ({ clutter }))
    )
  }
}
