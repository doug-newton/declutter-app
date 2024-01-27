import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Observable, combineLatest, map } from 'rxjs';
import { ClutterService } from '../../../shared/services/clutter.service';
import { Clutter } from '../../../shared/models';

@Component({
  selector: 'app-finalised-vote-card',
  templateUrl: './finalised-vote-card.component.html',
  styleUrl: './finalised-vote-card.component.scss'
})
export class FinalisedVoteCardComponent implements OnChanges {
  constructor(
    private clutterService: ClutterService,
    private auth: AuthService
  ) { }

  @Input({ required: true }) clutterId: string

  clutter$: Observable<Clutter>

  vm$: Observable<{
    clutter: Clutter,
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
