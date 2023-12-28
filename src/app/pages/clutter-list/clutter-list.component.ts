import { Component, OnInit } from '@angular/core';
import { Observable, distinctUntilChanged, first, map, single, tap } from 'rxjs';
import { Clutter } from '../../shared/models';
import { ClutterService } from '../../shared/services/clutter.service';
import { FamilyService } from '../../shared/services/family.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clutter-list',
  templateUrl: './clutter-list.component.html',
  styleUrl: './clutter-list.component.scss',
  providers: [ClutterService, FamilyService]
})
export class ClutterListComponent implements OnInit {
  constructor(
    private clutterService: ClutterService,
    private familyService: FamilyService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.clutterService.getClutter()
    this.familyService.loadFamily()
  }

  tab$ = this.route.queryParams.pipe(
    first(),
    map(params => params['tab']),
    map(tab => this.getTabIndex(tab))
  )

  tabIndexes = {
    'vote': 0,
    'waiting-on-others': 1,
    'keep': 2,
    'discard': 3,
    'mixed': 4,
    'your-votes': 5,
    'your-items': 6
  }

  tabNames = Object.keys(this.tabIndexes)

  onTabChange(index: number) {
    const tabName = this.tabNames[index]
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {tab: tabName },
      queryParamsHandling: 'merge'
    })
  }

  getTabIndex(tab): number {
    if (this.tabIndexes.hasOwnProperty(tab)){
      return this.tabIndexes[tab]
    }
    return 0
  }

  clutter$: Observable<Clutter[]> = this.clutterService.clutter$
  clutterPending$: Observable<Clutter[]> = this.clutterService.clutterPending$
  clutterToKeep$: Observable<Clutter[]> = this.clutterService.clutterToKeep$
  clutterToDiscard$: Observable<Clutter[]> = this.clutterService.clutterToDiscard$
  clutterMixedResults$: Observable<Clutter[]> = this.clutterService.clutterMixedResults$
  clutterYourPendingVotes$: Observable<Clutter[]> = this.clutterService.clutterYourPendingVotes$
  clutterYourVotes$: Observable<Clutter[]> = this.clutterService.clutterYourVotes$
  clutterAddedByYou$: Observable<Clutter[]> = this.clutterService.clutterAddedByYou$
}
