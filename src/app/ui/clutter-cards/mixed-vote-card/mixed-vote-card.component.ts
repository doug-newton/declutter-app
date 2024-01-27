import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ClutterService } from '../../../shared/services/clutter.service';
import { Clutter } from '../../../shared/models';

@Component({
  selector: 'app-mixed-vote-card',
  templateUrl: './mixed-vote-card.component.html',
  styleUrl: './mixed-vote-card.component.scss'
})
export class MixedVoteCardComponent implements OnChanges {

  constructor(
    private clutterService: ClutterService
  ) { }

  @Input({ required: true }) clutterId: string

  clutter$: Observable<Clutter>

  vm$: Observable<{
    clutter: Clutter
  }>

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
